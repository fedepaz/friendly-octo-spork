feat: overhaul sidebar and navigation with Premium Industrial aesthetic

This commit synchronizes the application's navigation components with the 'Premium Industrial' / 'Doom 64' UI standards, emphasizing tactical scannability and technical precision.

Navigation Enhancements:
- Refactored `DesktopSidebar` with glassmorphism and tactical edge gradients.
- Implemented `Tactical Icon Boxes` across all navigation items.
- Standardized typography: Oxanium for labels, Source Code Pro for metadata.
- Updated core iconography (History, Users, Landmark, Clock) for better scannability.
- Synchronized `MobileNavigation` to match desktop design language.

User Profile Refinement:
- Tactical-ized `UserSidebarMenu` by removing all rounded corners.
- Replaced circular avatars with square tactical initials boxes.
- Refined dropdown menu with industrial indicators and unified fonts.

Internal:
- Cleaned up unused UI imports and optimized OKLCH token usage.
- Added design-system documentation for the sidebar overhaul.