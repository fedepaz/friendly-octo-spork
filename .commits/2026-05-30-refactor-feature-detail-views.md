refactor: modularize feature detail views and finalize inspection flow

This commit separates the "View Detail" layouts from their respective DataTable wrappers into dedicated form components, improving code organization and ensuring a consistent high-density inspection experience.

- Created `AccountViewForm`, `RecurrenceViewForm`, and `TransactionViewForm` to encapsulate feature-specific metadata display.
- Refactored `AccountDataTable`, `TransactionsDataTable`, `RecurrencesDataTable`, and `UsersDataTable` to implement the `onView` state pattern.
- Integrated `SlideOverForm` in all feature wrappers to host the new view components.
- Updated the components registry to include and approve the new high-density view forms.
