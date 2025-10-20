// src/pages/TransactionsPage.tsx
import { FC } from "hono/jsx";
import { Layout } from "../components/shared/Layout";
import { TransactionsList } from "../components/transactions/TransactionsList";
import { TransactionForm } from "../components/transactions/TransactionForm";
import { TransactionFilters } from "../components/transactions/TransactionFilters";

// Placeholder for Transaction type
interface Transaction {
  id: number;
  type: string;
  amount: number;
  date: string;
  description?: string;
  category?: { name: string };
  sourceAccount?: { name: string };
  targetAccount?: { name: string };
}

export const TransactionsPage: FC<{ transactions: Transaction[]; filters: any }> = ({ transactions, filters }) => {
  return (
    <Layout title="Transactions">
      <div class="container-xl">
        <div class="page-header d-print-none">
          <div class="row align-items-center">
            <div class="col">
              <h2 class="page-title">Transactions</h2>
            </div>
          </div>
        </div>
        <div class="page-body">
          <div class="row row-cards">
            <div class="col-12">
              <TransactionForm />
            </div>
            <div class="col-12">
              <TransactionFilters filters={filters} />
            </div>
            <div class="col-12">
              <TransactionsList transactions={transactions} />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
