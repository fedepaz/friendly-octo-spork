feat: Implement Neo-Brutalism UI/UX redesign and accessibility enhancements

This commit introduces a comprehensive UI/UX redesign across various components to align with the new "Neo-Brutalism" design principles.

Key changes include:
- Design Consistency: Applied `rounded-none` to numerous elements (divs, spans, inputs, selects, forms, buttons, links, headers, asides) to enforce a consistent, sharp-edged aesthetic.
- Responsive Design: Ensured all text elements and grid layouts are fully responsive across different screen sizes by consistently applying `md:` and `lg:` Tailwind breakpoints.
- Interactive States: Implemented hover elevation and transition effects on card-like components and interactive elements (buttons, links) for a dynamic user experience.
- Accessibility Enhancements: Added `aria-label` attributes to icons and loading indicators, and improved SVG accessibility with `role`, `aria-labelledby`, `<title>`, and `<desc>` elements.
- Semantic HTML & Component Usage: Replaced raw `<button>` tags with the custom `Button` component and explicitly set `type` attributes for semantic correctness.
- Code Cleanliness: Consolidated duplicate interface definitions and replaced inline styles with Tailwind utility classes.

These changes ensure the application's UI is visually cohesive, responsive, accessible, and adheres strictly to the defined design conventions.