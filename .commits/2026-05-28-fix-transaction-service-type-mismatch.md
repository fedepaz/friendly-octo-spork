fix(backend): resolve TransactionDTO type mismatch in TransactionService

- Complete TransactionDTO mapping with missing sourceAccount, targetAccount, and recurrence.
- Ensure Prisma Decimal types (balance, amount) are converted to numbers in DTO mapping.
- Align TransactionService with the latest shared schema requirements.