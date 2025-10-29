// src/components/dashboard/MonthlyChart.tsx

import type { FC } from "hono/jsx";

interface MonthlyChartProps {
  chartData: { date: string; amount: number }[];
}

export const MonthlyChart: FC<MonthlyChartProps> = ({ chartData }) => {
  const maxAmount = Math.max(...chartData.map((d) => d.amount));
  const chartHeight = 200;
  const barWidth = 20;
  const barSpacing = 10;

  return (
    <div class="bg-card text-card-foreground border-2 border-border shadow-[var(--shadow-lg)] p-6 rounded-none
      transition-all duration-150
      hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[var(--shadow-md)]"
    >
      <h3 class="text-2xl md:text-3xl font-bold text-foreground mb-2">
        MONTHLY OVERVIEW
      </h3>
      <div class="overflow-x-auto">
        <svg
          width={chartData.length * (barWidth + barSpacing)}
          height={chartHeight}
          viewBox={`0 0 ${
            chartData.length * (barWidth + barSpacing)
          } ${chartHeight}`}
          role="img" // Added role for accessibility
          aria-labelledby="chart-title chart-desc" // Added aria-labelledby for accessibility
        >
          <title id="chart-title">Monthly Transaction Overview</title> {/* Added title for accessibility */}
          <desc id="chart-desc">Bar chart showing daily transaction amounts for the month.</desc> {/* Added desc for accessibility */}
          {chartData.map((dataPoint, index) => {
            const barHeight = (dataPoint.amount / maxAmount) * chartHeight;
            const x = index * (barWidth + barSpacing);
            const y = chartHeight - barHeight;
            return (
              <g key={index}> {/* Added key for list rendering */}
                <rect
                  x={x}
                  y={y}
                  width={barWidth}
                  height={barHeight}
                  class="fill-primary hover:fill-accent transition-colors duration-150"
                  rx="0"
                  ry="0"
                  aria-label={`Date: ${new Date(dataPoint.date).getDate()}, Amount: ${dataPoint.amount}`} // Added aria-label for accessibility
                />
                <text
                  x={x + barWidth / 2}
                  y={chartHeight - 5}
                  class="text-xs fill-muted-foreground"
                  text-anchor="middle"
                >
                  {new Date(dataPoint.date).getDate()}
                </text>
              </g>
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
