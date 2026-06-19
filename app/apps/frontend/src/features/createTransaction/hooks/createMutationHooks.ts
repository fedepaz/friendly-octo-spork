// src/features/createTransaction/hooks/createMutationHooks.ts

import { CreateTransactionInput, TransactionDTO } from "@repo/shared";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createService } from "../api/createService";
import { toast } from "sonner";

export const useCreateTransaction = () => {
  const queryClient = useQueryClient();

  return useMutation<TransactionDTO, Error, CreateTransactionInput>({
    mutationFn: createService.saveTransaction,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["accounts"] });
      queryClient.invalidateQueries({ queryKey: ["recurrences"] });
      queryClient.invalidateQueries({ queryKey: ["cards"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });

      const msg = `Creada la transacción: ${data.description}`;
      toast.success(msg, { duration: 3000 });
    },
    onError: (error) => {
      toast.error(error.message, { duration: 3000 });
    },
  });
};
