// src/features/users/hooks/usersHooks.ts

import { useSuspenseQuery } from "@tanstack/react-query";
import { userService } from "../api/userService";
import { UserProfileDto } from "@repo/shared";

export const userProfileQueryKeys = {
  all: () => ["users"] as const,
  byUserName: (username: string) =>
    [...userProfileQueryKeys.all(), "byUserName", username] as const,
  byTenantId: (tenantId: string) =>
    [...userProfileQueryKeys.all(), "byTenantId", tenantId] as const,
  admin: () => ["users", "allAdmin"] as const,
};

export const useUsers = () => {
  return useSuspenseQuery<UserProfileDto[]>({
    queryKey: userProfileQueryKeys.all(),
    queryFn: userService.fetchAll,
    retry: 1, // Retry once to account for transient network issues
  });
};

export const useUsersById = (id: string) => {
  return useSuspenseQuery<UserProfileDto | null>({
    queryKey: ["users", "byId", id],
    queryFn: () => userService.fetchById(id),
    retry: 1, // Retry once to account for transient network issues
  });
};
