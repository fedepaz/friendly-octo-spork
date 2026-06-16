// src/features/cards/api/cardService.ts

import { clientFetch } from "@/lib/api/client-fetch";
import { CardDTO } from "@repo/shared";

export const cardService = {
  fetchAll: () => {
    return clientFetch<CardDTO[]>("cards", { method: "GET" });
  },

  fetchById: (id: string) => {
    return clientFetch<CardDTO | null>(`cards/${id}`, {
      method: "GET",
    });
  },
};
