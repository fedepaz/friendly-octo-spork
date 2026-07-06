import { AccountDTO, CreateAccountInput } from "@repo/shared";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { accountService } from "../api/accountService";
import { invalidateQueries } from "@/lib/query-invalidation-map";
import { toast } from "sonner";

export function useCreateAccount() {
  const queryClient = useQueryClient();

  return useMutation<AccountDTO, Error, CreateAccountInput>({
    mutationFn: accountService.saveAccount,
    onSuccess: (data) => {
      invalidateQueries(queryClient, "createAccount");

      const msg = `Cuenta ${data.name} creada exitosamente`;
      toast.success(msg, { duration: 3000 });
    },
    onError: (err) => {
      const msg = `Error al crear la cuenta: ${err.message}`;
      toast.error(msg, { duration: 3000 });
    },
  });
}
