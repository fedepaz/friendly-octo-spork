// src/components/common/dashboard-protected-layout.tsx
"use client";

import { useAuthContext } from "@/features/auth/providers/AuthProvider";
import { LoadingSpinner } from "./loading-spinner";
import { DatabaseUnavailablePage } from "./database-unavailable";
import { PendingPermissionsPage } from "./pending-permissions";
import { hardRedirect } from "@/lib/navigation";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface DashboardProtectedLayoutProps {
  children: React.ReactNode;
}

export function DashboardProtectedLayout({
  children,
}: DashboardProtectedLayoutProps) {
  const router = useRouter();

  const {
    isSignedIn,
    loading: authLoading,
    userProfile,
    isLoading: profileLoading,
    isDatabaseUnavailable,
    isPendingPermissions,
  } = useAuthContext();

  useEffect(() => {
    if (authLoading || isSignedIn) return;
    router.replace("/login");
    // #50: after a back/forward document load, router.replace can silently
    // issue no request and the page hangs on the spinner forever — force a
    // hard redirect if the soft navigation hasn't reached login in time.
    const fallback = window.setTimeout(() => {
      if (!window.location.pathname.includes("/login")) {
        hardRedirect("/login");
      }
    }, 800);
    return () => window.clearTimeout(fallback);
  }, [authLoading, isSignedIn, router]);

  useEffect(() => {
    if (isSignedIn && userProfile) {
    }
  }, [isSignedIn, userProfile]);

  if (profileLoading || authLoading) {
    return <LoadingSpinner />;
  }

  if (!isSignedIn) {
    return <LoadingSpinner />;
  }

  if (isDatabaseUnavailable) {
    return <DatabaseUnavailablePage />;
  }

  if (isPendingPermissions) {
    return <PendingPermissionsPage />;
  }

  if (!userProfile) {
    return <LoadingSpinner />;
  }
  return <>{children}</>;
}
