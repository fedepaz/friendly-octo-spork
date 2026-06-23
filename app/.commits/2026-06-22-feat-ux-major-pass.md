feat(ux): major UX pass — SlideOver single close, StepReview response, dashboard deltas, DataTable search, a11y fixes

Collapse SlideOverForm to single footer close (hideDefaultClose on SheetContent).
Show CardCloseResponseDTO (accountName, closeBalance) in card close wizard review step.
Add loading.tsx skeleton to dashboard route.
Add real month-over-month cash flow delta to Patrimonio Neto KPI.
Rename "Proyección" → "Evolución" chart title.
Fix sidebar card height constraints (flex-1 min-h-0 instead of max-h-arbitrary).
Improve empty state in pendientes card ("Todo al día").
Auto-focus first interactive element in WizardModal (not close button).
Add role="dialog" aria-modal="true" to modal.
Elevate "Nueva Transacción" to primary, demote "Cierre Tarjeta" to outline.
Remove meaningless income/expense progress bars from KPI cards.
Wire globalFilter search input in DataTable toolbar.
Replace native <select> page size with branded button group.
Add role="tooltip" to chart tooltip.
Add Ctrl+N / Cmd+N keyboard shortcut for new transaction.
Brighter glow on current StepIndicator bar.
Update component registry doc.
