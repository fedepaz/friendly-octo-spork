// src/features/updateCardBalance/hooks/updateCardHooks.ts

import { CardStatementDTO } from "@repo/shared";
import { updateCardService } from "../api/updateCardService";
import { useSuspenseQuery } from "@tanstack/react-query";

export const updateCardProfileQueryKeys = {
  all: () => ["cards"] as const,
  close: () => [...updateCardProfileQueryKeys.all(), "close"] as const,
  closeByMonth: (year: number, month: number) =>
    [...updateCardProfileQueryKeys.all(), "close", year, month] as const,
};

export const useUpdateCardTransactionsForPayStatement = (
  year: number,
  month: number,
) => {
  return useSuspenseQuery<CardStatementDTO, Error>({
    queryKey: updateCardProfileQueryKeys.closeByMonth(year, month),
    queryFn: () =>
      updateCardService.getCardTransactionsForPayStatement(year, month),
    retry: 1, // Retry once to account for transient network issues
  });
};
