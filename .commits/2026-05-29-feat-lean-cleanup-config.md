feat(system): harden configuration and cleanup boilerplate

- Backend: Implement bcrypt for seed passwords and transition to 'upsert' to prevent duplicates.
- Backend: Add DEFAULT_PASSWORD to configuration and .env validation.
- Frontend: Remove redundant boilerplate (favicon, default page) and simplify metadata.
- Frontend: Remove user-editing features (user-edit.tsx, user-edit-form.tsx) to maintain a lean MVP.
- Frontend: Update user-menu and authService to reflect the simplified user model.
- Shared: Remove UpdateUserProfile schema as it is no longer required for this project.
