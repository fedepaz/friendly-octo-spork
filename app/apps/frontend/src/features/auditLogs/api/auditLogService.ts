// src/features/auditLogs/api/auditLogService.ts

import { clientFetch } from "@/lib/api/client-fetch";
import type { AuditActionType, AuditLogDto } from "@repo/shared";

export const auditLogService = {
  fetchByMonth: (month: number, year: number, action?: AuditActionType) => {
    const params = new URLSearchParams({
      month: String(month),
      year: String(year),
    });
    if (action) params.set("action", action);
    return clientFetch<AuditLogDto[]>(`audit-logs?${params.toString()}`, {
      method: "GET",
    });
  },
};
