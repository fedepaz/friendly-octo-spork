// src/components/recurrences/RecurrenceRow.tsx

import { Button } from "@/components/shared/Button";
import type { FC } from "hono/jsx";
import {
  CalendarDaysIcon,
  CalendarIcon,
  ClipboardIcon,
} from "@/components/icons";
import type { RecurrenceDTO } from "@/api/recurrences/recurrences.schema";

interface RecurrenceRowProps {
  recurrence: RecurrenceDTO;
}

export const RecurrenceRow: FC<RecurrenceRowProps> = ({ recurrence }) => {
  const getFrequencyIcon = (freq: string) => {
    switch (freq) {
      case "WEEKLY":
        return <CalendarDaysIcon class="w-4 h-4 text-purple-500" />;
      case "MONTHLY":
      case "YEARLY":
        return <CalendarIcon class="w-4 h-4 text-blue-500" />;
      case "INSTALLMENT":
        return <ClipboardIcon class="w-4 h-4 text-amber-500" />;
      default:
        return <ClipboardIcon class="w-4 h-4 text-muted-foreground" />;
    }
  };

  const frequencyStyles: Record<string, string> = {
    MONTHLY: "bg-blue-500/10 text-blue-500 border-blue-500/20",
    WEEKLY: "bg-purple-500/10 text-purple-500 border-purple-500/20",
    YEARLY: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
    INSTALLMENT: "bg-amber-500/10 text-amber-500 border-amber-500/20",
  };

  const currentFreqStyle =
    frequencyStyles[recurrence.frequency] ||
    "bg-muted text-muted-foreground border-border";

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
    ? "text-emerald-600 font-bold font-mono text-sm"
    : isNegative
      ? "text-rose-600 font-bold font-mono text-sm"
      : "text-foreground font-semibold font-mono text-sm";

  const formattedNextDate = recurrence.nextDate
    ? new Date(recurrence.nextDate).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "Completed";

  return (
    <tr
      id={`recurrence-${recurrence.id}`}
      class="border-b border-border hover:bg-muted/50 transition-all duration-200 "
    >
      {/* Recurrence Name & Icon */}
      <td class="p-4 align-middle text-left">
        <div class="flex items-center gap-2.5">
          <div class="p-2 bg-card rounded-lg border border-border shadow-[var(--shadow-sm)] flex items-center justify-center">
            {getFrequencyIcon(recurrence.frequency)}
          </div>
          <span class="font-bold text-foreground leading-snug">
            {recurrence.name}
          </span>
        </div>
      </td>

      {/* Frequency Badge */}
      <td class="p-4 align-middle text-left">
        <span
          class={`inline-flex items-center px-2.5 py-0.5 text-[10px] font-bold rounded-full border uppercase tracking-wider ${currentFreqStyle}`}
        >
          {recurrence.frequency}
        </span>
      </td>

      {/* Sign and Color Coded Amount */}
      <td class="p-4 align-middle text-right whitespace-nowrap">
        <span class={amountClass}>
          {amountSign}
          {formattedAmount}
        </span>
      </td>

      {/* Progress / Cycles Info */}
      <td class="p-4 align-middle text-left">
        {recurrence.totalParts ? (
          <span class="font-semibold text-foreground text-sm font-mono">
            {recurrence.currentPart} / {recurrence.totalParts}{" "}
            <span class="text-xs text-muted-foreground font-normal">parts</span>
          </span>
        ) : (
          <span class="text-xs font-semibold text-muted-foreground uppercase tracking-wider font-mono">
            Continuous
          </span>
        )}
      </td>

      {/* Next Charge Date */}
      <td class="p-4 align-middle text-left">
        <span class="text-sm font-bold font-mono text-foreground">
          {formattedNextDate}
        </span>
      </td>

      {/* Active/Status Pill */}
      <td class="p-4 align-middle text-left">
        <span
          class={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold border uppercase tracking-wider bg-card ${
            recurrence.active
              ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20"
              : "bg-rose-500/10 text-rose-600 border-rose-500/20"
          }`}
        >
          <span
            class={`w-1.5 h-1.5 rounded-full ${
              recurrence.active ? "bg-emerald-500" : "bg-rose-500"
            }`}
          ></span>
          {recurrence.active ? "Active" : "Paused"}
        </span>
      </td>

      {/* Actions Compact Group */}
      <td class="p-4 align-middle text-center w-56">
        <div class="flex items-center justify-center gap-1">
          <Button
            type="button"
            class="bg-secondary text-secondary-foreground hover:bg-secondary/80 font-bold text-[9px] uppercase tracking-wider px-2 py-1 rounded border border-border shadow-[var(--shadow-sm)] hover:shadow-none hover:translate-y-[1px] transition-all"
            hxGet={`/recurrences/${recurrence.id}`}
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
            class="bg-secondary text-secondary-foreground hover:bg-secondary/80 font-bold text-[9px] uppercase tracking-wider px-2 py-1 rounded border border-border shadow-[var(--shadow-sm)] hover:shadow-none hover:translate-y-[1px] transition-all"
            hxGet={`/recurrences/${recurrence.id}/edit`}
            hxTarget={`#recurrence-${recurrence.id}`}
            hxSwap="outerHTML"
            aria-label={`Edit ${recurrence.name}`}
            hxOn="htmx:afterSwap: document.getElementById('htmx-modal').classList.remove('hidden')"
          >
            EDIT
          </Button>
        </div>
      </td>
    </tr>
  );
};
