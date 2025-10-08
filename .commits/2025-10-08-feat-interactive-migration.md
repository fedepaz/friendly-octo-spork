feat: Implement interactive data migration and category management

This commit introduces a powerful, interactive script for migrating data from spreadsheets, located at `finance-app/src/scripts/migracionInteractiva.ts`.

Key features of the script include:
- Interactive prompts for user guidance and confirmation.
- Automatic detection of spreadsheet structure and column mapping.
- Intelligent category management with suggestions and creation on-the-fly.
- Dynamic generation of Prisma schema models for newly discovered data columns.

Additionally, this commit refactors the database schema to introduce a dedicated `Category` model, establishing formal relations with expenses, payments, and budgets. The Docker environment has also been updated for a more streamlined development workflow. All documentation has been synchronized with these changes.
