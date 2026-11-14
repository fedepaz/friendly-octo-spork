//src/app/(auth)/layout.tsx

import { Logo } from "@/components/common/logo";
import { AuthHeader } from "@/components/layout/auth-header";
import { AuthSkeleton } from "@/features/auth";
import { cn } from "@/lib/utils";
import { Suspense } from "react";
import { getTranslations } from "next-intl/server";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default async function AuthLayout({ children }: AuthLayoutProps) {
  const authT = await getTranslations("AuthLayout");
  return (
    <Suspense fallback={<AuthSkeleton />}>
      <AuthHeader />
      <div
        className={cn(
          "min-h-dvh flex items-center justify-center bg-background p-4 overflow-hidden",
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
              <h1 className="text-xs font-black uppercase tracking-widest text-primary">
                {authT("title")}
              </h1>
              <p className="text-xs font-black uppercase tracking-widest text-muted-foreground/60">
                {authT("subtitle")}
              </p>
            </div>
          </div>

          {/* Form Card */}
          <div className="bg-card/40 backdrop-blur-xl border border-border/40 p-4 shadow-2xl rounded-none relative overflow-hidden group">
            {children}
          </div>
        </div>
      </div>
    </Suspense>
  );
}
