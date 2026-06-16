// src/features/cards/api/cardService.ts

import { clientFetch } from "@/lib/api/client-fetch";
import { CardDTO, CardStatementItem } from "@repo/shared";

export const cardService = {
  fetchAll: () => {
    return clientFetch<CardDTO[]>("cards", { method: "GET" });
  },

  fetchById: (id: string) => {
    return clientFetch<CardDTO | null>(`cards/${id}`, {
      method: "GET",
    });
  },
  fetchByMonth: (year: number, month: number) => {
    return clientFetch<CardStatementItem[]>(`cards/month/${year}/${month}`, {
      method: "GET",
    });
  },
};
