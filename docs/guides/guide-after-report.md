This guide outlines a safe, phased strategy to migrate data from the `metadata` JSON field to dedicated columns.

-   **Read-Only Steps** (`Preview`, `Verify`) are presented as `sql` blocks. You can use the read-only query tool for these.
-   **Write Steps** (`Migrate and Cleanup`) are presented as `sh` blocks containing instructions to execute SQL via `docker exec` using a temporary file.

---

### Phase 1: Card Type (Lowest Risk - 404 records)

**1. Preview Data**
```sql
SELECT
    id,
    date,
    description,
    metadata->>'card_type' as old_card_type,
    "cardType" as current_card_type
FROM "Transaction"
WHERE metadata->>'card_type' IS NOT NULL
LIMIT 10;
```

**2. Migrate and Cleanup**
*Note on Enum Cases:* The `CASE` statement below handles expected values. If a `card_type` exists in the metadata that is not listed (e.g., 'Diners Club'), its new `"cardType"` will be set to `NULL`. The preview step helps find these values beforehand.

```sh
# To execute this migration, follow these steps:

# Step 1: Create a temporary SQL file with the migration script.
# You can save the following content to a file, for example: .gemini/tmp/phase1_migration.sql
#
# BEGIN;
#
# -- Step 1: Update the new column from the metadata
# UPDATE "Transaction"
# SET "cardType" = CASE
#     WHEN metadata->>'card_type' = 'Visa' THEN 'VISA'::"CardType"
#     WHEN metadata->>'card_type' = 'Mastercard' THEN 'MASTERCARD'::"CardType"
#     WHEN metadata->>'card_type' = 'Amex' THEN 'AMEX'::"CardType"
#     WHEN metadata->>'card_type' = 'Maestro' THEN 'MAESTRO'::"CardType"
# END
# WHERE metadata->>'card_type' IS NOT NULL;
#
# -- Step 2: Remove the key from metadata to mark it as migrated
# UPDATE "Transaction"
# SET metadata = metadata - 'card_type'
# WHERE metadata ? 'card_type';
#
# COMMIT;

# Step 2: Execute the migration script by piping it to psql inside the Docker container.
# Replace '.gemini/tmp/phase1_migration.sql' with the actual path to your temporary file.
cat .gemini/tmp/phase1_migration.sql | docker exec -i finance-app-db psql -U user -d finance-app

# Step 3: (Optional) Remove the temporary SQL file after successful execution.
# rm .gemini/tmp/phase1_migration.sql
```

**3. Verify**
```sql
SELECT "cardType", COUNT(*)
FROM "Transaction"
WHERE "cardType" IS NOT NULL
GROUP BY "cardType";
-- Expected: VISA=309, MASTERCARD=95, etc.
```

---

### Phase 2: Boolean Flags (1,429 records)

**1. Migrate and Cleanup**
```sh
# To execute this migration, follow these steps:

# Step 1: Create a temporary SQL file with the migration script.
# You can save the following content to a file, for example: .gemini/tmp/phase2_migration.sql
#
# BEGIN;
#
# -- is_card_expense (643 records)
# UPDATE "Transaction"
# SET "isCardExpense" = (metadata->>'is_card_expense')::boolean
# WHERE metadata->>'is_card_expense' IS NOT NULL;
#
# -- is_budgeted_expense (786 records)
# UPDATE "Transaction"
# SET "isBudgetedExpense" = (metadata->>'is_budgeted_expense')::boolean
# WHERE metadata->>'is_budgeted_expense' IS NOT NULL;
#
# -- Cleanup
# UPDATE "Transaction"
# SET metadata = metadata - 'is_card_expense' - 'is_budgeted_expense'
# WHERE metadata ? 'is_card_expense' OR metadata ? 'is_budgeted_expense';
#
# COMMIT;

# Step 2: Execute the migration script by piping it to psql inside the Docker container.
# Replace '.gemini/tmp/phase2_migration.sql' with the actual path to your temporary file.
cat .gemini/tmp/phase2_migration.sql | docker exec -i finance-app-db psql -U user -d finance-app

# Step 3: (Optional) Remove the temporary SQL file after successful execution.
# rm .gemini/tmp/phase2_migration.sql
```

