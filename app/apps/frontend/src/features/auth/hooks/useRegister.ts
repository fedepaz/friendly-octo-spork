// src/features/auth/hooks/useRegister.ts
"use client";

import { useMutation } from "@tanstack/react-query";
import { RegisterAuthDto, AuthResponseDto } from "@repo/shared";
import { useAuthContext } from "../providers/AuthProvider";
import { toast } from "sonner";
import { authService } from "../api/authService";

export const useRegister = () => {
  const { signIn } = useAuthContext();

  const mutation = useMutation<AuthResponseDto, Error, RegisterAuthDto>({
    mutationFn: authService.register,
    onSuccess: (data) => {
      // Check if user is default password
      if (data.isDefaultPassword) {
        toast.info(
          "Contraseña por defecto, se abrirá un formulario para cambiar la contraseña",
          {
            duration: 3000,
          },
        );
      } else {
        const toastMessage = `Registro exitoso como ${data.user.name}`;
        toast.success(toastMessage, {
          duration: 3000,
        });
      }
      // Store refresh token
      localStorage.setItem("refreshToken", data.refreshToken);
      // Update auth state via useAuth
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
