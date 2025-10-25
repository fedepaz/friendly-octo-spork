// src/components/recurrences/RecurrenceCard.tsx

import type { Recurrence } from "@/generated/prisma";


const CalendarIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-calendar"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>`;
const CalendarWeekIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-calendar-week"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/><path d="M8 14h1"/><path d="M12 14h1"/><path d="M16 14h1"/><path d="M8 18h1"/><path d="M12 18h1"/><path d="M16 18h1"/></svg>`;
const TrendingUpIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trending-up"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>`;

const recurrenceTypeSVGs: Record<string, string> = {
  MONTHLY: CalendarIcon,
  WEEKLY: CalendarWeekIcon,
  YEARLY: CalendarIcon,
  INSTALLMENT: TrendingUpIcon,
};

export function RecurrenceCard({ recurrence }: { recurrence: Recurrence }) {
  return (
    <div id={`recurrence-${recurrence.id}`} class="bg-card text-card-foreground border-2 border-border shadow-[var(--shadow-lg)] p-6">
      <div class="flex justify-between items-start">
        <div>
          <h3 class="text-xl font-bold mb-2 flex items-center">
            <span class="mr-2" dangerouslySetInnerHTML={{ __html: recurrenceTypeSVGs[recurrence.frequency] }} />
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
          hx-target={`#recurrence-${recurrence.id}`}
          hx-swap="outerHTML swap:1s"
          hx-confirm="Are you sure you want to delete this recurrence?"
          aria-label={`Delete ${recurrence.name}`}
        >
          DELETE
        </button>
      </div>
    </div>
  );
}
