// src/hooks/usePermission.ts

import { usePermissions } from "@/features/auth/hooks/use-permissions";
import type {
  NavigationConfig,
  NavigationItem,
  NavigationSubGroup,
} from "@/lib/config/navigation.types";

export function usePermission(tableName?: string) {
  const { data: userPermissions } = usePermissions();

  if (!userPermissions) {
    return {
      canCreate: true,
      canRead: true,
      canUpdate: true,
      canDelete: true,
      canExecute: true,
    };
  }

  if (userPermissions.isAdmin) {
    return {
      canCreate: true,
      canRead: true,
      canUpdate: true,
      canDelete: true,
      canExecute: true,
    };
  }

  if (!tableName) {
    return {
      canCreate: false,
      canRead: false,
      canUpdate: false,
      canDelete: false,
      canExecute: false,
    };
  }

  const perms = userPermissions.permissions;
  return {
    canCreate: perms.includes(`${tableName}:create`),
    canRead: perms.includes(`${tableName}:read`),
    canUpdate: perms.includes(`${tableName}:update`),
    canDelete: perms.includes(`${tableName}:delete`),
    canExecute: perms.includes(`${tableName}:execute`),
  };
}

function hasReadPermission(
  item: NavigationItem,
  userPermissions: { isAdmin: boolean; permissions: string[] },
): boolean {
  if (!item.requiredPermission) return true;
  if (userPermissions.isAdmin) return true;
  const key = `${item.requiredPermission.table}:${item.requiredPermission.action}`;
  return userPermissions.permissions.includes(key);
}

function filterItems(
  items: NavigationItem[],
  userPermissions: { isAdmin: boolean; permissions: string[] },
): NavigationItem[] {
  return items.filter((item) => hasReadPermission(item, userPermissions));
}

function isSubGroup(
  item: NavigationSubGroup | NavigationItem,
): item is NavigationSubGroup {
  return "kind" in item && item.kind === "subGroup";
}

export function useFilteredNavigation(config: NavigationConfig): NavigationConfig {
  const { data: userPermissions } = usePermissions();

  if (!userPermissions) return config;

  return config
    .map((entry) => {
      switch (entry.kind) {
        case "standalone":
          return hasReadPermission(entry, userPermissions) ? entry : null;

        case "group": {
          const items = filterItems(entry.items, userPermissions);
          return items.length > 0 ? { ...entry, items } : null;
        }

        case "nestedGroup": {
          const items = entry.items
            .map((item) => {
              if (isSubGroup(item)) {
                const filtered = filterItems(item.items, userPermissions);
                return filtered.length > 0
                  ? { ...item, items: filtered }
                  : null;
              }
              return hasReadPermission(item, userPermissions) ? item : null;
            })
            .filter((item): item is NonNullable<typeof item> => item !== null);
          return items.length > 0 ? { ...entry, items } : null;
        }

        default:
          return null;
      }
    })
    .filter((entry): entry is NonNullable<typeof entry> => entry !== null);
}
