# Frontend Components Registry & QA Review

This document tracks all React components within the `apps/frontend/src` directory, ensuring they meet the project's industrial standards for responsiveness, color token usage, and high-performance UX patterns.

## Registry & Audit Log

| Component Name | Feature | Responsive | OKLCH Tokens | UX Helpers | Skeleton | Status |
| :--- | :--- | :---: | :---: | :---: | :---: | :---: |
| `Button` | UI Primitives | ✅ | ✅ | N/A | N/A | Approved |
| `DataTable` | Shared | ✅ | ✅ | ✅ | ✅ | Approved |
| `SlideOverForm`| Shared | ✅ | ✅ | ✅ | N/A | Approved |
| `LoginForm` | Auth | ✅ | ✅ | ✅ | N/A | Approved |
| `UserTable` | Users | ✅ | ✅ | ✅ | ✅ | Approved |

## Audit Checklist Details

### 1. Responsive (Zero-Scroll Mandate)
- [ ] Uses `dvh` for full-height layouts.
- [ ] High-density gaps (`gap-2` to `gap-4`) and padding (`p-3` to `p-4`).
- [ ] Adaptive layout shifts for tablet/desktop without increasing whitespace.

### 2. Color Tokens (OKLCH)
- [ ] No hardcoded colors (`#fff`, `rgb()`, `red-500`).
- [ ] Uses semantic variables (`bg-primary`, `text-foreground`).
- [ ] Correct opacity application (e.g., `border-border/60`).

### 3. UX Helpers & A11y
- [ ] Tooltips on icon-only buttons.
- [ ] Descriptive `aria-label` for screen readers.
- [ ] Functional `FormDescription` and `FormMessage` for all inputs.

### 4. Golden Path Loading
- [ ] Level 1: `loading.tsx` coverage for the route.
- [ ] Level 2: Component-level `<Suspense>` with matching `{ComponentName}Skeleton`.
