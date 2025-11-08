// src/pages/TransactionsPage.tsx

import { TransactionForm } from "@/components/transactions/TransactionForm";
import { TransactionTable } from "@/components/transfers/TransactionsTable";

import type {
  Transaction,
  Category,
  Account,
  Recurrence,
} from "@/generated/prisma";
import type { FC } from "hono/jsx";
import Layout from "@/components/shared/Layout";

interface TransactionsPageData {
  transactions: Transaction[];
  categories: Category[];
  accounts: Account[];
  recurrences: Recurrence[];
}

interface TransactionsPageProps {
  data?: TransactionsPageData;
}

export const TransactionsPage: FC<TransactionsPageProps> = ({ data }) => {
  const transactions = data?.transactions || [];
  const categories = data?.categories || [];
  const accounts = data?.accounts || [];
  const recurrences = data?.recurrences || [];

  return (
    <Layout activeNavItem="/transactions">
      <h1 class="text-4xl md:text-5xl font-bold text-foreground mb-4">
        Transactions
      </h1>

      <TransactionForm
        categories={categories}
        accounts={accounts}
        recurrences={recurrences}
      />
    </Layout>
  );
};
