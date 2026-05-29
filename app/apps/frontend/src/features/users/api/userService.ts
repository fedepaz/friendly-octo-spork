import { clientFetch } from "@/lib/api/client-fetch";
import { UserProfileDto } from "@repo/shared";

export const userService = {
  fetchAll: () => {
    return clientFetch<UserProfileDto[]>("users", { method: "GET" });
  },

  fetchById: (id: string) => {
    return clientFetch<UserProfileDto | null>(`users/${id}`, {
      method: "GET",
    });
  },
};
