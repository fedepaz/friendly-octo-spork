"use client";

import { useMutation } from "@tanstack/react-query";
import { RegisterAuthDto, AuthResponseDto } from "@repo/shared";
import { useAuthContext } from "../providers/AuthProvider";
import { toast } from "sonner";
import { authService } from "../api/authService";
import { useTranslations } from "next-intl";

export const useRegister = () => {
  const ahT = useTranslations("AuthHooks");
  const { signIn } = useAuthContext();

  const mutation = useMutation<AuthResponseDto, Error, RegisterAuthDto>({
    mutationFn: authService.register,
    onSuccess: (data) => {
      if (data.isDefaultPassword) {
        toast.info(ahT("defaultPassword"), {
          duration: 3000,
        });
      } else {
        toast.success(ahT("registerSuccess", { name: data.user.name }), {
          duration: 3000,
        });
      }
      localStorage.setItem("refreshToken", data.refreshToken);
      signIn(data.accessToken, data.user);
    },
  });

  return {
    register: mutation.mutate,
    registerAsync: mutation.mutateAsync,
    isLoading: mutation.isPending,
    isSuccess: mutation.isSuccess,
    reset: mutation.reset,
  };
};
