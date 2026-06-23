// src/features/dashboard/components/charts/sidebar-charts-budget.tsx

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { PremiumAmountCell } from "@/components/data-display/data-table";
import { useBudgetSummary } from "@/features/dashboard/hooks/dashboardHooks";

export function SidebarChartsBudget() {
  const { data: budgets } = useBudgetSummary();

  function getBudgetPercentage(spent: string, limit: string) {
    const percentage = (parseFloat(spent) / parseFloat(limit)) * 100;
    return Math.round(percentage);
  }
  return (
    <Card className="bg-card/40 border-border/40 shadow-premium rounded-none shrink-0 flex flex-col flex-1 min-h-0 overflow-hidden">
      <CardHeader className="pb-2 px-5 pt-4 shrink-0">
        <CardTitle className="text-[10px] font-black uppercase tracking-widest text-secondary">
          Estado de Presupuestos
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 px-5 pb-4 overflow-y-auto custom-scrollbar">
        {budgets.map((budget) => {
          const percentage = getBudgetPercentage(budget.spent, budget.limit);
          const isOverBudget = percentage > 100;
          return (
            <div key={budget.category} className="space-y-auto">
              <div className="flex items-center justify-between">
                <p className="text-[9px] font-black uppercase tracking-widest text-foreground/80">
                  {budget.category}
                </p>
                <p
                  className={cn(
                    "font-mono text-[10px] font-black tabular-nums",
                    isOverBudget ? "text-destructive" : "text-secondary",
                  )}
                >
                  {Math.round(percentage)}%
                </p>
              </div>
              <div className="relative h-1.5 bg-foreground/5 shadow-etched overflow-hidden">
                <div
                  className={cn(
                    "absolute inset-y-0 left-0 transition-all duration-1000",
                    isOverBudget
                      ? "bg-destructive shadow-[0_0_8px_rgba(var(--destructive),0.4)]"
                      : "bg-secondary",
                  )}
                  style={{ width: `${Math.min(percentage, 100)}%` }}
                />
              </div>
              <div className="flex justify-between items-center opacity-40">
                <PremiumAmountCell
                  amount={budget.spent}
                  currency="ARS"
                  isNegative={Number(budget.spent) < 0}
                />

                <PremiumAmountCell
                  amount={budget.limit}
                  currency="ARS"
                  isNegative={Number(budget.limit) < 0}
                />
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
