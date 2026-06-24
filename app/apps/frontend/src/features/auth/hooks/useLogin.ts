"use client";

import { useMutation } from "@tanstack/react-query";
import { LoginAuthDto, AuthResponseDto } from "@repo/shared";
import { useAuthContext } from "../providers/AuthProvider";
import { toast } from "sonner";
import { authService } from "../api/authService";
import { useTranslations } from "next-intl";

export const useLogin = () => {
  const ahT = useTranslations("AuthHooks");
  const { signIn } = useAuthContext();

  const mutation = useMutation<AuthResponseDto, Error, LoginAuthDto>({
    mutationFn: authService.login,
    onSuccess: (data) => {
      if (data.isDefaultPassword) {
        toast.info(ahT("defaultPassword"), {
          duration: 3000,
        });
      } else {
        toast.success(ahT("loginSuccess", { name: data.user.name }), {
          duration: 3000,
        });
      }
      localStorage.setItem("refreshToken", data.refreshToken);
      signIn(data.accessToken, data.user);
    },
  });

  return {
    login: mutation.mutate,
    loginAsync: mutation.mutateAsync,
    isLoading: mutation.isPending,
    isSuccess: mutation.isSuccess,
    reset: mutation.reset,
  };
};
