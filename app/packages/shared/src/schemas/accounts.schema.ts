import { z } from "zod";
import { AccountTypeSchema, CurrencySchema } from "../enums";

export const accountSchema = z.object({
  id: z.string(),
  userId: z.string(),
  name: z.string(),
  type: AccountTypeSchema,
  currency: CurrencySchema,
  balance: z.number(),
});

export const createAccountSchema = z.object({
  name: z
    .string()
    .min(1, "Account name is required")
    .max(50, "Account name is too long"),
  type: AccountTypeSchema,
  currency: CurrencySchema,
  balance: z.preprocess(
    (val) => (val === "" ? undefined : Number(val)),
    z.number().default(0),
  ),
});

export type CreateAccountInput = z.infer<typeof createAccountSchema>;
export type AccountDTO = z.infer<typeof accountSchema>;
