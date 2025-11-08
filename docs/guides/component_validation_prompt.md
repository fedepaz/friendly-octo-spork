# Component Validation Prompt - Finance Tracker

Use this prompt to validate any component against project standards.

---

## Validation Request Template

```
You are a Component Quality Assurance Agent for the Personal Finance Tracker project.

Your task is to validate the following component against project standards.

COMPONENT TO VALIDATE:

[x] categories/CategoryBadge.tsx
[x] categories/CategoryForm.tsx
[x] categories/CategoriesList.tsx
[x] pages/CategoriesPage.tsx

---

[x] accounts/AccountsList.tsx
[x] accounts/AccountForm.tsx
[x] accounts/AccountCard.tsx
[x] pages/AccountsPage.tsx

---

[x] recurrences/RecurrencesList.tsx
[x] recurrences/RecurrenceForm.tsx
[x] recurrences/RecurrenceCard.tsx
[x] pages/RecurrencesPage.tsx

---

[x] transactions/TransactionsTable.tsx
[x] transactions/TransactionRow.tsx
[x] transactions/TransactionForm.tsx
[x] transactions/TransactionFilters.tsx
[x] pages/TransactionsPage.tsx

---

[x] dashboard/StatCard.tsx
[x] dashboard/RecentActivity.tsx
[x] dashboard/MonthlyChart.tsx
[x] dashboard/BudgetProgressCard.tsx
[x] pages/DashboardPage.tsx

---

[x] shared/Button.tsx
[x] shared/LinkButton.tsx
[x] shared/Icon.tsx (Note: Component was non-existent; functionality integrated directly into RecurrenceCard.tsx)
[x] shared/Toast.tsx
[x] shared/Modal.tsx
[x] shared/Sidebar.tsx
[x] shared/HamburgerMenu.tsx
[x] shared/Layout.tsx
[x] pages/ErrorPage.tsx
[x] pages/LoginPage.tsx

VALIDATION CHECKLIST:

## 1. Tech Stack Compliance
- [ ] Uses Hono JSX (import type { FC } from 'hono/jsx')
- [ ] NO React hooks (useState, useEffect)
- [ ] NO client-side state management
- [ ] Server-side rendering only

## 2. Styling Standards
- [ ] ONLY Tailwind utility classes used
- [ ] NO external UI libraries (Tabler, shadcn, etc.)
- [ ] Uses semantic color tokens (bg-primary, text-foreground)
- [ ] NO hardcoded colors (no bg-gray-900, text-blue-500)
- [ ] Uses CSS variables: shadow-[var(--shadow)]
- [ ] Custom CSS only in main.css/class.css (if any)

## 3. Dark Mode
- [ ] Designed for dark mode by default
- [ ] Uses theme-aware tokens
- [ ] Sufficient contrast (WCAG AA)

## 4. Icon System
- [ ] Uses SVG icons from '../icons' import
- [ ] NO emoji usage (❌ 💸 ⚠️)
- [ ] Icons properly sized and colored

## 5. Component Structure
- [ ] Separate interface for props (not inline)
- [ ] Interface named: [ComponentName]Props
- [ ] Proper TypeScript typing
- [ ] Functional component pattern: export const Name: FC<Props>

## 6. HTMX Integration
- [ ] Uses HTMX attributes for interactions
- [ ] Proper hx-target selectors
- [ ] Correct hx-swap strategy
- [ ] Server endpoints referenced correctly

## 7. Client-Side JavaScript
- [ ] Minimal or no client-side JS
- [ ] If used, only for micro-interactions/animations
- [ ] No complex logic on client
- [ ] Progressive enhancement approach

## 8. Responsive Design
- [ ] Mobile-first approach
- [ ] Uses Tailwind breakpoints (md:, lg:)
- [ ] Works on all screen sizes
- [ ] No horizontal scroll

## 9. Accessibility
- [ ] Semantic HTML elements
- [ ] Proper ARIA labels where needed
- [ ] Keyboard navigation support
- [ ] Focus states defined
- [ ] Screen reader friendly

## 10. File Organization
- [ ] Follows vertical slicing pattern
- [ ] Located in correct feature folder
- [ ] Imports from correct paths
- [ ] Icons imported from '../icons'

---

ANALYSIS REQUIRED:

For each failed check:
1. Quote the problematic code
2. Explain why it violates standards
3. Provide corrected code example
4. Reference specific documentation section

For each passed check:
✓ Simply confirm compliance

FINAL OUTPUT:
- Validation Score: X/10 categories passed
- Critical Issues: [list blocking issues]
- Warnings: [list non-blocking issues]
- Refactored Component: [provide corrected version if needed]
- Documentation References: [link to relevant sections]
```

---

## Quick Validation Examples

### ❌ INVALID Component (Multiple Violations)

```tsx
import { FC } from "hono/jsx";

// ❌ No separate interface
export const ExpenseCard: FC<{ title: string; amount: number }> = ({
  title,
  amount,
}) => (
  // ❌ Hardcoded colors
  <div class="bg-gray-900 text-white p-4 rounded-lg">
    {/* ❌ Emoji instead of SVG icon */}
    <h3 class="text-xl">💰 {title}</h3>
    {/* ❌ No semantic token */}
    <p class="text-blue-500 text-2xl">${amount}</p>
    {/* ❌ No HTMX, using onClick */}
    <button onClick="handleClick()" class="bg-green-500">
      Submit
    </button>
  </div>
);
```

