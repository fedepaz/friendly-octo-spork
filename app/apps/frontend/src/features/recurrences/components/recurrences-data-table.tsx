// src/features/recurrences/components/recurrences-data-table.tsx
"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { DataTable, SlideOverForm } from "@/components/data-display/data-table";
import { useRecurrencesByMonth } from "../hooks/recurrenceHooks";
import { recurrenceColumns } from "./columns";
import { RecurrenceDTO, TransactionType } from "@repo/shared";
import { RecurrenceViewForm } from "./recurrence-view-form";
import { MonthSelector } from "@/components/data-display/data-table/month-selector";
import { TransTypeSelector } from "@/components/data-display/data-table/transType-selector";
import { getCurrentMonth, getCurrentYear } from "@/lib/date-utils";
import { EmptyState } from "@/components/common/empty-state";

export function RecurrencesDataTable() {
  const rdT = useTranslations("RecurrencesDashboard");
  const [month, setMonth] = useState(getCurrentMonth() - 1);
  const year = getCurrentYear();
  const [transactionType, setTransactionType] =
    useState<TransactionType>("EXPENSE");
  const { data: recurrences = [] } = useRecurrencesByMonth(
    month + 1,
    year,
    transactionType,
  );
  const [selectedRecurrence, setSelectedRecurrence] =
    useState<RecurrenceDTO | null>(null);

  const toolbarContent = (
    <div className="flex gap-2">
      <TransTypeSelector onTransTypeChange={setTransactionType} />
      <MonthSelector onMonthChange={setMonth} />
    </div>
  );

  if (!recurrences || recurrences.length === 0) {
    return <EmptyState />;
  }

  return (
    <>
      <DataTable
        columns={recurrenceColumns}
        data={recurrences}
        title={rdT("title")}
        description={rdT("description")}
        tableName="recurrences"
        totalCount={recurrences.length}
        toolbarContent={toolbarContent}
        onView={(row) => setSelectedRecurrence(row)}
      />

      <SlideOverForm
        open={!!selectedRecurrence}
        onOpenChange={(open) => !open && setSelectedRecurrence(null)}
        title={rdT("slideOverTitle")}
        description={selectedRecurrence?.name}
      >
        {selectedRecurrence && (
          <RecurrenceViewForm selectedRecurrence={selectedRecurrence} />
        )}
      </SlideOverForm>
    </>
  );
}
