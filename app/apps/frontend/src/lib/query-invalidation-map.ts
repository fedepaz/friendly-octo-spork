// src/lib/query-invalidation-map.ts

import { transactionProfileQueryKeys } from "@/features/transactions/hooks/transactionsHooks";
import { accountProfileQueryKeys } from "@/features/accounts/hooks/accountsHooks";
import { recurrenceProfileQueryKeys } from "@/features/recurrences/hooks/recurrenceHooks";
import { cardProfileQueryKeys } from "@/features/cards/hooks/cardHooks";
import { dashboardQueryKeys } from "@/features/dashboard/hooks/dashboardHooks";
import type { QueryFilters } from "@tanstack/react-query";

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
    { queryKey: cardProfileQueryKeys.all() },
    { queryKey: dashboardQueryKeys.all() },
    { queryKey: transactionProfileQueryKeys.all() },
    { queryKey: accountProfileQueryKeys.all() },
  ],
};
