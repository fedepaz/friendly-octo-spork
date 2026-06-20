refactor: implement advanced recurrence logic and dynamic wizard steps

Refactors the transaction creation flow to handle complex installments,
conditional budget steps, and improved error reporting.

- Backend: Implemented atomic recurrence updates and nextDate calculation in RecurrenceService.
- Backend: Enforced account type constraints (no direct income to CARD accounts).
- Frontend: Added StepBudgetComponent and dynamic step navigation in FormContainer.
- Frontend: Implemented InLineError component for surgical field feedback.
- Shared: Enhanced transactionSchema with robust cross-field validation for cards and recurrences.