# Database-Centric Workflow Guide (CRUD)

This document outlines the required database operations and workflows for Creating, Reading, and Updating data, based on the database's relational schema.

### Core Principle: Data Integrity and Immutability

The database is the single source of truth. Workflows are designed to ensure that financial calculations are always consistent and that a historical record is maintained.

---

## 1. The Read Workflow

This workflow describes how data is fetched for the user to view.

-   **Database Operation**: A `SELECT` statement is executed on the desired table.
-   **Critical Rule**: The query **must** include a `WHERE "userId" = ?` clause to ensure a user can only ever see their own data.
-   **For Display**: To show meaningful information (like category or account names instead of just IDs), `JOIN` operations with related tables are necessary.

---

## 2. The Create & Update Workflows

Workflows for creating and updating data are divided into two types: "Simple" for foundational data and "Complex" for financial events that affect account balances.

### Workflow A: Simple CRUD (for `Category` and `Recurrence` tables)

This applies to tables that do not directly impact account balances.

-   **Create**: A standard `INSERT` statement providing all required fields, including the `userId`.
-   **Update**: A standard `UPDATE` statement to change non-critical information (e.g., a category's name), targeting the row by its ID and `userId`.

### Workflow B: Complex Transactional CRUD (for `Transaction` and `Account` tables)

This applies to any operation that changes an account's balance. **All operations must be atomic (i.e., performed within a database transaction).**

-   **Create (`Transaction`)**:
    1.  `INSERT` a new row into the `Transaction` table.
    2.  `UPDATE` the `Account` table, modifying the `balance` of the `sourceAccountId` and/or `targetAccountId` based on the transaction `amount` and `type`.

-   **Update (`Transaction`)**:
    *   **If changing non-financial data** (e.g., `description`): A simple `UPDATE` on the `Transaction` table is sufficient.
    *   **If changing financial data** (e.g., `amount`):
        1.  The effect of the *original* transaction must be reverted from the `Account` balance(s).
        2.  The `Transaction` row is updated with the new data.
        3.  The effect of the *new* transaction data is applied to the `Account` balance(s).

---



## 3. The Delete Workflow



As per system requirements, there is **no workflow for deleting records**.



Once data is entered into the database, it is considered permanent and cannot be removed by a user action. This ensures a complete and unaltered financial history, which is essential for accurate tracking and future analysis.



---



## 4. Data Migration Workflows



This section outlines specialized, one-time workflows for migrating and cleaning up data.



### Category Consolidation Workflow



This workflow is used to consolidate a large number of old, messy categories into a standardized set of master categories.



1.  **Initial Analysis & Review File Generation**:

    *   A script analyzes all existing transaction categories and attempts to map them to the new master categories.

    *   Mappings with low confidence are written to a `review-needed.json` file in the `finance-app/` directory.



2.  **Manual Review**:

    *   A developer manually reviews the `review-needed.json` file.

    *   For ambiguous categories, new master categories can be proposed and approved.



3.  **Correction File Generation**:

    *   The `finance-app/src/scripts/create-reviewed-chunks.ts` script is run.

    *   This script reads all original `category_mappings_*.json` files and applies the approved corrections.

    *   It generates new `reviewed-category_mappings_*.json` files for any chunks that contained updated mappings. These new files are the clean source of truth for the next step.



4.  **Final Database Consolidation**:

    *   The `finance-app/src/scripts/apply-consolidation.ts` script is run, specifying the `userId`.

    *   This script intelligently finds and loads the complete set of mappings (using `reviewed-` files where available, and original files otherwise).

    *   It then performs the database migration:

        *   Creates all master categories.

        *   Moves all transactions and recurrences from old categories to their new master categories.

        *   Deletes the old, now-empty categories.



This structured process ensures data is reviewed and cleaned before the final, destructive database operation is performed.
