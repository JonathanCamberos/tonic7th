---
name: Tonic 7th
colors:
  background: "#fdf7c7"
  surface: "#fffaf0"
  text: "#222222"
  muted: "#6b5e4c"
  border: "rgba(0, 0, 0, 0.08)"
  accent: "#333333"
typography:
  body:
    fontFamily: "Times New Roman, Times, serif"
    fontSize: "18px"
    lineHeight: "1.6"
    fontWeight: 400
  heading:
    fontFamily: "Times New Roman, Times, serif"
    fontSize: "32px"
    lineHeight: "1.2"
    fontWeight: 700
  subheading:
    fontFamily: "Times New Roman, Times, serif"
    fontSize: "22px"
    lineHeight: "1.3"
    fontWeight: 600
  label:
    fontFamily: "Times New Roman, Times, serif"
    fontSize: "14px"
    lineHeight: "1.4"
    fontWeight: 500
spacing:
  xs: "8px"
  sm: "12px"
  md: "16px"
  lg: "24px"
  xl: "32px"
rounded:
  sm: "10px"
  md: "18px"
  lg: "24px"
layout:
  contentWidth: "1000px"
  gutter: "16px"
  pagePadding: "16px"
components:
  card:
    background: "#fffaf0"
    border: "1px solid rgba(0, 0, 0, 0.08)"
    borderRadius: "18px"
    padding: "16px"
  navLink:
    color: "#222222"
    hoverColor: "#333333"
    textDecoration: "none"
---

# Design System

## Overview
Tonic 7th — Music Theory Roadmap is a warm, approachable learning app. It supports sheet music rendering, guided lessons, music theory exercises, and recorded MP3 playback with a calm, paper-inspired palette and serif typography.

## Philosophy
- Use a soft warm background to feel like sheet music on aged paper.
- Keep typography classic and grounded with serif text.
- Use a subtle border and light surface contrast for cards and panels.
- Preserve whitespace and centered content so lessons feel spacious and easy to scan.

## Colors
- **Background** (`#fdf7c7`): The main page backdrop, evoking a warm paper tone.
- **Surface** (`#fffaf0`): Card backgrounds and panels.
- **Text** (`#222222`): Primary content text for maximum legibility.
- **Muted** (`#6b5e4c`): Secondary text, captions, and low-priority labels.
- **Border** (`rgba(0, 0, 0, 0.08)`): Soft outlines on cards and containers.
- **Accent** (`#333333`): Active states, links, and strong typographic emphasis.

## Typography
- **Headlines**: Large serif headings that feel scholarly and elegant.
- **Body**: Serif body text with ample line height for readability across lesson content.
- **Labels**: Slightly smaller serif text for metadata, navigation, and in-panel notes.

## Spacing and Layout
- Use a consistent spacing scale: `8px`, `12px`, `16px`, `24px`, `32px`.
- Center content in a maximum width of `1000px` to support focused reading.
- Use `16px` page padding on mobile and desktop edges.
- Prefer column layouts with generous vertical rhythm rather than dense grids.

## Components
### Cards
- Background: `surface`
- Border: `1px solid border`
- Border radius: `18px`
- Padding: `16px`
- Use cards for lesson metadata, score previews, and grouped controls.

### Buttons
- Buttons should feel tactile and rounded, matching the existing lesson card radius.
- Use the core palette for button surfaces and text to stay consistent with the app.
- Primary actions may use dark text on a light surface or white text on a strong accent surface.
- The current app uses utility-based button styling, so these tokens are guidance for future centralization.

### Navigation
- Navigation links should be simple and text-based.
- Remove underlines and rely on color and hover state for affordance.
- Use `accent` for hover states and active items.

## Do's and Don'ts
- Do keep the interface warm, calm, and focused.
- Do use serif typography for both headings and body text.
- Do use the soft paper palette consistently across pages.
- Don't introduce loud or saturated colors outside the defined palette.
- Don't use sharp or aggressive corner styles; keep the edges soft.
- Don't overload a single screen with too many competing visual patterns.

## Notes for agents
- Respect token values exactly when generating components.
- Map new UI elements to the palette and spacing scale first.
- Prefer the serif text system, with `Times New Roman` as the default font family.
- If a screen needs an accent color beyond the palette, choose a muted warm tone rather than bright or neon hues.

## Extension guidance
This file is intentionally simple and extensible. Agents may add custom tokens under new keys such as `icon`, `shadow`, or `motion`, but the core palette, typography, spacing, and component rules should remain the source of truth.