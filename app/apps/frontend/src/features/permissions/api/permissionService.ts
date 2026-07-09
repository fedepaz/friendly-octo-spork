import { clientFetch } from "@/lib/api/client-fetch";
import type {
  Entity,
  UserPermissions,
  UserEntityPermission,
} from "@repo/shared";

export const permissionService = {
  fetchTables: () =>
    clientFetch<Entity[]>("permissions/tables", { method: "GET" }),

  fetchUserPermissions: (userId: string) =>
    clientFetch<UserPermissions>(`permissions/user/${userId}`, {
      method: "GET",
    }),

  fetchEntityPermissions: (entityId: string) =>
    clientFetch<UserEntityPermission[]>(`permissions/entity/${entityId}`, {
      method: "GET",
    }),

  setUserPermissions: ({
    userId,
    permissions,
  }: {
    userId: string;
    permissions: Array<{
      tableName: string;
      canCreate: boolean;
      canRead: boolean;
      canUpdate: boolean;
      canDelete: boolean;
      scope: "NONE" | "OWN" | "ALL";
    }>;
  }) =>
    clientFetch<void>(`permissions/user/${userId}`, {
      method: "PATCH",
      body: JSON.stringify({ permissions }),
    }),
};
