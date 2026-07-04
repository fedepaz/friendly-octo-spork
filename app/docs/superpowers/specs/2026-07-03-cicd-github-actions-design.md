# CI/CD with GitHub Actions — Design Spec

## Overview

Replace the existing single-purpose `test.yml` workflow with a three-file GitHub Actions setup that covers the full pipeline: reusable test suite, PR gating, and deployment to GHCR.

## Goals

- PRs to `dev` or `main` must pass lint + unit + integration tests before merge
- Pushes to `main` build and push Docker images to GitHub Container Registry
- Deploy step is a placeholder — manual `docker compose pull && up -d` for now
- DRY: test logic defined once in a reusable workflow

## Non-Goals

- Automated deploy to server (placeholder only)
- Preview environments for feature branches
- Release versioning or changelog generation

## Branch Strategy

```
feature/* → dev → main
```

- `feature/*`: working branches, one per feature
- `dev`: staging — PR required, tests must pass
- `main`: production — PR required, tests must pass, deploy triggers here

## Workflow Structure

```
appFinance/                  # repo root (where .git lives)
├── .github/
│   ├── actions/
│   │   └── setup/
│   │       └── action.yml   # Composite action: checkout + pnpm + node + install + prisma
│   └── workflows/
│       ├── ci-test.yml      # Reusable workflow (workflow_call)
│       ├── pr-checks.yml    # PR gate → dev or main
│       └── deploy.yml       # Push to main → test + build + deploy placeholder
└── app/                     # pnpm monorepo root
    ├── apps/
    ├── packages/
    └── package.json
```

**Key detail**: `.github/` lives at the repo root (`appFinance/`), NOT inside `app/`. GitHub Actions only reads workflows from the repository root.

**Composite action** (`.github/actions/setup/action.yml`): Bundles the repeated setup steps (checkout, pnpm, node, install, prisma generate) into a single reusable action. All 3 jobs in `ci-test.yml` call this instead of duplicating 6 steps each. Change the setup once, apply everywhere.

**Deleted**: `test.yml` (superseded by `pr-checks.yml`)

---

## Workflow: `ci-test.yml` (Reusable)

**Trigger**: `workflow_call`

All 3 jobs use the composite action `./.github/actions/setup` for setup:

```yaml
- uses: ./.github/actions/setup
```

This single step does: checkout → pnpm (pinned to `10.33.2`) → Node 20 → `pnpm install` → `prisma generate`.

### Jobs

#### 1. `lint`

- Setup (composite action)
- Build shared package (`pnpm build --filter=@repo/shared`) — `working-directory: app`
- Run linter (`pnpm lint`) — `working-directory: app`

#### 2. `unit-tests`

- Setup (composite action)
- Build shared package — `working-directory: app`
- Run unit tests (`pnpm test`) — `working-directory: app`

#### 3. `integration-tests`

- **Services**: `postgres:16-alpine` with test DB
  - `POSTGRES_USER: test`
  - `POSTGRES_PASSWORD: test`
  - `POSTGRES_DB: appfinance_test`
  - Health check: `pg_isready`
- Setup (composite action)
- Build shared package — `working-directory: app`
- Run Prisma migrations (`npx prisma migrate deploy`) — `working-directory: app/apps/backend`
- Run integration tests with env vars — `working-directory: app/apps/backend`:
  - `DATABASE_URL=postgresql://test:test@localhost:5432/appfinance_test`
  - `JWT_SECRET`, `JWT_REFRESH_SECRET`, `JWT_EXPIRES_IN`, `JWT_REFRESH_EXPIRES_IN`
  - `DEFAULT_PASSWORD=123456`
  - `BACKEND_NODE_ENV=development`
  - `PORT=3001`

---

## Workflow: `pr-checks.yml`

**Trigger**: `pull_request` targeting `dev` or `main`

### Jobs

Single job — calls the reusable workflow:

```yaml
jobs:
  test:
    uses: ./.github/workflows/ci-test.yml
```

---

## Workflow: `deploy.yml`

**Trigger**: `push` to `main` only

### Jobs

#### 1. `test`
- Calls `ci-test.yml` (full test suite as final sanity check)

#### 2. `build-and-push` (needs: test)
- Checkout
- Login to GHCR (`ghcr.io`) using `GITHUB_TOKEN`
- Build and push backend Docker image:
  - Tag: `ghcr.io/fedepaz/appfinance-backend:main-<sha>`
  - Tag: `ghcr.io/fedepaz/appfinance-backend:latest`
