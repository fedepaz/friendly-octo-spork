# Interactive Migration Script Modularization Plan

This document outlines the plan to refactor the `migracionInteractiva.ts` script into several modular, single-responsibility scripts. This approach aims to improve maintainability, clarity, and provide more granular control over the migration process.

## Overall Flow

The migration process will be divided into five main phases, each handled by a dedicated script:

1.  **Data Extraction and Initial Storage**
2.  **Interactive Data Structuring**
3.  **Schema Validation and Evolution**
4.  **Data Migration to Database**
5.  **Post-Migration Updates and Summary**

---

## Detailed Script Breakdown

### 1. `extract_sheets.ts`

*   **Purpose:** Reads the ODS/XLSX input file, sorts the sheets chronologically (by month/year), and extracts the raw data from each sheet.
*   **Input:** Path to the ODS/XLSX file (e.g., `finanzas.ods`).
*   **Output:**
    *   Individual `.csv` files for each sheet's raw data, stored in `/plantillaInicial/informacionInicial/`. (e.g., `abril2020.csv`, `octubre.csv`).
    *   A `sheets_metadata.json` file (or similar) containing an ordered list of sheet metadata (original name, parsed month/year, and corresponding CSV filename).

### 2. `structure_sheet_data.ts`

*   **Purpose:** Reads each `.csv` file (guided by the metadata JSON) and interactively guides the user to identify and structure the data. The output JSON will group data by "column type" (e.g., "gastos", "pagos", "ingresos"), where each type contains an array of objects with `fecha`, `monto`, and `concepto`. This is the key interactive step for mapping raw CSV columns to structured data.
*   **Input:**
    *   `sheets_metadata.json` (from `extract_sheets.ts`).
    *   Individual `.csv` files (from `extract_sheets.ts`).
*   **Interactive Part:** User confirms which raw CSV columns correspond to `fecha`, `monto`, and `concepto` for each identified "column type" (e.g., "GASTOS", "PAGOS", "INGRESOS", "TARJETAS").
*   **Output:** Individual `.json` files for each sheet's structured data, stored in `/json's/`. (e.g., `abril2020.json`, `octubre2020.json`).

### 3. `validate_and_create_models.ts`

*   **Purpose:** Reads the structured `.json` files. For each identified "column type" (e.g., "gastos", "pagos", "ingresos", "TARJETAS"), it checks if a corresponding Prisma model already exists in `prisma/schema.prisma`.
*   **Input:** Individual structured `.json` files (from `structure_sheet_data.ts`).
*   **Interactive Part:** If a new "column type" is encountered (i.e., no existing Prisma model), the user is interactively prompted to confirm if a new Prisma model should be created. If confirmed, the user can define relations (e.g., `categoryId`).
*   **Output:** Potentially updates `prisma/schema.prisma` by appending new Prisma model definitions.

### 4. `migrate_to_database.ts`

*   **Purpose:** Reads the structured `.json` files. For each sheet's data, it processes each "column type" (e.g., "gastos", "pagos", "ingresos"). This script handles the interactive category management (creating new categories or mapping to existing ones) and then inserts the processed data into the appropriate Prisma models in the database.
*   **Input:**
    *   Individual structured `.json` files (from `structure_sheet_data.ts`).
    *   Prisma client (connected to the database).
*   **Interactive Part:** User interacts to confirm/create categories for each concept.
*   **Output:** Populates the Prisma database with the migrated financial data.

### 5. `update_and_summarize_totals.ts`

*   **Purpose:** After all data for a specific month has been migrated, this script calculates and updates the monthly totals (totalIngresos, totalGastos, totalPagos, saldoFinal) in the `Mes` table in the database. It then provides a final summary of the migration process.
*   **Input:** Prisma client (connected to the database) and the `mesId` for the processed month.
*   **Output:** Updated monthly totals in the database and a console summary of the overall migration.

---

This modular plan ensures a clear separation of concerns, making each part easier to develop, test, and maintain.
