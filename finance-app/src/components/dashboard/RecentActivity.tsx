// src/components/dashboard/RecentActivity.tsx
import { FC } from "hono/jsx";

interface RecentActivityProps {
  transactions: any[]; // Replace 'any' with actual Transaction type
}

export const RecentActivity: FC<RecentActivityProps> = ({ transactions }) => {
  return (
    <div class="card">
      <div class="card-header">
        <h3 class="card-title">Recent Activity</h3>
      </div>
      <div class="table-responsive">
        <table class="table table-vcenter card-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Description</th>
              <th>Amount</th>
              <th>Type</th>
              <th>Category</th>
            </tr>
          </thead>
          <tbody>
            {transactions.length === 0 ? (
              <tr>
                <td colspan="5" class="text-center text-muted">No recent activity.</td>
              </tr>
            ) : (
              transactions.map((tx) => (
                <tr key={tx.id}>
                  <td>{new Date(tx.date).toLocaleDateString()}</td>
                  <td>{tx.description}</td>
                  <td>${tx.amount.toFixed(2)}</td>
                  <td>{tx.type}</td>
                  <td>{tx.category?.name || "N/A"}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
