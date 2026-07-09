// src/features/auditLogs/components/auditLog-data-table.tsx

"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useAuditLogs } from "../hooks/auditLogHooks";
import { DataTable, SlideOverForm } from "@/components/data-display/data-table";
import { auditLogColumns } from "./columns";
import { AuditLogForm } from "./auditLog-form";
import type { AuditLogDto } from "@repo/shared";

export function AuditLogDataTable() {
  const adt = useTranslations("AuditLogsDashboard");
  const { data: auditLogs = [] } = useAuditLogs();
  const [selectedLog, setSelectedLog] = useState<AuditLogDto | null>(null);

  return (
    <div className="flex-1 flex flex-col min-h-0 animate-premium-in">
      <DataTable
        columns={auditLogColumns}
        data={auditLogs}
        title={adt("title")}
        description={adt("description")}
        tableName="audit_logs"
        totalCount={auditLogs.length}
        onView={(row) => setSelectedLog(row)}
      />

      <SlideOverForm
        open={!!selectedLog}
        onOpenChange={(open) => !open && setSelectedLog(null)}
        title={adt("slideOverTitle")}
        description={selectedLog ? `${adt("logPrefix")} ${selectedLog.id}` : ""}
        mode="view"
      >
        {selectedLog && <AuditLogForm selectedAuditLog={selectedLog} />}
      </SlideOverForm>
    </div>
  );
}
