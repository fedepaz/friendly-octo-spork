// src/schemas/createAccountSchema.ts

import { z } from "zod";
import { AccountType, Currency } from "../../generated/prisma";

export const accountSchema = z.object({
  id: z.string(),
  userId: z.string(),
  name: z.string(),
  type: z.nativeEnum(AccountType),
  currency: z.nativeEnum(Currency),
  balance: z.number(),
});

export const createAccountSchema = z.object({
  name: z
    .string()
    .min(1, "Account name is required")
    .max(50, "Account name is too long"),
  type: z.nativeEnum(AccountType, {
    error: () => ({ message: "Invalid account type" }),
  }),
  currency: z.nativeEnum(Currency, {
    error: () => ({ message: "Invalid currency" }),
  }),
  balance: z.preprocess(
    (val) => (val === "" ? undefined : Number(val)),
    z.number().default(0),
  ),
});

export type CreateAccountInput = z.infer<typeof createAccountSchema>;
export type AccountDTO = z.infer<typeof accountSchema>;
