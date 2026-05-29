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

## Adding New Packages or Apps

To maintain the integrity of the monorepo, follow these steps when adding a new app or package:

### 1. Creation
- Create the folder in `apps/` or `packages/`.
- Use the package manager to initialize or copy an existing structure.
- **IMPORTANT**: If the tool creates a `pnpm-lock.yaml` or `pnpm-workspace.yaml` inside the new directory, **delete them immediately**. The monorepo must only have these files at the root (`app/`).

### 2. Package Naming
- Set the `name` in `package.json` using the workspace convention (e.g., `frontend`, `@repo/ui`).

### 3. Shared Dependencies
- Link shared packages using the `workspace:*` specifier:
  ```bash
  pnpm add @repo/shared --filter frontend
  ```

### 4. Configuration
- Ensure root `package.json` scripts and `turbo.json` tasks are updated to include the new package if they are name-specific.

## Linting & Ignored Files

Auto-generated files (e.g., Prisma Client) should be ignored to prevent false positives in the linting process.
- **Backend**: `app/apps/backend/eslint.config.mjs` ignores `src/generated`.
