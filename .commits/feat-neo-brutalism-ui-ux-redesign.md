feat: Implement Neo-Brutalism UI/UX redesign across components

This commit applies the new Neo-Brutalism UI/UX design system across various components and pages of the application. The changes standardize typography, spacing, color usage, and interactive states according to the guidelines defined in `docs/guides/gemini-audit-prompt.md` and `docs/guides/gemini_ux_redesign.md`.

Key changes include:
- Standardized typography for headings, paragraphs, and labels using semantic and responsive classes.
- Ensured consistent spacing with predefined padding, margins, and gaps.
- Replaced hardcoded colors with semantic Tailwind color tokens.
- Implemented consistent hover, active, and focus states for all interactive elements.
- Applied `text-base` to all input and select fields for uniform sizing.
- Refactored HTMX event handlers to remove inline JavaScript.
- Updated base HTML structure in `injection.tsx` for cleaner styling.
- Switched CSS import from `neobrutalism.css` to `t3chat.css` in `main.css`.