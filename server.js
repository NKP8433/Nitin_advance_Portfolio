import 'dotenv/config';
import express from 'express';
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
const databasePath = process.env.DATABASE_PATH || path.join(currentDirectory, 'data', 'portfolio.sqlite');
const dataDirectory = path.dirname(databasePath);
fs.mkdirSync(dataDirectory, { recursive: true });
const database = new DatabaseSync(databasePath);

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

const inquiryInsert = database.prepare(`
  INSERT INTO inquiries (name, email, scope, phone, message)
  VALUES (?, ?, ?, ?, ?)
`);
const inquiryStatusUpdate = database.prepare(
  'UPDATE inquiries SET delivery_status = ? WHERE id = ?'
);
const inquiryList = database.prepare(`
  SELECT id, name, email, scope, phone, message, delivery_status, created_at
  FROM inquiries
  ORDER BY id DESC
  LIMIT ?
`);

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

  const inquiry = inquiryInsert.run(name.trim(), email.trim(), scope?.trim() || '', phone?.trim() || '', message.trim());
  const inquiryId = Number(inquiry.lastInsertRowid);

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

    inquiryStatusUpdate.run('sent', inquiryId);
    return response.json({ ok: true, stored: true, delivery: 'sent', inquiryId });
  } catch (error) {
    console.error('Resend delivery failed:', error);
    inquiryStatusUpdate.run('failed', inquiryId);
    return response.status(202).json({ ok: true, stored: true, delivery: 'failed', inquiryId });
  }
});

app.get('/api/admin/inquiries', (request, response) => {
  const expectedToken = process.env.ADMIN_TOKEN;
  if (!expectedToken || request.get('x-admin-token') !== expectedToken) {
    return response.status(401).json({ error: 'Admin authorization required.' });
  }

  const requestedLimit = Number.parseInt(request.query.limit, 10);
  const limit = Number.isInteger(requestedLimit) ? Math.min(Math.max(requestedLimit, 1), 100) : 25;
  return response.json({ inquiries: inquiryList.all(limit) });
});

app.listen(port, () => {
  console.log(`Portfolio server running at http://localhost:${port}`);
});