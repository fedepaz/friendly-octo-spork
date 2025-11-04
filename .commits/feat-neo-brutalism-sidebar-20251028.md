feat: Neo-brutalism UI overhaul and responsive sidebar

This commit introduces a significant UI/UX enhancement, refactoring the main layout and key components to align with a modern neo-brutalism design aesthetic.

Key changes include:

- **Responsive Sidebar:** The main navigation has been moved to a responsive sidebar. It is permanently visible on desktop and becomes a toggleable drawer on mobile, improving usability and screen real estate on smaller devices.

- **Neo-Brutalism Theme:** Components like the Sidebar, Toasts, and various forms have been restyled with high-contrast colors, hard shadows, and bold typography, creating a more modern and visually striking interface.

- **Component Refactoring:**
    - `Layout.tsx` has been rewritten to manage the new responsive sidebar.
    - `Sidebar.tsx` is completely new, featuring icons, a new header, and better active state handling.
    - `Toast.tsx` has been redesigned for better visual feedback.
    - `HamburgerMenu.tsx` now uses an efficient inline HTMX-based toggle.

- **Transaction Form Enhancement:** The transaction form now includes a dropdown to associate transactions with a recurrence, improving data entry for recurring expenses.