**2. Verify**
```sql
-- Verify isCardExpense
SELECT "isCardExpense", COUNT(*)
FROM "Transaction"
WHERE "isCardExpense" IS NOT NULL
GROUP BY "isCardExpense";

-- Verify isBudgetedExpense
SELECT "isBudgetedExpense", COUNT(*)
FROM "Transaction"
WHERE "isBudgetedExpense" IS NOT NULL
GROUP BY "isBudgetedExpense";
```

---

### Phase 3: Budget Category (786 records)

**1. Preview All Values First**
```sql
SELECT DISTINCT
    metadata->>'budget_category' as raw_value,
    COUNT(*)
FROM "Transaction"
WHERE metadata->>'budget_category' IS NOT NULL
GROUP BY metadata->>'budget_category';
```

**2. Migrate and Cleanup**
```sh
# To execute this migration, follow these steps:

# Step 1: Create a temporary SQL file with the migration script.
# You can save the following content to a file, for example: .gemini/tmp/phase3_migration.sql
#
# BEGIN;
#
# -- Update based on previewed values
# UPDATE "Transaction"
# SET "budgetCategory" = CASE
#     WHEN metadata->>'budget_category' = 'Daily Expenses' THEN 'DAILY_EXPENSES'::"BudgetCategory"
#     WHEN metadata->>'budget_category' = 'Food/Groceries' THEN 'FOOD_GROCERIES'::"BudgetCategory"
#     -- Add other categories as they appear in your preview
# END
# WHERE metadata->>'budget_category' IS NOT NULL;
#
# -- Cleanup
# UPDATE "Transaction"
# SET metadata = metadata - 'budget_category'
# WHERE metadata ? 'budget_category';
#
# COMMIT;

# Step 2: Execute the migration script by piping it to psql inside the Docker container.
# Replace '.gemini/tmp/phase3_migration.sql' with the actual path to your temporary file.
cat .gemini/tmp/phase3_migration.sql | docker exec -i finance-app-db psql -U user -d finance-app

# Step 3: (Optional) Remove the temporary SQL file after successful execution.
# rm .gemini/tmp/phase3_migration.sql
```

**3. Verify**
```sql
SELECT "budgetCategory", COUNT(*)
FROM "Transaction"
WHERE "budgetCategory" IS NOT NULL
GROUP BY "budgetCategory";
-- Expected: DAILY_EXPENSES=419, FOOD_GROCERIES=367, etc.
```

---

### Phase 4: Income Source (690 records)

**1. Preview Variety**
```sql
SELECT
    metadata->>'source' as source_value,
    COUNT(*),
    MIN(date) as first_occurrence,
    MAX(date) as last_occurrence
FROM "Transaction"
WHERE metadata->>'source' IS NOT NULL
GROUP BY metadata->>'source'
ORDER BY COUNT(*) DESC;
```

**2. Migrate and Cleanup**
```sh
# To execute this migration, follow these steps:

# Step 1: Create a temporary SQL file with the migration script.
# You can save the following content to a file, for example: .gemini/tmp/phase4_migration.sql
#
# BEGIN;
#
# -- Update
# UPDATE "Transaction"
# SET "source" = metadata->>'source'
# WHERE metadata->>'source' IS NOT NULL;
#
# -- Cleanup
# UPDATE "Transaction"
# SET metadata = metadata - 'source'
# WHERE metadata ? 'source';
#
# COMMIT;

# Step 2: Execute the migration script by piping it to psql inside the Docker container.
# Replace '.gemini/tmp/phase4_migration.sql' with the actual path to your temporary file.
cat .gemini/tmp/phase4_migration.sql | docker exec -i finance-app-db psql -U user -d finance-app

# Step 3: (Optional) Remove the temporary SQL file after successful execution.
# rm .gemini/tmp/phase4_migration.sql
```

**3. Verify**
```sql
SELECT COUNT(*)
FROM "Transaction"
WHERE "source" IS NOT NULL;
-- Expected: 690
```

---

### Final Check

After completing all phases, run this to see what's left in the `metadata` column. The goal is to only have `installment_number` and `total_installments` remaining.

```sql
SELECT
    COUNT(*) as remaining_with_metadata,
    COUNT(*) FILTER (WHERE metadata ? 'installment_number') as with_installments,
    COUNT(*) FILTER (WHERE metadata ? 'total_installments') as with_total_installments
FROM "Transaction"
WHERE metadata IS NOT NULL AND metadata::text != '{}'::text;
```