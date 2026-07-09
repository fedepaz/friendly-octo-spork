// packages/shared/src/schemas/auditLog.schema.ts

import { z } from "zod";

export const AuditActionTypeSchema = z.enum([
  "CREATE",
  "UPDATE",
  "DELETE",
  "LOGIN",
  "LOGOUT",
  "ACCESS",
]);
export type AuditActionType = z.infer<typeof AuditActionTypeSchema>;

export const EntityTypeSchema = z.enum([
  "USER",
  "ACCOUNT",
  "CARD",
  "TRANSACTION",
  "RECURRENCE",
  "CATEGORY",
  "AUDIT_LOG",
]);
export type EntityType = z.infer<typeof EntityTypeSchema>;

export const AuditLogSchema = z.object({
  id: z.string(),
  userId: z.string(),
  user: z
    .object({
      id: z.string(),
      username: z.string(),
      firstName: z.string().optional(),
      lastName: z.string().optional(),
    })
    .optional(),
  action: AuditActionTypeSchema,
  entityType: z.string(),
  entityId: z.string().optional(),
  changes: z.record(z.unknown()).optional(),
  endpoint: z.string().optional(),
  method: z.string().optional(),
  ipAddress: z.string().optional(),
  userAgent: z.string().optional(),
  durationMs: z.number().optional(),
  createdAt: z.coerce.date(),
});

export type AuditLogDto = z.infer<typeof AuditLogSchema>;
