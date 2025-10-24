// src/components/dashboard/MonthlyChart.tsx

import type { FC } from "hono/jsx";

interface MonthlyChartProps {
  chartData: { date: string; amount: number }[];
}

export const MonthlyChart: FC<MonthlyChartProps> = ({ chartData }) => {
  // For simplicity, let's create a very basic SVG bar chart
  // In a real application, you might use a more sophisticated server-side charting library
  // or render a placeholder and hydrate with client-side JS.

  const maxAmount = Math.max(...chartData.map((d) => d.amount));
  const chartHeight = 200;
  const barWidth = 20;
  const barSpacing = 10;

  return (
    <div class="neo-card p-6">
      <h3 class="text-xl font-bold uppercase mb-4">MONTHLY OVERVIEW</h3>
      <div class="overflow-x-auto">
        <svg
          width={chartData.length * (barWidth + barSpacing)}
          height={chartHeight}
          viewBox={`0 0 ${
            chartData.length * (barWidth + barSpacing)
          } ${chartHeight}`}
        >
          {chartData.map((dataPoint, index) => {
            const barHeight = (dataPoint.amount / maxAmount) * chartHeight;
            const x = index * (barWidth + barSpacing);
            const y = chartHeight - barHeight;
            return (
              <rect
                x={x}
                y={y}
                width={barWidth}
                height={barHeight}
                fill="var(--primary)"
                rx="0"
                ry="0"
              />
            );
          })}
        </svg>
      </div>
      <p class="text-sm text-muted-foreground mt-4">
        Daily transaction amounts for the month.
      </p>
    </div>
  );
};
