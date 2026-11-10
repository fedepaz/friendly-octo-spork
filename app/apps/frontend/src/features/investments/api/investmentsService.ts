import { clientFetch } from "@/lib/api/client-fetch";

import type { InvestmentDTO } from "../types";

export const investmentsService = {
  fetchAll: () => {
    return clientFetch<InvestmentDTO[]>("investments", { method: "GET" });
  },
};
