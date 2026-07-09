feat(auth): auto-assign default permissions on registration and fix permissions page scroll

- Auto-assign default permissions to new users on register (CRUD no-delete on financial entities, read-only on reference data, scope OWN)
- Fix user-permissions page scroll: add flex layout to PermissionsDashboard, wrap permission rows in scrollable container
- Inject PermissionsService into AuthService via PermissionsModule
- Update auth service test with PermissionsService mock
