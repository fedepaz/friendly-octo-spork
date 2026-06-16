// src/features/cards/hooks/cardHooks.ts

import { CardDTO } from "@repo/shared";
import { useSuspenseQuery } from "@tanstack/react-query";
import { cardService } from "../api/cardService";

export const cardProfileQueryKeys = {
  all: () => ["cards"] as const,
  byId: (id: string) => [...cardProfileQueryKeys.all(), id] as const,
};

export const useCardExpenses = () => {
  return useSuspenseQuery<CardDTO[]>({
    queryKey: cardProfileQueryKeys.all(),
    queryFn: cardService.fetchAll,
    retry: 1, // Retry once to account for transient network issues
  });
};

export const useRecurrenceById = (id: string) => {
  return useSuspenseQuery<CardDTO | null>({
    queryKey: cardProfileQueryKeys.byId(id),
    queryFn: () => cardService.fetchById(id),
    retry: 1, // Retry once to account for transient network issues
  });
};
