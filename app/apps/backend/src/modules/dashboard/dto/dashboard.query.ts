// src/modules/dashboard/dto/dashboard.query.ts

import { z } from 'zod';

export const dashboardIncomeExpenseQuerySchema = z
  .object({
    endMonth: z.coerce.number().int().min(1).max(12).optional(),
    endYear: z.coerce.number().int().optional(),
  })
  .refine((q) => (q.endMonth == null) === (q.endYear == null), {
    message: 'endMonth and endYear must be provided together',
    path: ['endMonth'],
  });

export type DashboardIncomeExpenseQuery = z.infer<
  typeof dashboardIncomeExpenseQuerySchema
>;
