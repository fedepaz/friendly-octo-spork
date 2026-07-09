// src/features/auditLogs/hooks/auditLogHooks.ts

import { useSuspenseQuery } from "@tanstack/react-query";
import { auditLogQueryKeys } from "@/lib/queryKeys";
import { auditLogService } from "../api/auditLogService";
import type { AuditLogDto } from "@repo/shared";

export const useAuditLogs = () => {
  return useSuspenseQuery<AuditLogDto[]>({
    queryKey: auditLogQueryKeys.all(),
    queryFn: auditLogService.fetchAll,
    retry: 1,
  });
};
