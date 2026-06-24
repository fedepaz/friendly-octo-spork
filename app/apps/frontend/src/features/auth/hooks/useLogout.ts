"use client";

import { useMutation } from "@tanstack/react-query";
import { useAuthContext } from "../providers/AuthProvider";
import { toast } from "sonner";
import { authService } from "../api/authService";
import { useTranslations } from "next-intl";

export const useLogout = () => {
  const ahT = useTranslations("AuthHooks");
  const { signOut } = useAuthContext();

  const mutation = useMutation<void, Error, void>({
    mutationFn: authService.logout,
    onSuccess: () => {
      localStorage.removeItem("refreshToken");
      toast.success(ahT("logoutSuccess"), {
        duration: 3000,
      });

      signOut();
    },
  });

  return {
    logout: mutation.mutate,
    logoutAsync: mutation.mutateAsync,
    isLoading: mutation.isPending,
  };
};
