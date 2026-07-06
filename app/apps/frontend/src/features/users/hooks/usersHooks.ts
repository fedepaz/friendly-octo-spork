// src/features/users/hooks/usersHooks.ts

import { useSuspenseQuery } from "@tanstack/react-query";
import { userService } from "../api/userService";
import { UserProfileDto } from "@repo/shared";
import { userProfileQueryKeys } from "@/lib/queryKeys";

export const useUsers = () => {
  return useSuspenseQuery<UserProfileDto[]>({
    queryKey: userProfileQueryKeys.all(),
    queryFn: userService.fetchAll,
    retry: 1, // Retry once to account for transient network issues
  });
};

export const useUsersById = (id: string) => {
  return useSuspenseQuery<UserProfileDto | null>({
    queryKey: userProfileQueryKeys.byId(id),
    queryFn: () => userService.fetchById(id),
    retry: 1, // Retry once to account for transient network issues
  });
};
