// packages/shared/src/constants/managed-entities.ts
import { PermissionType } from "../schemas/permissions.schema";

export const SYSTEM_ENTITIES = [
  "user_profile",
  "dev_account",
  "audit_logs",
  "entities",
] as const;

export const MANAGED_ENTITIES = {
  USER: {
    tableName: "users",
    label: "Usuarios",
    permissionType: "PROCESS" as PermissionType,
  },
  USER_PERMISSION: {
    tableName: "user_permissions",
    label: "Permisos",
    permissionType: "CRUD" as PermissionType,
  },
} as const;

export const MANAGED_ENTITY_ARRAY = Object.values(MANAGED_ENTITIES);
export type ManagedEntityKey = keyof typeof MANAGED_ENTITIES;
export type ManagedTableName =
  (typeof MANAGED_ENTITIES)[ManagedEntityKey]["tableName"];

export const ALLOWED_TABLE_NAMES = MANAGED_ENTITY_ARRAY.map(
  (e) => e.tableName,
) as [ManagedTableName, ...ManagedTableName[]];