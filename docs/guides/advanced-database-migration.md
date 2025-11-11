# Advanced Database Migration Guide

This guide covers advanced database migration procedures, including manual backups and complex schema changes.

## Step 1: Create a Database Backup

Before performing any migration, it is crucial to create a backup of your database. This ensures that you can restore your data in case of any issues during the migration process.

Since the database is running inside a Docker container, you can create a backup without installing any tools on your local machine by using the following command:

```bash
docker compose -f docker/docker-compose.yml exec -T db pg_dump -U user -d finance-app > finance-app/backup_before_any_migration.sql
```

This command does the following:

- `docker compose -f docker/docker-compose.yml exec -T db`: Executes a command inside the `db` service defined in your `docker-compose.yml` file.
- `pg_dump -U user -d finance-app`: The command to be executed, which dumps the content of the `finance-app` database with the user `user`.
- `> finance-app/backup_before_any_migration.sql`: Redirects the output of the `pg_dump` command to a file named `backup_before_any_migration.sql` inside the `finance-app` directory.
  **Note:** From here !!!!

---

---

---

Comprehensive Database Migration Plan

This guide outlines a phased approach to safely update your database schema to match the target schema (schema copy.prisma). Each step includes the necessary schema changes, migration
commands, and data backfilling scripts.

Overall Strategy: We will perform the migration in 7 distinct steps, ordered by complexity and risk. This minimizes the chance of data corruption and allows for verification at each stage.

---

- [ ] **Step 1: Foundational Timestamps & Precision (Lowest Risk)**

- Why: Establish audit trails on all models and ensure correct decimal precision for financial values. This is a non-destructive change.
- Schema Changes (`schema.prisma`):
  1.  In the User model, add the createdAt and updatedAt fields.
  2.  In the Account model, modify the balance field to be @db.Decimal(15, 2).
- Migration Command:
  1 bunx prisma migrate dev --name feat-add-timestamps-and-precision
- Data Backfill (SQL): After the migration, run this to populate the new timestamp columns for existing records.

1 -- Backfill timestamps for existing User records
2 UPDATE "User" SET "createdAt" = NOW(), "updatedAt" = NOW() WHERE "createdAt" IS NULL;

---

- [ ] **Step 2: Add Indexes & Unique Constraints (Low Risk)**

- Why: Improve query performance and enforce data integrity by preventing duplicates. This has no impact on existing data.
- Schema Changes (`schema.prisma`):
  1.  In the Category model, add @@unique([userId, name]).
  2.  Add all other @@index attributes from schema copy.prisma to their respective models (Account, Recurrence, Transaction).
- Migration Command:
  1 bunx prisma migrate dev --name feat-add-indexes-and-constraints
- Verification (SQL): You can check that the indexes were created correctly with this query.

1 SELECT tablename, indexname FROM pg_indexes
2 WHERE tablename IN ('User', 'Account', 'Category', 'Recurrence', 'Transaction');

---

- [ ] **Step 3: Introduce New Enums & Simple Transaction Fields (Low-Medium Risk)**

- Why: Add new categorization fields to the Transaction model. These are simple to backfill with default values.
- Schema Changes (`schema.prisma`):
  1.  Create the new BudgetCategory and CardType enums.
  2.  In the Transaction model, add the fields: isBudgetedExpense, budgetCategory, isCardExpense, and cardType.
- Migration Command:
  1 bunx prisma migrate dev --name feat-add-budget-and-card-types
- Data Backfill (SQL):

1 -- Default all existing transactions to non-budgeted
2 UPDATE "Transaction" SET "isBudgetedExpense" = false WHERE "isBudgetedExpense" IS NULL;
3
4 -- Example: Set cardType for transactions where metadata suggests a card was used
5 UPDATE "Transaction"
6 SET "cardType" = 'VISA'
7 WHERE "metadata"::text ILIKE '%visa%' AND "cardType" IS NULL;

---

- [ ] **Step 4: Implement Data Integrity Rules (`onDelete`) (Medium Risk)**

