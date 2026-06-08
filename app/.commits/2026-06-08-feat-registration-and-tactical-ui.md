feat: implement user registration and tactical UI enhancements

This commit introduces a complete user registration flow and refactors the authentication system to use 'name' as the primary identifier. Additionally, it implements a new suite of high-density UI components for data tables, aligning with the project's 'Premium Industrial' aesthetic.

Backend Changes:
- Added `register` endpoint to AuthController.
- Implemented registration logic in AuthService with Bcrypt hashing.
- Updated login logic to validate via 'name' instead of 'email'.
- Increased JWT expiration times (Access: 60m, Refresh: 7d) for improved dev experience.
- Added repository methods for user creation and name-based lookups.

Frontend Changes:
- Created `TacticalDataTableCells` suite (TacticalText, TacticalType, PremiumBadge, PremiumAmount, PremiumDate).
- Refactored all data tables (Accounts, Transactions, Recurrences, Users) to use the new tactical cells.
- Added user registration form and hook.
- Switched LoginForm to use 'name' instead of 'email'.
- UI polish for AuthDashboard and layout stabilization.

Shared Package:
- Enhanced RegisterAuthSchema with complex validation rules (regex, name != password).
- Updated LoginAuthSchema to use 'name'.