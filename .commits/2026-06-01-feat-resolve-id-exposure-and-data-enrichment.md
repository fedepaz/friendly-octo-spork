feat: resolve ID exposure and enrich data via backend relations

- Update RecurrenceRepository to include category and account relations.
- Expand RecurrenceDTO with optional relation objects for type safety.
- Update Transaction and Recurrence tables/forms to display names instead of IDs.
- Resolve account and category names in Transaction Wizard review step.
- Hide technical UUIDs from User and Account detail views for better UX.
- Fix backend type mismatch (Decimal to number) in RecurrenceService.
- Fix frontend null checks in RecurrenceViewForm for robust builds.