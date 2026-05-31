// src/features/transactions/api/transactionsService.ts

import { clientFetch } from "@/lib/api/client-fetch";
import { CreateTransactionInput, TransactionDTO } from "@repo/shared";

export const transactionService = {
  fetchAll: () => {
    return clientFetch<TransactionDTO[]>("transactions", { method: "GET" });
  },

  fetchById: (id: string) => {
    return clientFetch<TransactionDTO | null>(`transactions/${id}`, {
      method: "GET",
    });
  },

  saveTransaction: (data: CreateTransactionInput) => {
    return clientFetch<TransactionDTO>(`transactions`, {
      method: "POST",
      body: JSON.stringify(data),
    });
  },
};
