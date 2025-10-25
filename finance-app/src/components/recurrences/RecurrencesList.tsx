// src/components/recurrences/RecurrencesList.tsx

import type { Recurrence } from "@/generated/prisma";
import { RecurrenceCard } from "./RecurrenceCard";

import type { Recurrence } from "@/generated/prisma";
import { RecurrenceCard } from "./RecurrenceCard";
import type { FC } from "hono/jsx";

const ClipboardIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-clipboard"><rect width="8" height="4" x="8" y="2" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/></svg>`;

const EmptyState: FC = () => (
  <div id="recurrences-list" class="bg-card text-card-foreground border-2 border-border shadow-[var(--shadow-lg)] p-16 text-center">
    <div class="text-6xl mb-4" dangerouslySetInnerHTML={{ __html: ClipboardIcon }} />
    <h3 class="text-2xl font-bold uppercase tracking-wider mb-2">NO RECURRENCES YET</h3>
    <p class="text-muted-foreground mb-6">CREATE YOUR FIRST RECURRENCE TO START TRACKING YOUR FINANCES.</p>
    <button
      class="bg-primary text-primary-foreground border-2 border-border shadow-[var(--shadow)] px-6 py-3 font-bold uppercase tracking-wider transition-all duration-150 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[var(--shadow-md)] active:translate-x-1 active:translate-y-1 active:shadow-none disabled:opacity-50 disabled:cursor-not-allowed"
      hx-get="/api/recurrences/new"
      hx-target="#modal-content"
      hx-swap="innerHTML"
      data-toggle="modal"
      data-target="#htmx-modal"
    >
      CREATE RECURRENCE
    </button>
  </div>
);

export function RecurrencesList({ recurrences }: { recurrences: Recurrence[] }) {
  if (recurrences.length === 0) {
    return <EmptyState />;
  }

  return (
    <div id="recurrences-list" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {recurrences.map((recurrence) => (
        <RecurrenceCard recurrence={recurrence} />
      ))}
    </div>
  );
}
