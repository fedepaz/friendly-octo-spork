// src/features/dashboard/api/dashboardService.ts

import { clientFetch } from "@/lib/api/client-fetch";
import {
  AccountDTO,
  BudgetDTO,
  IncomeExpenseDTO,
  RecurrenceDTO,
} from "@repo/shared";

// Mock data
export const netWorthData = [
  { month: "Jan", value: 45000 },
  { month: "Feb", value: 47200 },
  { month: "Mar", value: 46800 },
  { month: "Apr", value: 51000 },
  { month: "May", value: 54200 },
  { month: "Jun", value: 58500 },
];

export const recurrenceToPayDashboard = {
  fetchRecurrencesToPayCurrentMonth: () => {
    return clientFetch<RecurrenceDTO[]>(`dashboard/toPay`, {
      method: "GET",
    });
  },
};

export const budgetDashboardService = {
  fetchBudgetSummary: (month: number, year: number) => {
    return clientFetch<BudgetDTO[]>(`dashboard/budget/${month}/${year}`, {
      method: "GET",
    });
  },
};

export const accountDashboardService = {
  fetchRecentAccounts: () => {
    return clientFetch<AccountDTO[]>(`dashboard/recentAccounts`, {
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
