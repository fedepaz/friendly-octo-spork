// src/hooks/usePermission.ts

/**
 * Stub hook for permissions.
 * In a single-user app, we allow all operations.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function usePermission(_tableName?: string) {
  return {
    canCreate: true,
    canRead: true,
    canUpdate: true,
    canDelete: true,
    canExecute: true,
  };
}
