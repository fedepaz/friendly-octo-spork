# Design: Update docs/agents with Latest Changes

## Context

Three major systems were built after the 8 agent profiles were written:
1. **Permissions system (RBAC)** — Entity/UserPermission/DevAccount models, deny-by-default guard, RequirePermission decorator, permissions controller/service/repository
2. **Audit logs system** — AuditLog model, AuditCrudInterceptor, audit log controller/service/repository
3. **Frontend navigation restructuring** — nestedGroup/subGroup types, requiredPermission on nav items

One factual error: BCRYPT_ROUNDS is 12, not 10.

## Changes by Agent

### 1. architect_agent_finance.md
- Add Entity, UserPermission, DevAccount, AuditLog models to Prisma schema section
- Add PermissionScope and PermissionType enums
- Add permissions system architecture overview
- Add audit logging architecture overview

### 2. backend_agent_finance.md
- Add permissions module section (controller, service, repository, guard, decorator, interfaces)
- Add auto-permissions on registration flow
- Add AuditCrudInterceptor section
- Fix BCRYPT_ROUNDS: 10 → 12

### 3. devops_agent_finance.md
- Add deployment flow (entrypoint.sh, prisma migrate deploy)
- Add Docker Compose structure (nginx, nextjs, api, db)
- Add GHCR image references

### 4. frontend_agent_finance.md
- Add permissions feature (api, components, hooks, types)
- Add audit logs feature (api, components, hooks, tests)
- Add sidebar restructuring: nestedGroup, subGroup, requiredPermission
- Add NavigationNestedGroup and NavigationSubGroup types

### 5. pm_agent_finance.md
- Add permissions system as P0 feature
- Add audit logging as P1 feature

### 6. qa_agent_finance.md
- Add integration test patterns (test/integration/ structure, helpers, setup)
- Add permissions-specific test patterns
- Add audit log test patterns

### 7. security_agent_finance.md
- Add PermissionsGuard (deny-by-default) as primary auth mechanism
- Add AuditCrudInterceptor as security/observability
- Add requiredPermission on frontend navigation
- Add sensitive field redaction in audit interceptor

### 8. ux_agent_finance.md
- Add permissions UI (PermissionsDashboard, permissions-user-manager)
- Add audit logs UI (auditLog-dashboard, data table)
- Add sidebar restructuring with nested groups

## Scope

- Update all 8 agent files
- No new files created
- No code changes — documentation only
