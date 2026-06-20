// src/features/dashboard/hooks/dashboardHooks.ts

import {
  AccountDTO,
  BudgetDTO,
  IncomeExpenseDTO,
  RecurrenceDTO,
} from "@repo/shared";
import { useSuspenseQuery } from "@tanstack/react-query";
import {
  accountDashboardService,
  budgetDashboardService,
  incomeExpenseDashboardService,
  recurrenceToPayDashboard,
} from "../api/dashboardService";
import { getCurrentMonthYear } from "@/lib/date-utils";

export const dashboardQueryKeys = {
  all: () => ["dashboard"] as const,
  budgetSummary: (month: number, year: number) =>
    ["dashboard", "budget", month, year] as const,
  recentAccounts: () => ["dashboard", "recentAccounts"] as const,
  incomeExpense: (months: number) =>
    ["dashboard", "incomeExpense", months] as const,
  recurrencesToPay: () => ["dashboard", "toPay"] as const,
};

export const useBudgetSummary = () => {
  const { month, year } = getCurrentMonthYear();

  return useSuspenseQuery<BudgetDTO[]>({
    queryKey: dashboardQueryKeys.budgetSummary(month, year),
    queryFn: () => budgetDashboardService.fetchBudgetSummary(month, year),
  });
};

export const useRecentAccounts = () => {
  return useSuspenseQuery<AccountDTO[]>({
    queryKey: dashboardQueryKeys.recentAccounts(),
    queryFn: () => accountDashboardService.fetchRecentAccounts(),
  });
};

export const useMonthlyIncomeExpense = () => {
  return useSuspenseQuery<IncomeExpenseDTO[]>({
    queryKey: dashboardQueryKeys.incomeExpense(6),
    queryFn: () => incomeExpenseDashboardService.fetchMonthlyIncomeExpense(6),
  });
};

export const useRecurrencesToPay = () => {
  return useSuspenseQuery<RecurrenceDTO[]>({
    queryKey: dashboardQueryKeys.recurrencesToPay(),
    queryFn: () => recurrenceToPayDashboard.fetchRecurrencesToPayCurrentMonth(),
  });
};
