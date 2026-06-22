// src/features/updateCardBalance/hooks/updateCardMutationHooks.ts

import { CardCloseInputDTO } from "@repo/shared";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCardService } from "../api/updateCardService";
import { mutationInvalidations } from "@/lib/query-invalidation-map";
import { toast } from "sonner";

export const useUpdateCardBalance = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, CardCloseInputDTO>({
    mutationFn: updateCardService.updateCardBalance,
    onSuccess: () => {
      mutationInvalidations.updateCardBalance.forEach((filters) => {
        queryClient.invalidateQueries(filters);
      });

      const msg = `Actualizado el saldo de tarjeta`;
      toast.success(msg, { duration: 3000 });
    },
    onError: (error) => {
      toast.error(error.message, { duration: 3000 });
    },
  });
};
