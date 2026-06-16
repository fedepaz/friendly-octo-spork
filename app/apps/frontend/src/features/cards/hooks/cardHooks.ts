// src/features/cards/hooks/cardHooks.ts

import { CardDTO, CardStatementItem } from "@repo/shared";
import { useSuspenseQuery } from "@tanstack/react-query";
import { cardService } from "../api/cardService";

export const cardProfileQueryKeys = {
  all: () => ["cards"] as const,
  byId: (id: string) => [...cardProfileQueryKeys.all(), id] as const,
  byMonth: (year: number, month: number) =>
    [...cardProfileQueryKeys.all(), year, month] as const,
};

export const useCardTransactions = () => {
  return useSuspenseQuery<CardDTO[]>({
    queryKey: cardProfileQueryKeys.all(),
    queryFn: cardService.fetchAll,
    retry: 1, // Retry once to account for transient network issues
  });
};

export const useCardTransactionById = (id: string) => {
  return useSuspenseQuery<CardDTO | null>({
    queryKey: cardProfileQueryKeys.byId(id),
    queryFn: () => cardService.fetchById(id),
    retry: 1, // Retry once to account for transient network issues
  });
};

export const useCardTransactionsByMonth = (year: number, month: number) => {
  return useSuspenseQuery<CardStatementItem[]>({
    queryKey: cardProfileQueryKeys.byMonth(year, month),
    queryFn: () => cardService.fetchByMonth(year, month),
    retry: 1, // Retry once to account for transient network issues
  });
};
