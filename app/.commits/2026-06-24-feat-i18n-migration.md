feat(i18n): migrate entire app to next-intl (en/es)

- Wrap app under [locale] route segment with next-intl middleware
- Create global message files (messages/{en,es}.json) with shared namespaces
- Create 90+ component-scoped message directories under features/
- Rewrite request.ts to load all message dirs into a single messages object
- Update all pages with setRequestLocale() and force-dynamic
- Translate all components: auth, layout, core, data-table, features, wizards, providers, hooks
- Add locale param to formatCurrency/formatSpanishDate for locale-aware formatting
- Restructure app router layout with locale validation, NextIntlClientProvider, generateMetadata
- Remove old (auth) and (dashboard) layouts that lacked locale support
- Fix pre-existing TS/lint errors (any types, conditional hooks, nullable numbers)
