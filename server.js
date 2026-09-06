import 'dotenv/config';
import crypto from 'node:crypto';
import express from 'express';
import { Pool } from 'pg';
import { Resend } from 'resend';
import { DatabaseSync } from 'node:sqlite';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const app = express();
const port = process.env.PORT || 3000;
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;
const currentFile = fileURLToPath(import.meta.url);
const currentDirectory = path.dirname(currentFile);
let database;
let pool;

async function initializeStorage() {
  if (process.env.DATABASE_URL) {
    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false }
    });
    await pool.query(`
      CREATE TABLE IF NOT EXISTS inquiries (
        id BIGSERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        scope TEXT,
        phone TEXT,
        message TEXT NOT NULL,
        delivery_status TEXT NOT NULL DEFAULT 'pending',
        created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
      )
    `);
    await pool.query(`
      CREATE TABLE IF NOT EXISTS access_requests (
        id BIGSERIAL PRIMARY KEY,
        requester_name TEXT NOT NULL,
        organization TEXT NOT NULL,
        requester_email TEXT NOT NULL,
        token_hash TEXT NOT NULL,
        expires_at TIMESTAMPTZ NOT NULL,
        used_at TIMESTAMPTZ,
        created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
      )
    `);
    return;
  }

  const databasePath = process.env.DATABASE_PATH || path.join(currentDirectory, 'data', 'portfolio.sqlite');
  fs.mkdirSync(path.dirname(databasePath), { recursive: true });
  database = new DatabaseSync(databasePath);
  database.exec(`
    CREATE TABLE IF NOT EXISTS inquiries (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      scope TEXT,
      phone TEXT,
      message TEXT NOT NULL,
      delivery_status TEXT NOT NULL DEFAULT 'pending',
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
  `);
  database.exec(`
    CREATE TABLE IF NOT EXISTS access_requests (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      requester_name TEXT NOT NULL,
      organization TEXT NOT NULL,
      requester_email TEXT NOT NULL,
      token_hash TEXT NOT NULL,
      expires_at TEXT NOT NULL,
      used_at TEXT,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
  `);
}

function hashAccessToken(token) {
  return crypto.createHash('sha256').update(token).digest('hex');
}

async function createAccessRequest(requesterName, organization, requesterEmail) {
  const token = crypto.randomBytes(18).toString('base64url');
  const tokenHash = hashAccessToken(token);
  const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();

  if (pool) {
    const result = await pool.query(
      `INSERT INTO access_requests (requester_name, organization, requester_email, token_hash, expires_at)
       VALUES ($1, $2, $3, $4, $5) RETURNING id`,
      [requesterName, organization, requesterEmail, tokenHash, expiresAt]
    );
    return { id: Number(result.rows[0].id), token, expiresAt };
  }

  const result = database.prepare(
    `INSERT INTO access_requests (requester_name, organization, requester_email, token_hash, expires_at)
     VALUES (?, ?, ?, ?, ?)`
  ).run(requesterName, organization, requesterEmail, tokenHash, expiresAt);
  return { id: Number(result.lastInsertRowid), token, expiresAt };
}

async function consumeAccessToken(token) {
  const tokenHash = hashAccessToken(token);
  if (pool) {
    const result = await pool.query(
      `UPDATE access_requests SET used_at = CURRENT_TIMESTAMP
       WHERE token_hash = $1 AND used_at IS NULL AND expires_at > CURRENT_TIMESTAMP
       RETURNING id`,
      [tokenHash]
    );
    return result.rowCount === 1;
  }

  const result = database.prepare(
    `UPDATE access_requests SET used_at = CURRENT_TIMESTAMP
     WHERE token_hash = ? AND used_at IS NULL AND expires_at > CURRENT_TIMESTAMP`
  ).run(tokenHash);
  return result.changes === 1;
}

async function saveInquiry(name, email, scope, phone, message) {
  if (pool) {
    const result = await pool.query(
      `INSERT INTO inquiries (name, email, scope, phone, message)
       VALUES ($1, $2, $3, $4, $5) RETURNING id`,
      [name, email, scope, phone, message]
    );
    return Number(result.rows[0].id);
  }

  const statement = database.prepare(`
    INSERT INTO inquiries (name, email, scope, phone, message)
    VALUES (?, ?, ?, ?, ?)
  `);
  return Number(statement.run(name, email, scope, phone, message).lastInsertRowid);
}

async function updateInquiryStatus(status, inquiryId) {
  if (pool) {
    await pool.query('UPDATE inquiries SET delivery_status = $1 WHERE id = $2', [status, inquiryId]);
    return;
  }
  database.prepare('UPDATE inquiries SET delivery_status = ? WHERE id = ?').run(status, inquiryId);
}

