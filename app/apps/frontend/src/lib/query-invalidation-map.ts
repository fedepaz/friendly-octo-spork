// src/lib/query-invalidation-map.ts

import {
  transactionProfileQueryKeys,
  accountProfileQueryKeys,
  recurrenceProfileQueryKeys,
  cardProfileQueryKeys,
  dashboardQueryKeys,
  updateCardProfileQueryKeys,
  adminPermissionsQueryKeys,
  investmentQueryKeys,
} from "@/lib/queryKeys";
import type { QueryClient, QueryFilters } from "@tanstack/react-query";

type MutationName = "createTransaction" | "createAccount" | "updateCardBalance";

export const mutationInvalidations: Record<MutationName, QueryFilters[]> = {
  createTransaction: [
    { queryKey: transactionProfileQueryKeys.all() },
    { queryKey: accountProfileQueryKeys.all() },
    { queryKey: recurrenceProfileQueryKeys.all() },
    { queryKey: cardProfileQueryKeys.all() },
    { queryKey: dashboardQueryKeys.all() },
    { queryKey: investmentQueryKeys.all() },
  ],
  createAccount: [
    { queryKey: accountProfileQueryKeys.all() },
    { queryKey: dashboardQueryKeys.all() },
    { queryKey: investmentQueryKeys.all() },
  ],
  updateCardBalance: [
    { queryKey: updateCardProfileQueryKeys.all() },
    { queryKey: cardProfileQueryKeys.all() },
    { queryKey: dashboardQueryKeys.all() },
    { queryKey: transactionProfileQueryKeys.all() },
    { queryKey: accountProfileQueryKeys.all() },
  ],
};

type DataCallback = (
  queryClient: QueryClient,
  data: Record<string, unknown>,
) => void;

const dataCallbacks: Record<string, DataCallback> = {
  setUserPermissions: (queryClient, data) => {
    queryClient.invalidateQueries({
      queryKey: adminPermissionsQueryKeys.byUserId(data.userId as string),
    });
    queryClient.invalidateQueries({
      queryKey: adminPermissionsQueryKeys.tables(),
    });
  },
};

export type MutationNameType = keyof typeof mutationInvalidations;

export function invalidateQueries(
  queryClient: QueryClient,
  mutation: MutationNameType | string,
  data?: Record<string, unknown>,
) {
  if (mutation === "setUserPermissions" && data) {
    const callback = dataCallbacks[mutation];
    if (callback) {
      callback(queryClient, data);
    }
    return;
  }
  const entry =
    mutationInvalidations[mutation as MutationNameType];
  if (!entry) return;
  for (const filters of entry) {
    queryClient.invalidateQueries(filters);
  }
}