**Issues Found:**

1. ❌ Inline props type definition
2. ❌ Hardcoded colors (bg-gray-900, text-white, text-blue-500, bg-green-500)
3. ❌ Emoji usage (💰)
4. ❌ No semantic tokens
5. ❌ onClick handler (should use HTMX)

---

### ✅ VALID Component (Passes All Checks)

```tsx
import type { FC } from "hono/jsx";
import { WalletIcon } from "../icons";

interface ExpenseCardProps {
  title: string;
  amount: number;
}

export const ExpenseCard: FC<ExpenseCardProps> = ({ title, amount }) => (
  <div class="bg-card text-card-foreground border-2 border-border shadow-[var(--shadow)] p-4 rounded-lg">
    <h3 class="text-xl font-semibold flex items-center gap-2">
      <WalletIcon />
      {title}
    </h3>
    <p class="text-primary text-2xl font-mono mt-2">${amount.toFixed(2)}</p>
    <button
      hx-post="/api/expenses"
      hx-target="#expense-list"
      class="mt-4 bg-primary text-primary-foreground border-2 border-border shadow-[var(--shadow)] px-4 py-2 font-bold uppercase transition-all duration-150 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[var(--shadow-md)]"
    >
      Submit
    </button>
  </div>
);
```

**Validation Score: 10/10** ✅

- ✓ Separate interface
- ✓ Semantic color tokens
- ✓ CSS variables for shadows
- ✓ SVG icon import
- ✓ HTMX attributes
- ✓ No hardcoded colors
- ✓ Proper TypeScript typing
- ✓ Dark mode compatible
- ✓ Responsive design
- ✓ Accessible

---

## Common Violations & Fixes

### 1. Hardcoded Colors

**❌ Wrong:**

```tsx
<div class="bg-gray-900 text-white border-blue-500">
```

**✅ Correct:**

```tsx
<div class="bg-card text-card-foreground border-border">
```

---

### 2. Emoji Usage

**❌ Wrong:**

```tsx
<h1>💸 Finance Tracker</h1>
```

**✅ Correct:**

```tsx
import { WalletIcon } from "../icons";

<h1 class="flex items-center gap-2">
  <WalletIcon />
  Finance Tracker
</h1>;
```

---

### 3. Inline Props Types

**❌ Wrong:**

```tsx
export const Card: FC<{ title: string }> = ({ title }) => (
```

**✅ Correct:**

```tsx
interface CardProps {
  title: string;
}

export const Card: FC<CardProps> = ({ title }) => (
```

---

### 4. Client-Side State

**❌ Wrong:**

```tsx
const [count, setCount] = useState(0);
```

**✅ Correct:**

```tsx
// Let server manage state via HTMX
<div hx-get="/api/count" hx-trigger="load">
  {/* Server returns current count */}
</div>
```

---

### 5. Missing CSS Variables

**❌ Wrong:**

```tsx
<div style="box-shadow: 0 4px 6px rgba(0,0,0,0.1)">
```

**✅ Correct:**

```tsx
<div class="shadow-[var(--shadow)]">
```

---

### 6. External UI Libraries

**❌ Wrong:**

```tsx
import { Card } from "@tabler/core";

<Card>Content</Card>;
```

**✅ Correct:**

```tsx
<div class="bg-card text-card-foreground border-2 border-border shadow-[var(--shadow)] p-4">
  Content
</div>
```

---

## Automated Validation Script (Optional)

```bash
#!/bin/bash
# validate-component.sh

COMPONENT_FILE=$1

echo "Validating: $COMPONENT_FILE"

# Check 1: No external UI libraries
if grep -q "from '@tabler" "$COMPONENT_FILE" || grep -q "from 'shadcn" "$COMPONENT_FILE"; then
  echo "❌ FAIL: External UI library detected"
fi

# Check 2: No hardcoded colors
if grep -q "bg-gray-\|text-blue-\|bg-red-" "$COMPONENT_FILE"; then
  echo "❌ FAIL: Hardcoded colors detected"
fi

# Check 3: No emoji
if grep -qP '[^\x00-\x7F]' "$COMPONENT_FILE"; then
  echo "⚠️  WARNING: Non-ASCII characters detected (possible emoji)"
fi

# Check 4: Has separate interface
if ! grep -q "interface.*Props" "$COMPONENT_FILE"; then
  echo "⚠️  WARNING: No Props interface found"
fi

# Check 5: No React hooks
if grep -q "useState\|useEffect" "$COMPONENT_FILE"; then
  echo "❌ FAIL: React hooks detected"
fi

echo "Validation complete"
```

---

## Documentation References

- **UX/UI Designer Agent**: `/docs/design/ux-ui-designer-finance-tracker.md`
- **Frontend Engineer Agent**: `/docs/frontend/frontend-engineer-finance-tracker.md`
- **Color Tokens**: `/docs/design/colors.md`
- **Design Conventions**: `/docs/design/design-conventions.md`
- **File Structure**: `/docs/frontend/file-structure.md`

---

**Usage**: Paste any component code into this validation template and systematically check each category. Document all violations and provide corrected code.
