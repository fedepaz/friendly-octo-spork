feat(frontend): implement global wizard orchestration and refined recurrence payment

- Create WizardFormProvider to eliminate prop drilling across the dashboard
- Refactor recurrence payment wizard with async data pre-filling and reference views
- Implement 'shouldStopRecurrence' flag in backend and shared schemas
- Optimize wizard routing utility to support multiple configurations
- Enhance StepRecurrence and StepBudget with tactical reference info
- Fix submission logic in wizard footer using standard HTML submit triggers