- Build and push frontend Docker image:
  - Tag: `ghcr.io/fedepaz/appfinance-frontend:main-<sha>`
  - Tag: `ghcr.io/fedepaz/appfinance-frontend:latest`
  - Build arg: `NEXT_PUBLIC_API_URL=${{ vars.NEXT_PUBLIC_API_URL }}` (from GitHub Actions variable)
  - `no-cache: true` — forces fresh build every time to ensure `NEXT_PUBLIC_API_URL` is correctly baked into the image (Docker layer cache doesn't invalidate on build-arg value changes)

#### 3. `deploy` (needs: build-and-push)
- **Placeholder** — empty job with TODO comment
- This is where SSH + docker compose pull/restart (or other mechanism) will go

---

## Image Tagging Convention

- SHA-based: `main-<commit-sha>` (immutable, traceable)
- `latest` tag also applied for convenience
- No semver — not needed until release process is defined

## GitHub Action Versions

Pinned to current majors (verified against Context7 docs, July 2026):

| Action | Version | Reason |
|--------|---------|--------|
| `actions/checkout` | `@v6` | Node 24 support, avoids deprecation warnings |
| `actions/setup-node` | `@v6` | Same |
| `pnpm/action-setup` | `@v6` | Same |
| `docker/login-action` | `@v4` | Current stable |
| `docker/build-push-action` | `@v7` | Current stable, esbuild bundler, Node 24 target |

**Node.js 20 EOL note**: GitHub Actions runners will force Node.js 24 by default starting June 2, 2026. Node.js 20 will be fully removed in September 2026. v4-generation actions will emit deprecation warnings and eventually stop working. Pinning to current majors avoids this.

## Secrets Required

- `GITHUB_TOKEN` — automatically available in GitHub Actions, used for GHCR auth

## Environment Variables

### GitHub Actions Variables

Set in repo Settings → Secrets and variables → Actions → Variables tab:

| Variable | Value | Purpose |
|----------|-------|---------|
| `NEXT_PUBLIC_API_URL` | `https://finance.cabecitanegra.dpdns.org/api` | Frontend API base URL, baked into Next.js bundle at build time |

**Important**: `NEXT_PUBLIC_*` variables are inlined at build time by Next.js. The value is string-replaced in the JavaScript bundle during `docker build`. Changing this variable requires rebuilding the frontend image.

### Docker Compose Deploy Variables

Set in `docker/.env` (not committed to git):

| Variable | Purpose |
|----------|---------|
| `POSTGRES_USER` | PostgreSQL username |
| `POSTGRES_PASSWORD` | PostgreSQL password |
| `NGINX_HOST_PORT` | External port for nginx (default: 8081) |
| `SERVER_NAME` | Domain name for nginx server_name directive |
| `NEXT_PUBLIC_API_URL` | Must match GitHub Actions variable for local builds |

---

## Docker Compose Deploy Configuration

The `docker/docker-compose.deploy.yml` file pulls pre-built images from GHCR instead of building from Dockerfiles. This follows the "build once, deploy anywhere" pattern.

### Why `image:` instead of `build:`

| Approach | Build location | Config flexibility | Image reuse |
|----------|---------------|-------------------|-------------|
| `build:` | Server builds from Dockerfile | Config baked at build time | Must rebuild per environment |
| `image:` (GHCR) | CI builds once, pushes to registry | Same image, different `.env` | Single image works everywhere |

**Current setup**: CI builds images with `NEXT_PUBLIC_API_URL` baked in. Server pulls images and configures other variables via `.env`.

### Service Configuration

```yaml
services:
  nginx:
    image: nginx:alpine              # Public image from Docker Hub
    # ... config from .env

  nextjs:
    image: ghcr.io/fedepaz/appfinance-frontend:latest  # From GHCR
    # ... config from .env

  api:
    image: ghcr.io/fedepaz/appfinance-backend:latest   # From GHCR
    # ... config from .env

  db:
    image: postgres:16-alpine        # Public image from Docker Hub
    # ... config from .env
```

---

## Server Deployment Workflow

### Prerequisites

- Docker and Docker Compose installed on server
- `.env` file with production credentials
- `nginx.conf.template` file
- Access to GHCR (images are public, no auth needed)

### Files needed on server

```
/deploy/
├── docker-compose.deploy.yml
├── nginx.conf.template
└── .env                    # secrets (never commit this)
```

### Deployment commands

After CI pushes new images to GHCR:

```bash
# Pull new images
docker compose -f docker-compose.deploy.yml pull

# Restart services with new images
docker compose -f docker-compose.deploy.yml up -d

# Check logs
docker compose -f docker-compose.deploy.yml logs -f
```

### First-time setup

If starting fresh (no existing database):

```bash
# Pull and start all services
docker compose -f docker-compose.deploy.yml up -d

# Check status
docker compose -f docker-compose.deploy.yml ps
```

If migrating from local dev (existing volume with different credentials):

```bash
# Wipe volume and start fresh
docker compose -f docker-compose.deploy.yml down -v
docker compose -f docker-compose.deploy.yml up -d
```

---

## What's Still Open

- **Automated deploy**: SSH + docker compose pull/restart (or Watchtower/self-hosted runner) — currently manual
- **Branch protection rules**: Must be configured manually in GitHub Settings → Branches for `dev` and `main` (required PR, required status checks)
- **NEXT_PUBLIC_API_URL runtime injection**: Consider using `next-public-env` package to avoid rebuilds when API URL changes (see research notes)
