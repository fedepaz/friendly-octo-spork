// shared/src/schemas/auth.schema.ts

import { z } from "zod";

// ─── Shared password validation rules ──────────────────────────────────
const passwordRules = z
  .string()
  .min(6, { message: "La contraseña debe tener al menos 6 caracteres" })
  .max(20, { message: "La contraseña debe tener máximo 20 caracteres" })
  .regex(/[A-Z]/, {
    message: "La contraseña debe contener al menos una letra mayúscula",
  })
  .regex(/[a-z]/, {
    message: "La contraseña debe contener al menos una letra minúscula",
  })
  .regex(/[0-9]/, {
    message: "La contraseña debe contener al menos un número",
  });

export const LoginAuthSchema = z.object({
  name: z.string().min(1, { message: "Nombre es obligatorio" }),
  password: z.string().min(1, { message: "Contraseña es obligatoria" }),
});

export type LoginAuthDto = z.infer<typeof LoginAuthSchema>;

export const AccessTokenSchema = z.object({
  accessToken: z.string(),
});

export type AccessTokenDto = z.infer<typeof AccessTokenSchema>;

export const RefreshTokenSchema = z.object({
  refreshToken: z.string(),
});

export type RefreshTokenDto = z.infer<typeof RefreshTokenSchema>;

export const Tokens = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
});

export type TokensDto = z.infer<typeof Tokens>;

// Response types
export const AuthResponseSchema = z.object({
  user: z.object({
    id: z.string().uuid(),
    name: z.string(),
    email: z.string().email(),
  }),
  accessToken: z.string(),
  refreshToken: z.string(),
  isDefaultPassword: z.boolean(),
});

export type AuthResponseDto = z.infer<typeof AuthResponseSchema>;

// User Profile types
export const UserProfileSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  isActive: z.boolean().optional(),
  createdAt: z.date().or(z.string()).optional(),
});

export type UserProfileDto = z.infer<typeof UserProfileSchema>;

export const RegisterAuthSchema = z
  .object({
    name: z
      .string()
      .min(6, {
        message: "El nombre debe tener al menos 6 caracteres",
      })
      .max(20, {
        message: "El nombre debe tener máximo 20 caracteres",
      })
      .regex(/[A-Z]/, {
        message: "El nombre debe contener al menos una letra mayúscula",
      })
      .regex(/[a-z]/, {
        message: "El nombre debe contener al menos una letra minúscula",
      })
      .regex(/[0-9]/, {
        message: "El nombre debe contener al menos un número",
      })
      .regex(/^[a-zA-Z0-9]+$/, {
        message: "El nombre no debe contener caracteres especiales",
      }),

    email: z
      .string()
      .email({ message: "El email es inválido" })
      .min(1, { message: "El email es obligatorio y debe ser único" }),
    password: passwordRules,
  })
  .refine((data) => data.name !== data.password, {
    message: "La contraseña no puede ser la misma que el nombre",
    path: ["password"],
  });

export type RegisterAuthDto = z.infer<typeof RegisterAuthSchema>;

export const UserPermissionsSchema = z.object({
  isAdmin: z.boolean().default(false),
  permissions: z.array(z.string()).default([]),
});

export type UserPermissions = z.infer<typeof UserPermissionsSchema>;

export const ChangePasswordSchema = z
  .object({
    currentPassword: z
      .string()
      .min(1, { message: "Contraseña es obligatoria" }),
    newPassword: passwordRules,
  })
  .refine((data) => data.newPassword !== data.currentPassword, {
    message: "La nueva contraseña no puede ser la misma que la actual",
    path: ["newPassword"],
  });

export type ChangePasswordDto = z.infer<typeof ChangePasswordSchema>;
