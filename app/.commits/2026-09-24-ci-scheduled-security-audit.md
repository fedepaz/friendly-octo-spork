ci: add daily security audit workflow

Add .github/workflows/scheduled.yml running `pnpm audit --audit-level
high` daily at 02:00 UTC, reusing the repo's composite setup action
(pnpm 10.33.2 + Node 20, frozen lockfile). Unlike sistemaDemo's
reference workflow, there is no `|| true`: high/critical
vulnerabilities fail the run so GitHub surfaces them. Includes
workflow_dispatch for manual test-triggering (requires the workflow
to be on the default branch before it can be dispatched or scheduled).
