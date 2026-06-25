// src/features/recurrences/components/recurrence-view-form.tsx
"use client";

import { useTranslations } from "next-intl";
import { RecurrenceDTO } from "@repo/shared";

import { formatCurrency, cn } from "@/lib/utils";
import { formatShortDate } from "@/lib/date-utils";
import { Calendar, Clock } from "lucide-react";

interface RecurrenceViewFormProps {
  selectedRecurrence: RecurrenceDTO;
}

export function RecurrenceViewForm({
  selectedRecurrence,
}: RecurrenceViewFormProps) {
  const rvfT = useTranslations("RecurrenceViewForm");

  return (
    <div className="space-y-6">
      <div className="p-3 bg-accent/5 border border-accent/20 flex items-center justify-between">
        <div className="flex items-center gap-2 text-accent">
          <Clock className="h-4 w-4" />
          <span className="text-2.5 font-black uppercase">
            {rvfT("frequency", { frequency: selectedRecurrence.frequency })}
          </span>
        </div>
        <div className="font-mono text-2.5 font-bold">
          {rvfT("next")} {formatShortDate(selectedRecurrence.nextDate)}
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-2.5 uppercase font-bold text-muted-foreground opacity-50">
          {rvfT("financialImpact")}
        </p>
        <div className="flex items-end gap-2">
          <p
            className={cn(
              "text-3xl font-mono font-black tracking-tighter",
              selectedRecurrence.type === "EXPENSE"
                ? "text-destructive"
                : "text-secondary",
            )}
          >
            {formatCurrency(selectedRecurrence.amount)}
          </p>
          <span className="text-2.5 font-bold mb-1.5 opacity-50">
            {rvfT("perUnit", { frequency: selectedRecurrence.frequency.toLowerCase() })}
          </span>
        </div>
      </div>

      <div className="space-y-3">
        <h4 className="text-2.5 font-bold uppercase tracking-widest text-muted-foreground border-b border-border pb-1">
          {rvfT("planProgress")}
        </h4>
        <div className="bg-muted/30 p-3 border border-border">
          <div className="flex justify-between items-center mb-2">
            <span className="text-2.5 font-bold">{rvfT("installmentStatus")}</span>
            <span className="font-mono text-2.5">
              {rvfT("installmentCount", { current: selectedRecurrence.currentPart ?? 0, total: selectedRecurrence.totalParts ?? 0 })}
            </span>
          </div>
          <div className="h-1 w-full bg-border overflow-hidden">
            <div
              className="h-full bg-primary"
              style={{
                width: `${((selectedRecurrence.currentPart ?? 1) / (selectedRecurrence.totalParts ?? 1)) * 100}%`,
              }}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-2">
        <div className="flex items-center justify-between p-2 bg-background border border-border font-mono text-2.5">
          <span className="opacity-50 uppercase">{rvfT("originFunds")}</span>
          <div className="flex items-center gap-2">
            {selectedRecurrence.cardType && (
              <span className="bg-accent/10 text-accent px-1.5 py-0.5 border border-accent/20 text-[10px] font-bold">
                {selectedRecurrence.cardType}
              </span>
            )}
            <span className="font-bold">
              {selectedRecurrence.sourceAccount?.name || rvfT("notDefined")}
            </span>
          </div>
        </div>
        {selectedRecurrence.targetAccount && (
          <div className="flex items-center justify-between p-2 bg-background border border-border font-mono text-2.5">
            <span className="opacity-50 uppercase">{rvfT("destination")}</span>
            <span className="font-bold">
              {selectedRecurrence.targetAccount.name}
            </span>
          </div>
        )}
      </div>

      <div className="flex items-center gap-2 p-3 border border-dashed border-border opacity-50">
        <Calendar className="h-4 w-4" />
        <div className="text-2.5">
          <p className="font-bold uppercase leading-none">{rvfT("startDate")}</p>
          <p className="font-mono">
            {formatShortDate(selectedRecurrence.startDate)}
          </p>
        </div>
      </div>
    </div>
  );
}
