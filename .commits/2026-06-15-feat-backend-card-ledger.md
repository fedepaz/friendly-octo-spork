feat(backend): implement card ledger logic and monthly statement query

- Create complex $queryRaw in CardRepository to calculate the "Debt Gap"
- Implement running balance calculation via SQL window functions
- Union card recurrences, one-time expenses, and payments into a single ledger
- Refactor CardTransactions types for consistency across the module
- Update Service and Controller to reflect repository architectural changes
