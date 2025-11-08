// src/components/expenses/ExpenseList.tsx

import type { Transaction } from "@/generated/prisma";
import type { FC } from "hono/jsx";
import { ExpenseRow } from "./ExpenseRow";
import type { TransactionResponse } from "@/api/transactions/transactions.schema";

interface ExpenseListProps {
  expenses: TransactionResponse[];
  currentMonth: string;
}

export const ExpensesList: FC<ExpenseListProps> = ({
  expenses,
  currentMonth,
}) => {
  const [year, month] = currentMonth.split("-").map(Number);

  if (!year || !month) return <></>;

  // Calculate previous and next months
  const date = new Date(year, month - 1, 1);

  const prevDate = new Date(date);
  prevDate.setMonth(prevDate.getMonth() - 1);
  const prevMonth = `${prevDate.getFullYear()}-${String(
    prevDate.getMonth() + 1
  ).padStart(2, "0")}`;

  const nextDate = new Date(date);
  nextDate.setMonth(nextDate.getMonth() + 1);
  const nextMonth = `${nextDate.getFullYear()}-${String(
    nextDate.getMonth() + 1
  ).padStart(2, "0")}`;

  // Format for display (current month)
  const displayMonth = new Date(year, month - 1).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
  });

  // Format previous and next for footer display
  const displayPrevMonth = new Date(prevDate).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });

  const displayNextMonth = new Date(nextDate).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });

  return (
    // CRITICAL: Wrap everything in the container that matches the target ID
    <div id="expenses-container">
      <div class="bg-card text-card-foreground border-2 border-border shadow-[var(--shadow-lg)] p-6">
        {/* Month Navigation Header */}
        <div class="flex items-center justify-center gap-4 mb-4 text-sm text-muted-foreground">
          <h3 class="text-2xl md:text-3xl font-bold text-foreground">
            {displayMonth}
          </h3>
        </div>

        {/* Expenses Table */}
        <div class="border-2 border-border shadow-[var(--shadow)] overflow-x-auto">
          <table class="w-full">
            <thead>
              <tr class="border-b-2 border-border bg-primary text-primary-foreground">
                <th class="p-4 text-center font-bold uppercase tracking-wider whitespace-nowrap">
                  Day
                </th>
                <th class="p-4 text-right font-bold uppercase tracking-wider whitespace-nowrap">
                  Amount
                </th>
                <th class="p-4 text-left font-bold uppercase tracking-wider whitespace-nowrap">
                  Description
                </th>
                <th class="p-4 text-left font-bold uppercase tracking-wider whitespace-nowrap">
                  Category
                </th>
                <th class="p-4 text-left font-bold uppercase tracking-wider whitespace-nowrap">
                  Source Account
                </th>
                <th class="p-4 font-bold uppercase tracking-wider whitespace-nowrap w-[200px]">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody id="transaction-list" class="divide-y-2 divide-border">
              {expenses.length > 0 &&
                expenses.map((transaction) => (
                  <ExpenseRow key={transaction.id} transaction={transaction} />
                ))}
            </tbody>
          </table>
        </div>

        {/* Footer Navigation */}
        <div class="flex items-center justify-center gap-4 mt-4 text-sm text-muted-foreground">
          <button
            class="px-4 py-2 bg-primary text-secondary-foreground border-2 border-border shadow-[var(--shadow)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[var(--shadow-lg)] transition-all"
            hx-get={`/expenses/list?month=${prevMonth}`}
            hx-target="#expenses-container"
            hx-swap="outerHTML"
          >
            {displayPrevMonth}
          </button>

          <span class="font-bold text-foreground">{displayMonth}</span>

          <button
            class="px-4 py-2 bg-primary text-secondary-foreground border-2 border-border shadow-[var(--shadow)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[var(--shadow-lg)] transition-all"
            hx-get={`/expenses/list?month=${nextMonth}`}
            hx-target="#expenses-container"
            hx-swap="outerHTML"
          >
            {displayNextMonth}
          </button>
        </div>
      </div>
    </div>
  );
};
