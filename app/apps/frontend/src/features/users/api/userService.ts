// src/features/users/api/userService.ts

import { clientFetch } from "@/lib/api/client-fetch";
import { RegisterAuthDto, UserProfileDto } from "@repo/shared";

export const userService = {
  fetchAll: () => {
    return clientFetch<UserProfileDto[]>("users", { method: "GET" });
  },

  fetchById: (id: string) => {
    return clientFetch<UserProfileDto | null>(`users/${id}`, {
      method: "GET",
    });
  },

  create: (data: RegisterAuthDto) => {
    return clientFetch<UserProfileDto>("users", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  softDelete: (id: string) => {
    return clientFetch<UserProfileDto>(`users/${id}/delete`, {
      method: "POST",
    });
  },
};
