// src/components/recurrences/RecurrenceCard.tsx

import type { Recurrence } from "@/generated/prisma";

const recurrenceTypeIcons: Record<string, string> = {
  MONTHLY: "📆",
  WEEKLY: "📅",
  YEARLY: "📆",
  INSTALLMENT: "📈",
};

const recurrenceTypeColors: Record<string, string> = {
  MONTHLY: "bg-blue-100 text-blue-800",
  WEEKLY: "bg-purple-100 text-purple-800",
  YEARLY: "bg-green-100 text-green-800",
  INSTALLMENT: "bg-indigo-100 text-indigo-800",
};

export function RecurrenceCard({ recurrence }: { recurrence: Recurrence }) {
  return (
    <div id={`recurrence-${recurrence.id}`} class="card">
      <div class="card-body">
        <div class="d-flex justify-content-between align-items-start">
          <div>
            <h3 class="card-title mb-1">
              <span class="me-2">
                <span class="badge bg-secondary">
                  {recurrenceTypeIcons[recurrence.frequency]}
                </span>
                {recurrence.name}
              </span>
            </h3>
            <span
              class={`badge ${recurrenceTypeColors[recurrence.frequency]} me-2`}
            >
              {recurrence.frequency}
            </span>
          </div>
          <div class="text-end">
            <div class="text-muted small">Total Parts</div>
          </div>
        </div>
        <div class="mt-3 d-flex gap-2">
          <button
            class="btn btn-sm btn-outline-primary"
            hx-get={`/api/recurrences/${recurrence.id}`}
            hx-target="#recurrence-modal"
            hx-swap="innerHTML"
          >
            View Details
          </button>
          <button
            class="btn btn-sm btn-outline-secondary"
            hx-get={`/api/recurrences/${recurrence.id}/edit`}
            hx-target={`#recurrence-${recurrence.id}`}
            hx-swap="outerHTML"
          >
            Edit
          </button>
          <button
            class="btn btn-sm btn-outline-danger"
            hx-delete={`/api/recurrences/${recurrence.id}`}
            hx-target={`#recurrence-${recurrence.id}`}
            hx-swap="outerHTML swap:1s"
            hx-confirm="Are you sure you want to delete this recurrence?"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
