// src/schemas/createAccountSchema.ts

import z from "zod";
import { transactionSchema } from "../transactions/transactions.schema";
import { categorySchema } from "../categories/categories.schema";
import { accountSchema } from "../accounts/accounts.schema";

export const dashboardSchema = z.object({
  monthlySpent: z.number().positive(),
  monthlyBudget: z.number(),
  dailyAverage: z.number(),
  expenseCount: z.number(),
  recentTransactions: z.array(transactionSchema),
  categories: z.array(categorySchema),
  accounts: z.array(accountSchema),
});

export type DashboardInput = z.infer<typeof dashboardSchema>;
