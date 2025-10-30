import type { Recurrence } from "@/generated/prisma";
import { Button } from "@/components/shared/Button"; // New import
import { Icon } from "@/components/shared/Icon"; // New import

const recurrenceTypeIcons: Record<string, string> = {
  // Changed to use icon names
  MONTHLY: "calendar",
  WEEKLY: "calendar-days",
  YEARLY: "calendar",
  INSTALLMENT: "trending-up",
};

export function RecurrenceCard({ recurrence }: { recurrence: Recurrence }) {
  return (
    <div
      id={`recurrence-${recurrence.id}`}
      class="bg-card text-card-foreground border-2 border-border shadow-[var(--shadow-lg)] p-6 rounded-none
        transition-all duration-150
        hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[var(--shadow-md)]"
    >
      <div class="flex justify-between items-start">
        <div>
          <h3 class="text-2xl md:text-3xl font-bold text-foreground mb-2 flex items-center">
            <span class="mr-2">
              <Icon name={recurrenceTypeIcons[recurrence.frequency] || ""} />
            </span>
            {recurrence.name}
          </h3>
          <span class="inline-flex items-center px-2 py-1 text-xs font-semibold uppercase tracking-wide bg-muted text-muted-foreground rounded-none">
            {recurrence.frequency}
          </span>
        </div>
        <div class="text-right">
          <div class="text-sm text-muted-foreground">TOTAL PARTS</div>
        </div>
      </div>
      <div class="mt-4 flex gap-2">
        <Button
          type="button" // Explicitly set type to "button"
          class="bg-primary text-primary-foreground"
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
          type="button" // Explicitly set type to "button"
          class="bg-secondary text-secondary-foreground"
          hxGet={`/api/recurrences/${recurrence.id}/edit`}
          hxTarget={`#recurrence-${recurrence.id}`}
          hxSwap="outerHTML"
          aria-label={`Edit ${recurrence.name}`}
        >
          EDIT
        </Button>
        <Button
          type="button" // Explicitly set type to "button"
          class="bg-destructive text-destructive-foreground"
          hx-delete={`/api/recurrences/${recurrence.id}`}
          hx-confirm="Are you sure you want to delete this recurrence?"
          aria-label={`Delete ${recurrence.name}`}
        >
          DELETE
        </Button>
      </div>
    </div>
  );
}
