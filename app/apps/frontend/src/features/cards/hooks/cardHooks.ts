// src/features/cards/hooks/cardHooks.ts

import { useSuspenseQuery } from "@tanstack/react-query";
import { cardService } from "../api/cardService";
import { CardStatementDTO } from "@repo/shared";
import { cardProfileQueryKeys } from "@/lib/queryKeys";

export const useCardTransactionsByMonth = (year: number, month: number) => {
  return useSuspenseQuery<CardStatementDTO, Error>({
    queryKey: cardProfileQueryKeys.byMonth(year, month),
    queryFn: () => cardService.fetchByMonth(year, month),
    retry: 1, // Retry once to account for transient network issues
  });
};
