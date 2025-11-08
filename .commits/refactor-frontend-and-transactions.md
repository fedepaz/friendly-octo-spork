refactor: Standardize component structure, enhance HTMX integration, and refactor transaction management

This commit introduces significant refactoring across the frontend and a service layer:

- **Component Standardization**: Updated numerous components (AccountCard, AccountForm, AccountsList, CategoryBadge, CategoryForm, CategoriesList, RecurrenceCard, RecurrenceForm, RecurrencesList) to use `FC` type with explicit prop interfaces and standardized icon imports using absolute paths (`@/components/icons`).
- **HTMX Integration Enhancement**: Replaced inline JavaScript with `hx-on:click` attributes in `HamburgerMenu` and `Layout` for improved HTMX-driven dynamic interactions.
- **New Modal Component**: Introduced a reusable `Modal` component (`finance-app/src/components/shared/Modal.tsx`) with HTMX integration for dynamic content display.
- **Loading Spinner Component**: Standardized loading indicators by replacing inline SVGs with a dedicated `LoadingSpinnerIcon` component in forms.
- **Transaction Management Refactoring**: Removed several helper methods (`getCategories`, `getAccounts`, `getActiveRecurrences`, `deleteTransaction`) from `TransactionsService.ts`. The `deleteTransaction` logic has been refactored or moved. The `TransactionFilters.tsx` and `TransactionRow.tsx` components have been deleted, indicating a significant overhaul of transaction filtering and display. The `TransactionRow` import in `RecentActivity.tsx` was updated to `transfers/TransactionRow`, suggesting a module rename or relocation.

These changes aim to improve code consistency, leverage HTMX more effectively, and streamline transaction-related functionalities.
