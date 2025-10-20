// src/components/dashboard/MonthlyChart.tsx
import { FC } from "hono/jsx";

interface MonthlyChartProps {
  data: { category: string; amount: number }[];
}

export const MonthlyChart: FC<MonthlyChartProps> = ({ data }) => {
  return (
    <div class="card">
      <div class="card-header">
        <h3 class="card-title">Expenses by Category</h3>
      </div>
      <div class="card-body">
        {data.length === 0 ? (
          <div class="text-center text-muted">No expense data for chart.</div>
        ) : (
          <div class="chart-container">
            {/* Placeholder for a chart library integration */}
            <p>Chart would go here. Data:</p>
            <ul>
              {data.map((item) => (
                <li>
                  {item.category}: ${item.amount.toFixed(2)}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};
