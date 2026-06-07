//src/features/dashboard/components/RootDashboard.tsx
"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { useState } from "react";
import { SmartFormProvider } from "@/features/createTransaction";
import { cn } from "@/lib/utils";

// Mock data
const netWorthData = [
  { month: "Jan", value: 45000 },
  { month: "Feb", value: 47200 },
  { month: "Mar", value: 46800 },
  { month: "Apr", value: 51000 },
  { month: "May", value: 54200 },
  { month: "Jun", value: 58500 },
];

const incomeExpenseData = [
  { month: "Jan", income: 5200, expenses: 3800 },
  { month: "Feb", income: 5400, expenses: 4100 },
  { month: "Mar", income: 5100, expenses: 3600 },
  { month: "Apr", income: 5800, expenses: 4200 },
  { month: "May", income: 6200, expenses: 4000 },
  { month: "Jun", income: 5900, expenses: 3900 },
];

const accounts = [
  { name: "Main Checking", type: "checking", balance: 12450.32 },
  { name: "Savings", type: "savings", balance: 28750.0 },
  { name: "Investment", type: "investment", balance: 17300.45 },
];

const recentTransactions = [
  {
    id: 1,
    description: "Grocery Store",
    category: "Food",
    amount: -125.5,
    date: "2024-06-15",
  },
  {
    id: 2,
    description: "Salary Deposit",
    category: "Income",
    amount: 5900.0,
    date: "2024-06-14",
  },
  {
    id: 3,
    description: "Electric Bill",
    category: "Utilities",
    amount: -145.2,
    date: "2024-06-13",
  },
  {
    id: 4,
    description: "Gas Station",
    category: "Transport",
    amount: -52.3,
    date: "2024-06-12",
  },
  {
    id: 5,
    description: "Freelance Payment",
    category: "Income",
    amount: 850.0,
    date: "2024-06-11",
  },
];

const budgets = [
  { category: "Food & Dining", spent: 680, limit: 800, color: "bg-chart-1" },
  { category: "Transportation", spent: 320, limit: 400, color: "bg-chart-2" },
  { category: "Entertainment", spent: 180, limit: 200, color: "bg-chart-3" },
  { category: "Utilities", spent: 290, limit: 350, color: "bg-chart-4" },
];

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(value);
}

function CustomTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Array<{ value: number; dataKey: string }>;
  label?: string;
}) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card border border-border p-3 shadow-lg">
        <p className="font-mono text-xs text-muted-foreground">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} className="font-mono text-sm text-foreground">
            {entry.dataKey}: {formatCurrency(entry.value)}
          </p>
        ))}
      </div>
    );
  }
  return null;
}

