// src/features/auditLogs/components/auditLog-data-table.tsx

"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useAuditLogs } from "../hooks/auditLogHooks";
import { DataTable, SlideOverForm } from "@/components/data-display/data-table";
import { auditLogColumns } from "./columns";
import { AuditLogForm } from "./auditLog-form";
import { AuditActionSelector } from "./audit-action-selector";
import { MonthSelector } from "@/components/data-display/data-table/month-selector";
import { getCurrentMonth, getCurrentYear } from "@/lib/date-utils";
import type { AuditActionType, AuditLogDto } from "@repo/shared";

export function AuditLogDataTable() {
  const adt = useTranslations("AuditLogsDashboard");
  const [month, setMonth] = useState(getCurrentMonth() - 1);
  const [year, setYear] = useState(getCurrentYear());
  const [action, setAction] = useState<AuditActionType | undefined>(undefined);
  const { data: auditLogs = [] } = useAuditLogs(month + 1, year, action);
  const [selectedLog, setSelectedLog] = useState<AuditLogDto | null>(null);

  const toolbarContent = (
    <div className="flex gap-2">
      <AuditActionSelector onActionChange={setAction} />
      <MonthSelector
        month={month}
        year={year}
        onMonthChange={setMonth}
        onYearChange={setYear}
      />
    </div>
  );

  return (
    <div className="flex-1 flex flex-col min-h-0 animate-premium-in">
      <DataTable
        columns={auditLogColumns}
        data={auditLogs}
        title={adt("title")}
        description={adt("description")}
        tableName="audit_logs"
        totalCount={auditLogs.length}
        toolbarContent={toolbarContent}
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
