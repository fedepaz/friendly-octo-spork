// src/components/recurrences/RecurrenceForm.tsx

import type { FC } from "hono/jsx";
import { Button } from "@/components/shared/Button";
import type { Recurrence } from "@/generated/prisma";
import { LoadingSpinnerIcon } from "@/components/icons/LoadingSpinnerIcon";

interface RecurrenceFormProps {
  recurrence?: Recurrence;
}

export const RecurrenceForm: FC<RecurrenceFormProps> = ({ recurrence }) => {
  const isEditing = !!recurrence;
  const formAction = isEditing 
    ? `/api/recurrences/${recurrence.id}` 
    : "/api/recurrences";
  const formMethod = isEditing ? "PUT" : "POST";

  return (
    <div class="bg-card text-card-foreground border-2 border-border shadow-[var(--shadow-lg)] p-6 w-full max-w-md rounded-none">
      <h3 class="text-2xl md:text-3xl font-bold text-foreground mb-2 uppercase">
        {isEditing ? "Edit Recurrence" : "Create New Recurrence"}
      </h3>

      <form
        hx-patch={isEditing ? formAction : undefined}
        hx-post={!isEditing ? formAction : undefined}
        hx-target="#recurrences-list"
        hx-swap="innerHTML"
        hx-on--after-request="if(event.detail.successful) this.closest('[x-data]').__x.$data.open = false"
        class="space-y-4"
      >
        {isEditing && <input type="hidden" name="_method" value="PUT" />}
        
        <div>
          <label
            for="name"
            class="block text-sm font-semibold uppercase tracking-wide text-foreground mb-2"
          >
            Recurrence Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            required
            value={recurrence?.name || ""}
            class="w-full bg-card text-card-foreground border-2 border-border shadow-[var(--shadow)] px-4 py-3 text-base transition-all duration-150 focus:outline-none focus:-translate-x-0.5 focus:-translate-y-0.5 focus:shadow-[var(--shadow-md)] focus:border-ring rounded-none"
            placeholder="e.g., Monthly Bills"
          />
        </div>

        <div>
          <label
            for="amount"
            class="block text-sm font-semibold uppercase tracking-wide text-foreground mb-2"
          >
            Amount
          </label>
          <input
            type="number"
            step="0.01"
            name="amount"
            id="amount"
            required
            value={recurrence?.amount?.toString() || ""}
            class="w-full bg-card text-card-foreground border-2 border-border shadow-[var(--shadow)] px-4 py-3 text-base transition-all duration-150 focus:outline-none focus:-translate-x-0.5 focus:-translate-y-0.5 focus:shadow-[var(--shadow-md)] focus:border-ring rounded-none"
            placeholder="0.00"
          />
        </div>

        <div>
          <label
            for="frequency"
            class="block text-sm font-semibold uppercase tracking-wide text-foreground mb-2"
          >
            Recurrence Type
          </label>
          <select
            name="frequency"
            id="frequency"
            required
            class="w-full bg-card text-card-foreground border-2 border-border shadow-[var(--shadow)] px-4 py-3 text-base transition-all duration-150 focus:outline-none focus:-translate-x-0.5 focus:-translate-y-0.5 focus:shadow-[var(--shadow-md)] focus:border-ring rounded-none"
          >
            <option value="">SELECT TYPE...</option>
            <option value="MONTHLY" selected={recurrence?.frequency === "MONTHLY"}>MONTHLY</option>
            <option value="WEEKLY" selected={recurrence?.frequency === "WEEKLY"}>WEEKLY</option>
            <option value="YEARLY" selected={recurrence?.frequency === "YEARLY"}>YEARLY</option>
            <option value="INSTALLMENT" selected={recurrence?.frequency === "INSTALLMENT"}>INSTALLMENT</option>
          </select>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div>
            <label
              for="totalParts"
              class="block text-sm font-semibold uppercase tracking-wide text-foreground mb-2"
            >
              Total Parts
            </label>
            <input
              type="number"
              name="totalParts"
              id="totalParts"
              value={recurrence?.totalParts?.toString() || "1"}
              class="w-full bg-card text-card-foreground border-2 border-border shadow-[var(--shadow)] px-4 py-3 text-base transition-all duration-150 focus:outline-none focus:-translate-x-0.5 focus:-translate-y-0.5 focus:shadow-[var(--shadow-md)] focus:border-ring rounded-none"
              placeholder="e.g., 12"
            />
          </div>

          <div>
            <label
              for="currentPart"
              class="block text-sm font-semibold uppercase tracking-wide text-foreground mb-2"
            >
              Current Part
            </label>
            <input
              type="number"
              name="currentPart"
              id="currentPart"
              value={recurrence?.currentPart?.toString() || "1"}
              class="w-full bg-card text-card-foreground border-2 border-border shadow-[var(--shadow)] px-4 py-3 text-base transition-all duration-150 focus:outline-none focus:-translate-x-0.5 focus:-translate-y-0.5 focus:shadow-[var(--shadow-md)] focus:border-ring rounded-none"
              placeholder="e.g., 1"
            />
          </div>
        </div>

        <div>
          <label
            for="startDate"
            class="block text-sm font-semibold uppercase tracking-wide text-foreground mb-2"
          >
            Start Date
          </label>
          <input
            type="date"
            name="startDate"
            id="startDate"
            required
            value={recurrence?.startDate ? new Date(recurrence.startDate).toISOString().split('T')[0] : ""}
            class="w-full bg-card text-card-foreground border-2 border-border shadow-[var(--shadow)] px-4 py-3 text-base transition-all duration-150 focus:outline-none focus:-translate-x-0.5 focus:-translate-y-0.5 focus:shadow-[var(--shadow-md)] focus:border-ring rounded-none"
          />
        </div>

        <div class="flex gap-2 justify-end mt-6">
          <Button
            type="button"
            hx-on:click="this.closest('[x-data]').__x.$data.open = false"
            class="bg-muted text-muted-foreground"
          >
            CANCEL
          </Button>
          <Button type="submit" class="bg-primary text-primary-foreground flex items-center gap-2">
            <span class="htmx-indicator hidden">
              <LoadingSpinnerIcon />
            </span>
            {isEditing ? "UPDATE" : "SAVE"}
          </Button>
        </div>
      </form>
    </div>
  );
};
