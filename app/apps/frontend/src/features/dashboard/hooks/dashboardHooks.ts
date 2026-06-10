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
  budgetSummary: (month: number, year: number) =>
    [`dashboard/budget/${month}/${year}`] as const,
  recentAccounts: (limit: number) => [`dashboard/accounts/${limit}`] as const,
  incomeExpense: (months: number) =>
    [`dashboard/income-expense/${months}`] as const,
  recurrencesToPay: () => [`dashboard/toPay`] as const,
};

export const useBudgetSummary = () => {
  return useSuspenseQuery<BudgetDTO[]>({
    queryKey: dashboardQueryKeys.budgetSummary(
      new Date().getMonth() + 1,
      new Date().getFullYear(),
    ),
    queryFn: () =>
      budgetDashboardService.fetchBudgetSummary(
        new Date().getMonth() + 1,
        new Date().getFullYear(),
      ),
  });
};

export const useRecentAccounts = () => {
  return useSuspenseQuery<AccountDTO[]>({
    queryKey: dashboardQueryKeys.recentAccounts(3),
    queryFn: () => accountDashboardService.fetchRecentAccounts(3),
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
