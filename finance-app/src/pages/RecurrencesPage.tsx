// src/pages/RecurrencesPage.tsx

import type { FC } from "hono/jsx";
import type { Recurrence } from "@/generated/prisma";
import { RecurrencesList } from "@/components/recurrences/RecurrencesList";
import Layout from "@/components/shared/Layout";

interface RecurrencesPageProps {
  recurrences: Recurrence[];
}

export const RecurrencesPage: FC<RecurrencesPageProps> = ({ recurrences }) => {
  return (
    <Layout activeNavItem="/recurrences">
      <div class="flex justify-between items-center mb-8">
        <h1 class="text-4xl md:text-5xl font-bold text-foreground mb-4">Recurrences</h1>
        <button
          class="bg-primary text-primary-foreground border-2 border-border shadow-[var(--shadow)] px-6 py-3 text-base transition-all duration-150 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[var(--shadow-md)] active:translate-x-1 active:translate-y-1 active:shadow-none disabled:opacity-50 disabled:cursor-not-allowed"
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
    </Layout>
  );
};
