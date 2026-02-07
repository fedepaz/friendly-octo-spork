## Roadmap: Creating a New Route

This roadmap outlines the steps to add a new server-rendered page, such as a dashboard, following the project's established vertical slicing, Hono JSX, HTMX, and Prisma patterns.

### 1. Database Considerations (Prisma)

*   **Objective**: Determine if new data models or fields are required for your dashboard's functionality.
*   **Action**: If needed, update `finance-app/prisma/schema.prisma` with any new models, fields, or relationships.
    *   **Example**: If your new dashboard needs to track `Budget` data (as discussed), this would be the place to add a `Budget` model.
*   **Follow-up**: After modifying `schema.prisma`, run Prisma migrations and generate the client:
    ```bash
    bunx prisma migrate dev --name <descriptive_migration_name>
    bunx prisma generate
    ```
    *   **Reference**: Consult `docs/guides/database_workflow.md` and the "Database Migration Management" section in `docs/backend_agent_finance.md`.

### 2. Service Layer (`finance-app/src/api/dashboard/dashboard.service.ts`)

*   **Objective**: Implement the business logic and data fetching for your dashboard.
*   **Action**: Create a new service file (e.g., `dashboard.service.ts`) within its dedicated vertical slice (`finance-app/src/api/dashboard/`).
    *   This service will interact with Prisma to retrieve and process any data your dashboard needs (e.g., summarizing transactions, fetching account balances, calculating budget metrics).
*   **Key Principles**:
    *   **No Hono Context**: Services should be decoupled from Hono and HTTP concerns.
    *   **Data Access**: Use `prisma` client for all database operations.
    *   **Return Raw Data**: Return processed data that the controller can then pass to the JSX page.
*   **Reference**: See `finance-app/src/api/transactions/transactions.service.ts` for an example of data retrieval and processing.

### 3. Controller Layer (`finance-app/src/api/dashboard/dashboard.controller.tsx`)

*   **Objective**: Handle incoming HTTP requests, orchestrate data fetching via the service, and render the appropriate Hono JSX page.
*   **Action**: Create a new controller file (e.g., `dashboard.controller.tsx`).
    *   Instantiate your `DashboardService`.
    *   Implement methods (e.g., `getDashboardPage`) that:
        *   Extract necessary parameters from `c.req` (e.g., `userId` from JWT payload, query parameters for filtering).
        *   Call methods on your `DashboardService` to get data.
        *   Render your main dashboard page component using `c.render(<DashboardPage {...data} />)`.
        *   Handle errors gracefully, potentially rendering an `ErrorPage`.
*   **Key Principles**:
    *   **HTTP Bridge**: Acts as the interface between Hono routes and business logic.
    *   **Rendering**: Uses `c.render` for full page loads or `c.html` for HTMX partials.
*   **Reference**: Refer to `finance-app/src/api/transactions/transactions.controller.tsx` and the "Controller Implementation Examples" in `docs/backend_agent_finance.md`.

### 4. Page Component (`finance-app/src/pages/DashboardPage.tsx`)

*   **Objective**: Define the main Hono JSX component that represents the entire dashboard page.
*   **Action**: Create a new page component file (e.g., `DashboardPage.tsx`).
    *   This component will receive data as props from the controller.
    *   It will compose smaller UI components to build the complete page layout.
*   **Key Principles**:
    *   **Receives Props**: Data is passed down from the controller.
    *   **Composes UI**: Uses other components (e.g., charts, lists, forms) to display the dashboard.
*   **Reference**: Look at existing pages like `finance-app/src/pages/TransactionsPage.tsx` (once implemented fully) or `finance-app/src/pages/AccountsPage.tsx`.

### 5. UI Components (`finance-app/src/components/dashboard/`)

*   **Objective**: Develop smaller, reusable Hono JSX components specifically for your dashboard.
*   **Action**: Create a new directory (e.g., `finance-app/src/components/dashboard/`) and add components within it (e.g., `DashboardSummary.tsx`, `TransactionChart.tsx`).
    *   These components are pure presentation, receiving data via props and rendering HTML.
    *   Utilize Tailwind CSS for styling and ensure adherence to design conventions.
*   **Key Principles**:
    *   **Reusability**: Design components to be independent and reusable.
    *   **HTMX Integration**: Incorporate `hx-*` attributes for dynamic interactions where appropriate (e.g., filtering, refreshing data).
    *   **Iconography**: Use SVG icons from `finance-app/src/components/icons/`.
*   **Reference**: See `finance-app/src/components/transactions/` for examples of feature-specific components.

### 6. Route Definition (`finance-app/src/api/dashboard/dashboard.routes.ts`)

*   **Objective**: Define the URL path(s) for your dashboard and link them to your controller methods.
*   **Action**: Create a new route file (e.g., `dashboard.routes.ts`).
    *   Instantiate your `DashboardController`.
    *   Define the Hono routes (e.g., `app.get('/')`) and associate them with the appropriate controller methods.
*   **Key Principles**:
    *   **Simplicity**: Routes should primarily map paths to controller functions. No business logic here.
*   **Reference**: Check `finance-app/src/api/transactions/transactions.routes.ts` or `finance-app/src/api/accounts/accounts.routes.ts`.

### 7. Main Application Integration (`finance-app/src/index.tsx`)

*   **Objective**: Integrate your new dashboard route into the main Hono application.
*   **Action**:
    1.  Import your new dashboard routes file (`import dashboardRoutes from "./api/dashboard/dashboard.routes";`).
    2.  Apply any necessary middleware (e.g., `requireAuth`) to your dashboard routes.
    3.  Mount your dashboard routes (`app.route("/dashboard", dashboardRoutes);` or `app.route("/", dashboardRoutes);` if it's the home page).
*   **Reference**: See the main `finance-app/src/index.tsx` file for examples of route mounting and middleware application.

### 8. Sidebar Navigation (`finance-app/src/components/shared/Sidebar.tsx`)

*   **Objective**: Add a link to your new dashboard in the application's navigation.
*   **Action**: Modify `finance-app/src/components/shared/Sidebar.tsx` to include a new navigation item with the appropriate `href`, `label`, and `icon`.
*   **Key Principles**:
    *   **Consistency**: Follow the existing pattern for navigation links.
    *   **Icon Selection**: Use one of the available SVG icons from `finance-app/src/components/icons/`.
