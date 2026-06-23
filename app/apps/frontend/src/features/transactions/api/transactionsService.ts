// src/features/transactions/api/transactionsService.ts

import { clientFetch } from "@/lib/api/client-fetch";
import { PaginatedResponse, TransactionDTO } from "@repo/shared";

export const transactionService = {
  fetchAll: (page = 1, limit = 50) => {
    return clientFetch<PaginatedResponse<TransactionDTO>>(
      `transactions?page=${page}&limit=${limit}`,
      { method: "GET" },
    );
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
