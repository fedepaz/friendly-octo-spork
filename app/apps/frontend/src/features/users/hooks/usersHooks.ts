// src/features/users/hooks/usersHooks.ts

import { useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { userService } from "../api/userService";
import { RegisterAuthDto, UserProfileDto } from "@repo/shared";
import { userProfileQueryKeys } from "@/lib/queryKeys";
import { invalidateQueries } from "@/lib/query-invalidation-map";
import { toast } from "sonner";
import { useTranslations } from "next-intl";

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

export const useCreateUser = () => {
  const queryClient = useQueryClient();
  const udT = useTranslations("UsersDashboard");

  return useMutation<UserProfileDto, Error, RegisterAuthDto>({
    mutationFn: userService.create,
    onSuccess: (data) => {
      invalidateQueries(queryClient, "createUser");
      toast.success(udT("toastCreateSuccess", { name: data.name }), {
        duration: 3000,
      });
    },
    onError: (err) => {
      toast.error(udT("toastCreateError", { error: err.message }), {
        duration: 3000,
      });
    },
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  const udT = useTranslations("UsersDashboard");

  return useMutation<UserProfileDto, Error, string>({
    mutationFn: userService.softDelete,
    onSuccess: (data) => {
      invalidateQueries(queryClient, "deleteUser");
      toast.success(udT("toastDeleteSuccess", { name: data.name }), {
        duration: 3000,
      });
    },
    onError: (err) => {
      toast.error(udT("toastDeleteError", { error: err.message }), {
        duration: 3000,
      });
    },
  });
};
