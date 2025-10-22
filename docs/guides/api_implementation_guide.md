# Super Guide: Implementing API Endpoints in the Personal Finance Tracker

This guide unifies the best practices and standards for implementing API endpoints in the Personal Finance Tracker application, drawing from the System Architect, Backend Engineer, Security Analyst, and QA & Test Engineer agent profiles, as well as existing API structure documentation.

---

### 1. API Design Principles (Architect & API Endpoints)

*   **RESTful Structure**: Organize endpoints logically under base URLs (e.g., `/api/accounts`, `/api/transactions`).
*   **Standard HTTP Methods**: Use GET, POST, PUT, DELETE appropriately for CRUD operations.
*   **Clear Endpoint Descriptions**: Each endpoint should have a clear description of its purpose.
*   **Query Parameters**: Define query parameters for filtering, pagination, and specific data retrieval.
*   **Response Formats**:
    *   **List**: `{"data": [...], "total": 42, "hasMore": true}`
    *   **Single**: `{"data": {...}}`
    *   **Error**: `{"error": "Error message", "details": {"field": ["validation error"]}}`
*   **HTMX Compatibility**: Design endpoints to return HTML fragments for partial updates where appropriate (e.g., `GET /api/transactions/:id/edit` returning an edit form).

### 2. Project Structure (Project Structure & Backend Engineer)

Follow the standard Route, Controller, and Service pattern:

*   **`src/api/[module]/[module].routes.ts`**: Defines Hono routes and maps them to controller functions. Should contain no business logic.
*   **`src/api/[module]/[module].controller.tsx`**: Handles Hono context, parses request data, calls the service layer, and renders Hono JSX components for the response. No direct database access.
*   **`src/api/[module]/[module].service.ts`**: Contains all business logic and data access operations using Prisma. Independent of Hono.
*   **`src/api/[module]/[module].schema.ts`**: Defines Zod schemas for request validation.

### 3. Authentication & Authorization (Architect, Backend Engineer, Security Analyst)

*   **JWT-based Authentication**: All API endpoints (except `/api/auth/login`) require authentication via a JWT in an `httpOnly` cookie named `auth_token`.
*   **Middleware Protection**: Use Hono's JWT middleware and a custom `requireAuth` middleware to protect routes.
*   **`userId` Extraction**: Always extract `userId` from the JWT payload (`c.get('jwtPayload')`) and *never* from request body/params.
*   **Data Access Control**: **CRITICAL**: All Prisma queries **MUST** filter by `userId` to prevent Insecure Direct Object References (IDOR).
    *   Example: `prisma.expense.findUnique({ where: { id, userId } })`
*   **CSRF Protection**: Implement Hono's CSRF middleware.
*   **Session Security**: Ensure session cookies are `httpOnly`, `secure` (in production), and `sameSite: 'Strict'`.

### 4. Input Validation (Architect, Backend Engineer, Security Analyst)

*   **Zod Validation**: Use Zod for all request validation on POST/PUT endpoints.
*   **Schema Definitions**: Define Zod schemas in `src/api/[module]/[module].schema.ts`.
*   **Comprehensive Validation**:
    *   Numeric inputs: Define `min`/`max` bounds.
    *   String inputs: Define `min`/`max` length limits.
    *   Dates: Validate as ISO format.
    *   Enums: Use native enums for predefined values (e.g., `TransactionType`).
*   **Mass Assignment Prevention**: Explicitly define allowed fields in Zod schemas and pass only validated data to Prisma `create`/`update` operations.

### 5. Error Handling (Backend Engineer, Security Analyst)

*   **Centralized Error Handler**: Implement a global error handler (`src/middleware/errorHandler.ts`) to catch and format errors consistently.
*   **Specific Error Responses**:
    *   `HTTPException`: Return appropriate status codes and messages.
    *   `ZodError`: Return `400 Bad Request` with validation details.
    *   Prisma Errors (`P2002`, `P2025`): Handle specific database errors (e.g., duplicate entry, record not found).
*   **Information Disclosure**: In production, error messages should be generic and *not* leak internal details (e.g., stack traces).

### 6. Database Interactions (Architect, Backend Engineer)

*   **Prisma ORM**: Use Prisma for all database operations.
*   **Type Safety**: Leverage Prisma's generated types for end-to-end type safety.
*   **SQL Injection Prevention**: Prisma automatically parameterizes queries, but raw SQL (`$queryRaw`) requires manual validation.
*   **Decimal Type for Money**: Always use Prisma's `Decimal` type for monetary values to prevent precision loss.
*   **N+1 Query Prevention**: Use `include` wisely to fetch related data efficiently.
*   **Transactions**: Use `prisma.$transaction` for multi-operation atomic updates.
*   **Indexing**: Ensure database indexes are defined on foreign keys and frequently queried columns.

