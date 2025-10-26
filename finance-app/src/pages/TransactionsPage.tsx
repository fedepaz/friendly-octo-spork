import { TransactionForm } from "@/components/transactions/TransactionForm";
import { TransactionTable } from "@/components/transactions/TransactionsTable";
import { TransactionFilters } from "@/components/transactions/TransactionFilters";
import type {
  Transaction,
  Category,
  Account,
  Recurrence,
} from "@/generated/prisma";
import type { FC } from "hono/jsx";
import Layout from "@/components/shared/Layout";

interface TransactionsPageData {
  transactions: (Transaction & {
    category?: Category;
    sourceAccount?: Account;
    targetAccount?: Account;
  })[];
  categories: Category[];
  accounts: Account[];
  recurrences: Recurrence[];
}

export const TransactionsPage: FC<{ data?: TransactionsPageData }> = ({
  data,
}) => {
  const transactions = data?.transactions || [];
  const categories = data?.categories || [];
  const accounts = data?.accounts || [];
  const recurrences = data?.recurrences || [];

  return (
    <Layout activeNavItem="/transactions">
      <h1 class="text-4xl font-bold uppercase tracking-wider mb-8">
        Transactions
      </h1>

      <TransactionForm categories={categories} accounts={accounts} />

      <TransactionFilters
        categories={categories}
        accounts={accounts}
        recurrences={recurrences}
      />

      <div id="transaction-table-container">
        <TransactionTable transactions={transactions} />
      </div>
    </Layout>
  );
};
