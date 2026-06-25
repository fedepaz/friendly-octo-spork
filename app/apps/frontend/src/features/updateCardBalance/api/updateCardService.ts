// src/features/updateCardBalance/api/updateCardService.ts

import { clientFetch } from "@/lib/api/client-fetch";
import {
  CardCloseInputDTO,
  CardCloseResponseDTO,
  CardStatementDTO,
} from "@repo/shared";

export const updateCardService = {
  updateCardBalance: (data: CardCloseInputDTO) => {
    return clientFetch<CardCloseResponseDTO>(`cards/close`, {
      method: "POST",
      body: JSON.stringify(data),
    });
  },
  getCardTransactionsForPayStatement: (year: number, month: number) => {
    return clientFetch<CardStatementDTO>(`cards/close/${year}/${month}`, {
      method: "GET",
    });
  },
};
