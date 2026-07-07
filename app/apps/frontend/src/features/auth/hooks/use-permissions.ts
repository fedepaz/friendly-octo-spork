// apps/frontend/src/features/auth/hooks/use-permissions.ts
"use client";

import { useQuery } from "@tanstack/react-query";
import { useAuth } from "./useAuth";
import { AuthUserPermissions } from "@repo/shared";
import { authService } from "../api/authService";
import { permissionsQueryKeys } from "@/lib/queryKeys";

export const usePermissions = () => {
  const { isSignedIn } = useAuth();

  return useQuery<AuthUserPermissions>({
    queryKey: permissionsQueryKeys.me(),
    queryFn: authService.getPermissionsMe,
    enabled: isSignedIn,
    retry: 1, // Retry once to account for transient network issues
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
