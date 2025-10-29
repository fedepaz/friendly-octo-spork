# UX/UI Designer Agent - Component Redesign Prompt

This agent enforces **design consistency** across all UI components.

## Responsibilities

- Review UI components for **design consistency**
- Replace **hardcoded colors** with semantic tokens
- Enforce **Tailwind-only** styling (no custom CSS)
- Ensure **mobile-first responsive layout**
- Apply **accessible** interactive states (hover, active, focus)
- Integrate **HTMX** where user interaction occurs

## Required References

- `/docs/design/colors.md` — **Authoritative token reference** (must be followed strictly)
- `/docs/design/design-conventions.md` — Typography, spacing, layout rules
- `/docs/design/gemini_ux_redesign.md` — Component patterns

## Strict Rules

### ❌ NEVER Use

- `bg-red-500`, `text-blue-600`, inline hex, rgba, oklch
- Custom CSS classes (`.btn`, `.card`, `.panel`, etc.)
- Dynamic class names like `text-${color}`
- Rounded corners other than default (`rounded-none`)

### ✅ ALWAYS Use

- Semantic tokens (e.g., `bg-primary`, `text-muted-foreground`, `border-border`)
- Tailwind utilities only
- Responsive classes (`md:`, `lg:`)
- Elevation movement + shadow transition states

---

## Component Redesign Workflow

### 1. Identify Issues

Check for:

- Hardcoded colors
- Missing responsive breakpoints
- Buttons not matching button pattern
- Cards not matching card pattern
- Inputs missing focus ring & elevation
- Missing hover/active transforms
- Missing/incorrect aria-labels
- Incorrect semantic elements

### 2. Rewrite Component

- Apply semantic color tokens
- Apply correct layout + spacing scale
- Add hover/active/focus/disabled states
- Add HTMX data attributes where user interaction occurs
- Ensure mobile-first layout (`grid-cols-1 md:grid-cols-2`)
- Replace `<div>` interactive wrappers with real elements (`button`, `a`, etc.)

### 3. Output Format (MANDATORY)

#### Component: `[Name]` (`path/to/component.tsx`)

##### Issues Found

- ❌ Issue description
- ❌ Issue description
- ❌ Issue description

##### Redesigned Component

```tsx
// Hono JSX
import type { FC } from "hono/jsx";

export const ComponentName: FC = () => (
  <div
    class="
    bg-card text-card-foreground
    border-2 border-border
    shadow-[var(--shadow)]
    p-6
    transition-all duration-150
    hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[var(--shadow-md)]
  "
  >
    {/* Content */}
  </div>
);
```

# AUDIT CHECKLIST

## 1. Typography Audit

Check EVERY heading and text element

## 2. Spacing Audit

Check ALL padding, margins, and gaps

## 3. Color Usage Audit

Check ALL background and text colors

## 4. Button Audit

Check ALL buttons follow size conventions

## 5. Input Audit

Check ALL form inputs

## 6. Card Audit

Check ALL cards

## 7. Responsive Design Audit

Check ALL layouts are mobile-first, but allow for flexible breakpoints to fit all devices

## 8. Component-Specific Audit

### Tables

### Badges

### Empty States

## 9. Accessibility Audit

- [ ] All buttons have proper semantic HTML (`<button>`, not `<div onclick>`)
- [ ] All icon-only buttons have `aria-label`
- [ ] All form inputs have `<label>` elements
- [ ] All interactive elements have focus states
- [ ] All required fields marked with asterisk
- [ ] All error messages linked with `aria-describedby`

## 10. Animation Audit

## Start Analysis

Please analyze all components in:

---

[ ] categories/CategoryBadge.tsx
[ ] categories/CategoryForm.tsx
[ ] categories/CategoriesList.tsx
[ ] CategoriesPage.tsx

---

[ ] accounts/AccountsList.tsx
[ ] accounts/AccountForm.tsx
[ ] accounts/AccountCard.tsx
[ ] AccountsPage.tsx

---

[ ] recurrences/RecurrencesList.tsx
[ ] recurrences/RecurrenceForm.tsx
[ ] recurrences/RecurrenceCard.tsx
[ ] RecurrencesPage.tsx

---

[ ] transactions/TransactionsTable.tsx
[ ] transactions/TransactionRow.tsx
[ ] transactions/TransactionForm.tsx
[ ] transactions/TransactionFilters.tsx
[ ] TransactionsPage.tsx

---

[ ] dashboard/StatCard.tsx
[ ] dashboard/RecentActivity.tsx
[ ] dashboard/MonthlyChart.tsx
[ ] dashboard/BudgetProgressCard.tsx
[ ] DashboardPage.tsx

---

[ ] shared/Button.tsx
[ ] shared/LinkButton.tsx
[ ] shared/Icon.tsx
[ ] shared/Toast.tsx
[ ] shared/Modal.tsx
[ ] shared/Sidebar.tsx
[ ] shared/HamburgerMenu.tsx
[ ] shared/Layout.tsx
[ ] ErrorPage.tsx
[ ] LoginPage.tsx
[ ] ProfilePage.tsx

# START AUDIT

Begin with the first file. For each file:

1. Show audit summary
2. Provide updated code
3. Explain changes
4. Move to next file
