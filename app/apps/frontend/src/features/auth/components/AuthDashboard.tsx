// src/features/auth/components/AuthDashboard.tsx
"use client";

import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { useAuthContext } from "../providers/AuthProvider";
import { useRouter } from "next/navigation";
import { ChangePasswordForm } from "@/components/user-profile/user-password";
import { LoginForm } from "./login-form";
import { Logo } from "@/components/common/logo";
import { RegisterForm } from "./register-form";

interface AuthDashboardProps {
  mode: "login" | "register";
}

export function AuthDashboard({ mode = "login" }: AuthDashboardProps) {
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);

  const router = useRouter();

  const { isLoginComplete } = useAuthContext();

  useEffect(() => {
    if (isLoginComplete && !isChangePasswordOpen) {
      router.push("/");
    }
  }, [isLoginComplete, router, isChangePasswordOpen]);

  return (
    <>
      <div className="text-center space-y-1">
        <h1 className="text-[12px] font-black uppercase tracking-[0.3em] text-primary">
          {mode === "login" ? "Iniciar Sesión" : "Crear cuenta"}
        </h1>
        <p className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground/30">
          {mode === "login"
            ? "Para ingresar a la aplicación"
            : "Para utilizar la aplicación debes tener una cuenta"}
        </p>
      </div>
      {/* Form Card */}
      {!isChangePasswordOpen ? (
        mode === "login" ? (
          <LoginForm onDefaultPassword={() => setIsChangePasswordOpen(true)} />
        ) : mode === "register" ? (
          <RegisterForm
            onDefaultPassword={() => setIsChangePasswordOpen(true)}
          />
        ) : null
      ) : (
        <ChangePasswordForm onClose={() => router.push("/")} />
      )}
    </>
  );
}
