// shared/src/schemas/dashboard/budget.schema.ts

import { z } from "zod";
import { BudgetCategorySchema } from "../../enums";

export const BudgetSchema = z.object({
  category: BudgetCategorySchema,
  spent: z.string(),
  limit: z.string(),
  color: z.string(),
});

export type BudgetDTO = z.infer<typeof BudgetSchema>;
