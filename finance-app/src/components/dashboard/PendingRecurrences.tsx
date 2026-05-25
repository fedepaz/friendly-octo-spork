// src/components/dashboard/PendingRecurrences.tsx

import type { FC } from "hono/jsx";
import type { RecurrenceDTO } from "@/api/recurrences/recurrences.schema";
import { Button } from "@/components/shared/Button";
import { CalendarIcon } from "@/components/icons";

interface PendingRecurrencesProps {
  recurrences: RecurrenceDTO[];
}

export const PendingRecurrences: FC<PendingRecurrencesProps> = ({
  recurrences,
}) => {
  if (recurrences.length === 0) {
    return (
      <div class="bg-card text-card-foreground border-2 border-border shadow-[var(--shadow-lg)] p-6 rounded-none">
        <h3 class="text-xl font-bold uppercase tracking-wider mb-4 flex items-center gap-2">
          <CalendarIcon /> Pending Bills
        </h3>
        <p class="text-muted-foreground italic text-sm">
          All clear! No pending recurring payments for this month.
        </p>
      </div>
    );
  }

  return (
    <div class="bg-card text-card-foreground border-2 border-border shadow-[var(--shadow-lg)] p-6 rounded-none h-full">
      <h3 class="text-xl font-bold uppercase tracking-wider mb-4 flex items-center gap-2">
        <CalendarIcon /> Pending Bills
      </h3>
      <div class="space-y-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
        {recurrences.map((rec) => (
          <div class="border-2 border-border bg-muted/10 p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-all duration-150 hover:bg-muted/20">
            <div class="flex-1">
              <p class="font-bold text-lg uppercase leading-tight">{rec.name}</p>
              <div class="flex items-center gap-3 mt-1 text-sm text-muted-foreground">
                <span class="flex items-center gap-1 font-mono">
                  <span class="text-primary font-bold">$</span>
                  {rec.amount.toFixed(2)}
                </span>
                <span class="w-1 h-1 rounded-full bg-border"></span>
                <span>{rec.frequency}</span>
                {rec.totalParts && (
                  <>
                    <span class="w-1 h-1 rounded-full bg-border"></span>
                    <span>
                      Part {rec.currentPart + 1}/{rec.totalParts}
                    </span>
                  </>
                )}
              </div>
            </div>
            <Button
              type="button"
              class="w-full sm:w-auto bg-primary text-primary-foreground font-bold text-xs px-4 py-2 hover:translate-x-0 hover:translate-y-0"
              hxGet={`/transactions/link-recurrence/${rec.id}`}
              hxTarget="#modal-content"
              hxSwap="innerHTML"
            >
              PAY
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};
