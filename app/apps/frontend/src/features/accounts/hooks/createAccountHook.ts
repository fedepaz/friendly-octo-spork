import { AccountDTO, CreateAccountInput } from "@repo/shared";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { accountService } from "../api/accountService";
import { mutationInvalidations } from "@/lib/query-invalidation-map";
import { toast } from "sonner";

export function useCreateAccount() {
  const queryClient = useQueryClient();

  return useMutation<AccountDTO, Error, CreateAccountInput>({
    mutationFn: accountService.saveAccount,
    onSuccess: (data) => {
      mutationInvalidations.createAccount.forEach((filters) => {
        queryClient.invalidateQueries(filters);
      });

      const msg = `Cuenta ${data.name} creada exitosamente`;
      toast.success(msg, { duration: 3000 });
    },
  });
}
