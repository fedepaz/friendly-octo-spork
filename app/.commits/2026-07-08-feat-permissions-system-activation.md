feat(permissions): activate full RBAC permissions system

- Add Entity, UserPermission, DevAccount models to Prisma schema
- Create EntitiesModule with POST /entities/entity and GET /entities endpoints
- Change PermissionsGuard to deny-by-default (routes without @RequirePermission are rejected)
- Add @RequirePermission() decorators to ALL controller routes (10 controllers)
- Update PermissionsService/Repository to join Entity table instead of MANAGED_ENTITY_ARRAY
- Add GET /permissions/me endpoint for current user's permissions
- Update frontend authService to call real API instead of hardcoded isAdmin: true
- Update usePermission hook to use structured UserPermissions objects
- Remove MANAGED_ENTITIES dead code from shared
- Make seed fully idempotent with upsert everywhere
