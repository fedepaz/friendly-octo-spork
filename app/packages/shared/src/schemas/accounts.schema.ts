// packages/shared/schemas/accounts.schema.ts

import { z } from "zod";
import {
  AccountType,
  AccountTypeSchema,
  Currency,
  CurrencySchema,
} from "../enums";
import type { TransactionDTO } from "./transactions.schema";

export interface AccountDTO {
  id: string;
  userId: string;
  name: string;
  type: AccountType;
  currency: Currency;
  balance: string;

  transactionsFrom?: TransactionDTO[];
  transactionsTo?: TransactionDTO[];
}

export const accountSchema: z.ZodType<AccountDTO> = z.object({
  id: z.string(),
  userId: z.string(),
  name: z.string(),
  type: AccountTypeSchema,
  currency: CurrencySchema,
  balance: z.string(),

  transactionsFrom: z.lazy(() => z.array(z.any())).optional(),
  transactionsTo: z.lazy(() => z.array(z.any())).optional(),
}) as z.ZodType<AccountDTO>;

export const createAccountSchema = z.object({
  name: z
    .string()
    .min(1, "Account name is required")
    .max(50, "Account name is too long"),
  type: AccountTypeSchema,
  currency: CurrencySchema,
  balance: z
    .preprocess(
      (val) => (val === "" || val === undefined ? "0" : String(val)),
      z.string(),
    )
    .refine((val) => !isNaN(Number(val)), "Invalid balance"),
});

export type CreateAccountInput = z.infer<typeof createAccountSchema>;
