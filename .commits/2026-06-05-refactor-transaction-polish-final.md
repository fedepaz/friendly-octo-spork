refactor: polish transaction detail views and backend recurrence logic

Finalizes the transaction and recurrence data flow by adding missing UI 
metadata and centralizing recurrence state management in the backend.

- Frontend: Updated TransactionViewForm to show cardType, recurrence name, and frequency.
- Frontend: Updated RecurrenceViewForm to display cardType for recurring payments.
- Frontend: Refined StepReviewComponent to include Budget and Card Type summary.
- Backend: Centralized recurrence updates in RecurrenceService (removed redundant part stamping in TransactionService).
- UX: Cleaned up debug logs and ensured consistent badge styling across detail forms.