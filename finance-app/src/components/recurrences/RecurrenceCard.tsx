import { Button } from "@/components/shared/Button"; // New import
import type { FC } from "hono/jsx";
import { CalendarDaysIcon, CalendarIcon } from "@/components/icons";
import type { RecurrenceInput } from "@/api/recurrences/recurrences.schema";

const recurrenceTypeIcons: Record<string, string> = {
  // Changed to use icon names
  MONTHLY: "calendar",
  WEEKLY: "calendar-days",
  YEARLY: "calendar",
};

const recurrenceTypeStyles: Record<
  string,
  { icon: string; textColor: string; bgColor: string; borderColor: string }
> = {
  MONTHLY: {
    icon: recurrenceTypeIcons.MONTHLY || "",
    textColor: "text-[var(--accent)]",
    bgColor: "bg-[var(--accent)]/10",
    borderColor: "border-[var(--accent)]",
  },
  WEEKLY: {
    icon: recurrenceTypeIcons.WEEKLY || "",
    textColor: "text-[var(--secondary)]",
    bgColor: "bg-[var(--secondary)]/10",
    borderColor: "border-[var(--secondary)]",
  },
  YEARLY: {
    icon: recurrenceTypeIcons.YEARLY || "",
    textColor: "text-[var(--primary)]",
    bgColor: "bg-[var(--primary)]/10",
    borderColor: "border-[var(--primary)]",
  },
  INSTALLMENT: {
    icon: recurrenceTypeIcons.INSTALLMENT || "",
    textColor: "text-[var(--destructive)]",
    bgColor: "bg-[var(--destructive)]/10",
    borderColor: "border-[var(--destructive)]",
  },
};

interface RecurrenceCardProps {
  recurrence: RecurrenceInput;
}

export const RecurrenceCard: FC<RecurrenceCardProps> = ({ recurrence }) => {
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
              class={`text-2xl ${recurrenceTypeStyles[recurrence.frequency]?.textColor}`}
            >
              {(() => {
                switch (recurrenceTypeStyles[recurrence.frequency]?.icon) {
                  case "calendar":
                    return <CalendarIcon />;
                  case "calendar-days":
                    return <CalendarDaysIcon />;
                  // Add other cases for other icons if needed
                  default:
                    return null;
                }
              })()}
            </span>
            {recurrence.name}
          </h3>
          <span
            class={`inline-flex items-center gap-2 px-3 py-1.5 
                   text-xs font-bold uppercase tracking-wider
                   border-2 shadow-[var(--shadow-sm)]
                   ${recurrenceTypeStyles[recurrence.frequency]?.bgColor}
                   ${recurrenceTypeStyles[recurrence.frequency]?.borderColor}
                   ${recurrenceTypeStyles[recurrence.frequency]?.textColor}`}
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
          type="button"
          class={`${recurrence.active ? "bg-warning" : "bg-success"} text-white`}
          hx-patch={`/api/recurrences/${recurrence.id}`}
          hx-vals={JSON.stringify({ active: !recurrence.active })}
          hx-target="#recurrences-list"
          hx-swap="innerHTML"
          aria-label={recurrence.active ? "Deactivate" : "Activate"}
        >
          {recurrence.active ? "DEACTIVATE" : "ACTIVATE"}
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
};
