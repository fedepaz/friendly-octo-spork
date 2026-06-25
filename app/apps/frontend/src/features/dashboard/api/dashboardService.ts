// src/features/dashboard/api/dashboardService.ts

import { clientFetch } from "@/lib/api/client-fetch";
import {
  AccountDTO,
  BudgetDTO,
  IncomeExpenseDTO,
  RecurrenceDTO,
} from "@repo/shared";

export const recurrenceToPayDashboard = {
  fetchRecurrencesToPayCurrentMonth: () => {
    return clientFetch<RecurrenceDTO[]>(`dashboard/toPay`, {
      method: "GET",
    });
  },
};

export const budgetDashboardService = {
  fetchBudgetSummary: () => {
    return clientFetch<BudgetDTO[]>(`dashboard/budget`, {
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
