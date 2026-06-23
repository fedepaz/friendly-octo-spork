fix: pre-deploy bugs — `"use client"`, inverted regex, empty catches, re-render loop, typo

- Add missing `"use client"` to SmartFormProvider and FormContainer (hooks in server component)
- Fix inverted regex in RegisterAuthSchema name field (`/[^a-zA-Z0-9]/` → `/^[a-zA-Z0-9]+$/`)
- Add toast error feedback to empty catch blocks in login-form and account-data-table
- Remove `table` from useEffect deps in data-table to fix re-render loop
- Rename `recurencesTransactions` → `recurrencesTransactions` across shared, backend, frontend
- Add onError handler to useCreateAccount mutation for user feedback
