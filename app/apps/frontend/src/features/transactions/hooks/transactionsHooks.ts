// src/features/transactions/hooks/transactionsHooks.ts

import { TransactionDTO } from "@repo/shared";
import { useSuspenseQuery } from "@tanstack/react-query";
import { transactionService } from "../api/transactionsService";

export const transactionProfileQueryKeys = {
  all: () => ["transactions"] as const,
  byId: (id: string) =>
    [...transactionProfileQueryKeys.all(), "byId", id] as const,
  byMonth: (month: number, year: number) =>
    [...transactionProfileQueryKeys.all(), "byMonth", month, year] as const,
};

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
