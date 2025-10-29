// src/pages/RecurrencesPage.tsx

import type { FC } from "hono/jsx";
import type { Recurrence } from "@/generated/prisma";
import { RecurrencesList } from "@/components/recurrences/RecurrencesList";
import Layout from "@/components/shared/Layout";
import { Button } from "@/components/shared/Button"; // New import

interface RecurrencesPageProps {
  recurrences: Recurrence[];
}

export const RecurrencesPage: FC<RecurrencesPageProps> = ({ recurrences }) => {
  return (
    <Layout activeNavItem="/recurrences">
      <div class="flex justify-between items-center mb-8">
        <h1 class="text-4xl md:text-5xl font-bold text-foreground mb-4">Recurrences</h1>
        <Button
          type="button" // Explicitly set type to "button"
          hxGet="/api/recurrences/new"
          hxTarget="#modal-content"
          hxSwap="innerHTML"
          dataToggle="modal"
          dataTarget="#htmx-modal"
        >
          NEW RECURRENCE
        </Button>
      </div>

      <RecurrencesList recurrences={recurrences} />
    </Layout>
  );
};
