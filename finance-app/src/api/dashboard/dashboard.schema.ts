// src/api/dashboard/dashboard.schema.ts

import z from "zod";
import { accountSchema } from "../accounts/accounts.schema";
import { recurrenceSchema } from "../recurrences/recurrences.schema";

export const dashboardSchema = z.object({
  monthlySpent: z.number(),
  monthlyBudget: z.number(),
  dailyAverage: z.number(),
  expenseCount: z.number(),
  accounts: z.array(accountSchema),
  pendingRecurrences: z.array(recurrenceSchema),
});

export type DashboardInput = z.infer<typeof dashboardSchema>;
