# Super Guide: Implementing API Endpoints in the Personal Finance Tracker (NestJS)

This guide outlines the standards for implementing API endpoints using NestJS and Prisma, following the project's modular architecture.

---

### 1. API Design Principles

*   **RESTful Structure**: Organize endpoints logically under base URLs (e.g., `/api/accounts`, `/api/transactions`).
*   **Standard HTTP Methods**: Use GET, POST, PATCH (for partial updates), PUT, and DELETE appropriately.
*   **User Scoping**: **CRITICAL**: All endpoints MUST extract the `userId` from the authenticated request and scope all database operations to that user.
*   **Response Formats**:
    *   **Success**: Return data directly or wrapped in a standard structure.
    *   **Error**: Use NestJS `HttpException` or specialized subclasses (`BadRequestException`, `NotFoundException`).

### 2. Project Structure (Standard Pattern)

Follow the NestJS Module-Controller-Service-Repository pattern:

*   **`[module].module.ts`**: Declares the module and its dependencies.
*   **`[module].controller.ts`**: Handles HTTP requests, validation (using Zod or Class-Validator), and maps to service methods.
*   **`[module].service.ts`**: Contains business logic. It should be independent of the HTTP layer.
*   **`repositories/[entity].repository.ts`**: Encapsulates Prisma operations. All queries must include `where: { userId }`.
*   **`dto/`**: Contains Data Transfer Objects for request bodies and responses, validated with Zod.

### 3. Authentication & Authorization

*   **Guards**: Use NestJS Guards (e.g., `JwtAuthGuard`) to protect endpoints. The project uses a `GlobalAuthGuard` registered in the `AppModule` to protect all routes by default.
*   **Public Access**: Use the `@Public()` decorator to bypass authentication for specific controllers or methods (e.g., login, health checks).
*   **Decorators**: Use custom decorators to extract the `User` object or `userId` from the request.
*   **Data Isolation**: Never allow a user to access or modify data belonging to another `userId`.

### 4. Database Interactions (Prisma)

*   **PrismaService**: Inject the `PrismaService` into repositories.
*   **Precision**: Always use `@db.Decimal(15, 2)` for monetary values.
*   **Soft Deletes**: Always filter for `deletedAt: null` in read operations.
*   **Transactions**: Use `prisma.$transaction` for multi-model atomic updates (e.g., creating a transaction and updating an account balance).
    *   **Pattern**: Inject the `PrismaService` into the primary Service. Start a transaction using `this.prisma.$transaction(async (tx) => { ... })`. Pass the `tx` object (of type `Prisma.TransactionClient`) to repository methods to ensure they execute within the same database session.
    *   **Cross-Module Logic**: If an operation affects multiple domains (e.g., Transactions and Accounts), the Service should orchestrate the repositories. Export the necessary Repository from its owner module and import that module into the consuming feature's module.

### 5. Infrastructure & Reliability

*   **Database Connectivity**: Always implement the `@prisma/adapter-pg` pattern in the `PrismaService` constructor to ensure stable connection pooling in Node.js environments.
*   **Health Monitoring**: New infrastructure should include a health check following the `HealthModule` pattern.
*   **Logging & Observability**:
    *   **Engine**: We use `nestjs-pino`. Use the standard NestJS `Logger` from `@nestjs/common`; it is globally overridden to use Pino.
    *   **Strategy**:
        *   **Controllers**: Avoid manual logging. `pino-http` automatically logs all request/response metadata.
        *   **Services**: Place business-critical logs here (e.g., "Processing payment for user X").
        *   **Context**: Always initialize the logger with the class name: `private readonly logger = new Logger(MyService.name)`.
    *   **Security**: Never log PII, passwords, or full JWTs. Use the `redact` config in `AppModule` if new sensitive fields are added.

### 6. Implementation Checklist

When implementing a new feature (e.g., Accounts, Transactions):

1.  **Schema**: Define/Update `schema.prisma` and run `pnpm prisma generate`.
2.  **Repository**: Implement the repository with `userId` scoping.
3.  **Service**: Implement business logic and data mapping (Decimal to number).
4.  **Controller**: Define endpoints and apply validation/guards.
5.  **Module**: Wire everything together in the feature module.
6.  **Tests**: Write unit tests for the service and integration tests for the controller.

