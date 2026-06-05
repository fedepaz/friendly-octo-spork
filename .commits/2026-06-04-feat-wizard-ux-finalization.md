refactor: finalize transaction wizard UX and close logic

Finalizes the "Smart Form" transaction wizard with improved navigation, 
automated detection logic, and bug fixes for the submission flow.

- Implemented wizard close functionality (onClose prop and auto-close on success).
- Resolved automatic submission bug by adding unique button keys and submission guards.
- Automated `isCardExpense` detection based on account selection.
- Refactored recurrence step to dynamically show Card Type selection.
- Cleaned up FormContainer by removing nested render functions and optimizing remounts.
- Corrected total step count and navigation logic in the wizard UI.
- Updated `useStepValidation` to handle conditional card field validation.
