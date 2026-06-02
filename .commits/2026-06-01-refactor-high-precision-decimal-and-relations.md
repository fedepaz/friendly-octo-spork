refactor: implement high-precision Decimal handling and account relations

- Update Prisma schema to Decimal(19, 4) and generate migration.
- Update shared Zod schemas to use strings for all monetary fields.
- Expand AccountDTO with optional nested transaction relations.
- Refactor backend services (Account, Transaction, Recurrence) to use .toString().
- Implement recursive DTO mapping in AccountService for relational data.
- Enrich AccountRepository with relation payloads and Decimal-safe updates.
- Update frontend utilities and wizard forms to support string-based money.
- Update api_implementation_guide.md with new high-precision money standards.
- Add UI styles for PAYMENT transaction type.