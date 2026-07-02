# AGENTS.md — Personal Finance Tracker

This is a **pnpm + Turbo monorepo** under `/home/fedepaz/Documents/proyectos/appFinance/app/`.
All commands below run from that `app/` directory.

**Skills**: Load via `skill()` for reusable workflows: `review-code-changes`, `conduct-research`, `commit-workflow`, `ux-review`.

## Structure

```
app/
├── apps/
│   ├── frontend/      # Next.js 16 (App Router), port 3000
│   └── backend/       # NestJS 11, port 3001
├── packages/
│   └── shared/        # @repo/shared — Zod schemas, DTOs, enums
├── docker-compose.yml # PostgreSQL (root: /home/fedepaz/Documents/proyectos/appFinance/docker/)
├── turbo.json         # Task pipeline config
└── .husky/            # pre-commit runs `pnpm lint`, commit-msg enforces Conventional Commits
```

## Essential Commands

| Command | What it does |
|---|---|
| `pnpm dev` | Runs both frontend + backend concurrently |
| `pnpm dev:backend` | Backend only (watch mode) |
| `pnpm dev:frontend` | Frontend only (watch mode) |
| `pnpm build` | Build all (depends on `^build` — shared builds first) |
| `pnpm lint` | Lint all — **blocking pre-commit hook** |
| `pnpm type-check` | TypeScript check (root) |
| `pnpm test` | Run tests across all packages |
| `pnpm format` | Prettier write |

## Architecture & Conventions

- **Feature-driven**: Every feature lives in `src/features/{name}/` (frontend) or `src/modules/{name}/` (backend). No cross-feature imports except through shared packages or the central invalidation map.
- **Backend**: NestJS modules with Prisma ORM. All monetary fields use `@db.Decimal(19,4)`. JWT auth with passport.
- **Frontend**: Next.js 16 App Router. Data fetching uses `useSuspenseQuery` exclusively (except auth hooks — they intentionally use `useQuery` with `enabled` flag).
- **No Update/Delete**: The API only exposes POST and GET endpoints. No PATCH/DELETE/PUT. Only soft delete exists on User and Account.
- **Read `node_modules/next/dist/docs/`** before writing any Next.js code — this version has breaking changes from your training data.
- **Categories are seeded/read-only** — no endpoint to create/modify them.
- **Wizard pattern**: Multi-step forms use `SmartFormProvider` + `FormContainer` + step components. Step navigation uses `*-routing.ts` helpers with `StepConfig` arrays.

## Frontend Data Patterns

- **Invariants on `useSuspenseQuery`**: Never destructure `isLoading` (it's `undefined`). Never guard with `if(isLoading)`. Data is guaranteed available when the component renders.
- **Suspense boundaries**: One `<Suspense>` boundary per independent data section. Place them as granular as possible. For modals/wizards, wrap only the content area (not the modal shell) to avoid flash.
- **Invalidation map**: `src/lib/query-invalidation-map.ts` — single source of truth mapping mutation names to query keys. Mutation hooks never call `invalidateQueries` inline.
- **Colocated skeletons**: Every `<Suspense>` fallback is a dedicated `{Name}Skeleton.tsx` matching the real component's layout exactly.

## Commit Workflow

1. Changes must follow **Conventional Commits** (enforced by commit-msg hook). See `app/COMMIT_CONVENTIONS.md`.
2. Pre-commit hook runs `pnpm lint` — fix all errors before committing.
3. Before committing, consult `docs/agents/` for architecture/pattern alignment.
4. Save commit message to `app/.commits/YYYY-MM-DD-type-description.md`, then `git add . && git commit -F .commits/<file>`.
5. `main` branch is protected — always work on feature branches.
6. Do NOT commit unless explicitly asked.

## Key Constraints

- Unit tests (Phase 1) and integration tests (Phase 2) active. E2E tests (Phase 3) planned.
- Shared package (`@repo/shared`) must be built (`pnpm build` in packages/shared) before other packages can use it — Turbo handles this via `dependsOn: ["^build"]`.
- Database: PostgreSQL via Docker (`docker/docker-compose.yml`). Use `pnpm --filter backend db:migrate:dev` for schema migrations.
- Query keys use **structured arrays** (e.g., `["dashboard", "budget", 6, 2026]`) — flat string keys do NOT match prefix-based invalidation.
