feat: industrial UI stabilization and tactical DataTables

This commit introduces a comprehensive "Industrial Glow-up" for the application's UI, strictly aligning with the "Doom 64" / Retro-Industrial aesthetic and the Zero-Scroll mandate.

## Core UI Enhancements
- **Tactical DataTables**: Shifted from text-only cells to high-density, interactive components.
  - Amounts are now color-coded (Green for Income, Red for Expense), right-aligned, and use `Source Code Pro` for numerical precision.
  - Types and Statuses are represented by iconic badges with OKLCH semantic colors.
  - Boolean flags (Card Expense, Budgeted) are now high-density icons with descriptive tooltips.
- **Global UI Utilities**: Centralized `formatCurrency` and `getTransactionTypeStyles` in `lib/utils.ts` to ensure consistent visual language across the monorepo.
- **Base Refinements**: Removed hardcoded colors (e.g., `text-amber-500`) in favor of semantic OKLCH tokens and optimized row density.

## Feature Stabilization
- **Accounts**: New iconic representation for Bank/Wallet/Cash and precision balance formatting.
- **Transactions**: Overhauled with directional icons (Income/Expense/Transfer) and tactical detail display.
- **Recurrences**: Added progress-style "Parts" display [01/12] and frequency-specific badges.
- **Users**: Standardized identity and status badges.

## Documentation & Architecture
- **Frontend Agent Profile**: Formalized the "Display-only DataTable" pattern, centralizing CRUD in the Dashboard Hub to maintain high density.
- **Registry Update**: All core UI components marked as "Approved" in `components-list.md` after passing the Zero-Scroll and OKLCH audits.

## Changes
- `app/apps/frontend/src/lib/utils.ts`: Added currency and style helpers.
- `app/apps/frontend/src/components/data-display/data-table/data-table.tsx`: Refined base spacing and colors.
- `app/apps/frontend/src/features/*/components/columns.tsx`: Complete overhaul of column definitions.
- `docs/agents/frontend_agent_finance.md`: Updated architectural patterns.
- `docs/project-documentation/components-list.md`: Updated component audit status.
