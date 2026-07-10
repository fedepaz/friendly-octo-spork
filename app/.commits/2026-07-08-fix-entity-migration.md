fix(backend): add entity seed migration and revert entrypoint.sh

- Create Prisma migration to INSERT required entity data (10 entities)
- Revert entrypoint.sh to original (no seed in production entrypoint)
- Entities are required reference data, not optional seed data
