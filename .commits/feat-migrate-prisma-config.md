feat: migrate Prisma configuration to prisma.config.ts

Moves the deprecated Prisma configuration from `package.json` to a modern `prisma.config.ts` file, ensuring compatibility with Prisma 7.

Key changes:
- Created `prisma.config.ts` with explicit `schema` and `seed` configuration (under `migrations`).
- Removed the deprecated `"prisma"` block from `package.json`.
- Updated `backend_agent_finance.md` and `initial-setup.md` to reflect the new configuration standard.
- Verified configuration with `bun prisma generate` and `bun prisma db seed`.
