// src/hooks/usePermission.ts

/**
 * Stub hook for permissions.
 * In a single-user app, we allow all operations.
 */
export function usePermission(tableName?: string) {
  return {
    canCreate: true,
    canRead: true,
    canUpdate: true,
    canDelete: true,
    canExecute: true,
  };
}
