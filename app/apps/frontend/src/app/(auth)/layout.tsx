//src/app/(auth)/layout.tsx

import { AuthHeader } from "@/components/layout/auth-header";
import { AuthSkeleton } from "@/features/auth";
import { Suspense } from "react";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <Suspense fallback={<AuthSkeleton />}>
      <AuthHeader />
      <div className="flex min-h-dvh flex-col items-center justify-center p-4">
        <div className="w-full max-w-md">{children}</div>
      </div>
    </Suspense>
  );
}