export function RootDashboard() {
  const totalNetWorth = accounts.reduce((sum, acc) => sum + acc.balance, 0);
  const monthlyIncome = incomeExpenseData[incomeExpenseData.length - 1].income;
  const monthlyExpenses =
    incomeExpenseData[incomeExpenseData.length - 1].expenses;
  const [isOpen, setIsOpen] = useState(false);

  function openWizard() {
    setIsOpen(true);
  }

  return (
    <div className="flex flex-1 flex-col gap-3 min-h-0 overflow-hidden animate-premium-in">
      {/* Top Bento Row: Stats & Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 shrink-0">
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
            <p className="text-2xl font-mono font-black text-destructive tracking-tighter tabular-nums">
              {formatCurrency(monthlyExpenses)}
            </p>
            <div className="w-full h-1 bg-destructive/10 mt-2">
              <div className="h-full bg-destructive w-[65%]" />
            </div>
          </CardContent>
        </Card>

        <div className="flex flex-col gap-3">
          <Button
            onClick={() => openWizard()}
            className="flex-1 bg-primary text-primary-foreground font-black text-xs uppercase tracking-widest rounded-none shadow-premium hover:opacity-90 transition-premium group"
          >
            <PlusIcon className="mr-2 h-4 w-4 group-hover:rotate-90 transition-premium" />
            Nueva Transacción
          </Button>
          <Button
            variant="outline"
            className="flex-1 bg-card/40 border-border/40 text-foreground font-black text-xs uppercase tracking-widest rounded-none shadow-premium hover:bg-card/60 transition-premium"
          >
            Exportar Reporte
          </Button>
        </div>
      </div>

      {/* Main Bento Grid */}
      <div className="grid flex-1 grid-cols-1 lg:grid-cols-12 gap-3 min-h-0 overflow-y-auto lg:overflow-hidden pr-1 custom-scrollbar">
        {/* Analytics Section (Span 8) */}
        <div className="lg:col-span-8 flex flex-col gap-3 min-h-0">
          <Card className="flex-1 bg-card/20 border-border/40 shadow-premium rounded-none min-h-[300px] flex flex-col overflow-hidden">
            <CardHeader className="pb-4 px-5 pt-5 flex flex-row items-center justify-between shrink-0">
              <div className="space-y-1">
                <CardTitle className="text-[11px] font-black uppercase tracking-widest text-foreground">
                  Proyección de Patrimonio
                </CardTitle>
                <CardDescription className="text-[10px] uppercase font-bold text-muted-foreground/40 tracking-tight">
                  Evolución histórica y tendencia actual
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <div className="h-2 w-2 bg-primary" />
                <span className="text-[9px] font-bold uppercase tracking-tighter opacity-60">
                  Real
                </span>
              </div>
            </CardHeader>
            <CardContent className="flex-1 min-h-0 px-4 pb-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={netWorthData}>
                  <defs>
                    <linearGradient
                      id="netWorthGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="5%"
                        stopColor="var(--primary)"
                        stopOpacity={0.2}
                      />
                      <stop
                        offset="95%"
                        stopColor="var(--primary)"
                        stopOpacity={0}
                      />
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

          <Card className="flex-1 bg-card/20 border-border/40 shadow-premium rounded-none min-h-[300px] flex flex-col overflow-hidden">
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
              <ResponsiveContainer width="100%" height="100%">
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
                    radius={0}
                    barSize={24}
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar Section (Span 4) */}
        <div className="lg:col-span-4 flex flex-col gap-3 min-h-0">
          <Card className="bg-card/40 border-border/40 shadow-premium rounded-none shrink-0 flex flex-col max-h-[25%] overflow-hidden">
            <CardHeader className="pb-2 px-5 pt-4 shrink-0">
              <CardTitle className="text-[10px] font-black uppercase tracking-widest text-primary">
                Instrumental de Cuentas
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 px-5 pb-4 overflow-y-auto custom-scrollbar">
              {accounts.map((account) => (
                <div
                  key={account.name}
                  className="flex items-center justify-between group cursor-pointer hover:translate-x-1 transition-premium border-l-2 border-transparent hover:border-primary pl-2"
                >
                  <div className="min-w-0">
                    <p className="text-[11px] font-black text-foreground truncate uppercase tracking-tighter">
                      {account.name}
                    </p>
                    <p className="font-mono text-[8px] uppercase text-muted-foreground/40 font-bold leading-none">
                      {account.type}
                    </p>
                  </div>
                  <p className="font-mono text-[11px] font-black text-secondary tabular-nums">
                    {formatCurrency(account.balance)}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="bg-card/40 border-border/40 shadow-premium rounded-none shrink-0 flex flex-col max-h-[35%] overflow-hidden">
            <CardHeader className="pb-2 px-5 pt-4 shrink-0">
              <CardTitle className="text-[10px] font-black uppercase tracking-widest text-secondary">
                Estado de Presupuestos
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 px-5 pb-4 overflow-y-auto custom-scrollbar">
              {budgets.map((budget) => {
                const percentage = (budget.spent / budget.limit) * 100;
                const isOverBudget = percentage > 100;
                return (
                  <div key={budget.category} className="space-y-1.5">
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
                      <span className="text-[8px] font-mono">
                        {formatCurrency(budget.spent)}
                      </span>
                      <span className="text-[8px] font-mono">
                        {formatCurrency(budget.limit)}
                      </span>
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>

          <Card className="bg-card/40 border-border/40 shadow-premium rounded-none flex-1 min-h-0 flex flex-col overflow-hidden">
            <CardHeader className="pb-3 px-5 pt-4 shrink-0">
              <CardTitle className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">
                Registros Recientes
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 min-h-0 px-5 pb-4 overflow-hidden">
              <div className="h-full overflow-y-auto pr-1 custom-scrollbar">
                <Table>
                  <TableHeader className="sticky top-0 bg-card/90 backdrop-blur-md z-10">
                    <TableRow className="hover:bg-transparent border-b border-border/40">
                      <TableHead className="font-black text-[9px] h-8 px-0 uppercase tracking-widest opacity-40">
                        Descripción
                      </TableHead>
                      <TableHead className="font-black text-[9px] text-right h-8 px-0 uppercase tracking-widest opacity-40">
                        Monto
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentTransactions.map((tx) => (
                      <TableRow
                        key={tx.id}
                        className="group hover:bg-foreground/5 border-border/10 cursor-pointer transition-premium"
                      >
                        <TableCell className="py-2.5 px-0">
                          <div className="flex flex-col">
                            <p className="text-[11px] font-black uppercase tracking-tight text-foreground/90 group-hover:text-primary transition-premium">
                              {tx.description}
                            </p>
                            <span className="font-mono text-[8px] text-muted-foreground/40 uppercase font-bold">
                              {tx.category}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell
                          className={cn(
                            "font-mono text-[11px] font-black text-right tabular-nums py-2.5 px-0",
                            tx.amount > 0
                              ? "text-secondary"
                              : "text-foreground",
                          )}
                        >
                          {tx.amount > 0 ? "+" : ""}
                          {formatCurrency(tx.amount)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      {isOpen && <SmartFormProvider onClose={() => setIsOpen(false)} />}
    </div>
  );
}
