refactor: standardize financial color-coding and optimize UI density

This commit applies a project-wide refinement of the financial color scheme and optimizes layout density in data-intensive views.

Key Changes:
- Updated `PremiumAmountCell` to use `emerald-600` (positive) and `rose-400` (negative) for a more professional visual balance.
- Standardized currency displays across `RootDashboard`, `AccountViewForm`, and `TransactionViewForm` using `PremiumAmountCell`.
- Refined `TacticalTextCell` max-width (max-w-50) to improve information density in data tables.
- Softer color handling for 'EXPENSE' labels in `lib/utils.ts` (text-destructive/80).
- Simplified Dashboard quick actions and cleaned up unused UI imports.
- Replaced hardcoded currency formatting with tactical components in dashboard tables and kpis.