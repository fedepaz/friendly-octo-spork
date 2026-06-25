feat(ui): refine OKLCH theme, add keyboard nav and cursor-pointer

- Tone down destructive dark, darken primary light for WCAG AA,
  soften secondary green to professional hue
- Add --warning token (replaces hardcoded text-amber-400)
- Add prefers-reduced-motion media query
- Add auto-focus + Escape key to WizardModal
- Add cursor-pointer to button base and all native buttons
- Add focus-visible:outline-2 to all interactive elements
- Remove 8 unused imports (AuthDashboard, card columns)
- Update design and UX agent docs
