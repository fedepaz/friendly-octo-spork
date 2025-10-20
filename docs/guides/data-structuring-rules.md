# Data Structuring Rules for CSV to JSON Transformation

This document outlines the rules for transforming the raw CSV financial data into structured JSON files.

**This process is performed directly by the Gemini agent.**

## 1. General Rules

- **Strict Extraction:** Only explicitly defined sections and their specified columns will be extracted. Any other data present in the CSV will be ignored.
- **File Paths:** Raw CSVs are in `/plantillaInicial/informacionInicial/`. The structured JSON output is saved in `/json_structured_data/`. The progress file is located at `/finance-app/json_structured_data/structuring_progress.json`.
- **Ignore Keywords:** Any row containing "TOTAL", "SALDO", "RESTO", or "DIARIO" is considered a summary calculation and will be ignored.
- **Amount Parsing:** Monetary values (e.g., `"1.234,56"`) will be converted to numeric format (e.g., `1234.56`).
- **Output Schema:** Each processed CSV will result in data populating the following Prisma models: `User`, `Account`, `Transaction`, `Category`, and `Recurrence`.

## 2. Column Mapping and Structure

The agent will process distinct blocks of data based on their column positions. The description field for all entries will be named `tipo`.

### `gastos` (Expenses)

- **Mapped to Prisma Model:** `Transaction` (with `type: EXPENSE`)
- **Source:** Columns A, B, C (Indices 0, 1, 2)
- **Structure:** `[{ "fecha": string, "monto": number, "tipo": string }]`
- **Currency:** All amounts are in `ARS`.

### `pagos` (Payments)

- **Mapped to Prisma Model:** `Transaction` (with `type: EXPENSE`)
- **Source:** Columns F, G, H (Indices 5, 6, 7)
- **Structure:** `[{ "fecha": string, "monto": number, "tipo": string }]`
- **Currency:** All amounts are in `ARS`.

### `ingresos` (Income)

- **Mapped to Prisma Model:** `Transaction` (with `type: INCOME`)
- **Source:** Columns K, L, M (Indices 10, 11, 12)
- **Structure:** `[{ "fecha": string, "monto": number, "tipo": string }]`
- **Currency:** All amounts are in `ARS`.

### `gastosDiarios` (Daily Expenses)

- **Mapped to Prisma Model:** `Transaction` (with `type: EXPENSE`)
- **Source:** Columns P, Q, R (Indices 15, 16, 17)
- **Structure:** `[{ "fecha": string, "monto": number, "tipo": string }]`
- **Currency:** All amounts are in `ARS`.

### `saldos` (Balances)

- **Mapped to Prisma Model:** `Account` (balance update)
- **Applicable From:** December 2021 onwards.
- **Source:** Summary rows at the bottom of the file, containing keywords like "saldo banco" and "efectivo".
- **Structure:** `[{ "banco": number }, { "efectivo": number }]`
- **Currency:** All amounts are in `ARS`.

### `gastosTarjeta` (Card Expenses)

- **Mapped to Prisma Model:** `Transaction` (with `type: EXPENSE` and `metadata` for card details)
- **Applicable From:** August 2022 onwards.
- **Source:** The block at the bottom of the file, starting with the header "GASTOS TARJETA" (for regular expenses). All entries from this block will be combined into a single flat list.
- **Structure:** `[{ "fecha": string, "monto": number, "tipo": string }]`
- **Note:** Dates in this section may sometimes be in a non-standard format (e.g., "tres/nueve"). These will be captured as strings.
- **Currency:** All amounts are in `ARS`.

### `gastosTarjetaExc` (Excess Card Expenses)

- **Mapped to Prisma Model:** `Transaction` (with `type: EXPENSE` and `metadata` for card details)
- **Applicable From:** September 2022 onwards.
- **Source:** A block at the bottom of the file, starting with the header "GASTOS TARJETA EXC". All entries from this block will be combined into a single flat list.
- **Structure:** `[{ "fecha": string, "monto": number, "tipo": string }]`
- **Note:** Dates in this section may sometimes be in a non-standard format (e.g., "uno/seis"). These will be captured as strings.
- **Currency:** All amounts are in `ARS`.

### `gastosTarjetaVisa` (Visa Card Expenses)

- **Mapped to Prisma Model:** `Transaction` (with `type: EXPENSE` and `metadata` for card details)
- **Applicable From:** September 2023 onwards.
- **Source:** A block at the bottom of the file, starting with the header "gastosTarjetaVisa".
- **Source Columns:** K, L, M (Indices 10, 11, 12)
- **Structure:** `[{ "fecha": string, "monto": number, "tipo": string }]`
- **Note:** Dates in this section may sometimes be in a non-standard format. These will be captured as strings.
- **Currency:** All amounts are in `ARS`.

### `rendimientos` (Yields)

- **Mapped to Prisma Model:** `Transaction` (with `type: INVESTMENT` or `RETURN`)
- **Applicable From:** October 2023 onwards.
- **Source:** A block at the bottom of the file, starting with the header "RESERVA".
- **Source Columns:** O (for `reserva`), Q (for `ganado`) (Indices 14, 16)
- **Structure:** `[{ "reserva": string, "ganado": number }]`
- **Note:** This section captures investment yields.
- **Currency:** All amounts are in `ARS`.

### `gastosExtras` (Extra Expenses)

- **Mapped to Prisma Model:** `Transaction` (with `type: EXPENSE`)
- **Applicable From:** December 2023 onwards.
- **Source:** A block on the right side of the file, starting with the header "GASTOS EXTRAS".
- **Source Columns:** P, Q, R (Indices 15, 16, 17)
- **Structure:** `[{ "fecha": string, "monto": number, "tipo": string }]`
- **Currency:** All amounts are in `ARS`.

### `intmp` (Mercado Pago Interest)

- **Mapped to Prisma Model:** `Transaction` (with `type: INCOME` and `metadata` for interest details)
- **Applicable From:** December 2023 onwards.
- **Source:** A column with the header "INTMP" appearing next to the "GASTO DIARIO" block.
- **Structure:** `[{ "fecha": string, "monto": number }]`
- **Note:** The date is sourced from the "GASTO DIARIO" row.
- **Currency:** All amounts are in `ARS`.
