// src/pages/DashboardPage.tsx
import { FC } from "hono/jsx";
import { Layout } from "../components/shared/Layout";

interface DashboardStats {
  totalIncome: number;
  totalExpense: number;
  netBalance: number;
  expenseByCategory: { category: string; amount: number }[];
  recentTransactions: any[]; // Replace 'any' with actual Transaction type
  totalAccountsBalance: number;
}

// Placeholder for ExpenseForm component
const ExpenseForm: FC = () => (
  <div className="card">
    <div className="card-body">Expense Form Placeholder</div>
  </div>
);

// Placeholder for ExpenseTable component
const ExpenseTable: FC<{ expenses: any[] }> = ({ expenses }) => (
  <div className="table-responsive">
    <table className="table table-vcenter card-table">
      <thead>
        <tr>
          <th>Date</th>
          <th>Concept</th>
          <th>Category</th>
          <th className="text-end">Amount</th>
          <th className="w-1">Actions</th>
        </tr>
      </thead>
      <tbody>
        {expenses.length === 0 ? (
          <tr>
            <td colSpan="5" className="text-center text-muted">No recent expenses</td>
          </tr>
        ) : (
          expenses.map((expense) => (
            <tr>
              <td>{expense.date}</td>
              <td>{expense.concept}</td>
              <td>{expense.category}</td>
              <td className="text-end">${expense.amount.toFixed(2)}</td>
              <td></td>
            </tr>
          ))
        )}
      
      </tbody>
    </table>
  </div>
);

// Placeholder for BudgetCard component
const BudgetCard: FC<{ spent: number }> = ({ spent }) => {
  // monthlyBudget is not yet implemented, so we only display spent
  // TODO: Implement budget feature and pass limit here
  return (
    <div className="card">
      <div className="card-body">
        <div className="subheader">Monthly Budget</div>
        <div className="h1 mb-3">
          ${spent.toFixed(2)} / N/A
        </div>
        <div className="progress progress-sm">
          <div
            className={`progress-bar bg-secondary`}
            style={{ width: "100%" }}
          />
        </div>
        <div className="text-muted mt-1">
          Budget feature not implemented
        </div>
      </div>
    </div>
  );
};

export const DashboardPage: FC<{ stats: DashboardStats }> = ({ stats }) => {
  return (
    <Layout title="Dashboard">
      <div className="container-xl">
        <div className="page-header d-print-none">
          <div className="row align-items-center">
            <div className="col">
              <h2 className="page-title">Dashboard</h2>
            </div>
          </div>
        </div>
        <div className="page-body">
          {/* Stats Row */}
          <div className="row g-3 mb-4">
            <div className="col-md-4">
              <BudgetCard spent={stats.totalExpense} />
            </div>
            <div className="col-md-4">
              <div className="card">
                <div className="card-body">
                  <div className="subheader">This Month</div>
                  <div className="h1 mb-0 text-danger">
                    ${stats.totalExpense.toFixed(2)}
                  </div>
                  <div className="text-muted">{stats.expenseCount} expenses</div>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card">
                <div className="card-body">
                  <div className="subheader">Daily Average</div>
                  <div className="h1 mb-0">${stats.dailyAverage.toFixed(2)}</div>
                  <div className="text-muted">{stats.daysInMonth} days this month</div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Add Form */}
          <div className="mb-4">
            <ExpenseForm />
          </div>

          {/* Recent Expenses */}
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Recent Expenses</h3>
              <div className="card-actions">
                <a href="/expenses" className="btn btn-primary">View All</a>
              </div>
            </div>
            <ExpenseTable expenses={stats.recentTransactions} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

