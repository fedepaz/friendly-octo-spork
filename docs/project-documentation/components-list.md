# Frontend Components Registry & QA Review

This document tracks all React components within the `apps/frontend/src` directory, ensuring they meet the project's industrial standards for responsiveness, color token usage, and high-performance UX patterns.

## Registry & Audit Log

| Component Name | Feature | Responsive | OKLCH Tokens | UX Helpers | FAANG Polish | Status |
| :--- | :--- | :---: | :---: | :---: | :---: | :---: |
| `Button` | UI Primitives | ✅ | ✅ | ✅ | ✅ | Approved |
| `DataTable` | Shared | ✅ | ✅ | ✅ | ✅ | Approved |
| `SlideOverForm`| Shared | ✅ | ✅ | ✅ | ✅ | Premium |
| `LoginForm` | Auth | ✅ | ✅ | ✅ | ✅ | Approved |
| `AuthDashboard` | Auth | ✅ | ✅ | ✅ | ✅ | Approved |
| `UserTable` | Users | ✅ | ✅ | ✅ | ✅ | Approved |
| `AccountDashboard` | Accounts | ✅ | ✅ | ✅ | ✅ | Approved |
| `AccountCreateForm`| Accounts | ✅ | ✅ | ✅ | ✅ | Premium |
| `RecurrencesDashboard`| Recurrences | ✅ | ✅ | ✅ | ✅ | Approved |
| `SmartFormProvider` | Transactions| ✅ | ✅ | ✅ | ✅ | Approved |
| `MonthSelector` | Shared | ✅ | ✅ | ✅ | ✅ | Approved |
| `RootDashboard` | Dashboard | ✅ | ✅ | ✅ | ✅ | Approved |
| `DesktopSidebar` | Layout | ✅ | ✅ | ✅ | ✅ | Premium |
| `DashboardHeader`| Layout | ✅ | ✅ | ✅ | ✅ | Approved |
| `AuthHeader` | Layout | ✅ | ✅ | ✅ | ✅ | Smart Controller |
| `MobileNavigation`| Layout | ✅ | ✅ | ✅ | ✅ | Premium |
| `KPICard` | Shared | ✅ | ✅ | ✅ | ✅ | Approved |
| `FeatureCard` | Shared | ✅ | ✅ | ✅ | ✅ | Approved |
| `WizardModal` | Shared | ✅ | ✅ | ✅ | ✅ | Approved |
| `WizardFooter` | Shared | ✅ | ✅ | ✅ | ✅ | Approved |
| `StepIndicator` | Shared | ✅ | ✅ | ✅ | ✅ | Approved |
| `TacticalDataTableCells` | Shared | ✅ | ✅ | ✅ | ✅ | Premium |
| `KPIsDashboard` | Dashboard | ✅ | ✅ | ✅ | ✅ | Approved |
| `TransTypeSelector` | Shared | ✅ | ✅ | ✅ | ✅ | Approved |
| `MonthSelector` | Shared | ✅ | ✅ | ✅ | ✅ | Approved |
| `MainChartsDashboard` | Dashboard | ✅ | ✅ | ✅ | ✅ | Approved |
| `AnalyticChartsBottom`| Dashboard | ✅ | ✅ | ✅ | ✅ | Approved |
| `SidebarChartsBudget` | Dashboard | ✅ | ✅ | ✅ | ✅ | Approved |
| `SidebarChartsAccounts`| Dashboard | ✅ | ✅ | ✅ | ✅ | Approved |
| `SidebarChartsRecentTransactions`| Dashboard | ✅ | ✅ | ✅ | ✅ | Premium |
| `SmartFormProviderRecurrence`| Recurrences | ✅ | ✅ | ✅ | ✅ | Approved |
| `WizardModalRecurrence` | Shared | ✅ | ✅ | ✅ | ✅ | Approved |

## FAANG Polish Criteria (Premium Industrial)
- **Micro-interactions**: 200ms ease-in-out transitions, tactile hover states.
- **Visual Hierarchy**: Mastery of opacity (`/40`, `/60`) instead of gray shades.
- **Typography Scale**: Strict use of modular scale and `tabular-nums` for data.
- **Fluid Layout**: Use of `backdrop-blur` and glassmorphism for sticky elements.


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
