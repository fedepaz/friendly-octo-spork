### Internationalization (i18n) Implementation

To ensure a consistent, scalable, and performant multi-language experience, all frontend pages must use the following standards.

**1. Centralized Routing Logic (`src/i18n/routing.ts`):**

All logic for defining supported locales and generating static paths is centralized in this file.

```typescript
// src/i18n/routing.ts
import { defineRouting } from "next-intl/routing";

// Defines supported locales and the default
export const routing = defineRouting({
  locales: ["en", "es", "it"],
  defaultLocale: "en",
  localePrefix: "always",
  localeDetection: true,
});

// Helper to generate static paths for all locales
export function generateLocaleStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}
```

**2. Standard for Page Components (`page.tsx`):**

Every page component under the `[locale]` segment **must** handle the locale context directly. Child components can then use `useTranslations()` without any extra work.

```typescript
// Example: apps/frontend/src/app/[locale]/new-feature/page.tsx
import { useTranslations } from "next-intl";
import { generateLocaleStaticParams } from "@/i18n/routing";
import { use } from "react";
import { setRequestLocale } from "next-intl/server";
import { FeatureDashboard } from "@/features/new-feature";

// 1. Statically generate routes using the helper
export function generateStaticParams() {
  return generateLocaleStaticParams();
}

// 2. Define the props interface for the page
interface NewFeaturePageProps {
  params: Promise<{ locale: string }>;
}

// 3. Implement the page component
export default function NewFeaturePage({ params }: NewFeaturePageProps) {
  // 4. The page component sets the locale for the request
  const { locale } = use(params);
  setRequestLocale(locale);

  const t = useTranslations("NewFeaturePage");

  return (
    <div>
      <h1>{t("title")}</h1>
      {/* The actual feature UI is in a child component */}
      <FeatureDashboard />
    </div>
  );
}
```

**3. Component-Scoped Translation Files**

Instead of a single, large translation file, each feature or component that requires translations manages its own message files. This improves modularity and aligns with the project's "feature-sliced" architecture.

_Example Structure:_

```
/src/features/plants/components/
└── PlantCard/
    ├── index.tsx
    └── messages/
        ├── en.json
        ├── es.json
        └── it.json
```

The JSON files within this folder must be namespaced to the component to prevent key collisions.

_Example for `.../messages/en.json`:_

```json
{
  "PlantCard": {
    "status": "Status",
    "plantedOn": "Planted on"
  }
}
```

**. Centralized Merging of Messages (`src/i18n/request.ts`)**

The `src/i18n/request.ts` file is the main `next-intl` configuration file responsible for dynamically importing and merging all individual message files into a single `messages` object at runtime. This `messages` object is then passed to the `NextIntlClientProvider` in `apps/frontend/src/app/[locale]/layout.tsx` to make translations available to client components.

_Example `getRequestConfig` in `src/i18n/request.ts`:_

