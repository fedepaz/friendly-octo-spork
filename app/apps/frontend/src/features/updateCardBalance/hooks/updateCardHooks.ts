// src/features/updateCardBalance/hooks/updateCardHooks.ts

import { CardStatementDTO } from "@repo/shared";
import { updateCardService } from "../api/updateCardService";
import { useSuspenseQuery } from "@tanstack/react-query";
import { updateCardProfileQueryKeys } from "@/lib/queryKeys";

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
