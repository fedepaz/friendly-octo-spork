feat: implement atomic createTransaction with balance and recurrence updates

Implements the core write operation for the application, ensuring data integrity 
through atomic database transactions.

Key changes:
- Logic: Unified `createTransaction` in `TransactionsService` using `prisma.$transaction`.
- Balance Math: Automated increment/decrement of Account balances based on 
  transaction types (Income, Expense, Transfer, Investment, Return).
- Recurrences: Automatic advancement of recurrence parts and deactivation 
  upon completion.
- Repositories: Refactored Account, Transaction, and Recurrence repositories 
  to support transactional Prisma clients.
- Utilities: Added `date-utils.ts` for consistent recurrence date calculations.
- Security: Enforced `userId` filtering across all new logic and fixed 
  missing filters in Accounts and Recurrences services.
- API: Exposed `POST /api/transactions` with Zod validation and HTMX partial 
  rendering support.
