feat(data-migration): Implement new Prisma schema and migrate financial data

This commit introduces a comprehensive data migration solution to transition
existing financial data from JSON files into the new PostgreSQL database
schema, defined using Prisma.

Key changes include:
- **Prisma Schema Evolution:** Updated `finance-app/prisma/schema.prisma` to
  incorporate new models (Account, Recurrence) and revised relationships
  between User, Category, and Transaction. This significantly alters the
  application's data structure, impacting data storage, retrieval, and
  search patterns.
- **Automated SQL Migration Script Generation:** Developed a process to
  generate SQL migration scripts for each month's financial data from
  JSON files. These scripts, located in `finance-app/sql_migrations/`,
  contain `INSERT` statements for categories and transactions, and `UPDATE`
  statements for account balances.
- **`migrate.ts` Script Enhancement:** Modified `finance-app/src/scripts/migrate.ts`
  to explicitly include `currency: 'ARS'` during transaction and balance
  creation, ensuring consistent currency tagging for migrated data.

This migration is a foundational step towards a more structured and scalable
financial data management system.
