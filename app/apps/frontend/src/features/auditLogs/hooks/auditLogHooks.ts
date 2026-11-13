// src/features/auditLogs/hooks/auditLogHooks.ts

import { useSuspenseQuery } from "@tanstack/react-query";
import { auditLogQueryKeys } from "@/lib/queryKeys";
import { auditLogService } from "../api/auditLogService";
import type { AuditActionType, AuditLogDto } from "@repo/shared";

export const useAuditLogs = (
  month: number,
  year: number,
  action?: AuditActionType,
) => {
  return useSuspenseQuery<AuditLogDto[]>({
    queryKey: auditLogQueryKeys.byMonth(month, year, action),
    queryFn: () => auditLogService.fetchByMonth(month, year, action),
    retry: 1,
  });
};