async function listInquiries(limit) {
  if (pool) {
    const result = await pool.query(
      `SELECT id, name, email, scope, phone, message, delivery_status, created_at
       FROM inquiries ORDER BY id DESC LIMIT $1`,
      [limit]
    );
    return result.rows;
  }
  return database.prepare(`
    SELECT id, name, email, scope, phone, message, delivery_status, created_at
    FROM inquiries ORDER BY id DESC LIMIT ?
  `).all(limit);
}

await initializeStorage();

app.use(express.json({ limit: '20kb' }));
app.use(express.static(currentDirectory));

app.get('/', (request, response) => {
  response.sendFile(path.join(currentDirectory, 'code.html'));
});

app.get('/api/health', (request, response) => {
  response.json({ ok: true, service: 'sap-consultant-portfolio' });
});

app.post('/api/contact', async (request, response) => {
  const { name, email, scope, phone, message } = request.body || {};

  if (!name || !email || !message) {
    return response.status(400).json({ error: 'Name, email, and project message are required.' });
  }

  const inquiryId = await saveInquiry(name.trim(), email.trim(), scope?.trim() || '', phone?.trim() || '', message.trim());

  if (!resend || !process.env.CONTACT_TO_EMAIL || !process.env.FROM_EMAIL) {
    return response.status(202).json({ ok: true, stored: true, delivery: 'pending', inquiryId });
  }

  try {
    await resend.emails.send({
      from: process.env.FROM_EMAIL,
      to: [process.env.CONTACT_TO_EMAIL],
      replyTo: email,
      subject: `Portfolio inquiry: ${scope || 'SAP consulting'}`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        `Phone: ${phone || 'Not provided'}`,
        `Engagement scope: ${scope || 'Not provided'}`,
        '',
        'Project specifications:',
        message
      ].join('\n')
    });

    await updateInquiryStatus('sent', inquiryId);
    return response.json({ ok: true, stored: true, delivery: 'sent', inquiryId });
  } catch (error) {
    console.error('Resend delivery failed:', error);
    await updateInquiryStatus('failed', inquiryId);
    return response.status(202).json({ ok: true, stored: true, delivery: 'failed', inquiryId });
  }
});

app.post('/api/access/request', async (request, response) => {
  const { name, organization, email } = request.body || {};
  if (!name?.trim() || !organization?.trim() || !email?.trim()) {
    return response.status(400).json({ error: 'Name, organization, and email are required.' });
  }

  const accessRequest = await createAccessRequest(name.trim(), organization.trim(), email.trim());
  let notification = 'not_configured';
  if (resend && process.env.CONTACT_TO_EMAIL && process.env.FROM_EMAIL) {
    try {
      await resend.emails.send({
        from: process.env.FROM_EMAIL,
        to: [process.env.CONTACT_TO_EMAIL],
        replyTo: email.trim(),
        subject: `Confidential access request: ${organization.trim()}`,
        text: [
          `Requester: ${name.trim()}`,
          `Organization: ${organization.trim()}`,
          `Email: ${email.trim()}`,
          '',
          `One-time access token: ${accessRequest.token}`,
          'This token expires in 24 hours and can be used once.'
        ].join('\n')
      });
      notification = 'sent';
    } catch (error) {
      notification = 'failed';
      console.error('Access request notification failed:', error?.message || error);
    }
  }

  return response.status(notification === 'failed' ? 502 : 202).json({
    ok: notification !== 'failed',
    requestId: accessRequest.id,
    notification,
    message: notification === 'sent'
      ? 'Request received. A private token notification was sent for review.'
      : 'Request was stored, but the owner notification could not be sent. Please use WhatsApp.'
  });
});

app.post('/api/access/verify', async (request, response) => {
  const token = request.body?.token?.trim();
  if (!token || !(await consumeAccessToken(token))) {
    return response.status(401).json({ error: 'This access token is invalid, expired, or already used.' });
  }
  return response.json({ ok: true, authorized: true });
});

app.get('/api/admin/inquiries', async (request, response) => {
  const expectedToken = process.env.ADMIN_TOKEN;
  if (!expectedToken || request.get('x-admin-token') !== expectedToken) {
    return response.status(401).json({ error: 'Admin authorization required.' });
  }

  const requestedLimit = Number.parseInt(request.query.limit, 10);
  const limit = Number.isInteger(requestedLimit) ? Math.min(Math.max(requestedLimit, 1), 100) : 25;
  return response.json({ inquiries: await listInquiries(limit) });
});

app.listen(port, () => {
  console.log(`Portfolio server running at http://localhost:${port}`);
});