```typescript
import { getRequestConfig } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  return {
    locale,
    messages: {
      // Load common/global messages
      ...(await import(`../../messages/${locale}/common.json`)).default,
      ...(await import(`../../messages/${locale}/main.json`)).default,
      ...(await import(`../../messages/${locale}/alerts.json`)).default,
      ...(await import(`../../messages/${locale}/navigation.json`)).default,
      ...(
        await import(
          `../components/layout/dashboard-header/messages/${locale}.json`
        )
      ).default,
      ...(
        await import(
          `../components/common/language-switcher/messages/${locale}.json`
        )
      ).default,
      ...(
        await import(
          `../components/common/theme-toggle/messages/${locale}.json`
        )
      ).default,
      ...(
        await import(
          `../components/data-display/data-table/column-filters/messages/${locale}.json`
        )
      ).default,
      ...(
        await import(
          `../components/data-display/data-table/data-table/messages/${locale}.json`
        )
      ).default,

      // Clients Feature
      ...(
        await import(
          `../features/clients/components/ClientsDashboard/messages/${locale}.json`
        )
      ).default,
      ...(
        await import(
          `../features/clients/components/ClientsDashboardSkeleton/messages/${locale}.json`
        )
      ).default,
      ...(
        await import(
          `../features/clients/components/ClientsDataTable/messages/${locale}.json`
        )
      ).default,
      ...(
        await import(
          `../features/clients/components/ClientsKpi/messages/${locale}.json`
        )
      ).default,
      ...(
        await import(
          `../features/clients/components/Columns/messages/${locale}.json`
        )
      ).default,

      // Dashboard Feature
      ...(
        await import(
          `../features/dashboard/components/RootDashboard/messages/${locale}.json`
        )
      ).default,
      ...(
        await import(
          `../features/dashboard/components/DashboardAlerts/messages/${locale}.json`
        )
      ).default,
      ...(
        await import(
          `../features/dashboard/components/DashboardKpi/messages/${locale}.json`
        )
      ).default,
      ...(
        await import(
          `../features/dashboard/components/FeatureNavigation/messages/${locale}.json`
        )
      ).default,
      ...(
        await import(
          `../features/dashboard/components/RecentActivity/messages/${locale}.json`
        )
      ).default,
      ...(
        await import(
          `../features/dashboard/components/RootDashboardSkeleton/messages/${locale}.json`
        )
      ).default,

      // Invoices Feature
      ...(
        await import(
          `../features/invoices/components/InvoicesDashboard/messages/${locale}.json`
        )
      ).default,
      ...(
        await import(
          `../features/invoices/components/InvoicesDashboardSkeleton/messages/${locale}.json`
        )
      ).default,
      ...(
        await import(
          `../features/invoices/components/Columns/messages/${locale}.json`
        )
      ).default,
      ...(
        await import(
          `../features/invoices/components/InvoiceForm/messages/${locale}.json`
        )
      ).default,
      ...(
        await import(
          `../features/invoices/components/InvoicesDataTable/messages/${locale}.json`
        )
      ).default,
      ...(
        await import(
          `../features/invoices/components/InvoicesKpi/messages/${locale}.json`
        )
      ).default,

      // Plants Feature
      ...(
        await import(
          `../features/plants/components/PlantsDashboard/messages/${locale}.json`
        )
      ).default,
      ...(
        await import(
          `../features/plants/components/PlantDashboardSkeleton/messages/${locale}.json`
        )
      ).default,
      ...(
        await import(
          `../features/plants/components/PlantsDataTable/messages/${locale}.json`
        )
      ).default,
      ...(
        await import(
          `../features/plants/components/PlantsKpi/messages/${locale}.json`
        )
      ).default,
      ...(
        await import(
          `../features/plants/components/Columns/messages/${locale}.json`
        )
      ).default,

      // Purchase Orders Feature
      ...(
        await import(
          `../features/purchase-orders/components/PurchaseOrdersDashboard/messages/${locale}.json`
        )
      ).default,
      ...(
        await import(
          `../features/purchase-orders/components/PurchaseOrderSkeleton/messages/${locale}.json`
        )
      ).default,
      ...(
        await import(
          `../features/purchase-orders/components/PurchaseOrderDataTable/messages/${locale}.json`
        )
      ).default,
      ...(
        await import(
          `../features/purchase-orders/components/PurchaseOrdersKpi/messages/${locale}.json`
        )
      ).default,
      ...(
        await import(
          `../features/purchase-orders/components/PurchaseOrdersColumns/messages/${locale}.json`
        )
      ).default,

      // Users Feature
      ...(
        await import(
          `../features/users/components/UsersDashboard/messages/${locale}.json`
        )
      ).default,
      ...(
        await import(
          `../features/users/components/UserDashboardSkeleton/messages/${locale}.json`
        )
      ).default,
      ...(
        await import(
          `../features/users/components/UsersUsersDataTable/messages/${locale}.json`
        )
      ).default,
      ...(
        await import(
          `../features/users/components/UserKpi/messages/${locale}.json`
        )
      ).default,
      ...(
        await import(
          `../features/users/components/Columns/messages/${locale}.json`
        )
      ).default,
    },
  };
});
```

**Key Requirements:**

1.  **Page-Level Locale Handling**: The page component itself (e.g., `apps/frontend/src/app/[locale]/layout.tsx`) must be an `async` function, use `use(params)` to get the `locale`, call `setRequestLocale(locale)`, and pass the `messages` object (obtained from `getRequestConfig`) to the `NextIntlClientProvider`.
2.  **Child Component Translations**: Any child components can then simply use the `useTranslations()` hook to get the correct text.
3.  **Static Generation**: Pages must export `generateStaticParams` that calls the `generateLocaleStaticParams` helper from `routing.ts`.
4.  **Component-Scoped Messages**: All translation strings must be colocated with their respective components in a `messages` subfolder and namespaced correctly.
5.  **Central Merging**: All component message files must be imported and merged in the `getRequestConfig` function located in `src/i18n/request.ts`.

### Core Technology Implementation

```typescript
Tech Stack Configuration:

├── Styling: Tailwind CSS + shadcn/ui components
├── State Management: TanStack Query
├── Forms: React Hook Form + Zod validation
├── Tables: TanStack Table + AG Grid Enterprise
├── Charts: Recharts + Tremor
├── Icons: Lucide React
├── Internationalization: next-intl (NL, DE, EN, IT)

```
