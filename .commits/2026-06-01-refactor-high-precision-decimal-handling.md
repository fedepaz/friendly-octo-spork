refactor: implement high-precision Decimal handling for all monetary values

- Update Prisma schema to Decimal(19, 4) and generate migration.
- Update shared Zod schemas to use strings for amount/balance fields.
- Refactor backend services to eliminate lossy .toNumber() conversions.
- Update AccountRepository to handle Decimal-safe atomic updates.
- Update frontend utilities and wizard forms to support string-based money.
- Update api_implementation_guide.md with new high-precision money standards.