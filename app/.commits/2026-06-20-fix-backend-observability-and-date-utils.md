fix: backend observability, shared date helpers, and code quality improvements

Backend:
- Replace console.error with pino Logger in auth repository (correlation IDs)
- Add newPassword, currentPassword, refreshToken to Pino redaction list
- Parallelize 3 sequential DB queries in card.repository with Promise.all
- Add TODO comment on hardcoded budget limits for future configurability
- Remove broken db:seed:entity script (file never existed)

Shared Package:
- Extract password validation rules into shared passwordRules constant
- Fix name regex error message: "no espacios" → "no debe contener caracteres especiales"

Frontend:
- Add getCurrentMonth(), getCurrentYear(), getCurrentMonthYear() to date-utils
- Update 5 components to use centralized date helpers instead of manual new Date()
- Fixes potential midnight boundary bug in useBudgetSummary query key vs fn
