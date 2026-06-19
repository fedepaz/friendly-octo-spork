// src/features/accounts/hooks/createAccountHook.ts

import { AccountDTO, CreateAccountInput } from "@repo/shared";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { accountService } from "../api/accountService";
import { toast } from "sonner";

export function useCreateAccount() {
  const queryClient = useQueryClient();

  return useMutation<AccountDTO, Error, CreateAccountInput>({
    mutationFn: accountService.saveAccount,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["accounts"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
      const msg = `Cuenta ${data.name} creada exitosamente`;
      toast.success(msg, { duration: 3000 });
    },
  });
}
