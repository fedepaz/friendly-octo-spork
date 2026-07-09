// src/features/recurrences/hooks/useRecurrences.ts

import { RecurrenceDTO, TransactionType } from "@repo/shared";
import { useSuspenseQuery } from "@tanstack/react-query";
import { recurrenceService } from "../api/recurrenceService";
import { recurrenceProfileQueryKeys } from "@/lib/queryKeys";

export const useRecurrences = () => {
  return useSuspenseQuery<RecurrenceDTO[]>({
    queryKey: recurrenceProfileQueryKeys.all(),
    queryFn: recurrenceService.fetchAll,
    retry: 1, // Retry once to account for transient network issues
  });
};

export const useRecurrenceById = (id: string) => {
  return useSuspenseQuery<RecurrenceDTO | null>({
    queryKey: recurrenceProfileQueryKeys.byId(id),
    queryFn: () => recurrenceService.fetchById(id),
    retry: 1, // Retry once to account for transient network issues
  });
};

export const useRecurrencesByMonth = (
  month: number,
  year: number,
  type: TransactionType,
) => {
  return useSuspenseQuery<RecurrenceDTO[]>({
    queryKey: recurrenceProfileQueryKeys.byMonth(month, year, type),
    queryFn: () => recurrenceService.fetchByMonth(month, year, type),
    retry: 1, // Retry once to account for transient network issues
  });
};
