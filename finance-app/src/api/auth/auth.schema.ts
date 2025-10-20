// src/api/auth/auth.schema.ts
import { z } from "zod";

export const loginSchema = z.object({
  password: z.string().min(1, "Password is required"),
});

export type LoginInput = z.infer<typeof loginSchema>;
