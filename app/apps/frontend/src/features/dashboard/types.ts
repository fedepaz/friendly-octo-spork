import type { AccountDTO, BudgetDTO, IncomeExpenseDTO, RecurrenceDTO } from '@repo/shared';

export type { AccountDTO, BudgetDTO, IncomeExpenseDTO, RecurrenceDTO };

export interface DashboardMetrics {
  totalBalance: number;
  monthlyIncome: number;
  monthlyExpenses: number;
  pendingPayments: number;
}

export interface ChartData {
  label: string;
  value: number;
  color?: string;
}

export interface IncomeExpenseData {
  month: string;
  income: number;
  expense: number;
}
