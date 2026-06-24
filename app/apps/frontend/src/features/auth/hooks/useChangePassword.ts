"use client";

import { useMutation } from "@tanstack/react-query";
import { ChangePasswordDto } from "@repo/shared";
import { toast } from "sonner";
import { authService } from "../api/authService";
import { useTranslations } from "next-intl";

export const useChangePassword = () => {
  const ahT = useTranslations("AuthHooks");

  const mutation = useMutation<void, Error, ChangePasswordDto>({
    mutationFn: authService.changePassword,
    onSuccess: () => {
      toast.success(ahT("passwordUpdated"), {
        duration: 3000,
      });
    },
  });

  return {
    changePasswordAsync: mutation.mutateAsync,
    isLoading: mutation.isPending,
    isSuccess: mutation.isSuccess,
    reset: mutation.reset,
  };
};
