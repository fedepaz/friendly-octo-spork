// src/features/auth/components/AuthDashboard.tsx
"use client";

import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { useAuthContext } from "../providers/AuthProvider";
import { useRouter } from "next/navigation";
import { ChangePasswordForm } from "@/components/user-profile/user-password";
import { LoginForm } from "./login-form";
import { Logo } from "@/components/common/logo";

export function AuthDashboard() {
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);

  const router = useRouter();

  const { isLoginComplete } = useAuthContext();

  useEffect(() => {
    if (isLoginComplete && !isChangePasswordOpen) {
      router.push("/");
    }
  }, [isLoginComplete, router, isChangePasswordOpen]);

  return (
    <div
      className={cn(
        "min-h-dvh flex items-center justify-center bg-background p-4 sm:p-6 overflow-hidden",
      )}
    >
      <div className="max-w-md w-full space-y-8 animate-premium-in">
        {/* Logo */}
        <div className="flex flex-col items-center space-y-4">
          <div className="relative group">
            <div className="absolute -inset-4 bg-primary/5 blur-2xl group-hover:bg-primary/10 transition-premium rounded-full" />
            <Logo
              variant="full"
              className="h-20 sm:h-24 relative transition-premium grayscale hover:grayscale-0 opacity-80 hover:opacity-100"
            />
          </div>
          <div className="text-center space-y-1">
            <h1 className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">
              Terminal de Operaciones
            </h1>
            <p className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground/30">
              Secure Financial Interface v1.0
            </p>
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-card/40 backdrop-blur-xl border border-border/40 p-6 sm:p-10 shadow-2xl rounded-none relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-primary/40 to-transparent" />
          <div className="space-y-6 relative">
            {!isChangePasswordOpen ? (
              <LoginForm
                onDefaultPassword={() => setIsChangePasswordOpen(true)}
              />
            ) : (
              <ChangePasswordForm onClose={() => router.push("/")} />
            )}
          </div>

          {/* Industrial Accents */}
          <div className="absolute -bottom-1 -right-1 w-8 h-8 border-r-2 border-b-2 border-primary/20" />
          <div className="absolute -top-1 -left-1 w-8 h-8 border-l-2 border-t-2 border-primary/20" />
        </div>

        {/* Technical Footer */}
        <div className="flex justify-between items-center px-2 opacity-20">
          <span className="text-[8px] font-mono font-black uppercase tracking-tighter">
            Auth.Node: Mendoza_ARG
          </span>
          <span className="text-[8px] font-mono font-black uppercase tracking-tighter">
            Encr: AES-256-GCM
          </span>
        </div>
      </div>
    </div>
  );
}
