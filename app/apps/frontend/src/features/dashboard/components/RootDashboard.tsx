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
import { Badge } from "@/components/ui/badge";
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
  const savingsRate = (
    ((monthlyIncome - monthlyExpenses) / monthlyIncome) *
    100
  ).toFixed(1);

  return (
    <div className="flex h-screen flex-col gap-4 bg-background p-4">
      {/* Header Stats */}
      <div className="grid grid-cols-4 gap-4">
        <Card className="py-4">
          <CardHeader className="pb-2">
            <CardDescription className="font-mono text-xs uppercase tracking-wider">
              Net Worth
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="font-mono text-2xl font-bold text-primary">
              {formatCurrency(totalNetWorth)}
            </p>
            <p className="font-mono text-xs text-secondary">
              +8.2% from last month
            </p>
          </CardContent>
        </Card>

        <Card className="py-4">
          <CardHeader className="pb-2">
            <CardDescription className="font-mono text-xs uppercase tracking-wider">
              Monthly Income
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="font-mono text-2xl font-bold text-secondary">
              {formatCurrency(monthlyIncome)}
            </p>
            <p className="font-mono text-xs text-muted-foreground">June 2024</p>
          </CardContent>
        </Card>

        <Card className="py-4">
          <CardHeader className="pb-2">
            <CardDescription className="font-mono text-xs uppercase tracking-wider">
              Monthly Expenses
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="font-mono text-2xl font-bold text-destructive">
              {formatCurrency(monthlyExpenses)}
            </p>
            <p className="font-mono text-xs text-muted-foreground">June 2024</p>
          </CardContent>
        </Card>

        <Card className="py-4">
          <CardHeader className="pb-2">
            <CardDescription className="font-mono text-xs uppercase tracking-wider">
              Savings Rate
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="font-mono text-2xl font-bold text-accent">
              {savingsRate}%
            </p>
            <p className="font-mono text-xs text-muted-foreground">
              of income saved
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid flex-1 grid-cols-3 gap-4 overflow-hidden">
        {/* Left Column - Charts */}
        <div className="col-span-2 flex flex-col gap-4">
          {/* Net Worth Chart */}
          <Card className="flex-1">
            <CardHeader className="pb-2">
              <CardTitle className="font-sans text-sm uppercase tracking-wider">
                Net Worth Trend
              </CardTitle>
            </CardHeader>
            <CardContent className="h-[calc(100%-60px)]">
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
                        stopColor="oklch(0.6083 0.209 27.0276)"
                        stopOpacity={0.3}
                      />
                      <stop
                        offset="95%"
                        stopColor="oklch(0.6083 0.209 27.0276)"
                        stopOpacity={0}
                      />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="oklch(0.4091 0 0)"
                  />
                  <XAxis
                    dataKey="month"
                    stroke="oklch(0.7058 0 0)"
                    fontSize={12}
                    fontFamily="Source Code Pro"
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    stroke="oklch(0.7058 0 0)"
                    fontSize={12}
                    fontFamily="Source Code Pro"
                    tickFormatter={(value) => `$${value / 1000}k`}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="oklch(0.6083 0.209 27.0276)"
                    strokeWidth={2}
                    fill="url(#netWorthGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Income vs Expenses Chart */}
          <Card className="flex-1">
            <CardHeader className="pb-2">
              <CardTitle className="font-sans text-sm uppercase tracking-wider">
                Income vs Expenses
              </CardTitle>
            </CardHeader>
            <CardContent className="h-[calc(100%-60px)]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={incomeExpenseData} barGap={4}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="oklch(0.4091 0 0)"
                  />
                  <XAxis
                    dataKey="month"
                    stroke="oklch(0.7058 0 0)"
                    fontSize={12}
                    fontFamily="Source Code Pro"
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    stroke="oklch(0.7058 0 0)"
                    fontSize={12}
                    fontFamily="Source Code Pro"
                    tickFormatter={(value) => `$${value / 1000}k`}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar
                    dataKey="income"
                    fill="oklch(0.6423 0.1467 133.0145)"
                    radius={0}
                  />
                  <Bar
                    dataKey="expenses"
                    fill="oklch(0.7839 0.1719 68.0943)"
                    radius={0}
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Lists */}
        <div className="flex flex-col gap-4 overflow-hidden">
          {/* Accounts */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="font-sans text-sm uppercase tracking-wider">
                Accounts
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {accounts.map((account) => (
                <div
                  key={account.name}
                  className="flex items-center justify-between border-b border-border pb-2 last:border-0 last:pb-0"
                >
                  <div>
                    <p className="text-sm font-medium">{account.name}</p>
                    <p className="font-mono text-xs uppercase text-muted-foreground">
                      {account.type}
                    </p>
                  </div>
                  <p className="font-mono text-sm font-bold text-primary">
                    {formatCurrency(account.balance)}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Budget Progress */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="font-sans text-sm uppercase tracking-wider">
                Budget Status
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {budgets.map((budget) => {
                const percentage = (budget.spent / budget.limit) * 100;
                const isOverBudget = percentage > 100;
                return (
                  <div key={budget.category} className="space-y-1">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-medium">{budget.category}</p>
                      <p
                        className={`font-mono text-xs ${isOverBudget ? "text-destructive" : "text-muted-foreground"}`}
                      >
                        {formatCurrency(budget.spent)} /{" "}
                        {formatCurrency(budget.limit)}
                      </p>
                    </div>
                    <Progress
                      value={Math.min(percentage, 100)}
                      className={`h-2 ${isOverBudget ? "[&>div]:bg-destructive" : ""}`}
                    />
                  </div>
                );
              })}
            </CardContent>
          </Card>

          {/* Recent Transactions */}
          <Card className="flex-1 overflow-hidden">
            <CardHeader className="pb-2">
              <CardTitle className="font-sans text-sm uppercase tracking-wider">
                Recent Transactions
              </CardTitle>
            </CardHeader>
            <CardContent className="overflow-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="font-mono text-xs">
                      Description
                    </TableHead>
                    <TableHead className="font-mono text-xs text-right">
                      Amount
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentTransactions.map((tx) => (
                    <TableRow key={tx.id}>
                      <TableCell>
                        <div>
                          <p className="text-sm">{tx.description}</p>
                          <Badge
                            variant="outline"
                            className="mt-1 font-mono text-[10px]"
                          >
                            {tx.category}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell
                        className={`font-mono text-sm text-right ${tx.amount > 0 ? "text-secondary" : "text-foreground"}`}
                      >
                        {tx.amount > 0 ? "+" : ""}
                        {formatCurrency(tx.amount)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
