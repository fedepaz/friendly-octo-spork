refactor: backend transaction pre-validation and service extraction

- Move source and target account pre-fetching outside of Prisma transaction block
- Introduce pre-transaction validation of account types using validateAccountTypesForTransaction
- Declare validation constants at module-level to avoid class-scoping complexity
- Consolidate transaction type cases inside updateBalancesForType, passing only sourceAccount
- Bypass card balance updates for CARD accounts under EXPENSE and PAYMENT types
