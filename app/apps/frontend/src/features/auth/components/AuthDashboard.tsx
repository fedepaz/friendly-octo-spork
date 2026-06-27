"use client";

import { useEffect, useState } from "react";
import { useAuthContext } from "../providers/AuthProvider";
import { useRouter } from "next/navigation";
import { ChangePasswordForm } from "@/components/user-profile/user-password";
import { LoginForm } from "./login-form";
import { RegisterForm } from "./register-form";
import { useTranslations } from "next-intl";

interface AuthDashboardProps {
  mode: "login" | "register";
}

export function AuthDashboard({ mode = "login" }: AuthDashboardProps) {
  const t = useTranslations("AuthDashboard");
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
          {mode === "login" ? t("loginTitle") : t("registerTitle")}
        </h1>
        <p className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground/60">
          {mode === "login" ? t("loginDescription") : t("registerDescription")}
        </p>
      </div>
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
