import type { Recurrence } from "@/generated/prisma";
import { CalendarIcon, CalendarDaysIcon, TrendingUpIcon } from "../icons";

const recurrenceTypeSVGs: Record<string, JSX.Element> = {
  MONTHLY: <CalendarIcon />,
  WEEKLY: <CalendarDaysIcon />,
  YEARLY: <CalendarIcon />,
  INSTALLMENT: <TrendingUpIcon />,
};

export function RecurrenceCard({ recurrence }: { recurrence: Recurrence }) {
  return (
    <div
      id={`recurrence-${recurrence.id}`}
      class="bg-card text-card-foreground border-2 border-border shadow-[var(--shadow-lg)] p-6"
    >
      <div class="flex justify-between items-start">
        <div>
          <h3 class="text-xl font-bold mb-2 flex items-center">
            <span
              class="mr-2"
            >
              {recurrenceTypeSVGs[recurrence.frequency]}
            </span>
            {recurrence.name}
          </h3>
          <span class="inline-block bg-muted text-muted-foreground px-2 py-1 text-xs font-bold uppercase">
            {recurrence.frequency}
          </span>
        </div>
        <div class="text-right">
          <div class="text-sm text-muted-foreground">TOTAL PARTS</div>
        </div>
      </div>
      <div class="mt-4 flex gap-2">
        <button
          class="bg-primary text-primary-foreground border-2 border-border shadow-[var(--shadow)] px-4 py-2 text-xs font-bold uppercase hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[var(--shadow-md)] transition-all duration-150"
          hx-get={`/api/recurrences/${recurrence.id}`}
          hx-target="#modal-content"
          hx-swap="innerHTML"
          data-toggle="modal"
          data-target="#htmx-modal"
          aria-label={`View ${recurrence.name}`}
        >
          VIEW
        </button>
        <button
          class="bg-secondary text-secondary-foreground border-2 border-border shadow-[var(--shadow)] px-4 py-2 text-xs font-bold uppercase hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[var(--shadow-md)] transition-all duration-150"
          hx-get={`/api/recurrences/${recurrence.id}/edit`}
          hx-target={`#recurrence-${recurrence.id}`}
          hx-swap="outerHTML"
          aria-label={`Edit ${recurrence.name}`}
        >
          EDIT
        </button>
        <button
          class="bg-destructive text-destructive-foreground border-2 border-border shadow-[var(--shadow)] px-4 py-2 text-xs font-bold uppercase hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[var(--shadow-md)] transition-all duration-150"
          hx-delete={`/api/recurrences/${recurrence.id}`}
          hx-confirm="Are you sure you want to delete this recurrence?"
          aria-label={`Delete ${recurrence.name}`}
        >
          DELETE
        </button>
      </div>
    </div>
  );
}
