refactor: separate transaction and recurrence data handling

- Fix PrismaClientValidationError by sanitizing data before transaction creation.
- Update TransactionService to properly handle one-time and recurring transactions.
- Fix logic bug in recurrence creation that blocked non-recurring transactions.
- Enhance TransactionWizard with improved recurrence selection flow.
- Sync shared schemas with new recurrence-related fields.
- Update Backend Agent documentation and API Implementation Guide with data sanitization and atomic operation standards.