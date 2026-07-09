// src/features/dashboard/index.ts

// Components
export { RootDashboard } from "./components/RootDashboard";

// Hooks
export {
  useBudgetSummary,
  useRecentAccounts,
  useMonthlyIncomeExpense,
  useRecurrencesToPay,
} from "./hooks/dashboardHooks";

// Services
export {
  recurrenceToPayDashboard,
  budgetDashboardService,
} from "./api/dashboardService";

// Utils
export { CustomTooltip } from "./utils/utils";
