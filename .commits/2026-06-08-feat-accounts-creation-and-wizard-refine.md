feat(accounts): implement account creation flow and wizard UI refinement

- Add AccountCreateForm component with shared Zod validation
- Implement useCreateAccount mutation hook with toast feedback
- Integrate creation flow into AccountDataTable via SlideOverForm
- Refactor WizardModal with Tailwind v4 linear gradients and industrial z-index
- Enforce Zero-Radius standard in account creation inputs
- Update component registry in docs/project-documentation/components-list.md