// src/features/updateCardBalance/hooks/updateCardMutationHooks.ts

import { CardCloseInputDTO, CardCloseResponseDTO } from "@repo/shared";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCardService } from "../api/updateCardService";
import { invalidateQueries } from "@/lib/query-invalidation-map";
import { toast } from "sonner";
import { useTranslations } from "next-intl";

export const useUpdateCardBalance = () => {
  const queryClient = useQueryClient();
  const ucbT = useTranslations("UpdateCardBalanceHooks");

  return useMutation<CardCloseResponseDTO, Error, CardCloseInputDTO>({
    mutationFn: updateCardService.updateCardBalance,
    onSuccess: (data) => {
      invalidateQueries(queryClient, "updateCardBalance");

      const msg = ucbT("toastSuccess", {
        account: data.accountName ?? "",
        balance: data.closeBalance ?? "",
      });
      toast.success(msg, { duration: 3000 });
    },
    onError: (error) => {
      toast.error(error.message, { duration: 3000 });
    },
  });
};
