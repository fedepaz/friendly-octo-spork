// src/api/auth/auth.schema.tss

import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email(),
  plainPassword: z.string(),
});

export type LoginInput = z.infer<typeof loginSchema>;
