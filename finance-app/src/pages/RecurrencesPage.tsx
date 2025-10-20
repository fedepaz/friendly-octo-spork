// src/pages/RecurrencesPage.tsx
import { FC } from "hono/jsx";
import { Layout } from "../components/shared/Layout";
import { RecurrencesList } from "../components/recurrences/RecurrencesList";
import { RecurrenceForm } from "../components/recurrences/RecurrenceForm";

// Placeholder for Recurrence type
interface Recurrence {
  id: number;
  name: string;
  frequency: string;
  startDate: string;
  nextDate?: string;
  active: boolean;
}

export const RecurrencesPage: FC<{ recurrences: Recurrence[] }> = ({ recurrences }) => {
  return (
    <Layout title="Recurrences">
      <div class="container-xl">
        <div class="page-header d-print-none">
          <div class="row align-items-center">
            <div class="col">
              <h2 class="page-title">Recurrences</h2>
            </div>
          </div>
        </div>
        <div class="page-body">
          <div class="row row-cards">
            <div class="col-12">
              <RecurrenceForm />
            </div>
            <div class="col-12">
              <RecurrencesList recurrences={recurrences} />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
