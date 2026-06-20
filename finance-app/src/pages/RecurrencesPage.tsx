// src/pages/RecurrencesPage.tsx

import type { FC } from "hono/jsx";

import { RecurrencesList } from "@/components/recurrences/RecurrencesList";
import Layout from "@/components/shared/Layout";
import type { RecurrenceDTO } from "@/api/recurrences/recurrences.schema";

interface RecurrencesPageProps {
  recurrences: RecurrenceDTO[];
}

export const RecurrencesPage: FC<RecurrencesPageProps> = ({ recurrences }) => {
  return (
    <Layout activeNavItem="/recurrences">
      <div class="flex justify-between items-center mb-8">
        <h1 class="text-4xl md:text-5xl font-bold text-foreground mb-4">
          Recurrences
        </h1>
      </div>
      <RecurrencesList recurrences={recurrences} />
    </Layout>
  );
};
