# Frontend Components Registry & QA Review

This document tracks all React components within the `apps/frontend/src` directory, ensuring they meet the project's industrial standards for responsiveness, color token usage, and high-performance UX patterns.

## Registry & Audit Log

| Component Name | Feature | Responsive | OKLCH Tokens | UX Helpers | Skeleton | Status |
| :--- | :--- | :---: | :---: | :---: | :---: | :---: |
| `Button` | UI Primitives | ✅ | ✅ | N/A | N/A | Approved |
| `DataTable` | Shared | ✅ | ✅ | ✅ | ✅ | Approved |
| `SlideOverForm`| Shared | ✅ | ✅ | ✅ | N/A | Approved |
| `LoginForm` | Auth | ✅ | ✅ | ✅ | N/A | Approved |
| `AuthDashboard` | Auth | ✅ | ✅ | ✅ | ✅ | Approved |
| `AuthLayout` | Auth | ✅ | ✅ | ✅ | N/A | Approved |
| `UserTable` | Users | ✅ | ✅ | ✅ | ✅ | Approved |
| `UserKPIs` | Users | ✅ | ✅ | ✅ | ✅ | Approved |
| `UsersDashboard` | Users | ✅ | ✅ | ✅ | ✅ | Approved |
| `AccountDashboard` | Accounts | ✅ | ✅ | ✅ | ✅ | Approved |
| `AccountDashboardSkeleton` | Accounts | ✅ | N/A | N/A | N/A | Approved |
| `DataTableSkeleton` | Shared | ✅ | ✅ | N/A | N/A | Approved |
| `AccountViewForm` | Accounts | ✅ | ✅ | ✅ | N/A | Approved |
| `RecurrenceViewForm`| Recurrences | ✅ | ✅ | ✅ | N/A | Approved |
| `RecurrencesDashboard`| Recurrences | ✅ | ✅ | ✅ | ✅ | Approved |
| `TransactionViewForm`| Transactions| ✅ | ✅ | ✅ | N/A | Approved |
| `SmartFormProvider` | Transactions| - | - | - | N/A | WIP |
| `FormContainer` | Transactions| - | - | - | N/A | WIP |
| `StepTypeComponent` | Transactions| - | - | - | N/A | WIP |
| `StepAmountComponent` | Transactions| - | - | - | N/A | WIP |
| `StepAccountsComponent`| Transactions| - | - | - | N/A | WIP |
| `StepCategoryComponent`| Transactions| - | - | - | N/A | WIP |
| `StepRecurrenceComponent`| Transactions| - | - | - | N/A | WIP |
| `StepReviewComponent`| Transactions| - | - | - | N/A | WIP |
| `WizardModal` | Shared | ✅ | ✅ | ✅ | N/A | Approved |
| `WizardFooter` | Shared | ✅ | ✅ | ✅ | N/A | Approved |
| `StepIndicator` | Shared | ✅ | ✅ | ✅ | N/A | Approved |
| `TransactionsDashboard`| Transactions| ✅ | ✅ | ✅ | ✅ | Approved |
| `CreateTransactionsWizardSkeleton` | Transactions| ✅ | ✅ | ✅ | N/A | Approved |
| `RootDashboard` | Dashboard | ✅ | ✅ | ✅ | ✅ | Approved |
| `DashboardHeader`| Layout | ✅ | ✅ | ✅ | N/A | Approved |
| `DesktopSidebar` | Layout | ✅ | ✅ | ✅ | N/A | Approved |
| `MobileNavigation`| Layout | ✅ | ✅ | ✅ | N/A | Approved |
| `UserSidebarMenu`| Layout | ✅ | ✅ | ✅ | N/A | Approved |
| `UserMenu` | Layout | ✅ | ✅ | ✅ | N/A | Approved |
| `ChangePasswordForm`| Layout | ✅ | ✅ | ✅ | N/A | Approved |
| `MonthSelector` | Shared | ✅ | ✅ | ✅ | N/A | Approved |
| `KPICard` | Shared | ✅ | ✅ | ✅ | ✅ | Approved |
| `FeatureCard` | Shared | ✅ | ✅ | ✅ | ✅ | Approved |
| `ComingSoonPage` | Common | ✅ | ✅ | ✅ | N/A | Approved |
| `DatabaseUnavailablePage`| Common | ✅ | ✅ | ✅ | N/A | Approved |
| `PendingPermissionsPage` | Common | ✅ | ✅ | ✅ | N/A | Approved |
| `LoadingSpinner` | Common | ✅ | ✅ | ✅ | N/A | Approved |

## Audit Checklist Details

### 1. Responsive (Zero-Scroll Mandate)
- [x] Uses `dvh` for full-height layouts.
- [x] High-density gaps (`gap-2` to `gap-4`) and padding (`p-3` to `p-4`).
- [x] Adaptive layout shifts for tablet/desktop without increasing whitespace.

### 2. Color Tokens (OKLCH)
- [x] No hardcoded colors (`#fff`, `rgb()`, `red-500`).
- [x] Uses semantic variables (`bg-primary`, `text-foreground`).
- [x] Correct opacity application (e.g., `border-border/60`).

### 3. UX Helpers & A11y
- [x] Tooltips on icon-only buttons.
- [x] Descriptive `aria-label` for screen readers.
- [x] Functional `FormDescription` and `FormMessage` for all inputs.

### 4. Golden Path Loading
- [x] Level 1: `loading.tsx` coverage for the route.
- [x] Level 2: Component-level `<Suspense>` with matching `{ComponentName}Skeleton`.
