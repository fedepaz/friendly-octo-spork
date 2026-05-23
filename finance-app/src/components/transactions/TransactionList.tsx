// src/components/transactions/TransactionList.tsx

import type { FC } from "hono/jsx";
import { TransactionRow } from "./TransactionRow";
import type { TransactionDTO } from "@/api/transactions/transactions.schema";
import { CalendarDaysIcon } from "@/components/icons";

interface TransactionListProps {
  transactions: TransactionDTO[];
  currentMonth: string;
}

export const TransactionList: FC<TransactionListProps> = ({
  transactions = [],
  currentMonth,
}) => {
  const [year, month] = currentMonth.split("-").map(Number);

  if (!year || !month) return <></>;

  // Calculate previous and next months
  const date = new Date(year, month - 1, 1);

  const prevDate = new Date(date);
  prevDate.setMonth(prevDate.getMonth() - 1);
  const prevMonth = `${prevDate.getFullYear()}-${String(
    prevDate.getMonth() + 1,
  ).padStart(2, "0")}`;

  const nextDate = new Date(date);
  nextDate.setMonth(nextDate.getMonth() + 1);
  const nextMonth = `${nextDate.getFullYear()}-${String(
    nextDate.getMonth() + 1,
  ).padStart(2, "0")}`;

  // Format for display (current month)
  const displayMonth = new Date(year, month - 1).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
  });

  // Format previous and next for footer display
  const displayPrevMonth = new Date(prevDate).toLocaleDateString("en-US", {
    month: "short",
  });

  const displayNextMonth = new Date(nextDate).toLocaleDateString("en-US", {
    month: "short",
  });

  return (
    <div id="transactions-container" class="space-y-6">
      <div class="bg-card text-card-foreground border-2 border-border shadow-[var(--shadow-lg)] rounded-xl overflow-hidden">
        {/* Month Navigation Header */}
        <div class="flex items-center justify-between border-b-2 border-border px-6 py-4 bg-muted/40">
          <div class="flex items-center gap-3">
            <div class="bg-primary/10 text-primary p-2 rounded-lg border border-primary/20">
              <CalendarDaysIcon class="w-5 h-5" />
            </div>
            <h3 class="text-xl md:text-2xl font-black text-foreground tracking-tight">
              {displayMonth}
            </h3>
          </div>

          <div class="flex items-center gap-2">
            {/* Quick Prev Month Header Button */}
            <button
              class="inline-flex items-center justify-center p-2 rounded-lg bg-card border-2 border-border shadow-[var(--shadow-sm)] hover:translate-y-[-1px] hover:shadow-[var(--shadow)] active:translate-y-[1px] transition-all cursor-pointer text-muted-foreground hover:text-foreground"
              hx-get={`/transactions?month=${prevMonth}`}
              hx-target="#transactions-container"
              hx-swap="outerHTML"
              aria-label="Previous month"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="3"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  pathLength="1"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            {/* Quick Next Month Header Button */}
            <button
              class="inline-flex items-center justify-center p-2 rounded-lg bg-card border-2 border-border shadow-[var(--shadow-sm)] hover:translate-y-[-1px] hover:shadow-[var(--shadow)] active:translate-y-[1px] transition-all cursor-pointer text-muted-foreground hover:text-foreground"
              hx-get={`/transactions?month=${nextMonth}`}
              hx-target="#transactions-container"
              hx-swap="outerHTML"
              aria-label="Next month"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="3"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  pathLength="1"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Transactions Table Section */}
        {transactions.length > 0 ? (
          <div class="overflow-x-auto">
            <table class="w-full border-collapse">
              <thead>
                <tr class="border-b-2 border-border bg-primary/5 text-muted-foreground text-[10px] font-black uppercase tracking-[0.2em]">
                  <th class="p-4 text-center whitespace-nowrap w-20">Day</th>
                  <th class="p-4 text-right whitespace-nowrap">Amount</th>
                  <th class="p-4 text-left whitespace-nowrap">Details</th>
                  <th class="p-4 text-left whitespace-nowrap">Category</th>
                  <th class="p-4 text-left whitespace-nowrap">Account</th>
                  <th class="p-4 text-center whitespace-nowrap w-32">Actions</th>
                </tr>
              </thead>
              <tbody id="transaction-list" class="divide-y border-border">
                {transactions.map((transaction) => (
                  <TransactionRow
                    key={transaction.id}
                    transaction={transaction}
                  />
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div class="flex flex-col items-center justify-center p-12 text-center bg-card">
            <div class="bg-muted p-4 rounded-full border border-border mb-4 text-muted-foreground/60">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-8 h-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="1.5"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
            <h4 class="text-lg font-bold text-foreground mb-1">
              No transactions recorded
            </h4>
            <p class="text-sm text-muted-foreground max-w-sm">
              There are no transactions recorded for {displayMonth}. Click the
              buttons below or use the form to add one.
            </p>
          </div>
        )}

        {/* Footer Navigation bar */}
        <div class="flex items-center justify-between border-t-2 border-border px-6 py-4 bg-muted/20">
          <button
            class="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-card border-2 border-border text-xs font-bold uppercase tracking-wider text-foreground shadow-[var(--shadow-sm)] hover:translate-y-[-1px] hover:shadow-[var(--shadow)] active:translate-y-[1px] transition-all cursor-pointer"
            hx-get={`/transactions?month=${prevMonth}`}
            hx-target="#transactions-container"
            hx-swap="outerHTML"
          >
            ← {displayPrevMonth}
          </button>

          <span class="text-xs font-bold text-muted-foreground uppercase tracking-widest bg-muted px-3 py-1.5 rounded-full border border-border">
            {displayMonth}
          </span>

          <button
            class="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-card border-2 border-border text-xs font-bold uppercase tracking-wider text-foreground shadow-[var(--shadow-sm)] hover:translate-y-[-1px] hover:shadow-[var(--shadow)] active:translate-y-[1px] transition-all cursor-pointer"
            hx-get={`/transactions?month=${nextMonth}`}
            hx-target="#transactions-container"
            hx-swap="outerHTML"
          >
            {displayNextMonth} →
          </button>
        </div>
      </div>
    </div>
  );
};
