import type { Recurrence } from "@/generated/prisma";
import { Button } from "@/components/shared/Button"; // New import
import type { FC } from "hono/jsx";
import { CalendarDaysIcon, CalendarIcon } from "../icons";

const recurrenceTypeIcons: Record<string, string> = {
  // Changed to use icon names
  MONTHLY: "calendar",
  WEEKLY: "calendar-days",
  YEARLY: "calendar",
  INSTALLMENT: "trending-up",
};

const recurrenceTypeStyles: Record<string, { icon: string; color: string }> = {
  MONTHLY: {
    icon: recurrenceTypeIcons.MONTHLY || "",
    color: "var(--accent)",
  },
  WEEKLY: {
    icon: recurrenceTypeIcons.WEEKLY || "",
    color: "var(--secondary)",
  },
  YEARLY: {
    icon: recurrenceTypeIcons.YEARLY || "",
    color: "var(--primary)",
  },
  INSTALLMENT: {
    icon: recurrenceTypeIcons.INSTALLMENT || "",
    color: "var(--destructive)",
  },
};

export function RecurrenceCard({ recurrence }: { recurrence: Recurrence }) {
  return (
    <div
      id={`recurrence-${recurrence.id}`}
      class="bg-card text-card-foreground border-2 border-border shadow-[var(--shadow-lg)] p-6 
             relative overflow-hidden
             transition-all duration-150
             hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[var(--shadow-xl)]"
    >
      {/* Background Icon */}
      {recurrenceTypeStyles[recurrence.frequency]?.icon === "calendar-days" && (
        <CalendarDaysIcon />
      )}
      {recurrenceTypeStyles[recurrence.frequency]?.icon === "calendar" && (
        <CalendarIcon />
      )}
      <div class="flex justify-between items-start mb-4">
        <div>
          <h3 class="text-xl font-bold uppercase tracking-wider mb-3 flex items-center gap-2">
            <span
              class="text-2xl"
              style={{
                color: recurrenceTypeStyles[recurrence.frequency]?.color,
              }}
            >
              <Icon
                name={recurrenceTypeStyles[recurrence.frequency]?.icon || ""}
              />
            </span>
            {recurrence.name}
          </h3>
          <span
            class="inline-flex items-center gap-2 px-3 py-1.5 
                   text-xs font-bold uppercase tracking-wider
                   border-2 shadow-[var(--shadow-sm)]"
            style={{
              backgroundColor: `${
                recurrenceTypeStyles[recurrence.frequency]?.color
              }10`,
              borderColor: recurrenceTypeStyles[recurrence.frequency]?.color,
              color: recurrenceTypeStyles[recurrence.frequency]?.color,
            }}
          >
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
