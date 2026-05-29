// shared/src/schemas/auth.schema.ts

import { z } from "zod";

export const LoginAuthSchema = z.object({
  email: z.string().email({ message: "Email no válido" }).min(1, {
    message: "Email es obligatorio",
  }),
  password: z
    .string()
    .min(4, { message: "Contraseña es obligatoria, mínimo 4 caracteres" })
    .max(12, { message: "Contraseña es obligatoria, máximo 12 caracteres" }),
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

export const RegisterAuthSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(4),
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
    newPassword: z
      .string()
      .min(6, {
        message: "La nueva contraseña debe tener al menos 6 caracteres",
      })
      .max(20, {
        message: "La nueva contraseña debe tener máximo 20 caracteres",
      })
      .regex(/[A-Z]/, {
        message:
          "La nueva contraseña debe contener al menos una letra mayúscula",
      })
      .regex(/[a-z]/, {
        message:
          "La nueva contraseña debe contener al menos una letra minúscula",
      })
      .regex(/[0-9]/, {
        message: "La nueva contraseña debe contener al menos un número",
      }),
  })
  .refine((data) => data.newPassword !== data.currentPassword, {
    message: "La nueva contraseña no puede ser la misma que la actual",
    path: ["newPassword"],
  });

export type ChangePasswordDto = z.infer<typeof ChangePasswordSchema>;
