# TRICKS — Version-Specific Gotchas & Documented Patterns

**Purpose:** Capture every proven gotcha so you never need to re-research the stack.
**Source:** Consolidated from `templates2026` (NEW-PROJECT-GUIDE + TEMPLATE-PLAN, verified 2026-10-30) and this repo's live code.
**Rule:** Check this file *before* inventing a solution.

---

## Version Lock

Do NOT change these versions unless you know what you're doing:

| Technology | Version | Gotcha |
|------------|---------|--------|
| Node.js | >= 18 declared; >= 20.19 preferred | Prisma 7 minimum is 20.19 |
| pnpm | 10.33.2 | Workspace protocol — use `workspace:^` for internal deps |
| Turborepo | ^2.8.9 | `prisma:generate` must run before `build` |
| NestJS | 11.x | Express v5 default — path route matching changed |
| Next.js | 16.x | `params` / `searchParams` must be awaited |
| React | 19.2.x | — |
| Prisma | 7.8.x | Uses `prisma.config.ts`, not schema-based URL |
| Tailwind CSS | 4.x | `@import "tailwindcss"` — not `@tailwind` directives |
| TypeScript | ^5.7 | Strict mode |
| Jest | 30.x | Module resolution changed vs Jest 29 |
| Zod | ^3.22 | Schema validation |
| next-intl | ^4.x | Wrap `next.config` with `next-intl/plugin` |

---

## Backend (NestJS / Prisma)

### Prisma 7 Config File

Prisma 7 introduced `prisma.config.ts`. The datasource URL lives here, not in `schema.prisma`.

```ts
// apps/backend/prisma.config.ts
import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/",
  migrations: {
    path: "prisma/migrations",
    seed: "npx tsx prisma/seed.ts",
  },
  datasource: { url: process.env["DATABASE_URL"] },
});
```

### NestJS 11 Module Resolution

NestJS 11 changed from hash-based to reference-based module resolution. If integration tests fail with dynamic modules:

```ts
Test.createTestingModule({}, { moduleIdGeneratorAlgorithm: "deep-hash" })
```

### Express v5 Path Matching

NestJS 11 uses Express v5 by default. Regex patterns in route paths may need updates. See the Express v5 migration guide when routes behave unexpectedly.

### ZodValidationPipe — No Redundant try/catch

```ts
// BAD — redundant try/catch
try {
  const result = this.schema.safeParse(value);
  if (result.success) return result.data;
  throw new BadRequestException(result.error);
} catch (e) { /* unreachable */ }

// GOOD — appFinance: src/shared/pipes/zod-validation-pipe.ts
const result = this.schema.safeParse(value);
if (result.success) return result.data;
throw new BadRequestException({
  message: "Validation error",
  code: "VALIDATION_ERROR",
  details: result.error.flatten(),
});
```

### JWT Secrets — Always `getOrThrow`

```ts
// BAD — silently falls back to a space character
const secret = configService.get<string>("config.jwt.secret", " ");

// GOOD — fails fast at startup (appFinance: auth.module.ts, jwt-auth.strategy.ts)
const secret = configService.getOrThrow<string>("config.jwt.secret");
```

### Password Comparison — Always `bcrypt.compare`

```ts
// BAD — comparing hash to plain text will never match
if (user.passwordHash === config.get("config.defaultPassword"));

// GOOD — appFinance: auth.service
const isMatch = await bcrypt.compare(inputPassword, user.passwordHash);
```

### Colocated Repositories

Repositories live inside their module's `repositories/` subdirectory — never a global flat folder.

```ts
// BAD
src/repositories/account.repository.ts

// GOOD (appFinance convention)
src/modules/accounts/repositories/account.repository.ts
```

---

## Frontend (Next.js / React / TanStack Query)

### Next.js 16 Async APIs

`params` and `searchParams` are Promises in Next.js 16 — always await them.

```tsx
// BEFORE (Next.js 15) — synchronous
export default function Page({ params }) {
  return <h1>{params.slug}</h1>;
}

// AFTER (Next.js 16)
export default async function Page(props: PageProps<"/blog/[slug]">) {
  const { slug } = await props.params;
  return <h1>{slug}</h1>;
}
```

