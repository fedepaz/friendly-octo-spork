This guide outlines a safe, phased strategy to migrate data from the `metadata` JSON field to dedicated columns.

- **Read-Only Steps** (`Preview`, `Verify`) are presented as `sql` blocks. You can use the read-only query tool for these.

---

### Phase 1: Remove unnecessary values from metadata

**1. Preview Data**

```sql
SELECT
    COUNT(*) as remaining_with_metadata
    FROM "Transaction"
WHERE metadata IS NOT NULL;
```

**2. Clean up empty metadata objects**

This step removes metadata entries that are empty JSON objects (`{}`).

**2.1. Preview empty metadata objects**

```sql
SELECT COUNT(*) as empty_metadata_count FROM "Transaction" WHERE metadata = '{}'::jsonb;
```

**2.2. Set empty metadata to NULL**

This is a write operation. It will update the `metadata` field to `NULL` for all transactions where it is an empty JSON object.

```sh
# To execute this migration, follow these steps:

# Step 1: Create a temporary SQL file with the migration script.
# You can save the following content to a file, for example: .gemini/tmp/phase1_migration.sql
#
# BEGIN;
#UPDATE "Transaction" SET metadata = NULL WHERE metadata = '{}'::jsonb;
#
# COMMIT;

# Step 2: Execute the migration script by piping it to psql inside the Docker container.
# Replace '.gemini/tmp/phase1_migration.sql' with the actual path to your temporary file.
cat .gemini/tmp/phase1_migration.sql | docker exec -i finance-app-db psql -U user -d finance-app

# Step 3: Remove the temporary SQL file after successful execution.
# rm .gemini/tmp/phase1_migration.sql
```

### Phase 2: Migrate the installments to recurrences on August 2022

**1. Preview Data**

```sql
SELECT
    COUNT(*) as remaining_with_metadata
    FROM "Transaction"
WHERE metadata IS NOT NULL;
```

**2. Categorize installments**

This step categorizes installments as recurrences.

This section provides a more granular, month-by-month breakdown of which keys are present in the `metadata` field.

| Year | Month | Txns w/ Meta | `installment_number` | `total_installments` |
| :--- | :---- | :----------- | :------------------- | :------------------- |
| 2022 | 8     | 7            | 7                    | 7                    |
| 2022 | 9     | 15           | 15                   | 15                   |
| 2022 | 10    | 11           | 11                   | 11                   |
| 2022 | 11    | 9            | 9                    | 9                    |
| 2022 | 12    | 6            | 6                    | 6                    |
| 2023 | 1     | 31           | 31                   | 31                   |
| 2023 | 2     | 13           | 13                   | 13                   |
| 2023 | 3     | 22           | 22                   | 22                   |
| 2023 | 5     | 11           | 11                   | 11                   |
| 2023 | 9     | 11           | 11                   | 11                   |
| 2023 | 11    | 15           | 15                   | 15                   |
| 2023 | 12    | 3            | 3                    | 3                    |
| 2024 | 2     | 12           | 12                   | 12                   |
| 2024 | 3     | 13           | 13                   | 13                   |
| 2024 | 4     | 10           | 10                   | 10                   |
| 2024 | 5     | 9            | 9                    | 9                    |
| 2024 | 6     | 7            | 7                    | 7                    |
| 2024 | 7     | 11           | 11                   | 11                   |
| 2024 | 8     | 11           | 11                   | 11                   |
| 2024 | 9     | 14           | 14                   | 14                   |
| 2024 | 10    | 14           | 14                   | 14                   |
| 2024 | 11    | 12           | 12                   | 12                   |
| 2024 | 12    | 12           | 12                   | 12                   |
| 2025 | 1     | 10           | 10                   | 10                   |
| 2025 | 2     | 11           | 11                   | 11                   |
| 2025 | 3     | 10           | 10                   | 10                   |
| 2025 | 4     | 11           | 11                   | 11                   |
| 2025 | 5     | 7            | 7                    | 7                    |
| 2025 | 6     | 8            | 8                    | 8                    |
| 2025 | 7     | 7            | 7                    | 7                    |
| 2025 | 8     | 2            | 2                    | 2                    |
| 2025 | 9     | 9            | 9                    | 9                    |
| 2025 | 10    | 8            | 8                    | 8                    |

**3 Create all recurrences for August 2022**

This step creates a recurrence for each installment in August 2022.

