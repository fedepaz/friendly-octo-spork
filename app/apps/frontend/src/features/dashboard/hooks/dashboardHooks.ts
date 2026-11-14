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
import { dashboardQueryKeys } from "@/lib/queryKeys";

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

export const useMonthlyIncomeExpense = (
  months = 6,
  endMonth?: number,
  endYear?: number,
) => {
  return useSuspenseQuery<IncomeExpenseDTO[]>({
    queryKey: dashboardQueryKeys.incomeExpense(months, endMonth, endYear),
    queryFn: () =>
      incomeExpenseDashboardService.fetchMonthlyIncomeExpense(
        months,
        endMonth,
        endYear,
      ),
  });
};

export const useRecurrencesToPay = () => {
  return useSuspenseQuery<RecurrenceDTO[]>({
    queryKey: dashboardQueryKeys.recurrencesToPay(),
    queryFn: () => recurrenceToPayDashboard.fetchRecurrencesToPayCurrentMonth(),
  });
};
