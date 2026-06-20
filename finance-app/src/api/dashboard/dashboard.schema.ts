// src/schemas/createAccountSchema.ts

import z from "zod";
import { accountSchema } from "../accounts/accounts.schema";

export const dashboardSchema = z.object({
  monthlySpent: z.number().positive(),
  monthlyBudget: z.number(),
  dailyAverage: z.number(),
  expenseCount: z.number(),
  accounts: z.array(accountSchema),
});

export type DashboardInput = z.infer<typeof dashboardSchema>;
