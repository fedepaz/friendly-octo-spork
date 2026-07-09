import { AccountDTO, CreateAccountInput } from "@repo/shared";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { accountService } from "../api/accountService";
import { invalidateQueries } from "@/lib/query-invalidation-map";
import { toast } from "sonner";

export function useCreateAccount() {
  const queryClient = useQueryClient();
  const acfT = useTranslations("AccountCreateForm");

  return useMutation<AccountDTO, Error, CreateAccountInput>({
    mutationFn: accountService.saveAccount,
    onSuccess: (data) => {
      invalidateQueries(queryClient, "createAccount");

      const msg = acfT("toastSuccess", { name: data.name });
      toast.success(msg, { duration: 3000 });
    },
    onError: (err) => {
      const msg = acfT("toastError", { error: err.message });
      toast.error(msg, { duration: 3000 });
    },
  });
}