```sh
# To execute this migration, follow these steps:

# Step 1: Create a temporary SQL file with the migration script.
# You can save the following content to a file, for example: .gemini/tmp/phase2_migration.sql
#
#BEGIN;
#
#-- Create Recurrences and link transactions for August 2022
#WITH august_transactions AS (
#  SELECT
#    id,
#    "description",
#    "amount",
#    "date",
#    "categoryId",
#    "sourceAccountId",
#    "targetAccountId",
#    "isCardExpense",
#    "cardType",
#    "type",
#    "userId",
#    (metadata->>'installment_number')::int as installment_number,
#    (metadata->>'total_installments')::int as total_installments
#  FROM "Transaction"
#  WHERE metadata IS NOT NULL
#    AND date >= '2022-08-01' AND date < '2022-09-01'
#    AND metadata ? 'installment_number'
#    AND metadata ? 'total_installments'
#),
#inserted_recurrences AS (
#  INSERT INTO "Recurrence" (
#    "userId",
#    "name",
#    "type",
#    "amount",
#    "frequency",
#    "totalParts",
#    "currentPart",
#    "startDate",
#    "nextDate",
#    "endDate",
#    "active",
#    "categoryId",
#    "sourceAccountId",
#    "targetAccountId",
#    "isCardExpense",
#    "cardType"
#  )
#  SELECT
#    "userId",
#    description,  -- Use transaction description as recurrence name
#    type,
#    amount,
#    'MONTHLY'::\"RecurrenceType\",
#    total_installments,
#    installment_number,  -- Set current part to the installment number
#    date - (installment_number - 1) * INTERVAL '1 month',  -- Backfill start date
#    CASE
#      WHEN installment_number < total_installments
#      THEN date + INTERVAL '1 month'  -- Next month if not complete
#      ELSE NULL  -- No next date if complete
#    END,
#    date + (total_installments - installment_number) * INTERVAL '1 month',  -- Calculate end date
#    CASE
#      WHEN installment_number < total_installments THEN true
#      ELSE false  -- Mark as inactive if this is the last installment
#    END,
#    categoryId,
#    sourceAccountId,
#    targetAccountId,
#    isCardExpense,
#    cardType
#  FROM august_transactions
#  RETURNING id, "name", "amount", "currentPart"
#)
#SELECT * FROM inserted_recurrences;
#
#-- Now link the transactions to their recurrences
#UPDATE "Transaction" t
#SET
#  "recurrenceId" = r.id,
#  "recurrencePartNumber" = (t.metadata->>'installment_number')::int
#FROM "Recurrence" r
#WHERE t.metadata IS NOT NULL
#  AND t.date >= '2022-08-01' AND t.date < '2022-09-01'
#  AND t.metadata ? 'installment_number'
#  AND t.metadata ? 'total_installments'
#  AND r."userId" = t."userId"
#  AND r."name" = t.description
#  AND r."amount" = t.amount
#  AND r."totalParts" = (t.metadata->>'total_installments')::int
#  AND r."currentPart" = (t.metadata->>'installment_number')::int;
#
#COMMIT;
#
# Step 2: Execute the migration script by piping it to psql inside the Docker container.
# Replace '.gemini/tmp/phase2_migration.sql' with the actual path to your temporary file.
cat .gemini/tmp/phase2_migration.sql | docker exec -i finance-app-db psql -U user -d finance-app

# Step 3: Remove the temporary SQL file after successful execution.
# rm .gemini/tmp/phase2_migration.sql
```

### Phase 3: Clean Up Migrated Metadata

This phase removes the now-redundant `installment_number` and `total_installments` keys from the `metadata` field of the transactions that were migrated in Phase 2. If removing these keys results in an empty metadata object (`{}`), the field will be set to `NULL`.

**1. Preview Metadata Cleanup for August 2022**

**1.1. Count transactions to be cleaned up**

This query counts how many transactions from August 2022 are linked to a recurrence and still have the installment metadata. These are the transactions we will clean up.

```sql
SELECT COUNT(*) as transactions_to_clean
FROM "Transaction"
WHERE date >= '2022-08-01' AND date < '2022-09-01'
  AND "recurrenceId" IS NOT NULL
  AND metadata ? 'installment_number'
  AND metadata ? 'total_installments';
```

**1.2. Preview how many will become NULL**

This query counts how many of the targeted transactions will have their `metadata` field set to `NULL` because it will be empty after removing the installment keys.

```sql
SELECT COUNT(*) as transactions_becoming_null
FROM "Transaction"
WHERE date >= '2022-08-01' AND date < '2022-09-01'
  AND "recurrenceId" IS NOT NULL
  AND metadata ? 'installment_number'
  AND metadata ? 'total_installments'
  AND (metadata #- '{installment_number}' #- '{total_installments}') = '{}'::jsonb;
```

