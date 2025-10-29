docs: Refactor design documentation and introduce new design system guidelines

This commit introduces a comprehensive refactoring of the project's design
documentation, establishing a dedicated `docs/design` directory for all
design-related conventions and guidelines.

Key changes include:
- Creation of `docs/design/colors.md`: A new document detailing the
  semantic token-based Tailwind theme, including guidelines for background,
  gradient, text, interactive state, border, shadow, glass morphism,
  typography, radius, and animation/transition tokens. It also outlines
  component construction rules and accessibility principles.
- Renaming and enhancement of `docs/design-conventions.md` to
  `docs/design/design-conventions.md`: This document has been
  significantly expanded to include detailed responsive design guidelines,
  mobile-first principles, required responsive patterns (padding, grids,
  typography, buttons, tables, flex, spacing, visibility), complete
  responsive component examples, a mobile-first testing checklist, and
  common responsive mistakes to avoid.
- Deletion of `docs/guides/gemini_ux_redesign.md`.
- Creation of `docs/design/gemini_ux_redesign.md`: This new document
  defines the UX/UI Designer Agent's responsibilities, lists required
  design references (pointing to the new `docs/design` files), outlines
  strict rules for styling (NEVER Use/ALWAYS Use), and details a
  component redesign workflow with a mandatory output format.

These updates centralize and standardize design principles, ensuring a
consistent and high-quality user experience across the application.

Agent profiles for `frontend_agent_finance` and `ux_agent_finance` will be
updated in a subsequent commit to reference these new design conventions
and the updated directory structure.