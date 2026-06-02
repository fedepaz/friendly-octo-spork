feat(backend): implement atomic account balance updates for transactions

- Export AccountRepository from AccountsModule.
- Refactor TransactionService to use Prisma transactions ($transaction).
- Automatically increment/decrement account balances based on transaction type.
- Ensure data consistency with "all-or-nothing" execution.
- Update api_implementation_guide.md to document the atomic update pattern.