### 7. Server-Side Rendering & HTMX (Architect, Frontend Engineer)

*   **Hono JSX**: Use Hono JSX for server-side rendering of HTML.
*   **HTMX Attributes**: Utilize `hx-post`, `hx-get`, `hx-target`, `hx-swap`, `hx-trigger`, `hx-include`, `hx-indicator`, `hx-confirm` for dynamic interactions.
*   **Partial Updates**: Design API endpoints to return HTML fragments for HTMX to swap into the DOM, avoiding full page reloads.
*   **XSS Prevention**: Hono JSX automatically escapes output, preventing XSS. Avoid `dangerouslySetInnerHTML` equivalents.

### 8. Testing (QA & Test Engineer)

*   **Unit Tests**:
    *   Test all service methods for business logic.
    *   Test Zod schemas for validation rules.
*   **Integration Tests**:
    *   Test all API endpoints (Hono routes, controllers, services).
    *   Verify authentication and authorization flows.
    *   Test data relationships and database interactions.
*   **E2E Tests (Playwright)**:
    *   Test complete user journeys.
    *   Verify HTMX interactions and UI updates.
    *   Test form submissions and error displays.
*   **Test Data Management**: Use `beforeEach`/`afterEach` hooks to set up and tear down test data in an isolated test database.

### 9. Performance & Security Best Practices (Architect, Backend Engineer, Security Analyst)

*   **Rate Limiting**: Implement rate limiting on all API endpoints, especially sensitive ones (e.g., login, create).
*   **Security Headers**: Configure appropriate security headers (CSP, X-Frame-Options, X-Content-Type-Options, Referrer-Policy).
*   **Logging**: Implement structured logging, but *never* log sensitive information.
*   **Environment Variables**: All secrets and sensitive configurations must be stored in environment variables and *never* hardcoded.
*   **Dependency Management**: Regularly audit dependencies for CVEs and keep them up to date.

---

**Implementation Checklist (from `implementation_checklist.md` - adapted)**

When implementing a new module (e.g., Accounts, Categories, Transactions):

1.  **Define Schema**: Create `src/api/[module]/[module].schema.ts` with Zod validation.
2.  **Implement Service**: Create `src/api/[module]/[module].service.ts` for business logic and Prisma interactions.
    *   **Remember `userId` filtering in all queries!**
    *   Handle Prisma `Decimal` types.
3.  **Implement Controller**: Create `src/api/[module]/[module].controller.tsx` to handle requests, call the service, and render Hono JSX.
    *   Use `zValidator` middleware.
    *   Use `c.render` for full pages, `c.html` for HTMX partials.
    *   Implement error handling.
4.  **Define Routes**: Create `src/api/[module]/[module].routes.ts` to map endpoints to controller methods.
    *   Ensure JWT and `requireAuth` middleware are applied.
5.  **Create UI Components**: Develop necessary Hono JSX components (`src/components/[module]/`).
6.  **Create Page Component**: If applicable, create `src/pages/[Module]Page.tsx`.
7.  **Write Tests**: Implement unit, integration, and E2E tests for the new module.

---

### Development Workflow

Once you've implemented a module, follow these steps for local development and verification:

1.  **Linting**: Before running the development server, always run the linter to catch any style or potential code quality issues.
    ```bash
    bun lint
    ```
2.  **Start the Development Server**: The `bun run dev` command will start the Hono application with hot-reloading. This process typically runs in the background, allowing you to continue using your terminal.
    ```bash
    bun run dev
    ```
    *   **Accessing the Application**: The application will usually be available at `http://localhost:3000` (or the port defined in your `.env` or `src/index.tsx`).
    *   **Debugging**: You can interact with the running application using your web browser. For API requests and UI inspection, use your browser's developer tools (e.g., Chrome DevTools) to:
        *   Inspect network requests and responses.
        *   View console logs.
        *   Examine the DOM for HTMX-driven updates.
        *   Simulate user interactions.
    *   **Stopping the Server**: To stop the background process, you typically need to find its process ID (PID) and kill it, or if it's managed by `bun run dev` directly, `Ctrl+C` in the terminal where it was started should work. If `bun run dev` uses `concurrently`, `Ctrl+C` will usually stop all child processes.
