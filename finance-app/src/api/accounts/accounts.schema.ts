// src/api/accounts/accounts.schema.ts
import { z } from "zod";
import { AccountType, Currency } from "../../generated/prisma";

export const createAccountSchema = z.object({
  name: z.string().min(1, "Name is required").max(100),
  type: z.nativeEnum(AccountType),
  currency: z.nativeEnum(Currency),
  balance: z.number().optional().default(0),
});

export const updateAccountSchema = createAccountSchema.partial();

export const accountFilterSchema = z.object({
  type: z.nativeEnum(AccountType).optional(),
  currency: z.nativeEnum(Currency).optional(),
});

export type CreateAccountInput = z.infer<typeof createAccountSchema>;
export type UpdateAccountInput = z.infer<typeof updateAccountSchema>;
export type AccountFilter = z.infer<typeof accountFilterSchema>;
