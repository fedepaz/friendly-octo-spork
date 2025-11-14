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

### Phase 2: Migrate the installments to recurrences

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
