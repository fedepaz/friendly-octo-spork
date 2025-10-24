// src/components/recurrences/RecurrencesList.tsx

import type { Recurrence } from "@/generated/prisma";
import { RecurrenceCard } from "./RecurrenceCard";

export function RecurrencesList({
  recurrences,
}: {
  recurrences: Recurrence[];
}) {
  if (recurrences.length === 0) {
    return (
      <div id="recurrences-list" class="neo-card text-center p-12">
        <div class="text-6xl mb-4">📋</div>
        <h3 class="text-2xl font-bold mb-2">NO RECURRENCES YET</h3>
        <p class="text-muted-foreground mb-6">
          CREATE YOUR FIRST RECURRENCE TO START TRACKING YOUR FINANCES.
        </p>
        <button 
          class="neo-btn bg-primary text-primary-foreground"
          hx-get="/api/recurrences/new"
          hx-target="#modal-content"
          hx-swap="innerHTML"
          data-toggle="modal"
          data-target="#htmx-modal"
        >
          CREATE RECURRENCE
        </button>
      </div>
    );
  }

  return (
    <div id="recurrences-list" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {recurrences.map((recurrence) => (
        <RecurrenceCard recurrence={recurrence} />
      ))}
    </div>
  );
}
