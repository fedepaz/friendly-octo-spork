# Data Structuring Rules for CSV to JSON Transformation

This document outlines the rules for transforming the raw CSV financial data into structured JSON files.

**This process is performed directly by the Gemini agent.**

## 1. General Rules

- **Strict Extraction:** Only explicitly defined sections and their specified columns will be extracted. Any other data present in the CSV will be ignored.
- **File Paths:** Raw CSVs are in `/plantillaInicial/informacionInicial/`. The structured JSON output is saved in `/json_structured_data/`. The progress file is located at `/finance-app/json_structured_data/structuring_progress.json`.
- **Ignore Keywords:** Any row containing "TOTAL", "SALDO", "RESTO", or "DIARIO" is considered a summary calculation and will be ignored.
- **Amount Parsing:** Monetary values (e.g., `"1.234,56"`) will be converted to numeric format (e.g., `1234.56`).
- **Output Schema:** Each processed CSV will result in one JSON file. The schema contains the following top-level keys: `gastos`, `pagos`, `ingresos`, `gastosDiarios`, `saldos`, `gastosTarjeta`, `gastosTarjetaExc`, `gastosTarjetaVisa`, `rendimientos`, `gastosExtras`, and `intmp`.

## 2. Column Mapping and Structure

The agent will process distinct blocks of data based on their column positions. The description field for all entries will be named `tipo`.

### `gastos` (Expenses)

- **Source:** Columns A, B, C (Indices 0, 1, 2)
- **Structure:** `[{ "fecha": string, "monto": number, "tipo": string }]`

### `pagos` (Payments)

- **Source:** Columns F, G, H (Indices 5, 6, 7)
- **Structure:** `[{ "fecha": string, "monto": number, "tipo": string }]`

### `ingresos` (Income)

- **Source:** Columns K, L, M (Indices 10, 11, 12)
- **Structure:** `[{ "fecha": string, "monto": number, "tipo": string }]`

### `gastosDiarios` (Daily Expenses)

- **Source:** Columns P, Q, R (Indices 15, 16, 17)
- **Structure:** `[{ "fecha": string, "monto": number, "tipo": string }]`

### `saldos` (Balances)

- **Applicable From:** December 2021 onwards.
- **Source:** Summary rows at the bottom of the file, containing keywords like "saldo banco" and "efectivo".
- **Structure:** `[{ "banco": number }, { "efectivo": number }]`

### `gastosTarjeta` (Card Expenses)

- **Applicable From:** August 2022 onwards.
- **Source:** The block at the bottom of the file, starting with the header "GASTOS TARJETA" (for regular expenses). All entries from this block will be combined into a single flat list.
- **Structure:** `[{ "fecha": string, "monto": number, "tipo": string }]`
- **Note:** Dates in this section may sometimes be in a non-standard format (e.g., "tres/nueve"). These will be captured as strings.

### `gastosTarjetaExc` (Excess Card Expenses)

- **Applicable From:** September 2022 onwards.
- **Source:** A block at the bottom of the file, starting with the header "GASTOS TARJETA EXC". All entries from this block will be combined into a single flat list.
- **Structure:** `[{ "fecha": string, "monto": number, "tipo": string }]`
- **Note:** Dates in this section may sometimes be in a non-standard format (e.g., "uno/seis"). These will be captured as strings.

### `gastosTarjetaVisa` (Visa Card Expenses)

- **Applicable From:** September 2023 onwards.
- **Source:** A block at the bottom of the file, starting with the header "gastosTarjetaVisa".
- **Source Columns:** K, L, M (Indices 10, 11, 12)
- **Structure:** `[{ "fecha": string, "monto": number, "tipo": string }]`
- **Note:** Dates in this section may sometimes be in a non-standard format. These will be captured as strings.

### `rendimientos` (Yields)

- **Applicable From:** October 2023 onwards.
- **Source:** A block at the bottom of the file, starting with the header "RESERVA".
- **Source Columns:** O (for `reserva`), Q (for `ganado`) (Indices 14, 16)
- **Structure:** `[{ "reserva": string, "ganado": number }]`
- **Note:** This section captures investment yields.

### `gastosExtras` (Extra Expenses)

- **Applicable From:** December 2023 onwards.
- **Source:** A block on the right side of the file, starting with the header "GASTOS EXTRAS".
- **Source Columns:** P, Q, R (Indices 15, 16, 17)
- **Structure:** `[{ "fecha": string, "monto": number, "tipo": string }]`

### `intmp` (Mercado Pago Interest)

- **Applicable From:** December 2023 onwards.
- **Source:** A column with the header "INTMP" appearing next to the "GASTO DIARIO" block.
- **Structure:** `[{ "fecha": string, "monto": number }]`
- **Note:** The date is sourced from the "GASTO DIARIO" row.
