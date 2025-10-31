You are a database migration specialist. Based on the provided configuration file that maps CSV columns to financial data types, generate PostgreSQL INSERT statements for each JSON file in the /json_structured_data/ folder.

# YOUR MISSION:

Your mission is to create a series of SQL files in the /finance-app/sql_migrations/ folder, following the provided configuration file and generating PostgreSQL INSERT statements for each JSON file in the /json_structured_data/ folder.

# DESIGN SYSTEM FILES:

You have acceses to the following files:

1. `/json_structured_data/structuring_progress.json` - This file contains the column types and file configurations for the database migration.

2. `docs/guides/database_workflow.md` - This file contains the database workflow guidelines for the database migration.

# CURRENT STACK:

- PostgreSQL

# TASK:

## Configuration Analysis:

1. The column_types object maps column numbers (1-11) to financial categories (gastos, pagos, ingresos, etc.)

2. Each file in files has checked: true and columns_used array indicating which columns are present

3. Column mapping evolves over time (starting with 3 columns, growing to 11)

## Task Requirements:

1. For each checked file in the configuration, locate its corresponding JSON file in /json_structured_data/ (e.g., abril2020_2020.json)

2. Create individual SQL files in a new output folder within /json_structured_data/

3. Generate PostgreSQL INSERT statements following the pattern according to the /docs/guides/database*workflow.md
   \_Data Integrity: Include proper constraints and validation*
   _User Isolation: Always include userId parameter to ensure data isolation_
   _Atomic Operations: Structure inserts for transactional integrity_
   _Historical Record: Maintain complete data without deletions_

4. Handle the dynamic column mapping based on columns_used for each file

5. Include proper NULL handling for missing columns

6. Add userid placeholders that can be parameterized

7. For files with varying column counts, only include the actually used columns

## Output Structure:

Create folder: /finance-app/sql_migrations/

One .sql file per source JSON file (e.g., abril2020.sql)

Each file should contain complete INSERT statements ready for parameter binding

Include comments indicating the source file and column mapping

## Special Considerations:

Early files (2020) have fewer columns - adjust INSERT accordingly

Some files skip certain columns (e.g., marzo2025 skips columns 6,7)

Handle the column progression over time systematically

Ensure proper data type casting in VALUES clause

Include date/time handling based on filename patterns (e.g., abril2020 → 2024-04-01)

## Required Output Format:

Each SQL file must follow this pattern with proper transactional structure:

-- Insert script for [filename].json
-- Columns used: [list of columns with their types]
-- Period: [derived from filename]

```sql
INSERT INTO transactions (
    amount,
    type,
    description,
    date,
    categoryId,
    accountId,
    userId,
    -- ... other columns based on columns_used
)
VALUES (
    $1, -- amount
    $2, -- type (GASTO, INGRESO, PAGO, etc.)
    $3, -- description
    $4, -- date (derived from filename)
    $5, -- categoryId (mapped from column type)
    $6, -- accountId
    $7, -- userId (parameter)
    -- ... other values
);
```

## 1. Task Summary:

```
File: /finance-app/sql_migrations/abril2020.sql
SQL Statements: 1
Errors: 0
```

# CRITICAL RULES:

- **Data Integrity**: Include proper constraints and validation
- **User Isolation**: Always include userId parameter to ensure data isolation
- **Atomic Operations**: Structure inserts for transactional integrity

# The Helper Function: find_category_id

This is a custom function you've created in your database to handle category management dynamically.

Purpose:

Its main job is to get the ID of a category. If the category already exists, it fetches the ID. If it doesn't exist, it creates it first and then returns the new ID. This prevents duplicate
categories and ensures every transaction is linked to a valid category without needing to know the IDs beforehand.

How It Works:

The function takes three arguments:

1.  p_user_id: The user's ID.
2.  p_category_name: The name of the category (e.g., 'sueldo', 'tarjeta').
3.  p_category_type: The type of category ('GASTO', 'PAGO', 'INGRESO', etc.).

