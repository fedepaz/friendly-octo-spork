// src/features/cards/components/cards-data-table.tsx
"use client";

import { useState } from "react";
import { DataTable, SlideOverForm } from "@/components/data-display/data-table";
import { RecurrenceDTO, TransactionType } from "@repo/shared";
import { CardViewForm } from "./cards-view-form";

import { TransTypeSelector } from "@/components/data-display/data-table/transType-selector";
import { useCardExpenses } from "../hooks/cardHooks";
import { cardColumns } from "./columns";

export function CardsDataTable() {
  const { data: cards = [] } = useCardExpenses();
  const [transactionType, setTransactionType] =
    useState<TransactionType>("EXPENSE");
  const [selectedRecurrence, setSelectedRecurrence] =
    useState<RecurrenceDTO | null>(null);

  const toolbarContent = (
    <div className="flex gap-2">
      <TransTypeSelector onTransTypeChange={setTransactionType} />
    </div>
  );

  return (
    <>
      <DataTable
        columns={cardColumns}
        data={cards}
        title="Gastos Tarjeta de Crédito"
        description="Lista de pagos"
        tableName="cards"
        totalCount={cards.length}
        toolbarContent={toolbarContent}
        onView={(row) => setSelectedRecurrence(row)}
      />

      <SlideOverForm
        open={!!selectedRecurrence}
        onOpenChange={(open) => !open && setSelectedRecurrence(null)}
        title="Configuración de Pago"
        description={selectedRecurrence?.name}
      >
        {selectedRecurrence && (
          <CardViewForm selectedRecurrence={selectedRecurrence} />
        )}
      </SlideOverForm>
    </>
  );
}
