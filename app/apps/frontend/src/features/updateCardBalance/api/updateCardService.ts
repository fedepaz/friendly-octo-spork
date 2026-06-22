// src/features/updateCardBalance/api/updateCardService.ts

import { clientFetch } from "@/lib/api/client-fetch";
import { CardCloseInputDTO, CardCloseResponseDTO } from "@repo/shared";

export const updateCardService = {
  updateCardBalance: (data: CardCloseInputDTO) => {
    return clientFetch<CardCloseResponseDTO>(`cards/close`, {
      method: "POST",
      body: JSON.stringify(data),
    });
  },
};
