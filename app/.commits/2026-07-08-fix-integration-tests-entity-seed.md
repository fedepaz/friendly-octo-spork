fix(backend): fix integration tests and user_profile entity permissions

- Seed entities in test setup so newly registered users get permissions
- Update cleanDatabase to truncate AuditLog and UserPermission tables
- Change user_profile entity from READ_ONLY to CRUD (users need to update password)
