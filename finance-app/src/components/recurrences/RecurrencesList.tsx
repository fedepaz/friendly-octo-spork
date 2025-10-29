// src/components/recurrences/RecurrencesList.tsx

import type { Recurrence } from "@/generated/prisma";
import { RecurrenceCard } from "./RecurrenceCard";
import type { FC } from "hono/jsx";
import { Button } from "@/components/shared/Button"; // New import
import { Icon } from "@/components/shared/Icon"; // New import

const EmptyState: FC = () => (
  <div
    id="recurrences-list"
    class="bg-card text-card-foreground border-2 border-border shadow-[var(--shadow-lg)] p-12 text-center rounded-none"
  >
    <Icon name="clipboard" class="text-6xl mb-4" aria-label="No recurrences icon" />
    <h3 class="text-2xl md:text-3xl font-bold mb-2">
      NO RECURRENCES YET
    </h3>
    <p class="text-muted-foreground">
      CREATE YOUR FIRST RECURRENCE TO START TRACKING YOUR FINANCES.
    </p>
    <Button
      type="button" // Explicitly set type to "button"
      hxGet="/api/recurrences/new"
      hxTarget="#modal-content"
      hxSwap="innerHTML"
      dataToggle="modal"
      dataTarget="#htmx-modal"
    >
      CREATE RECURRENCE
    </Button>
  </div>
);

export function RecurrencesList({
  recurrences,
}: {
  recurrences: Recurrence[];
}) {
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
}
