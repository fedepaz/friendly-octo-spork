// src/features/cards/components/cards-data-table.tsx
"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { DataTable, SlideOverForm } from "@/components/data-display/data-table";
import { KPICard } from "@/components/data-display/kpi-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { CardViewForm } from "./cards-view-form";

import { cardColumns } from "./columns";
import { useCardTransactionsByMonth } from "../hooks/cardHooks";
import { MonthSelector } from "@/components/data-display/data-table/month-selector";
import {
  CardStatementRow,
  mapRecurrenceToCardRow,
  mapTransactionToCardRow,
} from "../types/card.type";
import { cn, formatCurrency } from "@/lib/utils";
import { Repeat, ShoppingCart, ArrowLeftRight, Banknote } from "lucide-react";
import { getCurrentMonth, getCurrentYear } from "@/lib/date-utils";

export function CardsDataTable() {
  const cdT = useTranslations("CardsDashboard");
  const [month, setMonth] = useState(getCurrentMonth() - 1);
  const year = getCurrentYear();
  const { data } = useCardTransactionsByMonth(year, month + 1);

  const [selectedCardTransaction, setSelectedCardTransaction] =
    useState<CardStatementRow | null>(null);

  const recurrenceRows = data?.recurrences.map(mapRecurrenceToCardRow) ?? [];
  const oneTimerRows =
    data?.oneTimers.map((t) => mapTransactionToCardRow(t, "oneTimer")) ?? [];
  const paymentRows =
    data?.payments.map((t) => mapTransactionToCardRow(t, "payment")) ?? [];

  const cards: CardStatementRow[] = [
    ...recurrenceRows,
    ...oneTimerRows,
    ...paymentRows,
  ];

  const summary = data?.summary;
  const balance = Number(summary?.balance ?? 0);
  const isPositiveBalance = balance >= 0;

  return (
    <>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 shrink-0 animate-premium-in">
        <KPICard
          title={cdT("kpiProjectedInstallments")}
          value={formatCurrency(Number(summary?.totalRecurrences ?? 0))}
          description={cdT("kpiProjectedInstallmentsDesc")}
          icon={Repeat}
        />
        <KPICard
          title={cdT("kpiMonthlyConsumption")}
          value={formatCurrency(Number(summary?.totalOneTimers ?? 0))}
          description={cdT("kpiMonthlyConsumptionDesc")}
          icon={ShoppingCart}
        />
        <KPICard
          title={cdT("kpiPaymentsMade")}
          value={formatCurrency(Number(summary?.totalPayments ?? 0))}
          description={cdT("kpiPaymentsMadeDesc")}
          icon={ArrowLeftRight}
        />
        <Card
          className={cn(
            "rounded-none border-border/40 shadow-premium transition-premium",
            isPositiveBalance
              ? "bg-destructive/5 border-destructive/20"
              : "bg-card/40",
          )}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 px-4 pt-4 pb-1">
            <CardTitle className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">
              {cdT("debtTotal")}
            </CardTitle>
            <Banknote
              className={cn(
                "size-3.5 opacity-40",
                isPositiveBalance
                  ? "text-destructive"
                  : "text-secondary",
              )}
            />
          </CardHeader>
          <CardContent className="px-4 pb-4 pt-0">
            <p
              className={cn(
                "text-2xl font-mono font-black tracking-tighter tabular-nums",
                isPositiveBalance ? "text-destructive" : "text-secondary",
              )}
            >
              {formatCurrency(balance)}
            </p>
            <p className="text-[10px] font-bold uppercase text-muted-foreground/70 leading-none mt-1 tracking-tight">
              {isPositiveBalance
                ? cdT("balanceToPay")
                : cdT("noDebt")}
            </p>
          </CardContent>
        </Card>
      </div>

      <DataTable
        columns={cardColumns}
        data={cards}
        title={cdT("tableTitle")}
        description={cdT("tableDescription")}
        tableName="cards"
        totalCount={cards.length}
        toolbarContent={<MonthSelector onMonthChange={setMonth} />}
        onView={(row) => setSelectedCardTransaction(row)}
      />

      <SlideOverForm
        open={!!selectedCardTransaction}
        onOpenChange={(open) => !open && setSelectedCardTransaction(null)}
        title={cdT("slideOverTitle")}
        description={selectedCardTransaction?.description}
      >
        {selectedCardTransaction && (
          <CardViewForm selectedCardStatementItem={selectedCardTransaction} />
        )}
      </SlideOverForm>
    </>
  );
}
