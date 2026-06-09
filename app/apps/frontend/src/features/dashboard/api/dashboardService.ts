// src/features/dashboard/api/dashboardService.ts

import { clientFetch } from "@/lib/api/client-fetch";
import { AccountDTO, BudgetDTO, IncomeExpenseDTO } from "@repo/shared";

// Mock data
export const netWorthData = [
  { month: "Jan", value: 45000 },
  { month: "Feb", value: 47200 },
  { month: "Mar", value: 46800 },
  { month: "Apr", value: 51000 },
  { month: "May", value: 54200 },
  { month: "Jun", value: 58500 },
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

export const budgetDashboardService = {
  fetchBudgetSummary: (month: number, year: number) => {
    return clientFetch<BudgetDTO[]>(`dashboard/budget/${month}/${year}`, {
      method: "GET",
    });
  },
};

export const accountDashboardService = {
  fetchRecentAccounts: (limit: number) => {
    return clientFetch<AccountDTO[]>(`dashboard/accounts/${limit}`, {
      method: "GET",
    });
  },
};

export const incomeExpenseDashboardService = {
  fetchMonthlyIncomeExpense: (months: number) => {
    return clientFetch<IncomeExpenseDTO[]>(
      `dashboard/income-expense/${months}`,
      {
        method: "GET",
      },
    );
  },
};
