docs(db): define and document database-level CRUD workflows

Establishes a definitive, database-centric guide for all Create, Read, and Update operations in `docs/guides/database_workflow.md`. This guide is derived directly from the database schema's relational structure and project requirements.

Key points established in the new guide:
- Defines a "Read" workflow that mandates filtering by `userId`.
- Clarifies the distinction between simple CRUD for foundational tables (e.g., Category) and complex, atomic transactions for financial events (e.g., Transaction, Account).
- Explicitly states that user-initiated record deletion is not permitted, ensuring a permanent and unaltered financial history.

refactor(ui): align components with data types and htmx patterns

This commit also includes several refactorings and fixes across the UI components to ensure consistency and correct behavior:
- Correctly handles Prisma's `Decimal` type by casting to `Number` for comparisons and display in `AccountCard`.
- Standardizes HTMX event handling by replacing `onClick` with `hx-on:click` in forms.
- Updates sidebar navigation to remove the defunct "Profile" link and corrects the "Expenses" link to point to the unified `/transactions` page.
- Refines component prop types for better type safety.