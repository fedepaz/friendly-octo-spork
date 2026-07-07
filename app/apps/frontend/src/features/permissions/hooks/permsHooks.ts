import {
  useSuspenseQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { permissionService } from "../api/permissionService";
import { adminPermissionsQueryKeys } from "@/lib/queryKeys";
import { invalidateQueries } from "@/lib/query-invalidation-map";

export function useTables() {
  return useSuspenseQuery({
    queryKey: adminPermissionsQueryKeys.tables(),
    queryFn: () => permissionService.fetchTables(),
  });
}

export function useUserPermissions(userId: string) {
  return useSuspenseQuery({
    queryKey: adminPermissionsQueryKeys.byUserId(userId),
    queryFn: () => permissionService.fetchUserPermissions(userId),
  });
}

export function useEntityPermissions(entityId: string) {
  return useSuspenseQuery({
    queryKey: adminPermissionsQueryKeys.byEntityId(entityId),
    queryFn: () => permissionService.fetchEntityPermissions(entityId),
  });
}

export function useSetUserPermissions() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: permissionService.setUserPermissions,
    onSuccess: (_data, variables) => {
      invalidateQueries(queryClient, "setUserPermissions", variables);
    },
  });
}
