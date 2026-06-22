// src/features/updateCardBalance/api/updateCardService.ts

import { clientFetch } from "@/lib/api/client-fetch";
import { CardCloseInputDTO } from "@repo/shared";

export const updateCardService = {
  updateCardBalance: (data: CardCloseInputDTO) => {
    return clientFetch<void>(`cards/close`, {
      method: "POST",
      body: JSON.stringify(data),
    });
  },
};
