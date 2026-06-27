# i18n Translation Verification Checklist

> Last updated: 2026-06-26

## Routes Tested via Playwright

| Route | Status | Notes |
|-------|--------|-------|
| `/en` (dashboard root) | ✅ Fixed | LoadingSpinner array error + AnalyticChartsMain.real missing |
| `/en/accounts | ✅ Clean | Data-table UI fully translated (Columns, Search, Export, Rows, Selected, No results) |
| `/en/cards` | ✅ Clean | |
| `/en/recurrences` | ✅ Clean | |
| `/en/transactions` | ✅ Clean | |
| `/en/users` | ✅ Clean | |
| `/en/login` | ✅ Clean | Redirects when authenticated |
| `/en/register` | ✅ Clean | Redirects when authenticated |
| `/es` (Spanish dashboard) | ✅ Clean | All translations render correctly |
| `/es/accounts` | ✅ Clean | Full Spanish data-table UI: Columnas, Buscar, Exportar, Filas, SELECCIONADOS |
| `/es/cards` | ✅ Clean | |
| `/es/recurrences` | ✅ Clean | |
| `/es/transactions` | ✅ Clean | |
| `/es/users` | ✅ Clean | |
| `/es` (CreateTransaction wizard) | ✅ Clean | All 6 type options translated |
| `/es` (UpdateCardBalance wizard) | ✅ Clean | Step 1 renders correctly |

## Components Verified (rendered on tested routes)

- [x] LoadingSpinner (dashboard root)
- [x] DashboardHeader
- [x] DesktopSidebar / MobileNavigation
- [x] AccountDataTable + AccountColumns
- [x] CardsDataTable + CardsColumns
- [x] RecurrencesDataTable + RecurrenceColumns
- [x] TransactionsDataTable + TransactionColumns
- [x] UsersDataTable + UserColumns
- [x] LanguageSwitcher
- [x] ThemeToggle
- [x] LoginForm
- [x] RegisterForm
- [x] CreateTransaction wizard (StepTypeForm verified in en + es)
- [x] UpdateCardBalance wizard (StepAccountForm verified in en + es)
- [x] Dashboard KPIs
- [x] Dashboard Charts (Net Worth Evolution)
- [x] AccountCreateForm (slide-over) — zero errors on open
- [x] DataTable — hardcoded strings fixed (Columnas→Columns, Buscar→Search, Exportar→Export, SELECCIONADOS→SELECTED, Filas→Rows, No results)
- [x] ExportDropdown — fully translated (exportSelected, exportAll, exportLabel)

## Components NOT Verified (deeper pages/modals/wizards)

- [ ] AccountViewForm (slide-over)
- [ ] CardsViewForm (slide-over)
- [ ] RecurrenceViewForm (slide-over)
- [ ] TransactionsViewForm (slide-over)
- [ ] UsersViewForm (slide-over)
- [ ] CreateTransaction wizard (remaining 7 steps beyond StepType)
- [ ] UpdateCardBalance wizard (remaining 4 steps beyond StepAccount)
- [ ] UpdateRecurrence wizard (all 6 steps)
- [ ] Dashboard Alerts (requires data)
- [ ] Recent Activity (requires data)

## Fixes Applied During Verification

| Date | Issue | Fix |
|------|-------|-----|
| 2026-06-24 | LoadingSpinner array not supported by next-intl | Converted array to object with numeric keys |
| 2026-06-24 | AnalyticChartsMain.real missing | Added key to en.json and es.json |
| 2026-06-24 | LoginForm/RegisterForm folder naming mismatch | Renamed to AuthLoginForm/AuthRegisterForm |
| 2026-06-26 | Wizard step translations empty (request.ts wrong paths) | Updated request.ts to import from steps/ subdirectories |
| 2026-06-26 | Wizard step namespace mismatch (StepAccountForm vs StepCardAccountForm) | Fixed request.ts to use correct namespace paths |
| 2026-06-26 | DataTable hardcoded Spanish (Columnas, Buscar, Exportar, etc.) | Added 5 missing keys to DataTable messages + 3 keys to ExportDropdown messages |
| 2026-06-26 | ExportDropdown fully hardcoded Spanish | Added useTranslations + 3 message keys (en/es) |