appFinance pages do this consistently:

```ts
const { locale } = await params;
```

### Tailwind CSS v4 Syntax

```css
/* BEFORE (v3) */
@tailwind base;
@tailwind components;
@tailwind utilities;

/* AFTER (v4) — appFinance globals.css */
@import "tailwindcss";
```

### Centralized Query Keys

Use a single factory instead of scattering keys across feature hooks:

```ts
// src/lib/queryKeys.ts
export const transactionQueryKeys = {
  all: ["transactions"] as const,
  byId: (id: string) => [...transactionQueryKeys.all, "byId", id] as const,
  byMonth: (month: number, year: number) =>
    [...transactionQueryKeys.all, "byMonth", month, year] as const,
};
```

Query keys use **structured arrays** (e.g. `["dashboard", "budget", 6, 2026]`). Flat string keys do NOT match prefix-based invalidation.

### Query Invalidation Map

Mutations never call `invalidateQueries` inline — they go through the central map:

```ts
// src/lib/query-invalidation-map.ts
export function invalidateQueries(
  queryClient: QueryClient,
  mutation: MutationName,
  variables?: Record<string, unknown>,
) {
  const entry = mutationInvalidationMap[mutation];
  if (!entry) return;
  const queryKeys = variables ? entry.queries(variables) : entry.queries();
  for (const key of queryKeys) {
    queryClient.invalidateQueries({ queryKey: key });
  }
}
```

### LoadingBoundary (Suspense + async state)

Single wrapper for async UI states instead of ad-hoc `isLoading` checks:

```tsx
// src/components/common/loading-boundary.tsx
export function LoadingBoundary({ children, fallback, ... }) {
  // Wraps Suspense + ErrorBoundary + loading flag in one component
}
```

Pairs with TanStack Query `useSuspenseQuery` — one boundary per independent data section, as granular as possible.

### `useSuspenseQuery` Invariants

- Never destructure `isLoading` (it's `undefined`).
- Never guard with `if (isLoading)` — data is guaranteed available on render.
- Exception: auth hooks intentionally use `useQuery` with an `enabled` flag.

---

## i18n (next-intl)

- Shared strings: root `messages/en.json` + `messages/es.json`.
- Component-specific strings: colocated `messages/{en,es}.json` folders, **registered in `src/i18n/request.ts`** — a colocated file that isn't registered will silently fall back to the raw key.
- Never hardcode user-facing strings.
- Tests mock `next-intl` with `jest.mock("next-intl", ...)` — the mock receives the **raw key** (namespace is not prefixed):

```ts
jest.mock("next-intl", () => ({
  useTranslations: () => (key: string) => {
    const messages: Record<string, string> = { title: "Alerts" };
    return messages[key] ?? key;
  },
}));
```

---

## Design Tokens (enforced)

- Control heights: `h-(--control-height)` (xs/sm/default/md/lg = 24/28/32/36/40px).
- Table density: `h-(--table-compact-row-height) xl:h-(--table-row-height)` + `--table-cell-*`.
- Spacing: `px-(--space-4)` (scale 0…40px). **Spacing lock** — utility spacing has ONE value across breakpoints; no `sm:p-6 lg:p-8`.
- Layout: `--sidebar-width-*` / `--header-height-*`.
- Typography: remapped (`text-xs` = 11px … `text-3xl` = 24px). Never arbitrary px (`text-[13px]`, `h-[24px]`).
- `--radius: 0px` (sharp corners) and the Oxanium/Source Code Pro fonts are deliberate — do not "fix" them.
- Widths > 40px and content shapes may keep the existing scale class.

---

## Testing

- Frontend: `.spec.tsx` convention; Jest via `next/jest`; `moduleNameMapper: "^@/(.*)$": "<rootDir>/src/$1"`.
- Backend: Jest 30; module resolution changed vs Jest 29 — if dynamic-module tests fail, see NestJS 11 Module Resolution above.
- Radix Dialog overlays block `userEvent` (pointer-events) — use `fireEvent.click` for close buttons inside open dialogs.
