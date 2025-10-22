import { z } from "zod";
import { AccountType, Currency } from "../../generated/prisma";

export const createAccountSchema = z.object({
  name: z
    .string()
    .min(1, "Account name is required")
    .max(255, "Account name is too long"),
  type: z.nativeEnum(AccountType, {
    error: () => ({ message: "Invalid account type" }),
  }),
  currency: z.nativeEnum(Currency, {
    error: () => ({ message: "Invalid currency" }),
  }),
  balance: z.number().optional().default(0),
});

export const getAccountsFilterSchema = z.object({
  type: z
    .nativeEnum(AccountType, {
      error: () => ({ message: "Invalid account type" }),
    })
    .optional(),
  currency: z
    .nativeEnum(Currency, {
      error: () => ({ message: "Invalid currency" }),
    })
    .optional(),
});

export type CreateAccountInput = z.infer<typeof createAccountSchema>;
export type GetAccountsFilterInput = z.infer<typeof getAccountsFilterSchema>;
