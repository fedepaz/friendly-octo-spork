// shared/src/schemas/dashboard/netWorth.schema.ts

import { z } from "zod";

export const NetWorthSchema = z.object({
  month: z.string(),
  value: z.string(),
});

export type NetWorthDTO = z.infer<typeof NetWorthSchema>;