**2. Execute Metadata Cleanup for August 2022**

This is a write operation. It will remove the `installment_number` and `total_installments` keys from the `metadata` of all migrated transactions in August 2022.

```sh
# To execute this migration, follow these steps:

# Step 1: Create a temporary SQL file with the migration script.
# You can save the following content to a file, for example: .gemini/tmp/phase3_cleanup.sql
#
# BEGIN;
#
# UPDATE "Transaction"
# SET metadata = CASE
#     WHEN (metadata #- '{installment_number}' #- '{total_installments}') = '{}'::jsonb THEN NULL
#     ELSE metadata #- '{installment_number}' #- '{total_installments}'
# END
# WHERE date >= '2022-08-01' AND date < '2022-09-01'
#   AND "recurrenceId" IS NOT NULL;
#
# COMMIT;

# Step 2: Execute the migration script by piping it to psql inside the Docker container.
# Replace '.gemini/tmp/phase3_cleanup.sql' with the actual path to your temporary file.
cat .gemini/tmp/phase3_cleanup.sql | docker exec -i finance-app-db psql -U user -d finance-app

# Step 3: Remove the temporary SQL file after successful execution.
# rm .gemini/tmp/phase3_cleanup.sql
```

### Migration Progress

- [x] August 2022 (Migrated & Reviewed)
- [x] September 2022 (Migrated & Reviewed)
- [x] October 2022 (Migrated & Reviewed)
- [x] November 2022 (Migrated & Reviewed)
- [x] December 2022 (Migrated & Reviewed)
- [x] January 2023 (Migrated & Reviewed)
- [x] February 2023 (Migrated & Reviewed)
- [x] March 2023 (Migrated & Reviewed)
- [x] May 2023 (Migrated & Reviewed)
- [x] September 2023 (Migrated & Reviewed)
- [x] November 2023 (Migrated & Reviewed)
- [x] December 2023 (Migrated & Reviewed)
- [x] February 2024 (Migrated & Reviewed)
- [x] March 2024 (Migrated & Reviewed)
- [x] April 2024 (Migrated & Reviewed)
- [x] May 2024 (Migrated & Reviewed)
- [x] June 2024 (Migrated & Reviewed)
- [x] July 2024 (Migrated & Reviewed)
- [x] August 2024 (Migrated & Reviewed)
- [x] September 2024 (Migrated & Reviewed)
- [x] October 2024 (Migrated & Reviewed)
- [x] November 2024 (Migrated & Reviewed)
- [x] December 2024 (Migrated & Reviewed)
- [x] January 2025 (Migrated & Reviewed)
- [x] February 2025 (Migrated & Reviewed)
- [x] March 2025 (Migrated & Reviewed)
- [x] April 2025 (Migrated & Reviewed)
- [x] May 2025 (Migrated & Reviewed)
- [x] June 2025 (Migrated & Reviewed)
- [x] July 2025 (Migrated & Reviewed)
- [x] August 2025 (Migrated & Reviewed)
- [x] September 2025 (Migrated & Reviewed)
- [x] October 2025 (Migrated & Reviewed)

### Phase 4: Migrate the installments to recurrences on following months

**1. Preview Data**

```sql
SELECT
    COUNT(*) as remaining_with_metadata
    FROM "Transaction"
WHERE metadata IS NOT NULL;
```

**2. Count transactions to be migrated**

This query shows cronologically the next 20 transactions with metadata that we will migrate.

```sql
SELECT * FROM "Transaction"
WHERE  metadata ? 'installment_number'
  AND metadata ? 'total_installments'
ORDER BY date ASC
LIMIT 20;
```

**3. Create or Update Recurrences for September 2022**

This script handles the migration for September 2022. It will:
- Find all installment transactions for the month.
- For transactions belonging to a recurrence created in a previous month (e.g., "calefactor"), it will `UPDATE` the existing recurrence record, **including updating its amount with the current transaction's amount.**
- For transactions that are the start of a new series (e.g., "borregos"), it will `INSERT` a new recurrence record.
- Finally, it will link all September installment transactions to their correct recurrence record.

