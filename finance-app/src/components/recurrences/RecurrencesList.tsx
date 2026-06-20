// src/components/recurrences/RecurrencesList.tsx

import type { FC } from "hono/jsx";
import { RecurrenceRow } from "./RecurrenceRow";
import { ClipboardIcon } from "@/components/icons/ClipboardIcon";
import type { RecurrenceDTO } from "@/api/recurrences/recurrences.schema";

const EmptyState: FC = () => (
  <div
    id="recurrences-list"
    class="bg-card text-card-foreground border-2 border-border shadow-[var(--shadow-lg)] p-12 text-center rounded-xl max-w-lg mx-auto border-dashed animate-fade-in"
  >
    <div class="inline-flex p-4 rounded-full bg-primary/10 text-primary border border-primary/20 mb-4 shadow-[var(--shadow-sm)]">
      <ClipboardIcon class="w-8 h-8" aria-label="No recurrences icon" />
    </div>
    <h3 class="text-xl font-black text-foreground mb-2 uppercase tracking-wide">
      No recurrences yet
    </h3>
    <p class="text-sm text-muted-foreground leading-relaxed max-w-sm mx-auto">
      You haven't set up any recurring payments or scheduled bills. Use the
      recurrence creation form to get started and automate your tracking!
    </p>
  </div>
);

interface RecurrencesListProps {
  recurrences: RecurrenceDTO[];
}

export const RecurrencesList: FC<RecurrencesListProps> = ({ recurrences }) => {
  if (recurrences.length === 0) {
    return <EmptyState />;
  }

  return (
    <div
      id="recurrences-list"
      class="bg-card text-card-foreground border-2 border-border shadow-[var(--shadow-lg)] rounded-xl overflow-hidden"
    >
      <div class="overflow-x-auto">
        <table class="w-full border-collapse">
          <thead>
            <tr class="border-b-2 border-border bg-primary/5 text-muted-foreground text-[10px] font-black uppercase tracking-[0.2em]">
              <th class="p-4 text-left whitespace-nowrap">Recurrence Name</th>
              <th class="p-4 text-left whitespace-nowrap w-28">Frequency</th>
              <th class="p-4 text-right whitespace-nowrap w-32">Amount</th>
              <th class="p-4 text-left whitespace-nowrap w-28">Progress</th>
              <th class="p-4 text-left whitespace-nowrap w-36">Next Charge</th>
              <th class="p-4 text-left whitespace-nowrap w-24">Status</th>
              <th class="p-4 text-center whitespace-nowrap w-32">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y border-border">
            {recurrences.map((recurrence) => (
              <RecurrenceRow key={recurrence.id} recurrence={recurrence} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