- Why: This is a critical step to prevent orphaned records when data is deleted. It defines how the database should behave when a related record is removed.
- 🔥 WARNING: This change alters data integrity rules. Test cascade deletes in a staging environment before applying to production.
- Schema Changes (`schema.prisma`):
  1.  Update all relations in Account, Category, Recurrence, and Transaction to match the onDelete rules from schema copy.prisma (e.g., onDelete: Cascade for user relations, onDelete: SetNull
      for optional relations).
- Migration Command:
  1 bunx prisma migrate dev --name feat-add-ondelete-rules

---

- [ ] **Step 5: Enhance Recurrence Model (Part 1 - Metadata & Relations)**

- Why: Add foundational fields to the Recurrence model that can be backfilled from existing transaction data, making it more descriptive.
- Schema Changes (`schema.prisma`):
  1.  In the Recurrence model, add: metadata, isCardExpense, cardType, categoryId, sourceAccountId, and targetAccountId.
  2.  Add the corresponding @relation attributes for the new ID fields.
- Migration Command:
  1 bunx prisma migrate dev --name feat-enhance-recurrence-metadata
- Data Backfill (SQL):

1 -- Propagate card flags from transactions to their parent recurrences
2 UPDATE "Recurrence" r
3 SET
4 "isCardExpense" = true,
5 "cardType" = t."cardType"
6 FROM "Transaction" t
7 WHERE t."recurrenceId" = r.id
8 AND t."isCardExpense" = true
9 AND r."isCardExpense" = false; -- Only update if not already set

---

- [ ] **Step 6: Enhance Recurrence Model (Part 2 - Financials & Terms) (High Risk)**

- Why: This is a major step that turns Recurrence into a first-class financial entity with its own amount and schedule. The data backfilling is complex and based on estimations from existing
  data.
- Schema Changes (`schema.prisma`):
  1.  In the Recurrence model, add: type, amount, totalParts, currentPart, and endDate.
- Migration Command:
  1 bunx prisma migrate dev --name feat-add-recurrence-financials
- Data Backfill (SQL):


    1     -- Backfill 'amount' as the average of its associated transactions
    2     UPDATE "Recurrence" r
    3     SET amount = (SELECT AVG(amount) FROM "Transaction" t WHERE t."recurrenceId" = r.id)
    4     WHERE r.amount IS NULL;
    5
    6     -- Backfill 'type' as the most frequent transaction type
    7     UPDATE "Recurrence" r
    8     SET type = (
    9       SELECT type FROM "Transaction" t WHERE t."recurrenceId" = r.id

10 GROUP BY type ORDER BY COUNT(*) DESC LIMIT 1
11 )
12 WHERE r.type IS NULL;

---

- [ ] **Step 7: Finalize Transaction-Recurrence Link (Highest Risk)**

- Why: Create a tight, two-way binding between individual transactions and their parent recurrence, including part numbers and sources.
- Schema Changes (`schema.prisma`):
  1.  In the Transaction model, add recurrencePartNumber and source.
- Migration Command:
  1 bunx prisma migrate dev --name feat-finalize-transaction-recurrence-link
- Data Backfill (SQL):


    1     -- Backfill recurrencePartNumber by ordering transactions by date
    2     WITH ordered_transactions AS (
    3       SELECT
    4         id,
    5         ROW_NUMBER() OVER (PARTITION BY "recurrenceId" ORDER BY date ASC) AS part_number
    6       FROM "Transaction"
    7       WHERE "recurrenceId" IS NOT NULL
    8     )
    9     UPDATE "Transaction" t

10 SET "recurrencePartNumber" = ot.part_number
11 FROM ordered_transactions ot
12 WHERE t.id = ot.id;

---

Final Post-Migration Checklist

- [ ] **1. Regenerate Prisma Client:**
    1 bunx prisma generate
- [ ] **2. Update Application Code:**
- [ ] **3. Review & Test:**

---
---

## Migration Log

A log to track attempts, issues, and their resolutions during the migration process.

---
**Attempt #1:**

- **Goal:**
- **Issue:**
- **Resolution:**

---