```sh
# To execute this migration, follow these steps:

# Step 1: Create a temporary SQL file with the migration script.
# You can save the following content to a file, for example: .gemini/tmp/september_migration.sql
#
# BEGIN;
#
# -- Step 1: Create a CTE with all installment transactions for the target month.
# WITH target_transactions AS (
#   SELECT
#     id, description, amount, date, "categoryId", "sourceAccountId", "targetAccountId", "isCardExpense", "cardType", type, "userId",
#     (metadata->>'installment_number')::int as installment_number,
#     (metadata->>'total_installments')::int as total_installments
#   FROM "Transaction"
#   WHERE date >= '2022-09-01' AND date < '2022-10-01'
#     AND metadata ? 'installment_number'
# ),
#
# -- Step 2: Identify which transactions belong to existing recurrences (MATCHING WITHOUT AMOUNT).
# transactions_with_existing_recurrence AS (
#   SELECT
#     r.id as recurrence_id,
#     tt.id as transaction_id,
#     tt.installment_number,
#     tt.total_installments,
#     tt.date,
#     tt.amount -- Pass the transaction amount through for the update
#   FROM "Recurrence" r
#   JOIN target_transactions tt ON r.name = tt.description AND r."userId" = tt."userId" AND r."totalParts" = tt.total_installments -- Corrected: r."userId" and tt."userId"
# ),
#
# -- Step 3: Update the existing recurrences based on the matched transactions.
# update_existing_recurrences AS (
#   UPDATE "Recurrence" r
#   SET
#     amount = ter.amount, -- This line is new: it updates the recurrence amount
#     "currentPart" = ter.installment_number,
#     "nextDate" = CASE WHEN ter.installment_number < ter.total_installments THEN ter.date + INTERVAL '1 month' ELSE NULL END,
#     "active" = CASE WHEN ter.installment_number < ter.total_installments THEN true ELSE false END
#   FROM transactions_with_existing_recurrence ter
#   WHERE r.id = ter.recurrence_id
# ),
#
# -- Step 4: Identify transactions that need a NEW recurrence created.
# transactions_for_new_recurrence AS (
#   SELECT tt.*
#   FROM target_transactions tt
#   LEFT JOIN transactions_with_existing_recurrence ter ON tt.id = ter.transaction_id
#   WHERE ter.recurrence_id IS NULL
# ),
#
# -- Step 5: Insert the new recurrences.
# inserted_new_recurrences AS (
#   INSERT INTO "Recurrence" (
#     "userId", "name", "type", "amount", "frequency", "totalParts", "currentPart", "startDate", "nextDate", "endDate", "active", "categoryId", "sourceAccountId", "targetAccountId", "isCardExpense", "cardType"
#   )
#   SELECT
#     "userId", description, type, amount, 'MONTHLY', total_installments, installment_number,
#     date - (installment_number - 1) * INTERVAL '1 month',
#     CASE WHEN installment_number < total_installments THEN date + INTERVAL '1 month' ELSE NULL END,
#     date + (total_installments - installment_number) * INTERVAL '1 month',
#     CASE WHEN installment_number < total_installments THEN true ELSE false END,
#     "categoryId", "sourceAccountId", "targetAccountId", "isCardExpense", "cardType"
#   FROM transactions_for_new_recurrence
#   RETURNING "id", "name", "totalParts", "userId", "currentPart" -- Corrected: "userId"
# ),
#
# -- Step 6: Create a combined view of all recurrences (new and existing) to link back to transactions.
# all_recurrence_links AS (
#   SELECT transaction_id, recurrence_id, installment_number FROM transactions_with_existing_recurrence
#   UNION ALL
#   SELECT
#     tfnr.id as transaction_id,
#     inr.id as recurrence_id,
#     tfnr.installment_number
#   FROM transactions_for_new_recurrence tfnr
#   JOIN inserted_new_recurrences inr ON tfnr.description = inr.name AND tfnr."userId" = inr."userId" AND tfnr.total_installments = inr."totalParts" AND tfnr.installment_number = inr."currentPart" -- Corrected: tfnr."userId" and inr."userId"
# )
#
# -- Step 7: Final update to link ALL target transactions to their recurrence.
# UPDATE "Transaction" t
# SET
#   "recurrenceId" = arl.recurrence_id,
#   "recurrencePartNumber" = arl.installment_number
# FROM all_recurrence_links arl
# WHERE t.id = arl.transaction_id;
#
# COMMIT;

# Step 2: Execute the migration script by piping it to psql inside the Docker container.
# Replace '.gemini/tmp/september_migration.sql' with the actual path to your temporary file.
cat .gemini/tmp/september_migration.sql | docker exec -i finance-app-db psql -U user -d finance-app

# Step 3: Remove the temporary SQL file after successful execution.
# rm .gemini/tmp/september_migration.sql
```
