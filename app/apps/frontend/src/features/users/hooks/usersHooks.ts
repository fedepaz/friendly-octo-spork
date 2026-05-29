// src/features/users/hooks/useUsers.ts

import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { toast } from "sonner";
import { UpdateUserProfileDto, UserProfileDto } from "@repo/shared";
import { userService } from "../api/userService";

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

export const useUpdateUserProfile = () => {
  const queryClient = useQueryClient();

  return useMutation<
    UserProfileDto,
    Error,
    { userUpdate: UpdateUserProfileDto }
  >({
    mutationFn: async ({ userUpdate }) => userService.updateMe(userUpdate),
    onSuccess: (data) => {
      const toastMessage = `Perfil de usuario ${data.name} actualizado exitosamente`;
      toast.success(toastMessage, {
        duration: 3000,
      });
      queryClient.invalidateQueries({ queryKey: ["users"] });
      queryClient.invalidateQueries({ queryKey: ["userProfile"] });

      const authContext = queryClient.getQueryData(["userProfile"]);
      if (authContext) {
        queryClient.setQueryData(["userProfile"], data);
      }
    },
  });
};

export const useUsersById = (id: string) => {
  return useSuspenseQuery<UserProfileDto | null>({
    queryKey: ["users", "byId", id],
    queryFn: () => userService.fetchById(id),
    retry: 1, // Retry once to account for transient network issues
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation<
    UserProfileDto,
    Error,
    { id: string; userUpdate: UpdateUserProfileDto }
  >({
    mutationFn: async ({ id, userUpdate }) => userService.updateUser(id, userUpdate),
    onSuccess: (data) => {
      const toastMessage = `Perfil de usuario ${data.name} actualizado exitosamente`;
      toast.success(toastMessage, {
        duration: 3000,
      });
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, string>({
    mutationFn: userService.delete,
    onSuccess: () => {
      const toastMessage = `Usuario eliminado exitosamente`;
      toast.success(toastMessage, {
        duration: 3000,
      });
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};

export const useGetAllUsersAdmin = () => {
  return useSuspenseQuery<UserProfileDto[]>({
    queryKey: userProfileQueryKeys.admin(),
    queryFn: userService.fetchAllAdmin,
    retry: 1, // Retry once to account for transient network issues
  });
};
