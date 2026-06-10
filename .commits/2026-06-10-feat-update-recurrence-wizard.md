feat(frontend): implement update recurrence wizard and dashboard integration

- Create updateRecurrence module with multi-step wizard flow
- Integrate pay action from Recent Transactions sidebar to the new wizard
- Add SmartFormProviderRecurrence for atomic transaction creation from recurrences
- Define STEP_CONFIGS_RECURRENCE for specialized validation and routing
- Refactor RootDashboard to handle multiple concurrent wizard states
