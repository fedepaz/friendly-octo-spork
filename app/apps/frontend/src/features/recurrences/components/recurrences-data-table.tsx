// src/features/recurrences/components/recurrences-data-table.tsx
"use client";

import { DataTable } from "@/components/data-display/data-table";
import { useRecurrences } from "../hooks/recurrenceHooks";
import { recurrenceColumns } from "./columns";

export function RecurrencesDataTable() {
  const { data: recurrences = [] } = useRecurrences();

  return (
    <>
      <DataTable
        columns={recurrenceColumns}
        data={recurrences}
        title="Cuentas Pendientes"
        description="Lista de cuentas pendientes"
        tableName="recurrences"
        totalCount={recurrences.length}
      />
    </>
  );
}
