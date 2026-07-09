refactor(shared): rename UserPermissions to AuthUserPermissions and add audit log + permissions schemas

- Rename UserPermissions to AuthUserPermissions in auth.schema.ts to avoid collision with permissions system
- Add AuditLogSchema, AuditActionTypeSchema, EntityTypeSchema in auditLog.schema.ts
- Add permissions.schema.ts with TablePermission, UserPermissions, Entity types
- Add managed-entities.ts with SYSTEM_ENTITIES and MANAGED_ENTITIES constants
- Update auth.schema.spec.ts for renamed type
