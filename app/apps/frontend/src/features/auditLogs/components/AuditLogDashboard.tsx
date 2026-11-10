"use client";

import { Suspense } from "react";
import { AuditLogDataTable } from "./auditLog-data-table";
import { AuditLogDashboardSkeleton } from "./auditLog-dashboard-skeleton";

export function AuditLogDashboard() {
  return (
    <div className="flex-1 flex flex-col gap-3 min-h-0 animate-premium-in">
      <Suspense fallback={<AuditLogDashboardSkeleton />}>
        <AuditLogDataTable />
      </Suspense>
    </div>
  );
}
