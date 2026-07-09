// src/features/transactions/hooks/transactionsHooks.ts

import { TransactionDTO } from "@repo/shared";
import { useSuspenseQuery } from "@tanstack/react-query";
import { transactionService } from "../api/transactionsService";
import { transactionProfileQueryKeys } from "@/lib/queryKeys";

export const useTransactions = (page = 1, limit = 50) => {
  return useSuspenseQuery({
    queryKey: [...transactionProfileQueryKeys.all(), { page, limit }],
    queryFn: () => transactionService.fetchAll(page, limit),
    select: (response) => response.data,
    retry: 1,
  });
};

export const useTransactionById = (id: string) => {
  return useSuspenseQuery<TransactionDTO | null>({
    queryKey: transactionProfileQueryKeys.byId(id),
    queryFn: () => transactionService.fetchById(id),
    retry: 1, // Retry once to account for transient network issues
  });
};

export const useTransactionsByMonth = (month: number, year: number) => {
  return useSuspenseQuery<TransactionDTO[]>({
    queryKey: transactionProfileQueryKeys.byMonth(month, year),
    queryFn: () => transactionService.fetchByMonth(month, year),
    retry: 1, // Retry once to account for transient network issues
  });
};
