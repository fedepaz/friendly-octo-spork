// src/features/cards/components/cards-data-table.tsx
"use client";

import { useState } from "react";
import { DataTable, SlideOverForm } from "@/components/data-display/data-table";

import { CardViewForm } from "./cards-view-form";

import { cardColumns } from "./columns";
import { useCardTransactionsByMonth } from "../hooks/cardHooks";
import { MonthSelector } from "@/components/data-display/data-table/month-selector";
import {
  CardStatementRow,
  mapRecurrenceToCardRow,
  mapTransactionToCardRow,
} from "../types/card.type";

export function CardsDataTable() {
  const [month, setMonth] = useState(new Date().getMonth());
  const year = new Date().getFullYear();
  const { data } = useCardTransactionsByMonth(year, month + 1);

  const [selectedCardTransaction, setSelectedCardTransaction] =
    useState<CardStatementRow | null>(null);

  const recurrenceRows = data?.recurrences.map(mapRecurrenceToCardRow) ?? [];
  const oneTimerRows = data?.oneTimers.map(mapTransactionToCardRow) ?? [];
  const paymentRows = data?.payments.map(mapTransactionToCardRow) ?? [];

  const cards: CardStatementRow[] = [
    ...recurrenceRows,
    ...oneTimerRows,
    ...paymentRows,
  ];

  return (
    <>
      <DataTable
        columns={cardColumns}
        data={cards}
        title="Extracto de Tarjeta"
        description="Seguimiento de consumos y cuotas proyectadas"
        tableName="cards"
        totalCount={cards.length}
        toolbarContent={<MonthSelector onMonthChange={setMonth} />}
        onView={(row) => setSelectedCardTransaction(row)}
      />

      <SlideOverForm
        open={!!selectedCardTransaction}
        onOpenChange={(open) => !open && setSelectedCardTransaction(null)}
        title="Ficha de Movimiento"
        description={selectedCardTransaction?.description}
      >
        {selectedCardTransaction && (
          <CardViewForm selectedCardStatementItem={selectedCardTransaction} />
        )}
      </SlideOverForm>
    </>
  );
}
