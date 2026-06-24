// src/features/dashboard/components/charts/sidebar-charts-budget.tsx

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PremiumAmountCell } from "@/components/data-display/data-table";
import { useBudgetSummary } from "@/features/dashboard/hooks/dashboardHooks";

const CATEGORY_LABELS: Record<string, string> = {
  DAILY_EXPENSES: "Daily Expenses",
  FOOD_GROCERIES: "Food Groceries",
  ENTERTAINMENT: "Entertainment",
  TRANSPORTATION: "Transportation",
  HEALTH: "Health & Medical",
  UTILITIES: "Utilities",
};

const CATEGORY_COLORS: Record<string, string> = {
  DAILY_EXPENSES: "bg-chart-1",
  FOOD_GROCERIES: "bg-chart-2",
  ENTERTAINMENT: "bg-chart-3",
  TRANSPORTATION: "bg-chart-4",
  HEALTH: "bg-chart-5",
  UTILITIES: "bg-chart-6",
};

export function SidebarChartsBudget() {
  const { data: budgets } = useBudgetSummary();
  console.log(budgets);

  return (
    <Card className="bg-card/40 border-border/40 shadow-premium rounded-none shrink-0 flex flex-col flex-1 min-h-0 overflow-hidden">
      <CardHeader className="pb-2 px-5 pt-4 shrink-0">
        <CardTitle className="text-[10px] font-black uppercase tracking-widest text-secondary">
          Resumen de Gastos
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 px-5 pb-4 overflow-y-auto custom-scrollbar">
        {budgets.map((budget) => {
          const spent = Number(budget.spent);
          const dailyAvg = Number(budget.dailyAvg);
          const projectedEnd = Number(budget.projectedEnd);
          const totalDays = budget.daysElapsed + budget.daysLeft;

          return (
            <div key={budget.category} className="space-y-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 min-w-0">
                  <div
                    className={`h-2 w-2 shrink-0 ${CATEGORY_COLORS[budget.category] ?? "bg-foreground/20"}`}
                  />
                  <span className="text-[9px] font-black uppercase tracking-widest text-foreground/80 truncate">
                    {CATEGORY_LABELS[budget.category] ?? budget.category}
                  </span>
                </div>
                <PremiumAmountCell
                  amount={spent}
                  currency="ARS"
                  showSign={false}
                />
              </div>
              <div className="flex items-center justify-between pl-4">
                <div className="flex items-center gap-2 text-[8px] font-mono tabular-nums text-foreground/40">
                  <span>${dailyAvg.toFixed(2)}/día</span>
                  <span className="text-foreground/20">|</span>
                  <span>
                    {budget.daysElapsed}/{totalDays}d
                  </span>
                </div>
                <span className="text-[8px] font-mono tabular-nums text-foreground/40">
                  → ${projectedEnd.toFixed(2)}
                </span>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
