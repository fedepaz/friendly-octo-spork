-- Insert required entity data for the permissions system
-- These are required reference data, not optional seed data

INSERT INTO "entities" ("id", "name", "label", "permissionType", "isActive", "createdAt", "updatedAt") VALUES
  (gen_random_uuid(), 'users', 'Usuarios', 'CRUD', true, NOW(), NOW()),
  (gen_random_uuid(), 'user_permissions', 'Permisos', 'CRUD', true, NOW(), NOW()),
  (gen_random_uuid(), 'accounts', 'Cuentas', 'CRUD', true, NOW(), NOW()),
  (gen_random_uuid(), 'transactions', 'Transacciones', 'CRUD', true, NOW(), NOW()),
  (gen_random_uuid(), 'recurrences', 'Recurrencias', 'CRUD', true, NOW(), NOW()),
  (gen_random_uuid(), 'cards', 'Tarjetas', 'CRUD', true, NOW(), NOW()),
  (gen_random_uuid(), 'categories', 'Categorías', 'READ_ONLY', true, NOW(), NOW()),
  (gen_random_uuid(), 'dashboard', 'Dashboard', 'READ_ONLY', true, NOW(), NOW()),
  (gen_random_uuid(), 'audit_logs', 'Auditoría', 'READ_ONLY', true, NOW(), NOW()),
  (gen_random_uuid(), 'user_profile', 'Perfil', 'CRUD', true, NOW(), NOW())
ON CONFLICT ("name") DO NOTHING;
