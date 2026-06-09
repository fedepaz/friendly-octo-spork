// src/features/recurrences/components/recurrences-data-table.tsx
"use client";

import { useState } from "react";
import { DataTable, SlideOverForm } from "@/components/data-display/data-table";
import { useRecurrencesByMonth } from "../hooks/recurrenceHooks";
import { recurrenceColumns } from "./columns";
import { RecurrenceDTO, TransactionType } from "@repo/shared";
import { RecurrenceViewForm } from "./recurrence-view-form";
import { MonthSelector } from "@/components/data-display/data-table/month-selector";
import { TransTypeSelector } from "@/components/data-display/data-table/transType-selector";

export function RecurrencesDataTable() {
  const [month, setMonth] = useState(new Date().getMonth());
  const year = new Date().getFullYear();
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

  return (
    <>
      <DataTable
        columns={recurrenceColumns}
        data={recurrences}
        title="Cuentas Pendientes"
        description="Lista de cuentas con pagos recurrentes"
        tableName="recurrences"
        totalCount={recurrences.length}
        toolbarContent={toolbarContent}
        onView={(row) => setSelectedRecurrence(row)}
      />

      <SlideOverForm
        open={!!selectedRecurrence}
        onOpenChange={(open) => !open && setSelectedRecurrence(null)}
        title="Configuración de Recurrencia"
        description={selectedRecurrence?.name}
      >
        {selectedRecurrence && (
          <RecurrenceViewForm selectedRecurrence={selectedRecurrence} />
        )}
      </SlideOverForm>
    </>
  );
}
