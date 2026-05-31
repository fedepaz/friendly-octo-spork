// src/features/recurrences/components/recurrences-data-table.tsx
"use client";

import { useState } from "react";
import { DataTable, SlideOverForm } from "@/components/data-display/data-table";
import { useRecurrences } from "../hooks/recurrenceHooks";
import { recurrenceColumns } from "./columns";
import { RecurrenceDTO } from "@repo/shared";
import { RecurrenceViewForm } from "./recurrence-view-form";

export function RecurrencesDataTable() {
  const { data: recurrences = [] } = useRecurrences();
  const [selectedRecurrence, setSelectedRecurrence] =
    useState<RecurrenceDTO | null>(null);

  return (
    <>
      <DataTable
        columns={recurrenceColumns}
        data={recurrences}
        title="Cuentas Pendientes"
        description="Lista de cuentas con pagos recurrentes"
        tableName="recurrences"
        totalCount={recurrences.length}
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
