// src/pages/RecurrencesPage.tsx

import type { FC } from "hono/jsx";

import type { Recurrence } from "@/generated/prisma";
import { RecurrencesList } from "@/components/recurrences/RecurrencesList";

interface RecurrencesPageProps {
  recurrences: Recurrence[];
}

export const RecurrencesPage: FC<RecurrencesPageProps> = ({ recurrences }) => {
  return (
    <>
      <div class="flex justify-between items-center mb-8">
        <h1 class="text-4xl font-bold uppercase">Recurrences</h1>
        <button
          class="neo-btn"
          hx-get="/api/recurrences/new"
          hx-target="#modal-content"
          hx-swap="innerHTML"
          data-toggle="modal"
          data-target="#htmx-modal"
        >
          NEW RECURRENCE
        </button>
      </div>

      <RecurrencesList recurrences={recurrences} />

      {/* Modal container for HTMX */}
      <div id="htmx-modal" class="modal" tabindex="-1" role="dialog">
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div id="modal-content" class="modal-content neo-card">
            {/* Content will be loaded here by HTMX */}
          </div>
        </div>
      </div>
    </>
  );
};
