feat: Unify transaction handling and expand financial categories

Refactor transaction management to use a unified approach, replacing specific expense components with a more generic transaction model. This change introduces dedicated routes and components for various financial activities including incomes, expenses, transfers, investments, returns, and payments, aligning with the "one source of truth" philosophy.

- Removed redundant ExpenseForm, ExpenseList, and ExpenseRow components.
- Generalized TransactionForm for reuse across different transaction types.
- Updated Sidebar with new navigation links for all financial categories.
- Registered new API routes for incomes, investments, payments, returns, and transfers.
- Introduced TRANSACTION_INCLUDES and TransactionWithRelations in Prisma for consistent data fetching.
