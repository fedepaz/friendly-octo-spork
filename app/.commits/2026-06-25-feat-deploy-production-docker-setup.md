feat(deploy): production Docker setup with Nginx, healthchecks, and i18n

Docker multi-stage builds for frontend (Next.js standalone) and backend
(NestJS + Prisma). Nginx reverse proxy with security hardening, rate
limiting, Cloudflare IP passthrough, and JSON analytics logging. Docker
Compose orchestrator with healthchecks and isolated networking.

Backend deps: prisma and pino-pretty promoted to production dependencies;
logger refactored to async factory for ESM-safe dynamic import. Frontend:
standalone output mode, i18n-aware navigation in auth-header,
useSyncExternalStore for useIsMounted (React 19).

Full stack verified: health, registration, DB migrations, i18n routing
(es/en), and Nginx proxying all confirmed working.
