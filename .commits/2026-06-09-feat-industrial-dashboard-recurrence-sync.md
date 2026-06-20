feat: industrial dashboard and smart recurrence tracking

- Backend: Added `GET /dashboard/toPay` to retrieve recurrences due and unpaid for the current month.
- Backend: Implemented `RecurrenceDashRepository` with optimized raw SQL for unpaid recurrence filtering.
- Backend: Fixed balance update logic in `TransactionService` to prevent double-updates for scheduled recurrences.
- Frontend: Connected `SidebarChartsRecentTransactions` to real data via `useRecurrencesToPay` hook.
- Frontend: Removed mock data from dashboard service and synchronized UI with `RecurrenceDTO` fields.
- Docs: Updated `database_workflow.md` to document the recurrence-to-pay filtering logic.
- Docs: Added `SidebarChartsRecentTransactions` to the industrial components registry.
