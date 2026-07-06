// src/features/accounts/hooks/useAccounts.ts

import { useSuspenseQuery } from "@tanstack/react-query";
import { accountService } from "../api/accountService";
import { AccountDTO } from "@repo/shared";
import { accountProfileQueryKeys } from "@/lib/queryKeys";

export const useAccounts = () => {
  return useSuspenseQuery<AccountDTO[]>({
    queryKey: accountProfileQueryKeys.all(),
    queryFn: accountService.fetchAll,
    retry: 1, // Retry once to account for transient network issues
  });
};

export const useAccountById = (id: string) => {
  return useSuspenseQuery<AccountDTO | null>({
    queryKey: accountProfileQueryKeys.byId(id),
    queryFn: () => accountService.fetchById(id),
    retry: 1, // Retry once to account for transient network issues
  });
};
