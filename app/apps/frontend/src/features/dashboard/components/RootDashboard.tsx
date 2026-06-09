//src/features/dashboard/components/RootDashboard.tsx
"use client";

import { useState } from "react";
import { SmartFormProvider } from "@/features/createTransaction";
import { KPIsDashboard } from "./kpis/kpis-dashboard";
import { MainChartsDashboard } from "./charts/main-charts-dashboard";

// Mock data
export const netWorthData = [
  { month: "Jan", value: 45000 },
  { month: "Feb", value: 47200 },
  { month: "Mar", value: 46800 },
  { month: "Apr", value: 51000 },
  { month: "May", value: 54200 },
  { month: "Jun", value: 58500 },
];

export const incomeExpenseData = [
  { month: "Jan", income: 5200, expenses: 3800 },
  { month: "Feb", income: 5400, expenses: 4100 },
  { month: "Mar", income: 5100, expenses: 3600 },
  { month: "Apr", income: 5800, expenses: 4200 },
  { month: "May", income: 6200, expenses: 4000 },
  { month: "Jun", income: 5900, expenses: 3900 },
];

export const accounts = [
  { name: "Main Checking", type: "checking", balance: 12450.32 },
  { name: "Savings", type: "savings", balance: 28750.0 },
  { name: "Investment", type: "investment", balance: 17300.45 },
];

export const recentTransactions = [
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

export const budgets = [
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

export function CustomTooltip({
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
  const [isOpen, setIsOpen] = useState(false);

  function openWizard() {
    setIsOpen(true);
  }

  return (
    <div className="flex flex-1 flex-col gap-3 min-h-0 overflow-hidden animate-premium-in mb-3">
      <KPIsDashboard onClick={openWizard} />
      {/* Main Bento Grid */}
      <MainChartsDashboard />

      {isOpen && <SmartFormProvider onClose={() => setIsOpen(false)} />}
    </div>
  );
}
