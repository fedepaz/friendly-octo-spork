# appFinance — Personal Finance Tracker

A full-stack personal finance application: track accounts, cards, transactions, recurrences, categories, budgets, and investments. Built as a **pnpm + Turborepo monorepo**.

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 16 (App Router), React 19.2, Tailwind CSS 4, shadcn/ui, TanStack Query, next-intl |
| Backend | NestJS 11, Prisma 7 (PostgreSQL), JWT auth, RBAC permissions, audit trail |
| Shared | `@repo/shared` — Zod schemas, DTOs, enums |
| Tooling | TypeScript 5.7, Jest 30, ESLint, Prettier, Husky, commitlint, Playwright |
| Infra | Docker (PostgreSQL + Adminer for dev; Nginx + containers for deploy), GitHub Actions |

## Repository Layout

```
appFinance/
├── app/                        # Monorepo (all commands run from here)
│   ├── apps/
│   │   ├── frontend/           # Next.js 16 — port 3000
│   │   └── backend/            # NestJS 11 — port 3001
│   ├── packages/
│   │   └── shared/             # @repo/shared — Zod schemas, DTOs, enums
│   ├── turbo.json              # Task pipeline (build/lint/test/type-check)
│   └── .husky/                 # pre-commit: pnpm lint · commit-msg: commitlint
├── docker/                     # docker-compose.dev.yml, deploy stack, nginx
├── docs/                       # agents, guides, deployment, design, plans
├── design-system/              # Design tokens and references
├── AGENTS.md                   # Agent entry point + project conventions
├── PULL_REQUEST_CONVENTIONS.md # Conventional PR title/body rules
└── .github/                    # CI workflows, issue & PR templates
```

## Quick Start

### Prerequisites

- Node.js >= 18 (Prisma 7 projects prefer >= 20.19)
- pnpm 10.33.2 (`corepack enable`)
- Docker (for PostgreSQL)

### Setup

```bash
# 1. Start the database
docker compose -f docker/docker-compose.dev.yml up -d

# 2. Install dependencies
cd app
pnpm install

# 3. Configure environment
#    Create .env files for frontend and backend (see apps/*/README.md)

# 4. Generate the Prisma client and run migrations
pnpm --filter backend prisma:generate
pnpm --filter backend db:migrate:dev

# 5. Seed categories, entities, and the admin user
pnpm --filter backend db:seed:admin

# 6. Start both apps in watch mode
pnpm dev
```

- Frontend: http://localhost:3000
- Backend API: http://localhost:3001
- Adminer (DB UI): http://localhost:8080

## Essential Commands

| Command | What it does |
|---|---|
| `pnpm dev` | Runs frontend + backend concurrently |
| `pnpm build` | Build all (shared package builds first) |
| `pnpm lint` | Lint all — blocking pre-commit hook |
| `pnpm type-check` | TypeScript check |
| `pnpm test` | Run tests across all packages |
| `pnpm format` | Prettier write |

All commands run from the `app/` directory.

## Branching & Commits

- `main` is protected. Feature branches: `feat/*`, `fix/*`, etc., targeting `dev`.
- Commits follow **Conventional Commits** (enforced by commitlint). See [`app/COMMIT_CONVENTIONS.md`](app/COMMIT_CONVENTIONS.md).
- PR titles must follow Conventional Commits (enforced by the `pr-title` workflow). See [`PULL_REQUEST_CONVENTIONS.md`](PULL_REQUEST_CONVENTIONS.md).
- PRs into `dev`/`main` use the PR template in [`.github/PULL_REQUEST_TEMPLATE.md`](.github/PULL_REQUEST_TEMPLATE.md).

## Documentation

| Doc | Purpose |
|---|---|
| [`AGENTS.md`](AGENTS.md) | Project conventions and agent entry point |
| [`docs/guides/`](docs/guides/) | Development guides (database, monorepo, SmartForm, API, i18n) |
| [`docs/guides/TRICKS.md`](docs/guides/TRICKS.md) | Version-specific gotchas — check before inventing solutions |
| [`docs/guides/ALERT-DISPLAY-PATTERNS.md`](docs/guides/ALERT-DISPLAY-PATTERNS.md) | Alert display design patterns (V1/V2/V3) |
| [`docs/deployment/`](docs/deployment/) | Docker/Nginx deployment docs |
| [`docs/agents/`](docs/agents/) | Agent profiles (backend, frontend, UX, devops, security) |
| [`app/COMMIT_CONVENTIONS.md`](app/COMMIT_CONVENTIONS.md) | Commit message rules |

## Testing

- **Unit + component tests**: Jest + Testing Library (`.spec.tsx` convention in frontend, `.spec.ts` in backend).
- **E2E**: Playwright (Phase 3 — planned).
- Run everything: `pnpm test` from `app/`.

## License

Private — all rights reserved.
