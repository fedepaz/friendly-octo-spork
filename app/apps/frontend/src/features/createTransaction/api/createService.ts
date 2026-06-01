// src/features/createTransaction/api/createService.ts

import { clientFetch } from "@/lib/api/client-fetch";
import { CreateTransactionInput, TransactionDTO } from "@repo/shared";

export const createService = {
  saveTransaction: (data: CreateTransactionInput) => {
    return clientFetch<TransactionDTO>(`transactions`, {
      method: "POST",
      body: JSON.stringify(data),
    });
  },
};
