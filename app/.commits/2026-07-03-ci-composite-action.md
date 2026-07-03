ci: extract setup into composite action to DRY up workflow

Create .github/actions/setup/action.yml that bundles:
- checkout, pnpm (10.33.2), Node 20, pnpm install, prisma generate

All 3 jobs in ci-test.yml now call this single action instead of
duplicating 6 setup steps each. Changes to setup (version bumps,
new steps) only need to happen once.
