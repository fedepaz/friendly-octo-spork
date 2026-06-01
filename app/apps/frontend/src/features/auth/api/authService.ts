// src/features/auth/api/authService.ts

import { clientFetch } from "@/lib/api/client-fetch";
import {
  AuthResponseDto,
  ChangePasswordDto,
  LoginAuthDto,
  UserPermissions,
  UserProfileDto,
} from "@repo/shared";

export const authService = {
  login: (credentials: LoginAuthDto) => {
    return clientFetch<AuthResponseDto>("auth/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    });
  },

  logout: () => {
    return clientFetch<void>("auth/logout", {
      method: "POST",
    });
  },

  changePassword: (data: ChangePasswordDto) => {
    return clientFetch<void>(`auth/password`, {
      method: "PATCH",
      body: JSON.stringify(data),
    });
  },

  getProfileMe: () => {
    return clientFetch<UserProfileDto>("users/me", {
      method: "GET",
    });
  },

  getPermissionsMe: () => {
    const hardCodedPermissions: UserPermissions = {
      isAdmin: true,
      permissions: [],
    };
    return Promise.resolve(hardCodedPermissions);
  },
};
