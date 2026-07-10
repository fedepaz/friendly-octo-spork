fix(frontend): remove unused EmptyState import from account-data-table

Removes the early-return EmptyState branch that was causing an unused
import lint warning. The DataTable component already handles empty states
via its built-in empty table prop.
