// src/components/recurrences/RecurrenceCard.tsx

import type { Recurrence } from "@/generated/prisma";

const recurrenceTypeIcons: Record<string, string> = {
  MONTHLY: "📆",
  WEEKLY: "📅",
  YEARLY: "📆",
  INSTALLMENT: "📈",
};

export function RecurrenceCard({ recurrence }: { recurrence: Recurrence }) {
  return (
    <div id={`recurrence-${recurrence.id}`} class="neo-card hover:transform-none">
      <div class="p-6">
        <div class="flex justify-between items-start">
          <div>
            <h3 class="text-xl font-bold mb-2">
              <span class="mr-2">
                <span class="inline-block bg-secondary text-secondary-foreground px-2 py-1 text-xs font-bold uppercase">
                  {recurrenceTypeIcons[recurrence.frequency]}
                </span>
                {recurrence.name}
              </span>
            </h3>
            <span
              class="inline-block bg-muted text-muted-foreground px-2 py-1 text-xs font-bold uppercase"
            >
              {recurrence.frequency}
            </span>
          </div>
          <div class="text-right">
            <div class="text-sm text-muted-foreground">TOTAL PARTS</div>
          </div>
        </div>
        <div class="mt-4 flex gap-2">
          <button
            class="neo-btn text-xs py-1 px-2 bg-primary text-primary-foreground"
            hx-get={`/api/recurrences/${recurrence.id}`}
            hx-target="#modal-content"
            hx-swap="innerHTML"
            data-toggle="modal"
            data-target="#htmx-modal"
          >
            VIEW
          </button>
          <button
            class="neo-btn text-xs py-1 px-2 bg-secondary text-secondary-foreground"
            hx-get={`/api/recurrences/${recurrence.id}/edit`}
            hx-target={`#recurrence-${recurrence.id}`}
            hx-swap="outerHTML"
          >
            EDIT
          </button>
          <button
            class="neo-btn bg-destructive text-destructive-foreground text-xs py-1 px-2"
            hx-delete={`/api/recurrences/${recurrence.id}`}
            hx-target={`#recurrence-${recurrence.id}`}
            hx-swap="outerHTML swap:1s"
            hx-confirm="Are you sure you want to delete this recurrence?"
          >
            DELETE
          </button>
        </div>
      </div>
    </div>
  );
}
