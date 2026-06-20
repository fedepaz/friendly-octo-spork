// src/features/accounts/hooks/useAccounts.ts

import { useSuspenseQuery } from "@tanstack/react-query";
import { accountService } from "../api/accountService";
import { AccountDTO } from "@repo/shared";

export const accountProfileQueryKeys = {
  all: () => ["accounts"] as const,
  byId: (id: string) => [...accountProfileQueryKeys.all(), "byId", id] as const,
};

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
