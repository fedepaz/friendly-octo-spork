// shared/src/schemas/dashboard/income-expense.schema.ts

import { z } from "zod";

export const IncomeExpenseSchema = z.object({
  month: z.string(),
  income: z.string(),
  expenses: z.string(),
});

export type IncomeExpenseDTO = z.infer<typeof IncomeExpenseSchema>;
