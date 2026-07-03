ci: add GitHub Actions CI/CD pipeline with reusable workflows

Replace single test.yml with three-file architecture:

- ci-test.yml: reusable workflow (lint + unit + integration tests)
- pr-checks.yml: PR gate for dev and main branches
- deploy.yml: push to main → tests → build & push Docker images to GHCR

Key decisions:
- .github/ at repo root (not inside app/) for GitHub Actions visibility
- working-directory: app for all pnpm steps (monorepo root is app/)
- pnpm version pinned to 10.33.2 (can't auto-detect from repo root)
- SHA-based Docker image tags (main-<sha> + latest)
- Deploy step is placeholder (manual git pull && docker compose up --build)
- All actions pinned to current majors (checkout@v6, setup-node@v6, etc.)
