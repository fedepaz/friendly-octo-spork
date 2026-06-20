feat: align typography with industrial theme and refine sidebar UX

Fixes the font conflict by replacing Geist with Oxanium via next/font/google,
ensuring the "Doom 64" tech-aesthetic is correctly applied to the UI. Also
simplifies the sidebar toggle interaction.

Frontend:
- Replace Geist with Oxanium in RootLayout.
- Map Oxanium to --font-oxanium and apply to html tag.
- Add standard head metadata to layout.
- Remove redundant ChevronRight from sidebar collapse toggle.

Docs:
- Update colors.md to reflect next/font/google implementation.
