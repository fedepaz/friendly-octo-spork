# Design: Historical Ledger Import (`history-import`)

**Date:** 2026-11-14
**Status:** Approved in brainstorming (waiting on issue creation)
**Source data:** `docs/zGastos.ods` — personal multi-year spreadsheet, **never committed** (gitignored: `docs/*.ods`, `docs/*.sql`)

## 1. Goal

Build a one-off, local, re-runnable script that imports a personal spending ledger
(a spreadsheet with ~88 monthly sheets covering 2020 → 2026) into the app as a
**fresh user with new accounts**, and **verifies** the import against the
spreadsheet's own totals and balance snapshots.

This is the "checking" mechanism: the import is not trusted until the
reconciliation report shows the app's computed balances matching the sheet's
recorded balance snapshots and every table's TOTAL cells.

## 2. Decisions (confirmed)

| Question | Decision |
|---|---|
| Goal | Import history (not just a read-only audit) |
| Mechanism | One-off local script — no API endpoints, no UI |
| What's imported | All real movements: `GASTOS`, `PAGOS`, `INGRESOS`, `GASTOS TARJETA`, `GASTOS EXTRAS`, `TRANSFERENCIAS` tables **and** daily-spend grids |
| What's excluded | Pure metrics (dolar blue, ahorros, reservas, binance/USDT trackers) — **except balance snapshots**, which are parsed as validation oracles only |
| Setup | Fresh user + new accounts, independent of existing dev data |
| Category mapping | Heuristic keyword table → the app's **25 fixed seeded categories** only (categories are read-only; fallback `Miscellaneous/Other`) |
| Approach | Staged pipeline (parse → validate → import → reconcile) with era-based column maps |

## 3. Architecture

```
docs/zGastos.ods  (local, gitignored)
        │
        ▼
 [1] parse.ts      — ODS reader (stdlib zipfile + XML, zero new deps)
        │           era column maps → mini-table discovery → normalized rows
        ▼
 history-import.json   (gitignored intermediate artifact)
        │
        ▼
 [2] validate.ts   — checksums: sum(rows) vs sheet TOTAL cell (±0.01)
        │           quarantine unparseable rows; abort above failure threshold
        ▼
 [3] import.ts     — fresh user + accounts + Prisma writes (idempotent)
        │
        ▼
 [4] reconcile.ts  — report: computed balances vs snapshots, monthly sums
                     vs sheet totals, unmapped concepts, quarantined rows
```

## 4. Module layout

```
app/apps/backend/scripts/history-import/
├── ods.ts          # ODS zip/XML reader → sheet grid (cell matrix per sheet)
├── columnMaps.ts   # era layouts: table anchors by column band + section labels
├── parse.ts        # grid → normalized JSON (rows, table totals, snapshots)
├── keywords.ts     # concept → fixed category / type keyword tables
├── validate.ts     # per-table checksums + quarantine
├── import.ts       # Prisma: user, accounts, transactions (idempotency)
├── reconcile.ts    # post-import verification report
└── cli.ts          # args: --odspath, --email, --password, --force, --dry-run
```

## 5. Parsing rules

### 5.1 Sheet discovery
- Iterate `content.xml` `<table:table>` elements in document order.
- Skip sheets whose name contains an external link reference (2 broken
  `file:///…` sheets) and sheets before any recognized section label
  (future/template months with no movement tables).

### 5.2 Era column maps (layout drift)
Mini-tables are identified by a `FECHA | MONTO | CONCEPTO` header row and/or a
known section label, within a column band. Column bands differ by era:

| Era | Bands (0-indexed columns) |
|---|---|
| 2020 (first sheets) | compact: GASTOS / PAGOS / INGRESOS single band |
| 2021–2022 | + daily-spend grid band (`GASTO DIARIO`) |
| 2023–2024 | + extras band (`INTMP`, `GASTOS EXTRAS`) |
| 2025+ | + transfers band, card-expense band |

`columnMaps.ts` holds one map per era with fallback resolution: try header row
match first, then section label, then positional band. A sheet can contain the
**same band used by multiple tables stacked vertically** — each header row
restarts a new table context.

