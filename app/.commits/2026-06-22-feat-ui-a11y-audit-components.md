feat(ui): add a11y labels, fix false affordance, rewrite component audit doc

- Add aria-label="Cerrar" to SlideOverForm close button
- Add role="alert" to InLineError and SmartFormProvider error block
- Add role="progressbar" with aria attrs to StepIndicator
- Remove cursor-pointer from non-clickable div in SidebarChartsAccounts
- Fix invalid Tailwind v4 widths in DataTableSkeleton
- Rewrite components-list.md with 9-column checklist and audit dates
- Remove WizardModalRecurrence, CardSummaryKPIs, duplicate MonthSelector
