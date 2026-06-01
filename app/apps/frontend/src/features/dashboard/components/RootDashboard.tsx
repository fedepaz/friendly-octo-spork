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
import { TransactionWizard } from "@/features/createTransaction";

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
    <div className="flex flex-1 flex-col gap-4 min-h-0 overflow-hidden">
      {/* Header Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 shrink-0">
        <Card className="py-1.5 md:py-2">
          <CardHeader className="pb-1 px-4">
            <CardDescription className="font-mono text-[10px] uppercase tracking-wider">
              Net Worth
            </CardDescription>
          </CardHeader>
          <CardContent className="px-4 pb-2">
            <p className="font-mono text-2xl font-bold text-primary">
              {formatCurrency(totalNetWorth)}
            </p>
            <p className="font-mono text-[10px] text-secondary">
              +8.2% from last month
            </p>
          </CardContent>
        </Card>

        <Card className="py-2">
          <CardHeader className="pb-1 px-4">
            <CardDescription className="font-mono text-[10px] uppercase tracking-wider">
              Monthly Income
            </CardDescription>
          </CardHeader>
          <CardContent className="px-4 pb-2">
            <p className="font-mono text-2xl font-bold text-secondary">
              {formatCurrency(monthlyIncome)}
            </p>
            <p className="font-mono text-[10px] text-muted-foreground">
              June 2024
            </p>
          </CardContent>
        </Card>

        <Card className="py-2">
          <CardHeader className="pb-1 px-4">
            <CardDescription className="font-mono text-[10px] uppercase tracking-wider">
              Monthly Expenses
            </CardDescription>
          </CardHeader>
          <CardContent className="px-4 pb-2">
            <p className="font-mono text-2xl font-bold text-destructive">
              {formatCurrency(monthlyExpenses)}
            </p>
            <p className="font-mono text-[10px] text-muted-foreground">
              June 2024
            </p>
          </CardContent>
        </Card>

        <Card className="py-2">
          <CardHeader className="pb-1 px-4">
            <CardDescription className="font-mono text-[10px] uppercase tracking-wider">
              Crear Transacción
            </CardDescription>
          </CardHeader>
          <CardContent className="px-4 pb-2">
            <Button className="w-full" onClick={() => openWizard()}>
              <PlusIcon className="mr-2 h-4 w-4" />
              Crear Transacción
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid flex-1 grid-cols-1 lg:grid-cols-3 gap-4 min-h-0 overflow-y-auto lg:overflow-hidden">
        {/* Left Column - Charts */}
        <div className="lg:col-span-2 flex flex-col gap-4 min-h-0">
          {/* Net Worth Chart */}
          <Card className="h-70 lg:flex-1 min-h-0 flex flex-col overflow-hidden">
            <CardHeader className="pb-2 px-4 shrink-0">
              <CardTitle className="font-sans text-[10px] uppercase tracking-wider opacity-60">
                Net Worth Trend
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 min-h-0 px-2 pb-2">
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
                        stopOpacity={0.3}
                      />
                      <stop
                        offset="95%"
                        stopColor="var(--primary)"
                        stopOpacity={0}
                      />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="var(--border)"
                    opacity={0.3}
                  />
                  <XAxis
                    dataKey="month"
                    stroke="var(--muted-foreground)"
                    fontSize={10}
                    fontFamily="Source Code Pro"
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    stroke="var(--muted-foreground)"
                    fontSize={10}
                    fontFamily="Source Code Pro"
                    tickFormatter={(value) => `$${value / 1000}k`}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="var(--primary)"
                    strokeWidth={2}
                    fill="url(#netWorthGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Income vs Expenses Chart */}
          <Card className="h-70 lg:flex-1 min-h-0 flex flex-col overflow-hidden">
            <CardHeader className="pb-2 px-4 shrink-0">
              <CardTitle className="font-sans text-[10px] uppercase tracking-wider opacity-60">
                Income vs Expenses
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 min-h-0 px-2 pb-2">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={incomeExpenseData} barGap={4}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="var(--border)"
                    opacity={0.3}
                  />
                  <XAxis
                    dataKey="month"
                    stroke="var(--muted-foreground)"
                    fontSize={10}
                    fontFamily="Source Code Pro"
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    stroke="var(--muted-foreground)"
                    fontSize={10}
                    fontFamily="Source Code Pro"
                    tickFormatter={(value) => `$${value / 1000}k`}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="income" fill="var(--secondary)" radius={0} />
                  <Bar
                    dataKey="expenses"
                    fill="var(--destructive)"
                    radius={0}
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Lists */}
        <div className="flex flex-col gap-4 min-h-0 overflow-hidden">
          {/* Accounts */}
          <Card className="shrink-0 overflow-hidden flex flex-col max-h-[30%]">
            <CardHeader className="pb-1 px-4 shrink-0">
              <CardTitle className="font-sans text-[10px] uppercase tracking-wider opacity-60">
                Accounts
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-1.5 px-4 pb-2 overflow-y-auto custom-scrollbar">
              {accounts.map((account) => (
                <div
                  key={account.name}
                  className="flex items-center justify-between border-b border-border/30 pb-1 last:border-0 last:pb-0"
                >
                  <div className="min-w-0 flex-1">
                    <p className="text-[11px] font-bold truncate leading-tight">
                      {account.name}
                    </p>
                    <p className="font-mono text-[8px] uppercase text-muted-foreground/60 leading-none">
                      {account.type}
                    </p>
                  </div>
                  <p className="font-mono text-[11px] font-black text-primary tabular-nums ml-2">
                    {formatCurrency(account.balance)}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Budget Progress */}
          <Card className="shrink-0 overflow-hidden flex flex-col max-h-[30%]">
            <CardHeader className="pb-1 px-4 shrink-0">
              <CardTitle className="font-sans text-[10px] uppercase tracking-wider opacity-60">
                Budget Status
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2.5 px-4 pb-2 overflow-y-auto custom-scrollbar">
              {budgets.map((budget) => {
                const percentage = (budget.spent / budget.limit) * 100;
                const isOverBudget = percentage > 100;
                return (
                  <div key={budget.category} className="space-y-0.5">
                    <div className="flex items-center justify-between">
                      <p className="text-[9px] font-bold uppercase tracking-tight truncate max-w-30">
                        {budget.category}
                      </p>
                      <p
                        className={`font-mono text-[9px] tabular-nums ${isOverBudget ? "text-destructive" : "text-muted-foreground/70"}`}
                      >
                        {formatCurrency(budget.spent)} /{" "}
                        {formatCurrency(budget.limit)}
                      </p>
                    </div>
                    <Progress
                      value={Math.min(percentage, 100)}
                      className={`h-1 ${isOverBudget ? "[&>div]:bg-destructive" : "[&>div]:bg-secondary"}`}
                    />
                  </div>
                );
              })}
            </CardContent>
          </Card>

          {/* Recent Transactions */}
          <Card className="flex-1 min-h-0 overflow-hidden flex flex-col">
            <CardHeader className="pb-2 px-4 shrink-0">
              <CardTitle className="font-sans text-[10px] uppercase tracking-wider opacity-60">
                Recent Transactions
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 min-h-0 overflow-hidden px-4 pb-2">
              <div className="h-full overflow-y-auto pr-1 custom-scrollbar">
                <Table>
                  <TableHeader className="sticky top-0 bg-card z-10 shadow-sm">
                    <TableRow className="hover:bg-transparent border-b-2">
                      <TableHead className="font-mono text-[9px] h-7 px-0 uppercase tracking-tighter">
                        Description
                      </TableHead>
                      <TableHead className="font-mono text-[9px] text-right h-7 px-0 uppercase tracking-tighter">
                        Amount
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentTransactions.map((tx) => (
                      <TableRow
                        key={tx.id}
                        className="hover:bg-accent/50 border-border/30"
                      >
                        <TableCell className="py-1.5 px-0">
                          <div className="flex flex-col">
                            <p className="text-xs font-bold leading-tight truncate max-w-40">
                              {tx.description}
                            </p>
                            <span className="font-mono text-[9px] text-muted-foreground opacity-60 uppercase">
                              {tx.category}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell
                          className={`font-mono text-xs font-black text-right tabular-nums py-1.5 px-0 ${tx.amount > 0 ? "text-secondary" : "text-foreground"}`}
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
      <TransactionWizard isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
}
