// src/pages/RecurrencesPage.tsx

import type { FC } from "hono/jsx";

import type { Recurrence } from "@/generated/prisma";
import { RecurrencesList } from "@/components/recurrences/RecurrencesList";

interface RecurrencesPageProps {
  recurrences: Recurrence[];
}

export const RecurrencesPage: FC<RecurrencesPageProps> = ({ recurrences }) => {
  return (
    <div class="container-xl">
      <div class="page-header d-print-none">
        <div class="row align-items-center">
          <div class="col">
            <h2 class="page-title">Recurrences</h2>
          </div>
        </div>
      </div>
      <div class="page-body">
        <RecurrencesList recurrences={recurrences} />
      </div>

      {/* Modal container for HTMX */}
      <div
        id="modals-here"
        class="modal modal-blur fade"
        style="display: none"
        aria-hidden="true"
      >
        <div
          class="modal-dialog modal-lg modal-dialog-centered"
          role="document"
        >
          <div class="modal-content"></div>
        </div>
      </div>
    </div>
  );
};
