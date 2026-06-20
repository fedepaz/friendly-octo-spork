refactor(frontend): centralize transaction wizard components and types

- Move FieldError to wizardModal.tsx for feature-wide reuse.
- Export Step type for improved component integration.
- Standardize imports across createTransaction step forms.
- Clean up unused prop destructuring in WizardModal.