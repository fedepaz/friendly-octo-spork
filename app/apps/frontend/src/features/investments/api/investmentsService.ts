import { clientFetch } from "@/lib/api/client-fetch";

export interface InvestmentDTO {
  id: string;
  name: string;
  currency: string;
  principal: string;
  totalEarned: string;
  totalValue: string;
  transactionCount: number;
}

export const investmentsService = {
  fetchAll: () => {
    return clientFetch<InvestmentDTO[]>("investments", { method: "GET" });
  },
};
