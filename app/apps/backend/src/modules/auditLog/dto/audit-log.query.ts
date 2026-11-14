// src/modules/auditLog/dto/audit-log.query.ts

import { z } from 'zod';
import { AuditActionTypeSchema } from '@repo/shared';

export const auditLogQuerySchema = z.object({
  month: z.coerce.number().int().min(1).max(12).optional(),
  year: z.coerce.number().int().optional(),
  action: AuditActionTypeSchema.optional(),
  entityType: z.string().min(1).optional(),
});

export type AuditLogQuery = z.infer<typeof auditLogQuerySchema>;
