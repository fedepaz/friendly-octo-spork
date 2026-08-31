import { getRequestConfig } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  return {
    locale,
    messages: {
      ...(await import(`../../messages/${locale}.json`)).default,

      // Common Components
      // Layout
      ...(
        await import(
          `../components/layout/DashboardHeader/messages/${locale}.json`
        )
      ).default,
      ...(
        await import(`../components/layout/AuthHeader/messages/${locale}.json`)
      ).default,
      ...(
        await import(
          `../components/layout/DesktopSidebar/messages/${locale}.json`
        )
      ).default,
      ...(
        await import(
          `../components/layout/MobileNavigation/messages/${locale}.json`
        )
      ).default,

      // Common
      ...(
        await import(`../components/common/ThemeToggle/messages/${locale}.json`)
      ).default,
      ...(
        await import(
          `../components/common/LoadingSpinner/messages/${locale}.json`
        )
      ).default,
      ...(
        await import(
          `../components/common/NotFoundPage/messages/${locale}.json`
        )
      ).default,
      ...(
        await import(
          `../components/common/ComingSoonPage/messages/${locale}.json`
        )
      ).default,
      ...(
        await import(
          `../components/common/DatabaseUnavailable/messages/${locale}.json`
        )
      ).default,
      ...(
        await import(
          `../components/common/PendingPermissions/messages/${locale}.json`
        )
      ).default,
      ...(
        await import(
          `../components/common/LanguageSwitcher/messages/${locale}.json`
        )
      ).default,
      ...(
        await import(
          `../components/common/EmptyState/messages/${locale}.json`
        )
      ).default,

      // Data Table
      ...(
        await import(
          `../components/data-display/data-table/DataTable/messages/${locale}.json`
        )
      ).default,
      ...(
        await import(
          `../components/data-display/data-table/MonthSelector/messages/${locale}.json`
        )
      ).default,
      ...(
        await import(
          `../components/data-display/data-table/TransTypeSelector/messages/${locale}.json`
        )
      ).default,
      ...(
        await import(
          `../components/data-display/data-table/DataTableFacetedFilter/messages/${locale}.json`
        )
      ).default,
      ...(
        await import(
          `../components/data-display/data-table/SlideOverForm/messages/${locale}.json`
        )
      ).default,
      ...(
        await import(
          `../components/data-display/data-table/ExportDropdown/messages/${locale}.json`
        )
      ).default,
      ...(
        await import(
          `../components/data-display/data-table/FloatingActionButton/messages/${locale}.json`
        )
      ).default,
      ...(
        await import(
          `../components/data-display/data-table/DataTableCells/messages/${locale}.json`
        )
      ).default,
      ...(
        await import(
          `../components/data-display/data-table/InlineEditRow/messages/${locale}.json`
        )
      ).default,

      // KPI & Feature Cards
      ...(
        await import(
          `../components/data-display/kpi-card/KpiCard/messages/${locale}.json`
        )
      ).default,
      ...(
        await import(
          `../components/data-display/feature-card/FeatureCard/messages/${locale}.json`
        )
      ).default,

      // User Profile
      ...(
        await import(
          `../components/user-profile/UserInfo/messages/${locale}.json`
        )
      ).default,
      ...(
        await import(
          `../components/user-profile/UserMenu/messages/${locale}.json`
        )
      ).default,
      ...(
        await import(
          `../components/user-profile/UserPassword/messages/${locale}.json`
        )
      ).default,
      ...(
        await import(
          `../components/user-profile/UserSidebarMenu/messages/${locale}.json`
        )
      ).default,

      // Error
      ...(
        await import(
          `../components/error/ErrorBoundary/messages/${locale}.json`
        )
      ).default,
      ...(
        await import(`../components/error/RouteError/messages/${locale}.json`)
      ).default,

      // Providers
      ...(await import(`../providers/ErrorProvider/messages/${locale}.json`))
        .default,
      ...(
        await import(`../providers/QueryClientProvider/messages/${locale}.json`)
      ).default,
      ...(
        await import(
          `../features/createTransaction/providers/SmartFormProvider/messages/${locale}.json`
        )
      ).default,
      ...(
        await import(
          `../features/updateRecurrence/providers/SmartFormProviderRecurrence/messages/${locale}.json`
        )
      ).default,

      // Hooks
      ...(
        await import(`../features/auth/hooks/AuthHooks/messages/${locale}.json`)
      ).default,
      ...(await import(`../hooks/DataTableActions/messages/${locale}.json`))
        .default,

      // Auth Feature
      ...(
        await import(
          `../features/auth/components/AuthDashboard/messages/${locale}.json`
        )
      ).default,
      ...(
        await import(
          `../features/auth/components/AuthLoginForm/messages/${locale}.json`
        )
      ).default,
      ...(
        await import(
          `../features/auth/components/AuthRegisterForm/messages/${locale}.json`
        )
      ).default,
      ...(
        await import(
          `../features/auth/components/AuthSkeleton/messages/${locale}.json`
        )
      ).default,

      // Accounts Feature
      ...(
        await import(
          `../features/accounts/components/AccountDashboard/messages/${locale}.json`
        )
      ).default,
      ...(
        await import(
          `../features/accounts/components/AccountDashboardSkeleton/messages/${locale}.json`
        )
      ).default,
      ...(
        await import(
          `../features/accounts/components/AccountDataTable/messages/${locale}.json`
        )
      ).default,
      ...(
        await import(
          `../features/accounts/components/AccountCreateForm/messages/${locale}.json`
        )
      ).default,
      ...(
        await import(
          `../features/accounts/components/AccountViewForm/messages/${locale}.json`
        )
      ).default,
      ...(
        await import(
          `../features/accounts/components/AccountColumns/messages/${locale}.json`
        )
      ).default,

      // Cards Feature
      ...(
        await import(
          `../features/cards/components/CardsDashboard/messages/${locale}.json`
        )
      ).default,
      ...(
        await import(
          `../features/cards/components/CardsDashboardSkeleton/messages/${locale}.json`
        )
      ).default,
      ...(
        await import(
          `../features/cards/components/CardsDataTable/messages/${locale}.json`
        )
      ).default,
      ...(
        await import(
          `../features/cards/components/CardsViewForm/messages/${locale}.json`
        )
      ).default,
      ...(
        await import(
          `../features/cards/components/CardsColumns/messages/${locale}.json`
        )
      ).default,

      // Dashboard Feature
      ...(
        await import(
          `../features/dashboard/components/RootDashboard/messages/${locale}.json`
        )
      ).default,
      ...(
        await import(
          `../features/dashboard/components/RootDashboardSkeleton/messages/${locale}.json`
        )
      ).default,
      ...(
        await import(
          `../features/dashboard/components/DashboardKPIs/messages/${locale}.json`
        )
      ).default,
      ...(
        await import(
          `../features/dashboard/components/MainChartsDashboard/messages/${locale}.json`
        )
      ).default,
      ...(
        await import(
          `../features/dashboard/components/DashboardChartsSkeleton/messages/${locale}.json`
        )
      ).default,
      ...(
        await import(
          `../features/dashboard/components/AnalyticChartsMain/messages/${locale}.json`
        )
      ).default,
      ...(
        await import(
          `../features/dashboard/components/AnalyticChartsBottom/messages/${locale}.json`
        )
      ).default,
      ...(
        await import(
          `../features/dashboard/components/AnalyticChartsDashboard/messages/${locale}.json`
        )
      ).default,
      ...(
        await import(
          `../features/dashboard/components/SidebarChartsBudget/messages/${locale}.json`
        )
      ).default,
      ...(
        await import(
          `../features/dashboard/components/SidebarChartsRecTrans/messages/${locale}.json`
        )
      ).default,
      ...(
        await import(
          `../features/dashboard/components/SidebarChartsAccounts/messages/${locale}.json`
        )
      ).default,
      ...(
        await import(
          `../features/dashboard/components/SidebarChartsDashboard/messages/${locale}.json`
        )
      ).default,

      // Recurrences Feature
      ...(
        await import(
          `../features/recurrences/components/RecurrencesDashboard/messages/${locale}.json`
        )
      ).default,
      ...(
        await import(
          `../features/recurrences/components/RecurrencesDashboardSkeleton/messages/${locale}.json`
        )
      ).default,
      ...(
        await import(
          `../features/recurrences/components/RecurrencesDataTable/messages/${locale}.json`
        )
      ).default,
      ...(
        await import(
          `../features/recurrences/components/RecurrenceViewForm/messages/${locale}.json`
        )
      ).default,
      ...(
        await import(
          `../features/recurrences/components/RecurrenceColumns/messages/${locale}.json`
        )
      ).default,

      // Transactions Feature
      ...(
        await import(
          `../features/transactions/components/TransactionsDashboard/messages/${locale}.json`
        )
      ).default,
      ...(
        await import(
          `../features/transactions/components/TransactionsDashboardSkeleton/messages/${locale}.json`
        )
      ).default,
      ...(
        await import(
          `../features/transactions/components/TransactionsDataTable/messages/${locale}.json`
        )
      ).default,
      ...(
        await import(
          `../features/transactions/components/TransactionsViewForm/messages/${locale}.json`
        )
      ).default,
      ...(
        await import(
          `../features/transactions/components/TransactionColumns/messages/${locale}.json`
        )
      ).default,

      // Users Feature
      ...(
        await import(
          `../features/users/components/UsersDashboard/messages/${locale}.json`
        )
      ).default,
      ...(
        await import(
          `../features/users/components/UserDashboardSkeleton/messages/${locale}.json`
        )
      ).default,
      ...(
        await import(
          `../features/users/components/UsersDataTable/messages/${locale}.json`
        )
      ).default,
      ...(
        await import(
          `../features/users/components/UsersViewForm/messages/${locale}.json`
        )
      ).default,
      ...(
        await import(
          `../features/users/components/UserColumns/messages/${locale}.json`
        )
      ).default,
      ...(
        await import(
          `../features/users/components/UserKPIs/messages/${locale}.json`
        )
      ).default,

      // Investments Feature
      ...(
        await import(
          `../features/investments/components/InvestmentColumns/messages/${locale}.json`
        )
      ).default,
      ...(
        await import(
          `../features/investments/components/InvestmentsDashboard/messages/${locale}.json`
        )
      ).default,

      // Audit Logs Feature
      ...(
        await import(
          `../features/auditLogs/components/AuditLogForm/messages/${locale}.json`
        )
      ).default,

      // Permissions Feature
      ...(
        await import(
          `../features/permissions/components/UserSelector/messages/${locale}.json`
        )
      ).default,
      ...(
        await import(
          `../features/permissions/components/PermissionSelector/messages/${locale}.json`
        )
      ).default,
      ...(
        await import(
          `../features/permissions/components/PermissionsUserManager/messages/${locale}.json`
        )
      ).default,
      ...(
        await import(
          `../features/permissions/components/PermissionsEmptyState/messages/${locale}.json`
        )
      ).default,
      ...(
        await import(
          `../features/permissions/components/PermissionsDashboard/messages/${locale}.json`
        )
      ).default,
      ...(
        await import(
          `../features/permissions/components/PermissionTableMeta/messages/${locale}.json`
        )
      ).default,

      // CreateTransaction Wizard
      ...(
        await import(
          `../features/createTransaction/components/FormContainer/messages/${locale}.json`
        )
      ).default,
      ...(
        await import(
          `../features/createTransaction/components/steps/StepTypeForm/messages/${locale}.json`
        )
      ).default,
      ...(
        await import(
          `../features/createTransaction/components/steps/StepAccountForm/messages/${locale}.json`
        )
      ).default,
      ...(
        await import(
          `../features/createTransaction/components/steps/StepAmountForm/messages/${locale}.json`
        )
      ).default,
      ...(
        await import(
          `../features/createTransaction/components/steps/StepCategoryForm/messages/${locale}.json`
        )
      ).default,
      ...(
        await import(
          `../features/createTransaction/components/steps/StepBudgetForm/messages/${locale}.json`
        )
      ).default,
      ...(
        await import(
          `../features/createTransaction/components/steps/StepRecurrenceForm/messages/${locale}.json`
        )
      ).default,
      ...(
        await import(
          `../features/createTransaction/components/steps/StepReviewForm/messages/${locale}.json`
        )
      ).default,

      // UpdateCardBalance Wizard
      ...(
        await import(
          `../features/updateCardBalance/components/FormContainerCard/messages/${locale}.json`
        )
      ).default,
      ...(
        await import(
          `../features/updateCardBalance/components/steps/StepCardAccountForm/messages/${locale}.json`
        )
      ).default,
      ...(
        await import(
          `../features/updateCardBalance/components/steps/StepConfirmForm/messages/${locale}.json`
        )
      ).default,
      ...(
        await import(
          `../features/updateCardBalance/components/steps/StepCardReviewForm/messages/${locale}.json`
        )
      ).default,
      ...(
        await import(
          `../features/updateCardBalance/components/steps/StepUpdateForm/messages/${locale}.json`
        )
      ).default,

      // UpdateRecurrence Wizard
      ...(
        await import(
          `../features/updateRecurrence/components/FormContainerRecurrence/messages/${locale}.json`
        )
      ).default,
      ...(
        await import(
          `../features/updateRecurrence/components/steps/StepRecAccountForm/messages/${locale}.json`
        )
      ).default,
      ...(
        await import(
          `../features/updateRecurrence/components/steps/StepRecAmountForm/messages/${locale}.json`
        )
      ).default,
      ...(
        await import(
          `../features/updateRecurrence/components/steps/StepRecBudgetForm/messages/${locale}.json`
        )
      ).default,
      ...(
        await import(
          `../features/updateRecurrence/components/steps/StepRecForm/messages/${locale}.json`
        )
      ).default,
      ...(
        await import(
          `../features/updateRecurrence/components/steps/StepRecReviewForm/messages/${locale}.json`
        )
      ).default,
    },
  };
});
