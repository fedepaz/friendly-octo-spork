// src/features/dashboard/components/charts/analytic-charts-bottom.tsx

import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CustomTooltip } from "@/features/dashboard/utils/utils";
import { useMonthlyIncomeExpense } from "@/features/dashboard/hooks/dashboardHooks";

export function AnalyticChartsBottom() {
  const { data: incomeExpenseData = [] } = useMonthlyIncomeExpense();
  return (
    <Card className="flex-1 bg-card/20 border-border/40 shadow-premium rounded-none min-h-75 flex flex-col overflow-hidden">
      <CardHeader className="pb-4 px-5 pt-5 flex flex-row items-center justify-between shrink-0">
        <div className="space-y-1">
          <CardTitle className="text-[11px] font-black uppercase tracking-widest text-foreground">
            Flujo de Caja
          </CardTitle>
          <CardDescription className="text-[10px] uppercase font-bold text-muted-foreground/40 tracking-tight">
            Comparativa de ingresos y gastos operativos
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="flex-1 min-h-0 px-4 pb-4">
        <ResponsiveContainer
          width="100%"
          height="100%"
          initialDimension={{ width: 0, height: 200 }}
        >
          <BarChart data={incomeExpenseData} barGap={8}>
            <CartesianGrid
              strokeDasharray="4 4"
              stroke="var(--border)"
              opacity={0.1}
              vertical={false}
            />
            <XAxis
              dataKey="month"
              stroke="var(--muted-foreground)"
              fontSize={9}
              fontWeight={700}
              fontFamily="Source Code Pro"
              tickLine={false}
              axisLine={false}
              dy={10}
            />
            <YAxis
              stroke="var(--muted-foreground)"
              fontSize={9}
              fontWeight={700}
              fontFamily="Source Code Pro"
              tickFormatter={(value) => `$${value / 1000}k`}
              tickLine={false}
              axisLine={false}
              dx={-10}
            />
            <Tooltip
              content={<CustomTooltip />}
              cursor={{ fill: "var(--foreground)", opacity: 0.05 }}
            />
            <Bar
              dataKey="income"
              fill="var(--secondary)"
              radius={0}
              barSize={24}
            />
            <Bar
              dataKey="expenses"
              fill="var(--destructive)"
              opacity={0.8}
              radius={0}
              barSize={24}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
