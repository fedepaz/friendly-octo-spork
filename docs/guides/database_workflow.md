# Database-Centric Workflow Guide (CRUD)

This document outlines the required database operations and workflows for Creating, Reading, and Updating data, based on the database's relational schema.

### Core Philosophy: Data Integrity and Immutability

The database is the single source of truth. Workflows are designed to ensure that financial calculations are always consistent and that a historical record is maintained. The application uses PostgreSQL running in a Docker container with persistent storage.

---

## 1. The Read Workflow

This workflow describes how data is fetched for the user to view.

- **Database Operation**: A `SELECT` statement is executed on the desired table.
- **Critical Rule**: The query **must** include a `WHERE "userId" = ?` clause to ensure a user can only ever see their own data.
- **For Display**: To show meaningful information (like category or account names instead of just IDs), `JOIN` operations with related tables are necessary.

---

## 2. The Create & Update Workflows

Workflows for creating and updating data are divided into two types: "Simple" for foundational data and "Complex" for financial events that affect account balances.

### Workflow A: Simple CRUD (for `Category` and `Recurrence` tables)

This applies to tables that do not directly impact account balances.

- **Create**: A standard `INSERT` statement providing all required fields, including the `userId`.
- **Update**: A standard `UPDATE` statement to change non-critical information (e.g., a category's name), targeting the row by its ID and `userId`.

### Workflow B: Complex Transactional CRUD (for `Transaction` and `Account` tables)

This applies to any operation that changes an account's balance. **All operations must be atomic (i.e., performed within a database transaction).**

- **Create (`Transaction`)**:
  1.  `INSERT` a new row into the `Transaction` table.
  2.  `UPDATE` the `Account` table, modifying the `balance` of the `sourceAccountId` and/or `targetAccountId` based on the transaction `amount` and `type`.

- **Update (`Transaction`)**:
  - **If changing non-financial data** (e.g., `description`): A simple `UPDATE` on the `Transaction` table is sufficient.
  - **If changing financial data** (e.g., `amount`):
    1.  The effect of the _original_ transaction must be reverted from the `Account` balance(s).
    2.  The `Transaction` row is updated with the new data.
    3.  The effect of the _new_ transaction data is applied to the `Account` balance(s).

## 3. Data Mapping and DTOs

To decouple the database schema from the UI and ensure consistent data types (e.g., converting Prisma's `Decimal` to `number`), the service layer must use **Data Transfer Objects (DTOs)**.

- **Internal Mapping**: Every service should implement a private `mapToDTO` method (e.g., `mapToAccountDTO`).
- **Type Conversion**: This method is responsible for converting `Prisma.Decimal` values to standard JavaScript `number` types using `Number(value)`.
- **DTO Types**: DTO types must be defined in the feature's `.schema.ts` file using Zod inference: `export type AccountDTO = z.infer<typeof accountSchema>;`.

---

## 4. Data Precision and Constraints

To ensure data integrity, storage efficiency, and consistent financial calculations, all database models must adhere to strict precision and length constraints.

### Currency Precision

All fields representing monetary values (e.g., `amount`, `balance`) must use the `Decimal` type with exactly two decimal places.

- **Prisma Attribute**: `@db.Decimal(15, 2)`
- **Why**: This prevents floating-point rounding errors and ensures that all financial data is stored and displayed consistently (e.g., `100.50` instead of `100.50000000003`).

### String Length Limits (VARCHAR)

To prevent database bloat and ensure predictable data sizes, all `String` fields must have explicit length limits using the `VarChar` type.

- **Standard Limits**:
  - **User/Account/Category Names**: `@db.VarChar(50)`
  - **Descriptions/Recurrence Names**: `@db.VarChar(100)` to `@db.VarChar(255)`
  - **Emails**: `@db.VarChar(150)`
  - **IDs (CUID)**: `@db.VarChar(36)`
  - **Colors (Hex Codes)**: `@db.VarChar(7)` (e.g., `#FF0000`)
- **Zod Alignment**: Always ensure that the corresponding Zod schemas in the backend include `.max(N)` validation that matches these database limits.

---

## 4. The Soft Delete Workflow

As per system requirements, there is **no workflow for hard deleting records**.

Once data is entered into the database, it is considered permanent to ensure a complete and unaltered financial history. However, to allow users to "remove" items from their active view, we use a **Soft Delete** pattern.

- **Database Operation**: An `UPDATE` statement is executed on the desired table.
- **Execution**:
  1.  Set the `deletedAt` field to the current timestamp (`now()`).
  2.  Set the `deletedByUserId` field to the ID of the user performing the action.
- **Critical Rule**: All `SELECT` queries for active data **must** include a `WHERE "deletedAt" IS NULL` clause to ensure soft-deleted records are hidden from the user.

---
