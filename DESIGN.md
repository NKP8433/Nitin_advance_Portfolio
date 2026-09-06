---
name: Terminal Horizon
colors:
  surface: '#0b1326'
  surface-dim: '#0b1326'
  surface-bright: '#31394d'
  surface-container-lowest: '#060e20'
  surface-container-low: '#131b2e'
  surface-container: '#171f33'
  surface-container-high: '#222a3d'
  surface-container-highest: '#2d3449'
  on-surface: '#dae2fd'
  on-surface-variant: '#c7c4d7'
  inverse-surface: '#dae2fd'
  inverse-on-surface: '#283044'
  outline: '#908fa0'
  outline-variant: '#464554'
  surface-tint: '#c0c1ff'
  primary: '#c0c1ff'
  on-primary: '#1000a9'
  primary-container: '#8083ff'
  on-primary-container: '#0d0096'
  inverse-primary: '#494bd6'
  secondary: '#93ccff'
  on-secondary: '#003351'
  secondary-container: '#3198dc'
  on-secondary-container: '#002c47'
  tertiary: '#7bd0ff'
  on-tertiary: '#00354a'
  tertiary-container: '#009bd1'
  on-tertiary-container: '#002d40'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#e1e0ff'
  primary-fixed-dim: '#c0c1ff'
  on-primary-fixed: '#07006c'
  on-primary-fixed-variant: '#2f2ebe'
  secondary-fixed: '#cce5ff'
  secondary-fixed-dim: '#93ccff'
  on-secondary-fixed: '#001d31'
  on-secondary-fixed-variant: '#004b73'
  tertiary-fixed: '#c4e7ff'
  tertiary-fixed-dim: '#7bd0ff'
  on-tertiary-fixed: '#001e2c'
  on-tertiary-fixed-variant: '#004c69'
  background: '#0b1326'
  on-background: '#dae2fd'
  surface-variant: '#2d3449'
typography:
  display-hero:
    fontFamily: Space Grotesk
    fontSize: 4rem
    fontWeight: '700'
    lineHeight: 4.25rem
    letterSpacing: -0.04em
  display-hero-mobile:
    fontFamily: Space Grotesk
    fontSize: 2.25rem
    fontWeight: '700'
    lineHeight: 2.5rem
    letterSpacing: -0.03em
  headline-lg:
    fontFamily: Space Grotesk
    fontSize: 2.25rem
    fontWeight: '700'
    lineHeight: 2.75rem
    letterSpacing: -0.03em
  headline-lg-mobile:
    fontFamily: Space Grotesk
    fontSize: 1.75rem
    fontWeight: '600'
    lineHeight: 2.125rem
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Space Grotesk
    fontSize: 1.5rem
    fontWeight: '600'
    lineHeight: 1.875rem
    letterSpacing: -0.02em
  headline-sm:
    fontFamily: Space Grotesk
    fontSize: 1.125rem
    fontWeight: '600'
    lineHeight: 1.5rem
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Space Mono
    fontSize: 1rem
    fontWeight: '400'
    lineHeight: 1.625rem
    letterSpacing: 0em
  body-md:
    fontFamily: Space Mono
    fontSize: 0.875rem
    fontWeight: '400'
    lineHeight: 1.5rem
    letterSpacing: 0em
  body-sm:
    fontFamily: Space Mono
    fontSize: 0.75rem
    fontWeight: '400'
    lineHeight: 1.25rem
    letterSpacing: 0.01em
  label-code:
    fontFamily: Space Mono
    fontSize: 0.8125rem
    fontWeight: '700'
    lineHeight: 1rem
    letterSpacing: 0.05em
  label-badge:
    fontFamily: Space Mono
    fontSize: 0.6875rem
    fontWeight: '700'
    lineHeight: 0.875rem
    letterSpacing: 0.08em
spacing:
  grid-margin-desktop: 3rem
  grid-margin-tablet: 1.5rem
  grid-margin-mobile: 1rem
  grid-gutter-desktop: 1.5rem
  grid-gutter-mobile: 0.75rem
  unit-2xs: 0.125rem
  unit-xs: 0.25rem
  unit-sm: 0.5rem
  unit-md: 1rem
  unit-lg: 1.5rem
  unit-xl: 2rem
  unit-2xl: 3rem
  unit-3xl: 4.5rem
---

## Brand & Style

