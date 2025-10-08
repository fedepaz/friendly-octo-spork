feat: Implement database schema and migration script with categories

This commit introduces the initial database schema for the finance tracker application and a migration script to populate it.

Key changes include:
- **Database Schema (`prisma/schema.prisma`):**
    - Added `Mes`, `Ingreso`, `Gasto`, `Pago` models to structure financial data.
    - Introduced a `Category` model to allow for flexible categorization of transactions.
    - Established relationships between transaction models and the `Category` model.
- **Interactive Migration Script (`finance-app/src/scripts/migracionInteractiva.ts`):**
    - Developed a script to parse ODS files and migrate data into the new database schema.
    - Enhanced the script to automatically create or reuse categories based on transaction concepts during import.
- **Dockerized PostgreSQL Setup:**
    - Created `docker/docker-compose.yml` to easily set up a PostgreSQL database using Docker.
    - Configured environment variables for database connection.

This setup provides a robust foundation for managing financial data and enables future development of reporting and analysis features.
