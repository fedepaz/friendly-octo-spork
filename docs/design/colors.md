// docs/design/colors.md

# Design Convention

This project uses a **semantic token-based Tailwind theme**. All visual styling comes from CSS variables bound to Tailwind utilities.

## General Principles

- The UI is **flat and structured**, with subtle depth via shadow tokens.
- Theme colors are **not hue-based** (no `red-500` or `blue-600`). They are **semantic**.
- Components must remain **theme-agnostic** and should not assume light or dark mode.
- **Rounded corners are minimal**, except for optional soft elements using radius tokens.

---

## Token Categories

### Background Tokens

| Token                 | Purpose                           |
| --------------------- | --------------------------------- |
| `bg-background`       | Root app background               |
| `bg-background-light` | Elevated near-surface background  |
| `bg-background-dark`  | Deep contrast sections            |
| `bg-card`             | Standard surface container        |
| `bg-popover`          | Floating surfaces                 |
| `bg-muted`            | Low-emphasis UI                   |
| `bg-accent-light`     | Soft highlight background         |
| `bg-accent-muted`     | Low chroma informational surfaces |

### Gradient Tokens

- `bg-gradient-primary`
- `bg-gradient-accent`

### Text Tokens

- `text-foreground`
- `text-muted-foreground`
- `text-muted-lighter`
- `text-muted-darker`
- `text-primary-foreground`
- `text-accent-foreground`
- `text-destructive-foreground`

### Interactive State Tokens

- `bg-primary`, `bg-primary-hover`, `bg-primary-active`
- `text-primary-hover`

### Border Tokens

- `border-border`
- `border-border-light`
- `border-border-dark`
- `border-light`
- `border-heavy`

### Shadow Tokens

- `shadow-[var(--shadow-sm)]`
- `shadow-[var(--shadow-md)]`
- `shadow-[var(--shadow-lg)]`
- `shadow-sm-light`
- `shadow-glow`

### Glass Morphism Tokens

- `glass-base` (semi-transparent background)
- `glass-border` (soft low-opacity border)
- `glass-blur` (`backdrop-blur-md` or `backdrop-blur-lg`)
- `shadow-glass` (diffuse shadow glow)

### Typography Tokens

- `font-weight-semibold`
- `font-style-italic`
- `text-base-md`
- `text-base-lg`
- `line-height-relaxed`
- `tracking-wide`

### Radius Tokens

- `radius-none` (default)
- `radius-sm`
- `radius-md`

### Animation & Transition Tokens

- `transition-fast`
- `transition-ease-in-out`
- `anim-fade-in`
- `anim-glow`

---

## Component Construction Rules

| Element         | Rule                                                   |
| --------------- | ------------------------------------------------------ |
| Buttons         | Must include hover + active transform + shadow changes |
| Cards           | Must include hover elevation + transition smoothness   |
| Inputs          | Must include focus ring, elevate slightly on focus     |
| Tables          | Use striping via muted backgrounds and border tokens   |
| Modals / Panels | Use glass tokens if floating, card tokens if stable    |

---

## Accessibility

- Always use semantic HTML elements (`button`, `label`, `nav`, `main`)
- Icon-only controls **must** include `aria-label=""`
- Focus states must be visible and use `ring-ring` or shadow elevation
