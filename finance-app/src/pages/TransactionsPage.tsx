// src/pages/TransactionPage.tsx

import { TransactionForm } from "@/components/transactions/TransactionForm";
import { TransactionList } from "@/components/transactions/TransactionList";
import type { FC } from "hono/jsx";
import Layout from "@/components/shared/Layout";
import type { Transaction, Account, Category } from "@/generated/prisma";

interface TransactionPageProps {
  transactions: Transaction[];
  accounts: Account[];
  categories: Category[];
  currentMonth: string;
  transactionType:
    | "expenses"
    | "incomes"
    | "payments"
    | "investments"
    | "returns"
    | "transfers";
  title: string;
  navItem?: string;
}

export const TransactionPage: FC<TransactionPageProps> = ({
  transactions = [],
  accounts = [],
  categories = [],
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

      <TransactionForm
        transactionType={transactionType}
        accounts={accounts}
        categories={categories}
      />

      <div id="transactions-container" class="mt-8">
        <TransactionList
          transactions={transactions}
          currentMonth={currentMonth}
          transactionType={transactionType}
        />
      </div>
    </Layout>
  );
};
