// src/components/recurrences/RecurrenceCard.tsx

import type { FC } from "hono/jsx";
import {
  CalendarDaysIcon,
  CalendarIcon,
  ClipboardIcon,
} from "@/components/icons";
import type { RecurrenceDTO } from "@/api/recurrences/recurrences.schema";
import { recurrenceTypeStyles } from "@/types/typesStyleMap";

interface RecurrenceCardProps {
  recurrence: RecurrenceDTO;
}

export const RecurrenceCard: FC<RecurrenceCardProps> = ({ recurrence }) => {
  const currentStyles = recurrenceTypeStyles[recurrence.frequency] || {
    textColor: "text-muted-foreground",
    bgColor: "bg-muted",
    borderColor: "border-border",
    icon: "clipboard",
  };

  const getHeaderIcon = (iconName: string) => {
    switch (iconName) {
      case "calendar":
        return <CalendarIcon class="w-6 h-6" />;
      case "calendar-days":
        return <CalendarDaysIcon class="w-6 h-6" />;
      case "clipboard":
        return <ClipboardIcon class="w-6 h-6" />;
      default:
        return <ClipboardIcon class="w-6 h-6" />;
    }
  };

  const isPositive =
    recurrence.type === "INCOME" || recurrence.type === "RETURN";
  const isNegative =
    recurrence.type === "EXPENSE" || recurrence.type === "PAYMENT";

  const formattedNextDate = recurrence.nextDate
    ? new Date(recurrence.nextDate).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : "Completed / Paused";

  const formattedStartDate = new Date(recurrence.startDate).toLocaleDateString(
    "en-US",
    {
      month: "short",
      day: "numeric",
      year: "numeric",
    },
  );

  return (
    <div
      id={`recurrence-${recurrence.id}`}
      class="bg-card text-card-foreground border-4 border-border shadow-[var(--shadow-lg)] p-8 relative overflow-hidden w-full max-w-md mx-auto select-none"
      style="min-width: 320px;"
    >
      {/* Neo-brutalism decorative corner */}
      <div class="absolute -top-6 -right-6 w-12 h-12 bg-primary rotate-45 border-4 border-border"></div>

      <div class="flex justify-between items-start mb-8">
        <div>
          <h3 class="text-sm font-black uppercase tracking-widest text-muted-foreground mb-1">
            Recurrence Details
          </h3>
          <div
            class={`inline-flex items-center gap-2 px-3 py-1.5 text-xs font-black border-2 border-border shadow-[var(--shadow-sm)] uppercase tracking-tight
            ${currentStyles.bgColor} ${currentStyles.textColor} ${currentStyles.borderColor}`}
          >
            {getHeaderIcon(currentStyles.icon)}
            {recurrence.frequency}
          </div>
        </div>
        <div class="text-right">
          <div class="text-xs font-bold text-muted-foreground uppercase mb-1">
            Status
          </div>
          <div
            class={`inline-flex items-center gap-1.5 px-3 py-1 border-2 border-border shadow-[var(--shadow-sm)] text-[10px] font-black uppercase tracking-tighter
            ${
              recurrence.active
                ? "bg-emerald-500 text-white"
                : "bg-rose-500 text-white"
            }`}
          >
            <span
              class={`w-2 h-2 rounded-full border border-white/20 ${
                recurrence.active ? "bg-white" : "bg-white"
              }`}
            ></span>
            {recurrence.active ? "Active" : "Paused"}
          </div>
        </div>
      </div>

      <div class="mb-8 p-6 bg-muted/30 border-2 border-border shadow-inner">
        <div class="text-xs font-black uppercase tracking-widest text-muted-foreground mb-2">
          Amount per cycle
        </div>
        <div
          class={`font-mono text-5xl font-black ${
            isPositive
              ? "text-emerald-500"
              : isNegative
                ? "text-rose-500"
                : "text-foreground"
          }`}
        >
          {Number(recurrence.amount).toFixed(2)}
        </div>
      </div>

      <div class="space-y-6">
        <div>
          <div class="text-xs font-black uppercase tracking-widest text-muted-foreground mb-2">
            Description
          </div>
          <p class="font-black text-2xl leading-tight uppercase">
            {recurrence.name}
          </p>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div class="p-4 border-2 border-border bg-card shadow-[var(--shadow-sm)]">
            <div class="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">
              Next Charge
            </div>
            <div class="font-mono font-black text-sm">{formattedNextDate}</div>
          </div>
          <div class="p-4 border-2 border-border bg-card shadow-[var(--shadow-sm)]">
            <div class="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">
              Started On
            </div>
            <div class="font-mono font-bold text-sm text-muted-foreground">
              {formattedStartDate}
            </div>
          </div>
        </div>

        {recurrence.currentPart &&
          recurrence.totalParts &&
          recurrence.type === "EXPENSE" && (
            <div class="p-4 bg-primary/5 border-2 border-primary/20 shadow-[var(--shadow-sm)]">
              <div class="flex justify-between items-center">
                <span class="text-xs font-black uppercase tracking-widest text-primary">
                  Installment Progress
                </span>
                <span class="font-mono font-black text-lg text-primary">
                  {recurrence.currentPart} / {recurrence.totalParts}
                </span>
              </div>
              <div class="mt-2 w-full h-3 bg-muted border border-border overflow-hidden">
                <div
                  class="h-full bg-primary transition-all duration-500"
                  style={{
                    width: `${
                      (recurrence.currentPart / recurrence.totalParts) * 100
                    }%`,
                  }}
                ></div>
              </div>
            </div>
          )}

        <div class="pt-4 border-t-2 border-border border-dashed space-y-3">
          <div class="flex justify-between items-center text-[10px]">
            <span class="font-black uppercase tracking-widest text-muted-foreground">
              Recurrence ID
            </span>
            <span class="font-mono text-muted-foreground truncate max-w-[150px]">
              {recurrence.id}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
