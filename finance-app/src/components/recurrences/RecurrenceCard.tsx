// src/components/recurrences/RecurrenceCard.tsx
import { FC } from "hono/jsx";

// Placeholder for Recurrence type
interface Recurrence {
  id: number;
  name: string;
  frequency: string;
  startDate: string;
  nextDate?: string;
  active: boolean;
}

export const RecurrenceCard: FC<{ recurrence: Recurrence }> = ({ recurrence }) => {
  return (
    <div class="card card-sm">
      <div class="card-body">
        <div class="row align-items-center">
          <div class="col-auto">
            <span class="bg-primary text-white avatar"><!-- Download SVG icon from http://tabler-icons.io/i/refresh -->
              <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M20 11a8.1 8.1 0 0 0 -15.5 -2m-.5 -4v4h4" /><path d="M4 13a8.1 8.1 0 0 0 15.5 2m.5 4v-4h-4" /></svg>
            </span>
          </div>
          <div class="col">
            <div class="font-weight-medium">
              {recurrence.name}
            </div>
            <div class="text-muted">
              {recurrence.frequency} - {new Date(recurrence.startDate).toLocaleDateString()}
            </div>
          </div>
          <div class="col-auto text-end">
            <div class="font-weight-medium">
              {recurrence.active ? "Active" : "Paused"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
