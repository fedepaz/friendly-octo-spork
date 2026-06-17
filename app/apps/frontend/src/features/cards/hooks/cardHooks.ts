// src/features/cards/hooks/cardHooks.ts

import { useSuspenseQuery } from "@tanstack/react-query";
import { cardService } from "../api/cardService";
import { CardStatementDTO } from "@repo/shared";

export const cardProfileQueryKeys = {
  all: () => ["cards"] as const,
  byId: (id: string) => [...cardProfileQueryKeys.all(), id] as const,
  byMonth: (year: number, month: number) =>
    [...cardProfileQueryKeys.all(), year, month] as const,
};

export const useCardTransactionsByMonth = (year: number, month: number) => {
  return useSuspenseQuery<CardStatementDTO[], Error>({
    queryKey: cardProfileQueryKeys.byMonth(year, month),
    queryFn: () => cardService.fetchByMonth(year, month),
    retry: 1, // Retry once to account for transient network issues
  });
};
