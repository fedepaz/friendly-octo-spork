feat(backend): refactor schema to CUIDs and implement Users module

- Consolidate database schema: transition all primary/foreign keys from Serial to CUID (VARCHAR 36).
- Standardize field limits using VARCHAR (e.g., name: 100, email: 150) for performance and safety.
- Implement Users module (Controller, Service, Repository) to handle profile and list logic.
- Standardize error handling: replace generic Errors with NestJS exceptions (BadRequest, NotFound).
- Update prisma/seed.ts to support CUIDs and use the native PostgreSQL adapter.
- Clean up redundant migrations and squash into a single initial state.
- Align @repo/shared schemas with the refactored user profile and authentication flow.
