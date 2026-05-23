// src/pages/TransactionPage.tsx

import { TransactionList } from "@/components/transactions/TransactionList";
import type { FC } from "hono/jsx";
import Layout from "@/components/shared/Layout";
import type { TransactionDTO } from "@/api/transactions/transactions.schema";

interface TransactionPageProps {
  transactions: TransactionDTO[];
}

export const TransactionPage: FC<TransactionPageProps> = ({
  transactions = [],
}) => {
  return (
    <Layout activeNavItem="/transactions">
      <div class="flex justify-between items-center mb-8">
        <h1 class="text-4xl md:text-5xl font-bold text-foreground mb-4">
          Transactions
        </h1>
      </div>
      <TransactionList transactions={transactions} />
    </Layout>
  );
};
