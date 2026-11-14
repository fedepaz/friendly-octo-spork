// src/features/dashboard/components/kpis-dashboard.tsx

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";

import { useMonthlyIncomeExpense } from "../../hooks/dashboardHooks";
import { useAccounts } from "@/features/accounts/hooks/accountsHooks";
import { cn, formatCurrency } from "@/lib/utils";
import { useWizard } from "@/providers/wizard-form-provider";
import { useTranslations, useLocale } from "next-intl";

interface KPIsDashboardProps {
  /** 0-based month + year of the selected dashboard period */
  month: number;
  year: number;
}

export function KPIsDashboard({ month, year }: KPIsDashboardProps) {
  const kpT = useTranslations("DashboardKPIs");
  const locale = useLocale();
  // #63.1: Net Worth must sum ALL accounts — the recent endpoint is
  // LIMIT 3 and silently dropped the rest from the total.
  const { data: accounts = [] } = useAccounts();
  // #64: income/expense KPIs follow the selected period (6 months ending there)
  const { data: incomeExpenseData = [] } = useMonthlyIncomeExpense(
    6,
    month + 1,
    year,
  );
  const { openTransaction, openCard } = useWizard();

  const totalNetWorth = accounts.reduce(
    (sum, acc) => sum + parseFloat(acc.balance),
    0,
  );

  const last = incomeExpenseData[incomeExpenseData.length - 1];
  const prev = incomeExpenseData[incomeExpenseData.length - 2];
  const monthlyIncome = last?.income ?? "0";
  const monthlyExpenses = last?.expenses ?? "0";

  const currentNetFlow =
    parseFloat(last?.income ?? "0") - parseFloat(last?.expenses ?? "0");
  const prevNetFlow =
    parseFloat(prev?.income ?? "0") - parseFloat(prev?.expenses ?? "0");
  // #63.2: this delta IS net flow — labeled as such instead of implying
  // it is a change in net worth
  const netFlowDelta = currentNetFlow - prevNetFlow;

  const currentMonth = new Date(year, month, 1).toLocaleDateString(locale, {
    month: "long",
  });

  const handleNewTransaction = () => {
    openTransaction();
  };

  const handleCloseCard = () => {
    openCard();
  };

  return (
    <div className="grid  grid-cols-1 lg:grid-cols-12 gap-3 min-h-0 overflow-y-auto lg:overflow-hidden pr-1 custom-scrollbar">
      {/* Top Bento Row: Stats & Quick Actions */}
      <div className="lg:col-span-8 grid md:grid-cols-3 gap-3">
        <Card className="bg-card/40 border-border/40 shadow-premium group hover:bg-card/60 transition-premium rounded-none">
          <CardHeader className="pb-1 px-4 pt-4">
            <CardTitle className="text-xs font-black uppercase tracking-widest text-muted-foreground/60">
              {kpT("netWorth")}
            </CardTitle>
          </CardHeader>
          <CardContent className="px-4 pb-4">
            <p className="text-2xl font-mono font-black text-primary tracking-tighter tabular-nums">
              {formatCurrency(totalNetWorth)}
            </p>
            <div className="flex items-center gap-1.5 mt-1">
              <span className={cn(
                "text-xs font-black uppercase tracking-widest",
                netFlowDelta >= 0 ? "text-success" : "text-destructive",
              )}>
                {netFlowDelta >= 0 ? "+" : ""}
                {formatCurrency(Math.abs(netFlowDelta))}
                <span className="text-muted-foreground/70 ml-1">
                  {kpT("netFlowVsPrev")}
                </span>
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/40 border-border/40 shadow-premium group hover:bg-card/60 transition-premium rounded-none">
          <CardHeader className="pb-1 px-4 pt-4">
            <CardTitle className="text-xs font-black uppercase tracking-widest text-muted-foreground/60">
              {kpT("incomeTitle", { month: currentMonth })}
            </CardTitle>
          </CardHeader>
          <CardContent className="px-4 pb-4">
            <p className="text-2xl font-mono font-black text-success tracking-tighter tabular-nums">
              {formatCurrency(monthlyIncome)}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-card/40 border-border/40 shadow-premium group hover:bg-card/60 transition-premium rounded-none">
          <CardHeader className="pb-1 px-4 pt-4">
            <CardTitle className="text-xs font-black uppercase tracking-widest text-muted-foreground/60">
              {kpT("expensesTitle", { month: currentMonth })}
            </CardTitle>
          </CardHeader>
          <CardContent className="px-4 pb-4">
            <p className="text-2xl font-mono font-black text-destructive tracking-tighter tabular-nums">
              {formatCurrency(monthlyExpenses)}
            </p>
          </CardContent>
        </Card>
      </div>
      <div className="lg:col-span-4 grid grid-cols-1 gap-3">
        <Button
          onClick={handleNewTransaction}
          className="font-black text-xs uppercase tracking-widest rounded-none shadow-premium bg-primary text-primary-foreground hover:opacity-90 transition-premium group h-(--control-height-md)"
        >
          <PlusIcon className="mr-2 h-4 w-4 group-hover:rotate-90 transition-premium" />
          {kpT("newTransaction")}
        </Button>
        <Button
          onClick={handleCloseCard}
          variant="outline"
          className="font-black text-xs uppercase tracking-widest rounded-none border-border/40 text-muted-foreground hover:text-foreground hover:border-primary/40 transition-premium group h-(--control-height-md)"
        >
          <PlusIcon className="mr-2 h-4 w-4 group-hover:rotate-90 transition-premium" />
          {kpT("cardClosing")}
        </Button>
      </div>
    </div>
  );
}
