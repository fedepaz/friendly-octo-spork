// src/lib/query-invalidation-map.ts

import {
  transactionProfileQueryKeys,
  accountProfileQueryKeys,
  recurrenceProfileQueryKeys,
  cardProfileQueryKeys,
  dashboardQueryKeys,
  updateCardProfileQueryKeys,
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
  ],
  createAccount: [
    { queryKey: accountProfileQueryKeys.all() },
    { queryKey: dashboardQueryKeys.all() },
  ],
  updateCardBalance: [
    { queryKey: updateCardProfileQueryKeys.all() },
    { queryKey: cardProfileQueryKeys.all() },
    { queryKey: dashboardQueryKeys.all() },
    { queryKey: transactionProfileQueryKeys.all() },
    { queryKey: accountProfileQueryKeys.all() },
  ],
};

export type MutationNameType = keyof typeof mutationInvalidations;

export function invalidateQueries(
  queryClient: QueryClient,
  mutation: MutationNameType,
) {
  const entry = mutationInvalidations[mutation];
  if (!entry) return;
  for (const filters of entry) {
    queryClient.invalidateQueries(filters);
  }
}
