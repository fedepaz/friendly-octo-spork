refactor: modularize RootDashboard into specialized sub-components

This commit refactors the monolithic `RootDashboard` into a highly modular structure within the dashboard feature directory, improving maintainability and scannability.

Key Changes:
- Orchestrated the dashboard using thin sub-components: `KPIsDashboard` and `MainChartsDashboard`.
- Isolated KPI logic and layout into a dedicated component.
- Segmented analytics into `AnalyticChartsDashboard` (main projections) and `SidebarChartsDashboard` (supporting metrics).
- Created atomic components for individual analytics and sidebar elements:
    - `AnalyticChartsMain`, `AnalyticChartsBottom`
    - `SidebarChartsAccounts`, `SidebarChartsBudget`, `SidebarChartsRecentTransactions`
- Standardized data sharing by exporting shared mock data and custom tooltips for feature-wide use.
- Applied minor linting and formatting refinements to layout and auth components.