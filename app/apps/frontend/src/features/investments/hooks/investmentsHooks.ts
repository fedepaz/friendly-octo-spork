import { useSuspenseQuery } from "@tanstack/react-query";
import { investmentsService } from "../api/investmentsService";
import type { InvestmentDTO } from "../types";
import { investmentQueryKeys } from "@/lib/queryKeys";

export const useInvestments = () => {
  return useSuspenseQuery<InvestmentDTO[]>({
    queryKey: investmentQueryKeys.all(),
    queryFn: investmentsService.fetchAll,
    retry: 1,
  });
};