### 5.3 Cell formats
- **Numbers:** Argentine format — `.` thousands, `,` decimal (`1.234,56`);
  negatives allowed; formula cells use cached values from `content.xml`.
- **Dates:** two Spanish formats observed:
  - short: `jue 01/may 25` → weekday + `dd/mmm/yy`
  - long: `jue 8 de may de 25` → weekday + `d de mmm de yy`
  - Unparseable/missing date → assign the sheet's month-year with day `01`,
    set `dateInferred: true` (reported).
- **Numbers repeated** via `number-columns-repeated` must be expanded (capped).

### 5.4 Type mapping

| Sheet table | App `Transaction.type` |
|---|---|
| GASTOS, GASTOS TARJETA, GASTOS TARJETA EXC, GASTOS EXTRAS, daily-spend grids | `EXPENSE` |
| INGRESOS | `INCOME` |
| TRANSFERENCIAS | keyword-classified: income keywords → `INCOME`, transfer keywords → `TRANSFER`, else `EXPENSE` |

### 5.5 Category mapping
- `keywords.ts`: case-insensitive keyword table over the **25 fixed seeded
  categories** (e.g. rent/housing, utilities, groceries, transport, health,
  income…). Curated list, unit-tested.
- No match → `Miscellaneous/Other`.
- Report lists every distinct unmapped concept with counts (for table tuning).

### 5.6 Balance snapshots
Cells labeled as balances (`saldo*`, `efectivo`, card balances, `mesAnterior`/
`mesQueViene` carryovers) are extracted as `(accountHint, date, amount)`
triples into the JSON — **never imported as transactions**. They are
reconciliation inputs.

## 6. Validation (stage 2)

- For every parsed table that has a TOTAL cell: `|sum − total| ≤ 0.01` → pass;
  mismatch → fail with table/row detail.
- Unparseable cells → quarantine list `(sheet, cell, raw)` — never dropped
  silently.
- Abort before import if quarantine rate > configurable threshold (default 5%).

## 7. Import (stage 3)

- **User:** created fresh (CLI `--email/--password`), no tenant scoping
  (single-user app).
- **Accounts:** created for the new user from a config map (Efectivo, Visa,
  Mastercard, Banco, MercadoPago + any additional account hints the sheet
  references); each parsed row receives an account via table default or
  concept keyword (e.g. daily-grid rows → Efectivo, card table → Visa).
- **Idempotency:** default run refuses if the target user already has
  transactions; `--force` deletes only that user's imported rows first.
- **Dry-run:** `--dry-run` stops after stage 2 and prints what would be written.

## 8. Reconciliation report (stage 4)

Console summary + gitignored `reconciliation-report.md`:
1. Per-sheet/month: imported row count and sum vs sheet TOTAL cells.
2. **Balance checkpoints:** computed account balance at each snapshot date vs
   the sheet's recorded snapshot → ✓/✗ per checkpoint.
3. Unmapped concepts (count-sorted).
4. Quarantined rows.
5. Final totals per account.

## 9. Testing (TDD)

- **Fixtures:** tests build synthetic ODS files (in-memory `content.xml` per
  era layout) — the real spreadsheet never appears in tests, CI, or git.
- **Unit:** number parsing, both date formats, sheet discovery, table
  discovery (stacked tables, header restarts), era fallback, keyword →
  category/type mapping, checksum validation, quarantine.
- **Integration:** import into the test DB (Prisma) → assert counts, types,
  categories; reconcile → assert snapshot checkpoints pass on fixture data.
- **Real-file smoke run:** manual local command (`cli.ts --odspath …`), not CI.

## 10. Privacy

- `.gitignore`: `docs/*.ods`, `docs/*.sql` (added); generated
  `history-import.json` + `reconciliation-report.md` also ignored.
- The GitHub issue contains only this design — no amounts, dates, account
  details, or concepts from the source file.
- Script reads a local path argument; nothing is uploaded anywhere.

## 11. Deliverables checklist

- [ ] `scripts/history-import/` modules as in §4 with unit + integration tests
- [ ] Era column maps for all observed layouts
- [ ] Curated keyword → fixed-category table
- [ ] Reconciliation report generator
- [ ] `.gitignore` entries for generated artifacts
- [ ] Local smoke run producing a green reconciliation report against the
      real file (local only)
