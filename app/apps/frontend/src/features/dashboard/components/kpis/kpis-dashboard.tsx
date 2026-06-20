// src/features/dashboard/components/kpis-dashboard.tsx

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";

import {
  useMonthlyIncomeExpense,
  useRecentAccounts,
} from "../../hooks/dashboardHooks";
import { formatCurrency } from "@/lib/utils";
import { useWizard } from "@/providers/wizard-form-provider";

export function KPIsDashboard() {
  const { data: accounts = [] } = useRecentAccounts();
  const { data: incomeExpenseData = [] } = useMonthlyIncomeExpense();
  const { openTransaction } = useWizard();
  const totalNetWorth = accounts.reduce(
    (sum, acc) => sum + parseFloat(acc.balance),
    0,
  );
  const monthlyIncome = incomeExpenseData[incomeExpenseData.length - 1].income;
  const monthlyExpenses =
    incomeExpenseData[incomeExpenseData.length - 1].expenses;

  const handleNewTransaction = () => {
    openTransaction();
  };

  return (
    <div className="grid  grid-cols-1 lg:grid-cols-12 gap-3 min-h-0 overflow-y-auto lg:overflow-hidden pr-1 custom-scrollbar">
      {/* Top Bento Row: Stats & Quick Actions */}
      <div className="lg:col-span-8 grid md:grid-cols-3 gap-3">
        <Card className="bg-card/40 border-border/40 shadow-premium group hover:bg-card/60 transition-premium rounded-none">
          <CardHeader className="pb-1 px-4 pt-4">
            <CardTitle className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">
              Patrimonio Neto
            </CardTitle>
          </CardHeader>
          <CardContent className="px-4 pb-4">
            <p className="text-2xl font-mono font-black text-primary tracking-tighter tabular-nums">
              {formatCurrency(totalNetWorth)}
            </p>
            <div className="flex items-center gap-1.5 mt-1">
              <span className="text-[10px] font-bold text-secondary tracking-tight">
                +8.2%
              </span>
              <span className="text-[10px] text-muted-foreground/40 uppercase font-bold tracking-tighter">
                vs mes anterior
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/40 border-border/40 shadow-premium group hover:bg-card/60 transition-premium rounded-none">
          <CardHeader className="pb-1 px-4 pt-4">
            <CardTitle className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">
              Ingresos Junio
            </CardTitle>
          </CardHeader>
          <CardContent className="px-4 pb-4">
            <p className="text-2xl font-mono font-black text-secondary tracking-tighter tabular-nums">
              {formatCurrency(monthlyIncome)}
            </p>
            <div className="w-full h-1 bg-secondary/10 mt-2">
              <div className="h-full bg-secondary w-full" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/40 border-border/40 shadow-premium group hover:bg-card/60 transition-premium rounded-none">
          <CardHeader className="pb-1 px-4 pt-4">
            <CardTitle className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">
              Gastos Junio
            </CardTitle>
          </CardHeader>
          <CardContent className="px-4 pb-4">
            <p className="text-2xl font-mono font-black text-rose-400 tracking-tighter tabular-nums">
              {formatCurrency(monthlyExpenses)}
            </p>
            <div className="w-full h-1 bg-rose-400/10 mt-2">
              <div className="h-full bg-rose-400 w-[65%]" />
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="lg:col-span-4 grid grid-cols-1  gap-3">
        <Button
          onClick={handleNewTransaction}
          className="font-black text-xs uppercase tracking-widest rounded-none shadow-premium hover:opacity-90 transition-premium group"
        >
          <PlusIcon className="mr-2 h-4 w-4 group-hover:rotate-90 transition-premium" />
          Nueva Transacción
        </Button>
      </div>
    </div>
  );
}
