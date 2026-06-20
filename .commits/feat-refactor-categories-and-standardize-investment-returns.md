feat: Refactor categories and standardize investment returns

This commit includes two main changes:

1.  **Refactor Category Handling:**
    - Removed the `CategoryType` from the `Category` model, simplifying the category structure.
    - Updated the categories API, service, and page to reflect the removal of `type`.
    - Categories are no longer grouped by type in the UI.
    - Removed temporary category migration files.

2.  **Standardize Investment Return Transactions:**
    - Updated the `type` of 20 investment transactions from `INVESTMENT` to `RETURN`.
    - Updated the `description` of these transactions to 'inversiones retorno mercadoPago' for better clarity.
