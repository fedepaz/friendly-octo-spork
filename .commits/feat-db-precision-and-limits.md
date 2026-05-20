feat: enforce decimal precision and strict VARCHAR limits in database

Updates the Prisma schema and database to resolve precision issues and prevent storage bloat.

Key changes:
- Database: Updated `Transaction.amount` to `@db.Decimal(15, 2)` to fix giant trailing decimals.
- Constraints: Applied strict `@db.VarChar(N)` limits to all string fields across User, Account, Category, Recurrence, and Transaction models.
- Validation: Aligned Zod schemas (Account, Category, Transaction) with new database constraints to ensure application-level enforcement.
- Documentation: Updated `database_workflow.md` guide and agent profiles (Architect, Backend) to document these new precision and length standards.
- Migration: Generated and applied migration `20260520231208_enforce_precision_and_limits`.
