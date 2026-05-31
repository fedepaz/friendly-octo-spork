refactor: enforce read-only pattern in DataTable

This commit removes CRUD-related action buttons (Create, Edit, Delete, Bulk Delete, Execute) from the `DataTable` base component, formalizing the read-only display pattern.

- Row actions are now limited to the 'View' function, allowing for detail inspection via SlideOver while moving data modification to the Dashboard Hub.
- Cleaned up unused props (`onEdit`, `onDelete`, `onCreate`, etc.) and internal state logic to maintain high-density industrial standards.
- Removed unused Lucide icon imports and simplified the `actionColumn` logic.
