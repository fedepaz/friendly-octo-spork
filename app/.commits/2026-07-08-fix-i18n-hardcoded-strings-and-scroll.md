fix(i18n): fix hardcoded Spanish strings and enable dashboard page scrolling

- Replace Spanish values in en.json files with proper English translations
- Convert hardcoded label maps (SOURCE_LABELS, getTransactionTypeStyles) to translation keys
- Add i18n to sidebar-charts-accounts and createAccountHook toast messages
- Fix hardcoded es-AR locale in cards date formatting with useLocale()
- Remove duplicate navigation keys and rename usuarios to users-sub
- Register 8 unregistered skeleton message directories in i18n/request.ts
- Remove 4 dead namespace registrations (DashboardAlerts, FeatureNavigation, RecentActivity)
- Add missing Permissions.loading translation key
- Fix dashboard layout overflow to enable page scrolling on desktop
