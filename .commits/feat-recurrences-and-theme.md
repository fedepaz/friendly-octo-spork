feat: Implement recurrences feature and neo-brutalism theme

This commit introduces two major new features:

1.  **Recurrences Feature:**
    - Adds a new section to the application for managing recurring transactions.
    - Includes a new API with a controller, service, routes, and schemas for handling recurrences.
    - Implements new UI components for listing and creating recurrences, using an HTMX-powered modal form for a seamless user experience.

2.  **Neo-Brutalism UI Theme:**
    - Implements a new, modern "neo-brutalism" theme across the application.
    - The theme is implemented using CSS variables in the main layout and configured in Tailwind CSS for easy customization and extension.
    - Dark mode is now supported and enabled by default.