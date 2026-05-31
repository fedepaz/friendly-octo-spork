// src/features/transactions/hooks/useAccounts.ts

import { TransactionDTO } from "@repo/shared";
import { useSuspenseQuery } from "@tanstack/react-query";
import { transactionService } from "../api/transactionsService";

export const transactionProfileQueryKeys = {
  all: () => ["transactions"] as const,
  byId: (id: string) =>
    [...transactionProfileQueryKeys.all(), "byId", id] as const,
};

export const useTransactions = () => {
  return useSuspenseQuery<TransactionDTO[]>({
    queryKey: transactionProfileQueryKeys.all(),
    queryFn: transactionService.fetchAll,
    retry: 1, // Retry once to account for transient network issues
  });
};

export const useTransactionById = (id: string) => {
  return useSuspenseQuery<TransactionDTO | null>({
    queryKey: transactionProfileQueryKeys.byId(id),
    queryFn: () => transactionService.fetchById(id),
    retry: 1, // Retry once to account for transient network issues
  });
};
