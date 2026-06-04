refactor: implement "Smart Form" pattern for transaction creation

Refactors the transaction creation flow into a modular "Smart Form" 
architecture using a specialized `SmartFormProvider`, `FormContainer`, 
and step-based validation. This decouples step logic and ensures 
strict validation before progression.

- Introduced `SmartFormProvider` and `FormContainer`.
- Implemented `useStepValidation` with conditional recurrence logic.
- Modularized steps into `steps/` directory and moved to `useFormContext`.
- Implemented automated "Smart Card Detection" in account selection.
- Cleaned up legacy card fields in backend `TransactionService`.
- Added initial "Smart Form" pattern documentation.
