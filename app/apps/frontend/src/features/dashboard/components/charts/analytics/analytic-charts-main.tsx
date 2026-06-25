// src/features/dashboard/components/charts/analytic-charts-main.tsx

import {
  Area,
  AreaChart,
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
import { useTranslations } from "next-intl";
import { useMonthlyIncomeExpense } from "../../../hooks/dashboardHooks";
import { CustomTooltip } from "@/features/dashboard/utils/utils";

export function AnalyticChartsMain() {
  const acmT = useTranslations("AnalyticChartsMain");
  const { data: incomeExpenseData = [] } = useMonthlyIncomeExpense();

  const netWorthData = incomeExpenseData.map((item) => ({
    month: item.month,
    value: parseFloat(item.income) - parseFloat(item.expenses),
  }));

  return (
    <Card className="flex-1 bg-card/20 border-border/40 shadow-premium rounded-none min-h-75 flex flex-col overflow-hidden">
      <CardHeader className="pb-4 px-5 pt-5 flex flex-row items-center justify-between shrink-0">
        <div className="space-y-1">
          <CardTitle className="text-[11px] font-black uppercase tracking-widest text-foreground">
            {acmT("title")}
          </CardTitle>
          <CardDescription className="text-[10px] uppercase font-bold text-muted-foreground/40 tracking-tight">
            {acmT("description")}
          </CardDescription>
        </div>
        <div className="flex gap-2">
          <div className="h-2 w-2 bg-primary" />
          <span className="text-[9px] font-bold uppercase tracking-tighter opacity-60">
            {acmT("real")}
          </span>
        </div>
      </CardHeader>
      <CardContent className="flex-1 min-h-0 px-4 pb-4">
        <ResponsiveContainer
          width="100%"
          height="100%"
          initialDimension={{ width: 0, height: 200 }}
        >
          <AreaChart data={netWorthData}>
            <defs>
              <linearGradient id="netWorthGradient" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--primary)"
                  stopOpacity={0.2}
                />
                <stop offset="95%" stopColor="var(--primary)" stopOpacity={0} />
              </linearGradient>
            </defs>
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
              cursor={{
                stroke: "var(--primary)",
                strokeWidth: 1,
                strokeDasharray: "4 4",
              }}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke="var(--primary)"
              strokeWidth={2.5}
              fill="url(#netWorthGradient)"
              animationDuration={1000}
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
