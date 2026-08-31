import { useSuspenseQuery } from "@tanstack/react-query";
import { investmentsService, InvestmentDTO } from "../api/investmentsService";
import { investmentQueryKeys } from "@/lib/queryKeys";

export const useInvestments = () => {
  return useSuspenseQuery<InvestmentDTO[]>({
    queryKey: investmentQueryKeys.all(),
    queryFn: investmentsService.fetchAll,
    retry: 1,
  });
};
