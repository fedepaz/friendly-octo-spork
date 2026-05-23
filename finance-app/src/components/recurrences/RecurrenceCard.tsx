// src/components/recurrences/RecurrenceCard.tsx

import { Button } from "@/components/shared/Button";
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
        return <CalendarIcon class="w-5 h-5" />;
      case "calendar-days":
        return <CalendarDaysIcon class="w-5 h-5" />;
      case "clipboard":
        return <ClipboardIcon class="w-5 h-5" />;
      default:
        return <ClipboardIcon class="w-5 h-5" />;
    }
  };

  const formattedAmount = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(recurrence.amount);

  const isPositive =
    recurrence.type === "INCOME" || recurrence.type === "RETURN";
  const isNegative =
    recurrence.type === "EXPENSE" || recurrence.type === "PAYMENT";
  const amountSign = isPositive ? "+" : isNegative ? "-" : "";

  const amountClass = isPositive
    ? "text-emerald-600 font-black font-mono text-2xl"
    : isNegative
      ? "text-rose-600 font-black font-mono text-2xl"
      : "text-foreground font-black font-mono text-2xl";

  const formattedNextDate = recurrence.nextDate
    ? new Date(recurrence.nextDate).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "Completed / Paused";

  return (
    <div
      id={`recurrence-${recurrence.id}`}
      class="bg-card text-card-foreground border-2 border-border shadow-[var(--shadow-lg)] p-6 
             relative overflow-hidden rounded-xl select-none
             transition-all duration-200
             hover:-translate-y-1 hover:shadow-[var(--shadow-xl)] hover:border-border"
    >
      {/* Background Icon Watermark */}
      <div class="absolute -right-6 -bottom-6 text-muted-foreground/5 pointer-events-none transform rotate-12 scale-[2.2] w-24 h-24">
        {recurrence.frequency === "WEEKLY" && <CalendarDaysIcon />}
        {recurrence.frequency === "MONTHLY" && <CalendarIcon />}
        {recurrence.frequency === "YEARLY" && <CalendarIcon />}
        {recurrence.frequency === "INSTALLMENT" && <ClipboardIcon />}
      </div>

      <div class="flex justify-between items-start mb-4">
        <div class="space-y-1.5">
          <h3 class="text-lg font-black uppercase tracking-tight text-foreground flex items-center gap-2">
            <span
              class={`p-1.5 rounded-lg border flex items-center justify-center bg-card border-border shadow-[var(--shadow-sm)] ${currentStyles.textColor}`}
            >
              {getHeaderIcon(currentStyles.icon)}
            </span>
            <span class="truncate max-w-[150px]">{recurrence.name}</span>
          </h3>

          <div class="flex flex-wrap gap-1.5 items-center">
            <span
              class={`inline-flex items-center px-2.5 py-0.5 text-[9px] font-bold rounded-full border uppercase tracking-wider ${currentStyles.bgColor} ${currentStyles.borderColor} ${currentStyles.textColor}`}
            >
              {recurrence.frequency}
            </span>
            <span
              class={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[9px] font-bold border uppercase tracking-wider bg-card ${
                recurrence.active
                  ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20"
                  : "bg-rose-500/10 text-rose-600 border-rose-500/20"
              }`}
            >
              <span
                class={`w-1 h-1 rounded-full ${
                  recurrence.active ? "bg-emerald-500" : "bg-rose-500"
                }`}
              ></span>
              {recurrence.active ? "Active" : "Paused"}
            </span>
          </div>
        </div>

        {/* Progress Info */}
        {recurrence.totalParts ? (
          <div class="flex flex-col items-end">
            <span class="text-[9px] uppercase font-bold tracking-wider text-muted-foreground">
              Installment Progress
            </span>
            <span class="text-sm font-bold text-foreground font-mono mt-0.5">
              {recurrence.currentPart} / {recurrence.totalParts}{" "}
              <span class="text-[10px] text-muted-foreground font-normal">
                parts
              </span>
            </span>
          </div>
        ) : (
          <div class="flex flex-col items-end">
            <span class="text-[9px] uppercase font-bold tracking-wider text-muted-foreground">
              Billing Cycles
            </span>
            <span class="text-xs font-bold text-muted-foreground font-mono mt-0.5">
              Continuous
            </span>
          </div>
        )}
      </div>

      {/* Amount & Date Block */}
      <div class="my-4.5 bg-muted/20 border border-border p-3.5 rounded-lg space-y-2">
        <div class="flex justify-between items-baseline">
          <span class="text-xs font-bold text-muted-foreground uppercase tracking-wider">
            Amount
          </span>
          <span class={amountClass}>
            {amountSign}
            {formattedAmount}
          </span>
        </div>
        <div class="flex justify-between items-center border-t border-border/60 pt-2 text-xs">
          <span class="font-bold text-muted-foreground uppercase tracking-wider">
            Next Charge
          </span>
          <div class="flex items-center gap-1.5 text-foreground font-bold font-mono">
            <CalendarDaysIcon class="w-3.5 h-3.5 text-muted-foreground" />
            <span>{formattedNextDate}</span>
          </div>
        </div>
      </div>

      {/* Modern Button Group Row */}
      <div class="mt-5 pt-4 border-t border-border flex flex-wrap gap-1.5 justify-end">
        <Button
          type="button"
          class="bg-secondary text-secondary-foreground hover:bg-secondary/80 font-bold text-[10px] uppercase tracking-wider px-2.5 py-1.5 rounded border border-border shadow-[var(--shadow-sm)] hover:shadow-none hover:translate-y-[1px] transition-all"
          hxGet={`/api/recurrences/${recurrence.id}`}
          hxTarget="#modal-content"
          hxSwap="innerHTML"
          dataToggle="modal"
          dataTarget="#htmx-modal"
          aria-label={`View ${recurrence.name}`}
        >
          VIEW
        </Button>
        <Button
          type="button"
          class="bg-secondary text-secondary-foreground hover:bg-secondary/80 font-bold text-[10px] uppercase tracking-wider px-2.5 py-1.5 rounded border border-border shadow-[var(--shadow-sm)] hover:shadow-none hover:translate-y-[1px] transition-all"
          hxGet={`/api/recurrences/${recurrence.id}/edit`}
          hxTarget={`#recurrence-${recurrence.id}`}
          hxSwap="outerHTML"
          aria-label={`Edit ${recurrence.name}`}
        >
          EDIT
        </Button>
        <Button
          type="button"
          class={`${
            recurrence.active ? "bg-warning" : "bg-success"
          } text-white font-bold text-[10px] uppercase tracking-wider px-2.5 py-1.5 rounded border border-border shadow-[var(--shadow-sm)] hover:shadow-none hover:translate-y-[1px] transition-all`}
          hx-patch={`/api/recurrences/${recurrence.id}`}
          hx-vals={JSON.stringify({ active: !recurrence.active })}
          hx-target="#recurrences-list"
          hx-swap="innerHTML"
          aria-label={recurrence.active ? "Deactivate" : "Activate"}
        >
          {recurrence.active ? "PAUSE" : "RESUME"}
        </Button>
        <Button
          type="button"
          class="bg-destructive text-destructive-foreground hover:bg-destructive/80 font-bold text-[10px] uppercase tracking-wider px-2.5 py-1.5 rounded border border-border shadow-[var(--shadow-sm)] hover:shadow-none hover:translate-y-[1px] transition-all"
          hx-delete={`/api/recurrences/${recurrence.id}`}
          hx-confirm="Are you sure you want to delete this recurrence?"
          aria-label={`Delete ${recurrence.name}`}
        >
          DEL
        </Button>
      </div>
    </div>
  );
};
