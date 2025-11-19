feat: Remove CategoryType for simplified category management

This commit removes the `CategoryType` enum and the associated `type` field from the `Category` model. This change simplifies the data model and application logic by removing the explicit classification layer for categories (e.g., GASTO, PAGO, INGRESO). This aligns with the project's core philosophy of maintaining an "ultra-minimal UX" and prioritizing developer simplicity.

The process involved:
- Modifying the Prisma schema to remove the `type` field and the `CategoryType` enum.
- Manually resolving a database migration conflict caused by a dependent SQL function (`find_category_id`).
- Creating a corrected migration script that first drops the dependent function and then applies the schema changes.
- Updating the system architecture documentation (`docs/architect_agent_finance.md`) to reflect the new, simpler data model.
- Removing all usages of `CategoryType` from API controllers, Zod schemas, and frontend components.
