// src/features/recurrences/api/recurrencesService.ts

import { clientFetch } from "@/lib/api/client-fetch";
import { RecurrenceDTO } from "@repo/shared";

export const recurrenceService = {
  fetchAll: () => {
    return clientFetch<RecurrenceDTO[]>("recurrences", { method: "GET" });
  },

  fetchById: (id: string) => {
    return clientFetch<RecurrenceDTO | null>(`recurrences/${id}`, {
      method: "GET",
    });
  },
};
