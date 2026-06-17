// src/features/cards/api/cardService.ts

import { clientFetch } from "@/lib/api/client-fetch";
import { CardStatementDTO } from "@repo/shared";

export const cardService = {
  fetchByMonth: (year: number, month: number) => {
    return clientFetch<CardStatementDTO[]>(`cards/month/${year}/${month}`, {
      method: "GET",
    });
  },
};
