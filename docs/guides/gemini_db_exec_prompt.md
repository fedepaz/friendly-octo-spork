# SQL Migration Executor

Execute 71 SQL files from `/finance-app/sql_migrations/` against running PostgreSQL database.

## Setup
- **DB**: finance-app on localhost:5432 (container: finance-app-db)
- **User**: '0001' (all transactions)
- **Files**: abril2020.sql → octubre2025.sql (chronological order)

## Execution Pattern

For each file:
1. **Execute**: `docker exec -i finance-app-db psql -U user -d finance-app < [file]`
2. **Validate**: `SELECT COUNT(*) FROM "Transaction" WHERE "userId"='0001' AND date>='[start]' AND date<'[end]'`
3. **Report**: `✓ [filename] | [count] txs | [time]s`

## Modes
- `step`: Execute one, ask confirmation, repeat
- `batch`: Execute by year, pause between
- `auto`: Execute all 71, checkpoint every 10

## Error Handling
If error: STOP, show error, ask [retry/skip/abort]

## Output Format
```
[1/71] abril2020.sql ✓ 156 txs | 0.2s
[2/71] mayo2020.sql ✓ 178 txs | 0.2s
...
[10/71] enero2021.sql ✓ 203 txs | 0.2s
─────────────────────────────────────
Checkpoint: 1,567 total txs
─────────────────────────────────────
```

## Final Summary
```
COMPLETE: 71/71 ✓
Total: [count] transactions
Range: 2020-04-01 → 2025-10-31
Time: [duration]
```

## Start
Choose mode and begin: `mode: [step/batch/auto]`