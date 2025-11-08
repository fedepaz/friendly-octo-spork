// src/pages/ExpensesPage.tsx

import { ExpenseForm } from "@/components/expenses/ExpenseForm";
import { ExpensesList } from "@/components/expenses/ExpenseList";

import type { Transaction } from "@/generated/prisma";
import type { FC } from "hono/jsx";
import Layout from "@/components/shared/Layout";
import type { TransactionResponse } from "@/api/transactions/transactions.schema";

interface ExpensesPageProps {
  expenses: TransactionResponse[];
  currentMonth: string;
}

export const ExpensesPage: FC<ExpensesPageProps> = ({
  expenses,
  currentMonth,
}) => {
  return (
    <Layout activeNavItem="/expenses">
      <h1 class="text-4xl md:text-5xl font-bold text-foreground mb-4">
        Gastos
      </h1>
      <div id="expenses-container">
        <ExpensesList expenses={expenses} currentMonth={currentMonth} />
      </div>

      <ExpenseForm />
    </Layout>
  );
};