This design system expresses the sheer operational power and architectural precision of mission-critical enterprise engineering. Drawing inspiration from modern high-throughput telemetry, SAP Fiori/Horizon enterprise standards, and brutalist command-line interfaces, it replaces bloated corporate patterns with sharp, authoritative, and data-dense instruments.

The atmosphere is uncompromisingly technical, engineered for systems architects, enterprise engineers, and executive technical operators who read status signals faster than prose. The aesthetic is categorized by:
- **Sharp Brutalism & Structural Rigor**: Pure rectangular geometries with zero border-radii across all viewports.
- **Terminal-Grade Signal Layering**: Deep navy slate bedrock punctuated by high-luminance indigo, sapphire, and cyan lasers that signify active state, data throughput, and architectural stability.
- **Subtle Glass & Luminous Depths**: Frosted dark glass backdrops overlaid with wire-thin, high-contrast borders and low-diffuse neon underglows, maintaining functional discipline without decorative clutter.

## Colors

The color architecture is built around low-reflectance, high-contrast values tuned for sustained monitoring and zero visual fatigue in mission-critical command centers.

### Palettes & Semantic Roles
- **Base Canvas & Surfaces**:
  - `Surface-0 (Bedrock)`: `#0B1120` — Core viewport background.
  - `Surface-1 (Base Slate)`: `#0F172A` — Primary container floor.
  - `Surface-2 (Interactive)`: `#1E293B` — Cards, table headers, and modal backgrounds.
  - `Surface-3 (Elevated Glass)`: `rgba(30, 41, 59, 0.7)` with `backdrop-filter: blur(12px)`.
- **Primary Signal (Indigo Focus)**:
  - `#6366F1` — Primary actions, structural framing, operational telemetry markers.
  - `#818CF8` — Hover state and keyboard focus reticles.
- **Secondary & Accent (Electric Sapphire & Sky Highlight)**:
  - `#0284C7` (Electric Sapphire) — Secondary actions, active data pathways, system logs.
  - `#38BDF8` (Sky High-Luminance) — Live metrics, inline ABAP execution highlights, status badges.
- **System Telemetry Signals**:
  - `#10B981` (Emerald Telemetry) — Stable deployment, healthy nodes, validated credentials.
  - `#F59E0B` (Amber Notice) — Pipeline throttles, latency spikes.
  - `#EF4444` (Crimson Breach) — System halt, permission denied, compile failures.
- **Typography & Structural Contrast**:
  - Primary Text: `#F8FAFC` (98% contrast against Surface-0).
  - Secondary / Structural Text: `#94A3B8`.
  - Border Grid / Dividers: `#334155` (Base), `#6366F1` (Active/Armed state).

## Typography

The typographic hierarchy juxtaposes `Space Grotesk` (for architectural dominance, aggressive headers, and system anchors) with `Space Mono` (for execution logs, metric feeds, ABAP code snippets, and operational parameters).

### Implementation Rules
- **Headers (`Space Grotesk`)**: Must always render with tight tracking (`-0.02em` to `-0.04em`) to project architectural density. Never apply sentence casing to terminal headers; use uppercase or title-style capitalization for core modules.
- **Data & Telemetry (`Space Mono`)**: All dynamic outputs, table cells, ID strings, and navigation nodes use the monospace rhythm. This guarantees tabular number alignment and reinforces the console-grade environment.
- **Case Conventions**: Status labels and technical specs are strictly uppercase (`STATUS: ACTIVE`, `200 OK`, `LATENCY: 12ms`).

## Layout & Spacing

The layout model is governed by a technical 12-column modular grid that hugs the edges of the viewport with minimal peripheral dead space, maximizing information bandwidth.

### Layout Principles
- **Grid Architecture**: 12 columns on desktop (`min-width: 1280px`), 8 columns on tablet (`768px - 1279px`), and 4 columns on mobile (`< 768px`).
- **Dense Modularity**: Containers snap flush against one another using `1px` structural borders (`#334155`) rather than expansive outer margins, forming a cohesive modular control matrix.
- **Rhythm**: Spacing follows a strict 4px/8px baseline grid (`0.25rem`, `0.5rem`, `1rem`, `1.5rem`, `2rem`). Padding inside dense components (such as table rows or status pills) stays pinned to `unit-xs` (4px) and `unit-sm` (8px) for maximum spatial efficiency.

## Elevation & Depth

This design system discards generic diffuse drop shadows. Depth and hierarchy are articulated through **tonal glass layering**, **1px crisp wireframes**, and **laser-focused luminous underglows**.

