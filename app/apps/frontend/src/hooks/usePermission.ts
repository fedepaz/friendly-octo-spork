// src/hooks/usePermission.ts

import { usePermissions } from "@/features/auth/hooks/use-permissions";
import type { UserPermissions } from "@repo/shared";
import type {
  NavigationConfig,
  NavigationItem,
  NavigationSubGroup,
} from "@/lib/config/navigation.types";

export function usePermission(tableName?: string) {
  const { data: userPermissions } = usePermissions();

  if (!userPermissions || Object.keys(userPermissions).length === 0) {
    return {
      canCreate: false,
      canRead: false,
      canUpdate: false,
      canDelete: false,
    };
  }

  if (!tableName) {
    return {
      canCreate: false,
      canRead: false,
      canUpdate: false,
      canDelete: false,
    };
  }

  const perm = userPermissions[tableName];
  if (!perm) {
    return {
      canCreate: false,
      canRead: false,
      canUpdate: false,
      canDelete: false,
    };
  }

  return {
    canCreate: perm.canCreate,
    canRead: perm.canRead,
    canUpdate: perm.canUpdate,
    canDelete: perm.canDelete,
  };
}

function hasReadPermission(
  item: NavigationItem,
  userPermissions: UserPermissions,
): boolean {
  if (!item.requiredPermission) return true;
  const perm = userPermissions[item.requiredPermission.tableName];
  if (!perm) return false;
  return perm.canRead;
}

function filterItems(
  items: NavigationItem[],
  userPermissions: UserPermissions,
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

  if (!userPermissions || Object.keys(userPermissions).length === 0) return config;

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
