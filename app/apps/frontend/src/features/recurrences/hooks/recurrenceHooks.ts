// src/features/recurrences/hooks/useRecurrences.ts

import { RecurrenceDTO } from "@repo/shared";
import { useSuspenseQuery } from "@tanstack/react-query";
import { recurrenceService } from "../api/recurrenceService";

export const recurrenceProfileQueryKeys = {
  all: () => ["recurrences"] as const,
  byId: (id: string) =>
    [...recurrenceProfileQueryKeys.all(), "byId", id] as const,
};

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
