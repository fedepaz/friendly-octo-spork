// src/features/auditLogs/api/auditLogService.ts

import { clientFetch } from "@/lib/api/client-fetch";
import type { AuditLogDto } from "@repo/shared";

export const auditLogService = {
  fetchAll: () => {
    return clientFetch<AuditLogDto[]>("audit-logs", { method: "GET" });
  },
};
