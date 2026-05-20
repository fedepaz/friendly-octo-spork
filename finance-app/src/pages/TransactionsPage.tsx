// src/pages/TransactionPage.tsx

import { TransactionForm } from "@/components/transactions/TransactionForm";
import { TransactionList } from "@/components/transactions/TransactionList";
import type { FC } from "hono/jsx";
import Layout from "@/components/shared/Layout";
import type { Transaction } from "@/generated/prisma";

interface TransactionPageProps {
  transactions: Transaction[];
  currentMonth: string;
  transactionType:
    | "expenses"
    | "incomes"
    | "payments"
    | "investments"
    | "returns"
    | "transfers";
  title: string;
  navItem: string;
}

export const TransactionPage: FC<TransactionPageProps> = ({
  transactions = [],
  currentMonth = "2022-01",
  transactionType = "expenses",
  title = "Transactions",
  navItem = "/transactions",
}) => {
  return (
    <Layout activeNavItem={navItem}>
      <h1 class="text-4xl md:text-5xl font-bold text-foreground mb-4">
        {title}
      </h1>
      <div id="transactions-container">
        <TransactionList
          transactions={transactions}
          currentMonth={currentMonth}
          transactionType={transactionType}
        />
      </div>
    </Layout>
  );
};
