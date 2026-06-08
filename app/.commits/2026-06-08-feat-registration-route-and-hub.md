feat: implement registration route and unified auth dashboard

This commit introduces a dedicated registration flow and refactors the authentication system to utilize a unified 'AuthDashboard' for both login and registration, following Next.js App Router best practices.

Authentication:
- Created `/app/(auth)/register` route with skeleton coverage.
- Refactored `AuthDashboard` to support multiple modes (login/register).
- Integrated `RegisterForm` with state-based toggling.
- Added `AuthHeader` with `ThemeToggle` for all auth pages.

UI/UX & Polish:
- Updated `DashboardHeader` for better logo alignment and Tailwind v4 compatibility.
- Implemented consistent 'Level 1' loading skeletons for the registration route.
- Synchronized technical metadata and animations across the auth hub.