fix: resolve wizard blockages via schema and navigation refinements

Stabilizes the Transaction Wizard by correcting Zod schema constraints and
refining the step-by-step navigation workflow.

- Shared: Added .optional() to nullable schema fields (cardType, budgetCategory, frequency) to prevent early validation failure in multi-step flow.
- Frontend: Refined FormContainer to conditionally skip and clear recurrence/budget steps based on transaction type.
- Frontend: Uncoupled Card Type selection from the Recurrence toggle in stepRecurrence-form.tsx for better visibility.
- Frontend: Corrected category name extraction in StepReviewComponent to prevent rendering crashes.
- Backend: Added safe fallbacks for installment part calculations in RecurrenceService.