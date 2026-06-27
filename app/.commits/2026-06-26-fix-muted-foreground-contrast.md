fix(ui): improve muted-foreground contrast across both themes

- Bump light theme --muted-foreground from oklch(0.4091) to oklch(0.32) for stronger contrast on light backgrounds
- Bump dark theme --muted-foreground from oklch(0.7058) to oklch(0.78) for stronger contrast on dark backgrounds
- Increase opacity modifiers across 36+ component instances: /30 → /60 and /40 → /70
- Affects: sidebar labels, KPI descriptions, chart labels, table headers, form placeholders, wizard hints, footer text
- Verified readable in both light and dark themes via Playwright screenshots
