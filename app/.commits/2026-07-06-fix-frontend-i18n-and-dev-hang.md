fix(frontend): remove outputFileTracingRoot and add EmptyState i18n

- Remove `outputFileTracingRoot` from next.config.ts which caused Turbopack to hang indefinitely during `pnpm dev`
- Replace hardcoded Spanish text in EmptyState component with next-intl translations
- Fix `generalError` key in en.json from Spanish to English
- Add EmptyState message files (en/es) and register in i18n/request.ts
