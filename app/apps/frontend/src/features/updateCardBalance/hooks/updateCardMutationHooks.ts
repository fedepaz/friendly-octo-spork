// src/features/updateCardBalance/hooks/updateCardMutationHooks.ts

import { CardCloseInputDTO, CardCloseResponseDTO } from "@repo/shared";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCardService } from "../api/updateCardService";
import { invalidateQueries } from "@/lib/query-invalidation-map";
import { toast } from "sonner";

export const useUpdateCardBalance = () => {
  const queryClient = useQueryClient();

  return useMutation<CardCloseResponseDTO, Error, CardCloseInputDTO>({
    mutationFn: updateCardService.updateCardBalance,
    onSuccess: (data) => {
      invalidateQueries(queryClient, "updateCardBalance");

      const msg = `Actualizado el saldo de tarjeta ${data.accountName} con saldo ${data.closeBalance}`;
      toast.success(msg, { duration: 3000 });
    },
    onError: (error) => {
      toast.error(error.message, { duration: 3000 });
    },
  });
};
