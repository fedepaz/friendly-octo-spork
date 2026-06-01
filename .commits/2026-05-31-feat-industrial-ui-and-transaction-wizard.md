feat: industrial ui stabilization, backend reliability, and transaction wizard

Frontend:
- Implement TransactionWizard: a multi-step, industrial-styled form for transaction creation.
- Overhaul RootDashboard with industrial/Doom 64 aesthetic and Zero-Scroll patterns.
- Standardize typography and spacing tokens across data-table, view forms, and wizard.
- Refactor User profile view into modular UserViewForm component.
- Switch hardcoded oklch colors to CSS variables for theme consistency.
- Add high-density loading skeletons for the new wizard and dashboard components.

Backend:
- Refine transaction saving logic to handle isRecurrence and metadata defaults.
- Improve Prisma data consistency using Prisma.JsonNull for empty metadata.

Docs:
- Update components-list.md with TransactionWizard, dashboard, and layout components.
