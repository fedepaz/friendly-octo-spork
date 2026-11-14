// src/features/createTransaction/hooks/createMutationHooks.ts

import { CreateTransactionInput, TransactionDTO } from "@repo/shared";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createService } from "../api/createService";
import { invalidateQueries } from "@/lib/query-invalidation-map";
import { toast } from "sonner";
import { useTranslations } from "next-intl";

export const useCreateTransaction = () => {
  const queryClient = useQueryClient();
  const cmtT = useTranslations("CreateTransactionHooks");

  return useMutation<TransactionDTO, Error, CreateTransactionInput>({
    mutationFn: createService.saveTransaction,
    onSuccess: (data) => {
      invalidateQueries(queryClient, "createTransaction");

      const msg = cmtT("toastSuccess", { description: data.description ?? "" });
      toast.success(msg, { duration: 3000 });
    },
    onError: (error) => {
      toast.error(error.message, { duration: 3000 });
    },
  });
};
