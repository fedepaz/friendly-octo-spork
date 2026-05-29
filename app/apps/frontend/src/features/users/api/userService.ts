import { clientFetch } from "@/lib/api/client-fetch";
import { 
  AuthResponseDto, 
  RegisterAuthDto, 
  UpdateUserProfileDto, 
  UserProfileDto 
} from "@repo/shared";

export const userService = {
  fetchAll: () => {
    return clientFetch<UserProfileDto[]>("users/all", { method: "GET" });
  },

  fetchById: (id: string) => {
    return clientFetch<UserProfileDto | null>(`users/${id}`, {
      method: "GET",
    });
  },

  fetchAllAdmin: () => {
    return clientFetch<UserProfileDto[]>("users/allAdmin", { method: "GET" });
  },

  updateMe: (userUpdate: UpdateUserProfileDto) => {
    return clientFetch<UserProfileDto>(`users/me`, {
      method: "PATCH",
      body: JSON.stringify(userUpdate),
    });
  },

  updateUser: (id: string, userUpdate: UpdateUserProfileDto) => {
    return clientFetch<UserProfileDto>(`users/${id}`, {
      method: "PATCH",
      body: JSON.stringify(userUpdate),
    });
  },

  delete: (id: string) => {
    return clientFetch<void>(`users/${id}`, {
      method: "DELETE",
    });
  },

  register: (userData: RegisterAuthDto) => {
    return clientFetch<AuthResponseDto>("auth/register", {
      method: "POST",
      body: JSON.stringify(userData),
    });
  },
};
