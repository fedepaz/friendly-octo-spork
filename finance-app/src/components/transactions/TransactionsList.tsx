// src/components/transactions/TransactionsList.tsx
import { FC } from "hono/jsx";
import { TransactionRow } from "./TransactionRow";

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

export const TransactionsList: FC<{ transactions: Transaction[] }> = ({ transactions }) => {
  return (
    <div class="card">
      <div class="card-header">
        <h3 class="card-title">Your Transactions</h3>
      </div>
      <div class="table-responsive">
        <table class="table table-vcenter card-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Description</th>
              <th>Type</th>
              <th>Category</th>
              <th>Account</th>
              <th class="text-end">Amount</th>
              <th class="w-1">Actions</th>
            </tr>
          </thead>
          <tbody>
            {transactions.length === 0 ? (
              <tr>
                <td colspan="7" class="text-center text-muted">No transactions found. Add one above!</td>
              </tr>
            ) : (
              transactions.map((transaction) => (
                <TransactionRow transaction={transaction} />
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
