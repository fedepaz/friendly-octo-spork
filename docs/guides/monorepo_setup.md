# Monorepo Setup & Development Workflow

This guide documents the specific configurations required for the `appFinance` monorepo structure, specifically regarding Git hooks and linting.

## Git Root vs. App Root

The project is structured with a `.git` directory at the repository root, while the monorepo source code and `package.json` are located in the `app/` directory.

### Husky & Git Hooks

To support this nested structure, Husky v9+ is configured to use a custom `core.hooksPath`.

#### 1. Manual Configuration
If hooks are not firing, run the following command from the repository root:
```bash
git config core.hooksPath app/.husky
```

#### 2. Automatic Configuration (Prepare Script)
The `app/package.json` includes a `prepare` script that ensures the hooks path is set correctly for all developers:
```json
"prepare": "cd .. && husky app/.husky"
```

#### 3. Hook Context Awareness
Hooks are located in `app/.husky/` and are designed to be context-aware. They check for the `app/` directory and change context if needed, ensuring they work whether you commit from the root or from within `app/`.

Example `pre-commit`:
```bash
#!/bin/sh
[ -d "app" ] && cd app
pnpm turbo run lint
```

## Commit Conventions

We follow [Conventional Commits](https://www.conventionalcommits.org/).

- **Tooling**: `commitlint` with `@commitlint/config-conventional`.
- **Customizations**: Max line length for bodies and footers is disabled to allow for detailed Gemini-generated commit messages.

## Linting & Ignored Files

Auto-generated files (e.g., Prisma Client) should be ignored to prevent false positives in the linting process.
- **Backend**: `app/apps/backend/eslint.config.mjs` ignores `src/generated`.
