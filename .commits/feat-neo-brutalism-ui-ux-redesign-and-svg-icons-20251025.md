feat: Implement Neo-Brutalism UI/UX redesign and SVG icons

This commit introduces a comprehensive UI/UX redesign across the application,
adhering strictly to the Neo-Brutalism design principles outlined in the
`gemini_ux_redesign.md` guide.

Key changes include:
- **Semantic Token Enforcement:** All components now exclusively use semantic Tailwind color tokens (e.g., `bg-primary`, `text-foreground`, `text-primary-foreground`), eliminating hardcoded colors and dynamic class generation with partial semantic names.
- **Tabler UI Removal:** The external Tabler UI library has been completely removed, with all its components and styling replaced by pure Tailwind CSS utilities.
- **SVG Icon Integration:** All emoji icons have been replaced with custom SVG icons for improved visual consistency and theming.
- **Component Pattern Adherence:** Existing components have been refactored to strictly follow the defined Button, Card, Input, and Table patterns.
- **Documentation Updates:** The `frontend_agent_finance.md` and `gemini_ux_redesign.md` documents have been updated to reflect these new design guidelines and best practices, including explicit rules against external icon libraries and dynamic class generation.
- **Accessibility Improvements:** Enhanced accessibility through consistent use of semantic HTML and ARIA attributes where applicable.

This refactor significantly improves the application's visual consistency, maintainability, and adherence to the established design system.