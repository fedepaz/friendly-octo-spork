feat(docs): Establish project governance and architecture

This commit introduces a comprehensive set of documentation to establish clear rules, patterns, and guidelines for the project.

- **GEMINI.md**: Added new, explicit workflows for reviewing code, conducting research, and committing changes. The core protocol is now more robust.

- **Agent Docs**: Refactored the backend, frontend, and UX/UI agent documentation to define clear architectural patterns, including:
  - A standard Controller/Service pattern for the backend.
  - Examples for both full-page (`c.render`) and HTMX partial (`c.html`) rendering.
  - A standard component structure and styling guide for the frontend.
  - A guide for implementing type-safe HTMX attributes.
  - Visual design principles to maintain a clean, simple aesthetic.

- **Guides**: Created a new guide (`docs/guides/initial-setup.md`) to document the project's setup and technology stack.

This foundational documentation will ensure consistency, maintainability, and a clear development process as the project grows.