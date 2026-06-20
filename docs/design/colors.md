// docs/design/colors.md

# Design Convention: Doom 64 / Tweakcn Theme

This project uses a **semantic OKLCH-based Tailwind theme** inspired by the "Doom 64" aesthetic. All visual styling is governed by CSS variables that prioritize high contrast and industrial precision.

## General Principles

- **Zero Radius**: All components MUST have 100% flat corners (`--radius: 0px`).
- **Tactical Depth**: Depth is achieved via a complex 7-level shadow system, not rounding.
- **Oxanium Foundation**: The `Oxanium` font is the primary sans typeface, providing a tech-futuristic look.
- **Industrial Contrast**: Colors are high-impact and strictly semantic.

---

## Typography

This project utilizes `next/font/google` to optimize font loading and prevent layout shift.

- **Primary (Sans)**: `Oxanium` - Used for all UI labels, headings, and interactive elements.
- **Secondary (Mono)**: `Source Code Pro` - Used for financial figures, codes, and data tables.

Variables are mapped via `RootLayout` using:
- `--font-oxanium` (applied as `font-sans`)
- `--font-mono`

---

## Token Categories

### Background & Core Tokens (OKLCH)

| Token                 | Purpose                           |
| --------------------- | --------------------------------- |
| `bg-background`       | Root industrial background        |
| `bg-card`             | Low-elevation container           |
| `bg-primary`          | High-impact action color          |
| `bg-secondary`        | Informational/Support color       |

### Shadow System

Depth is managed using the following tokens:
- `--shadow-2xs` to `--shadow-lg`: Tactical "etched" or "layered" effects.
- `--shadow-2xl`: Maximum elevation for modal layers.

---

## Component Construction Rules

| Element         | Rule                                                   |
| --------------- | ------------------------------------------------------ |
| Buttons         | 100% flat edges, hard shadows, Oxanium font.           |
| Cards           | Flat edges, subtle border, multi-level shadow depth.   |
| Inputs          | Minimal padding, focus ring with 0px radius.           |
| Tables          | High-density, mono font for numbers, no rounding.      |

---

## Accessibility

- Always use semantic HTML elements (`button`, `label`, `nav`, `main`)
- Icon-only controls **must** include `aria-label=""`
- Focus states must be visible and use `ring-ring` or shadow elevation
