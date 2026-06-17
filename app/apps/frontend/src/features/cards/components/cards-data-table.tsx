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
  const transactions = data?.transactions || [];
  const recurrences = data?.pendingRecurrences || [];

  const cards: CardStatementRow[] = [
    ...transactions.map(mapTransactionToCardRow),
    ...recurrences.map(mapRecurrenceToCardRow),
  ];

  return (
    <>
      <DataTable
        columns={cardColumns}
        data={cards}
        title="Gastos Tarjeta de Crédito"
        description="Lista de pagos"
        tableName="cards"
        totalCount={cards.length}
        toolbarContent={<MonthSelector onMonthChange={setMonth} />}
        onView={(row) => setSelectedCardTransaction(row)}
      />

      <SlideOverForm
        open={!!selectedCardTransaction}
        onOpenChange={(open) => !open && setSelectedCardTransaction(null)}
        title="Configuración de Pago"
        description={selectedCardTransaction?.description}
      >
        {selectedCardTransaction && (
          <CardViewForm selectedCardStatementItem={selectedCardTransaction} />
        )}
      </SlideOverForm>
    </>
  );
}