It then performs these steps:

1.  Searches for a category in the Category table that matches the userId, name, and type.
2.  If it finds a match, it returns the existing id.
3.  If it does not find a match, it creates a new category by inserting a new row with the provided details and then returns the id of the newly created category.

Example Usage in Your Scripts:

When you see this line:

1 find_category_id($1, 'tarjeta', 'GASTO')

...it's telling the database: "Get me the ID for the category named 'tarjeta' of type 'GASTO' for this user. If you can't find it, create it for me and then give me the new ID."

Other "Helper" Mechanisms

While find_category_id is the only formal helper function, your scripts also cleverly use another SQL feature as a helper:

- `INSERT ... ON CONFLICT DO NOTHING`: You use this when ensuring the default accounts (Banco, Efectivo, Mercado Pago) exist. It attempts to insert the account, but if an account with the
  same name for that user already exists, it simply does nothing instead of throwing an error. This is another way you avoid creating duplicates.

# Database Population Instructions by Column

Here are the instructions for each column, up to the files where sql: true.

---

1. `gastos`

- Instruction: Insert each item into the Transaction table. Set the type to 'EXPENSE' and use the tipo field for the description. The categoryId is generated from the tipo field with a
  category type of 'GASTO'.

---

2. `pagos`

- Instruction: Insert each item into the Transaction table. Set the type to 'PAYMENT' and use the tipo field for the description. The categoryId is generated from the tipo field with a
  category type of 'PAGO'.

---

3. `ingresos`

- Instruction: Insert each item into the Transaction table. Set the type to 'INCOME' and use the tipo field for the description. The categoryId is generated from the tipo field with a
  category type of 'INGRESO'.

---

4. `gastosDiarios`

- Instruction: Insert each item into the Transaction table as an 'EXPENSE'. Populate the metadata column with {"is_budgeted_expense": true, "budget_category": "Daily Expenses"}.

---

5. `saldos`

- Instruction: Do not insert into the Transaction table. Use these values to run an UPDATE command on the Account table to set the final balance for each corresponding account (Mercado Pago,
  Banco, Efectivo).

---

6. `gastosTarjeta`

- Instruction: Insert each item into the Transaction table as an 'EXPENSE'. Populate the metadata column with card details, including is_card_expense, card_type: 'Mastercard', and any
  installment information derived from the fecha field.

---

7. `gastosTarjetaExc`

- Instruction: Skip this column. The data from gastosTarjetaExc is not inserted into the database in the existing SQL migration scripts.

---

8. `gastosTarjetaVisa`

- Instruction: Insert each item into the Transaction table as an 'EXPENSE'. Populate the metadata column with card details, including is_card_expense, card_type: 'Visa', and any installment
  information.

---

9. `rendimientos`

- Instruction: Insert each item into the Transaction table as an 'INCOME'. Use the reserva field for the description and ganado for the amount. Set the categoryId type to 'RENDIMIENTO' and
  populate the metadata with {"source": "Mercado Pago Rendimiento"}.

---

10. `gastosExtras`

- Instruction: Insert each item into the Transaction table as an 'EXPENSE'. Populate the metadata column with {"is_budgeted_expense": true, "budget_category": "Food/Groceries"}.

---

11. `intmp`

- Instruction: Insert each item into the Transaction table as an 'INCOME'. Leave the description blank and set the categoryId to a default income category. Populate the metadata column with
  {"source": "Mercado Pago Interest"}.

# START TASK

Begin with the first file. For each file

1.  Show Task Summary
2.  Explain Task Details to be done
3.  Create the SQL file
4.  Update the json_structured_data/structuring_progress.json file with the `"sql":true` after the `"checked":true`
5.  Chek on the json_structured_data/structuring_progress.json file, if the next file has the same column types as the previous file
6.  If the next file has the same column types as the previous file, run the task for the next file in the list
7.  If the next file has a different ammount of columns, ask the user for the column mapping
