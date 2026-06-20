// src/features/transactions/api/transactionsService.ts

import { clientFetch } from "@/lib/api/client-fetch";
import { TransactionDTO } from "@repo/shared";

export const transactionService = {
  fetchAll: () => {
    return clientFetch<TransactionDTO[]>("transactions", { method: "GET" });
  },

  fetchById: (id: string) => {
    return clientFetch<TransactionDTO | null>(`transactions/${id}`, {
      method: "GET",
    });
  },
  fetchByMonth: (month: number, year: number) => {
    return clientFetch<TransactionDTO[]>(
      `transactions/month/${month}/${year}`,
      { method: "GET" },
    );
  },
};
