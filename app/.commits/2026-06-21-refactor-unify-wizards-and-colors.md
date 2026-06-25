refactor(ui): unify wizard modals and replace hardcoded colors with semantic tokens

Extract WizardModal, StepIndicator, WizardFooter, InLineError, and
WizardStepSkeleton to shared components/ui/. Replace 17 hardcoded
emerald/rose color occurrences with semantic text-secondary and
text-destructive tokens. Delete dead useStepValidation.ts.
