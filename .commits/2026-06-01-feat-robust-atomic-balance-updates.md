feat(backend): implement robust atomic balance updates for transactions

- Refactor TransactionService to orchestrate balance changes via $transaction.
- Extract balance logic into updateBalancesForType for improved readability.
- Add strict validation for required accounts based on transaction type.
- Optimize multi-account updates (Transfer/Investment) with Promise.all.
- Export AccountRepository for cross-module dependency injection.
- Update API guide with atomic cross-module update standards.