### Elevation Stack
1. **Level 0 (Basebed)**: Non-interactive canvas (`#0B1120`). Dark, absorbing, no highlight.
2. **Level 1 (Card & Module Deck)**: `#0F172A` at `85%` opacity with a 1px solid border of `#334155`. Provides separation from basebed without artificial drop shadows.
3. **Level 2 (Glass Overlays & Interactive Surfaces)**: `rgba(30, 41, 59, 0.7)` backed by `backdrop-filter: blur(12px)` and bordered with `rgba(99, 102, 241, 0.3)`. Used for navigation panels, active telemetry widgets, and popovers.
4. **Level 3 (Command Modals & Overlays)**: `#0F172A` bounded by a solid 1px `#6366F1` frame, reinforced with an inner ambient glow: `box-shadow: inset 0 0 16px rgba(99, 102, 241, 0.15), 0 0 32px rgba(2, 132, 199, 0.25)`.
5. **Level 4 (Neon Signal Emission)**: Applied exclusively to active status indicators, primary buttons, and selected tabs. Employs crisp optical glows (`box-shadow: 0 0 12px rgba(99, 102, 241, 0.6)`) to signify power and processing state.

## Shapes

The shape language is strictly **Sharp (`roundedness: 0`)**. 

Every interactive container, modal, button, tag, and form field terminates in true right angles (0px border radius). There are zero curves across the system. 

To reinforce industrial engineering aesthetics:
- High-level cards and modals may incorporate a 45-degree chamfered corner (`clip-path: polygon(...)`) measuring exactly `8px by 8px` on the top-right corner to indicate modular hardware panels.
- Division lines must be sharp, 1px lines without anti-aliasing artifacts.

## Components

### Buttons
- **Primary Action (e.g., 'Execute Request', 'Download Resume PDF')**:
  - Background: `#6366F1`.
  - Border: 1px solid `#818CF8`.
  - Corner: 0px.
  - Text: `Space Mono`, bold uppercase, color `#FFFFFF`.
  - Hover: Background `#4F46E5`, `box-shadow: 0 0 16px rgba(99, 102, 241, 0.6)`.
  - Active: Scale translation of `1px 1px` with `#3730A3`.
- **Secondary / Ghost Button (e.g., 'View Spec', 'Cancel')**:
  - Background: `rgba(15, 23, 42, 0.8)`.
  - Border: 1px solid `#334155`.
  - Text: `Space Mono`, color `#94A3B8`.
  - Hover: Border `#38BDF8`, Text `#38BDF8`, `box-shadow: 0 0 12px rgba(56, 189, 248, 0.2)`.

### Form Fields & Inputs
- **Text Input & Selectors**:
  - Background: `#0B1120`.
  - Border: 1px solid `#334155`.
  - Font: `Space Mono`, 0.875rem, color `#F8FAFC`.
  - Focus Reticle: Border transitions to `#6366F1` with an inner glow `inset 0 0 4px rgba(99, 102, 241, 0.3)`.
  - Prefix/Affix: Fixed monospaced labels (e.g., `SYS://` or `AUTH >`) tinted `#0284C7`.

### Modals ('Request Full Access', 'System Export')
- Bounded viewport overlay: `rgba(11, 17, 32, 0.85)` with `backdrop-filter: blur(8px)`.
- Modal Frame: Surface `#0F172A`, 1px solid `#6366F1`, zero curves.
- Header: Technical bar styled with a top status pulse indicator, uppercase identifier (`[MODAL.AUTH_GATEWAY]`), and a sharp `[X]` terminate action.

### Status Badges & Chips
- Structure: Zero-radius box, `padding: 2px 8px`.
- Success (`Healthy/Verified`): Background `rgba(16, 185, 129, 0.1)`, Border `1px solid #10B981`, Text `#10B981`, with a `4px` square pulsing dot.
- Active Signal (`Processing/Sapphire`): Background `rgba(2, 132, 199, 0.1)`, Border `1px solid #0284C7`, Text `#38BDF8`.

### Data Tables & Cards
- **Cards**: Surface `#0F172A` with `1px solid #334155`. Top-left or top-right indicator tag embedded directly on the border stroke.
- **Tables**: Dense 36px row height, alternating row stripes using `rgba(30, 41, 59, 0.2)`. Cells separated by vertical 1px `#1E293B` rules. Header rows locked in `Space Grotesk` uppercase tracking with active sorting reticles.