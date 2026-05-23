// src/components/recurrences/RecurrencesList.tsx

import type { FC } from "hono/jsx";
import { RecurrenceCard } from "./RecurrenceCard";
import { ClipboardIcon } from "@/components/icons/ClipboardIcon";
import type { RecurrenceDTO } from "@/api/recurrences/recurrences.schema";

const EmptyState: FC = () => (
  <div
    id="recurrences-list"
    class="bg-card text-card-foreground border-2 border-border shadow-[var(--shadow-lg)] p-12 text-center rounded-none"
  >
    <ClipboardIcon class="text-6xl mb-4" aria-label="No recurrences icon" />{" "}
    <h3 class="text-2xl md:text-3xl font-bold mb-2">NO RECURRENCES YET</h3>
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
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {recurrences.map((recurrence) => (
        <RecurrenceCard recurrence={recurrence} />
      ))}
    </div>
  );
};
