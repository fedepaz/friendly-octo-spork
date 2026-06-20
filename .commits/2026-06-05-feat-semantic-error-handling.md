feat: modernize global error handling with semantic codes

Synchronizes backend and frontend error handling using a shared semantic
contract and a registry pattern for high-fidelity UI feedback.

- Shared: Created error-codes.ts with ErrorCode enum as the single source of truth.
- Backend: Updated AllExceptionsFilter to prioritize and emit shared ErrorCodes.
- Backend: Refactored Auth and Transaction services to throw surgical exceptions with specific codes (e.g., ACCOUNT_TYPE_RESTRICTION).
- Frontend: Refactored error-handler.ts to use an ERROR_REGISTRY map instead of fragile string-based checks.
- Frontend: Improved localized feedback and robust fallbacks for network and server errors.