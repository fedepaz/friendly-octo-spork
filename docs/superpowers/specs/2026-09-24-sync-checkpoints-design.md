# Sync Checkpoints Session — Design

**Date:** 2026-09-24
**Source:** `templates2026/PROJECT-REVIEW/appFinance-CHECKPOINTS.md` open items
**Branch:** `feat/putting-the-work`
**Commits:** none unless explicitly requested

## Scope

Work through the 5 real open checkpoint items plus a regression verification pass. Three checklist entries (cards/transactions/dashboard `types.ts`) are stale — the files already exist with the exact planned types; only their boxes get ticked.

Out of scope: optional items (LOW-001 dev bypass, LOW-004 scheduler), agent profiles, docs/guides updates.

## Decisions

- **CRIT-003 approach:** reuse the repo's composite action `.github/actions/setup` (pnpm 10.33.2 + Node 20, frozen lockfile) instead of verbatim-copying sistemaDemo's standalone steps — DRY with `ci-test.yml`/`deploy.yml`.
- **Audit failure behavior:** drop sistemaDemo's `|| true`. High/critical vulns fail the run so GitHub surfaces it. Add `workflow_dispatch` for manual test-triggering.
- **HIGH-006 scope:** extract only types that exist. No invented types.

## Steps

1. **Baseline** — `pnpm lint` + `pnpm type-check` from `app/` must be green before edits.
2. **HIGH-005** — reorder `features/permissions/index.ts` exports into `// Components`, `// Hooks`, `// Services` sections matching the other 12 barrels.
3. **HIGH-006a** — move `features/permissions/types/types.ts` → `features/permissions/types.ts`; update the single importer (`constants/table-meta.ts`, `"../types/types"` → `"../types"`). Keep `constants/table-meta.ts`.
4. **HIGH-006b** — create `features/investments/types.ts`, move `InvestmentDTO` out of `api/investmentsService.ts`, import from `../types`, re-export from barrel. `HeaderCellProps` stays in `columns.tsx`.
5. **CRIT-003** — create `.github/workflows/scheduled.yml`:

   ```yaml
   name: Scheduled Security Audit
   on:
     schedule:
       - cron: "0 2 * * *"
     workflow_dispatch:
   jobs:
     audit:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v4
         - uses: ./.github/actions/setup
         - run: pnpm audit --audit-level high
           working-directory: app
   ```

6. **MED-005** — root `AGENTS.md`: add sections for the permissions module, `AuditCrudInterceptor`, i18n (next-intl, `messages/*.json`), and `LoadingBoundary`, alongside the existing invalidation-map/queryKeys entries.

## Verification

- `pnpm lint` + `pnpm type-check` after each import-touching step (2–4).
- Full regression checklist from the CHECKPOINTS file (backend, frontend, CI/CD sections) run read-only at the end; report results.
- Tick boxes in the CHECKPOINTS file, including the 3 stale `types.ts` entries.

## Error handling / risks

- If baseline is already red, record which checks fail and treat only *new* failures as regressions.
- If a regression check fails and the cause is this session's changes, fix it; if it pre-exists, report without fixing.
- `scheduled.yml` cannot be truly tested locally — `workflow_dispatch` added so it can be triggered manually after merge.
