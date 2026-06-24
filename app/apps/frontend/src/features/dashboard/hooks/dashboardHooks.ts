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

export const dashboardQueryKeys = {
  all: () => ["dashboard"] as const,
  budgetSummary: () => ["dashboard", "budget"] as const,
  recentAccounts: () => ["dashboard", "recentAccounts"] as const,
  incomeExpense: (months: number) =>
    ["dashboard", "incomeExpense", months] as const,
  recurrencesToPay: () => ["dashboard", "toPay"] as const,
};

export const useBudgetSummary = () => {
  return useSuspenseQuery<BudgetDTO[]>({
    queryKey: dashboardQueryKeys.budgetSummary(),
    queryFn: () => budgetDashboardService.fetchBudgetSummary(),
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
