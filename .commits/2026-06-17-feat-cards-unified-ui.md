feat(cards): unify transactions and projections in monthly statement UI

- Refactored card API to return separate transactions and pending recurrences collections.
- Introduced CardStatementRow and mapping utilities to unify data types for the frontend DataTable.
- Fixed recurrence logic to correctly identify the final installment part during settlement.
- Updated shared Zod schemas to align with the new statement DTO structure.
- Refined Card UI columns with tactical icons for paid vs. pending status.
