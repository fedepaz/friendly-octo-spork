// src/features/auditLogs/components/AuditLogDashboardSkeleton.tsx

import { DataTableSkeleton } from "@/components/data-display/data-table";
import { auditLogColumns } from "./columns";

export function AuditLogDashboardSkeleton() {
  return <DataTableSkeleton columnCount={auditLogColumns.length} />;
}
