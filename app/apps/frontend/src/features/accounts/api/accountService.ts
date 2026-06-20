// src/features/accounts/api/accountService.ts

import { clientFetch } from "@/lib/api/client-fetch";
import { AccountDTO, CreateAccountInput } from "@repo/shared";

export const accountService = {
  fetchAll: () => {
    return clientFetch<AccountDTO[]>("accounts", { method: "GET" });
  },

  fetchById: (id: string) => {
    return clientFetch<AccountDTO | null>(`accounts/${id}`, {
      method: "GET",
    });
  },

  saveAccount: (data: CreateAccountInput) => {
    return clientFetch<AccountDTO>(`accounts`, {
      method: "POST",
      body: JSON.stringify(data),
    });
  },
};
