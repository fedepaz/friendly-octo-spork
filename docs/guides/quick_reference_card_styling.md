# Finance Tracker - Developer Quick Reference Card

## 🎨 Design System

### Color Tokens (ALWAYS USE THESE)
```tsx
// Background & Surfaces
bg-background          // Main background
bg-card               // Card backgrounds
bg-popover            // Popup/modal backgrounds

// Text
text-foreground       // Primary text
text-card-foreground  // Text on cards
text-muted-foreground // Secondary text

// Interactive
bg-primary text-primary-foreground           // Primary buttons/actions
bg-secondary text-secondary-foreground       // Secondary buttons
bg-accent text-accent-foreground             // Accent elements
bg-destructive text-destructive-foreground   // Delete/danger actions

// Borders & Dividers
border-border         // Default borders
border-input          // Input borders
border-ring           // Focus rings

// States
bg-muted              // Disabled/inactive
text-muted-foreground // Muted text
```

### Shadows (ALWAYS USE CSS VARIABLES)
```tsx
shadow-[var(--shadow)]      // Default shadow
shadow-[var(--shadow-md)]   // Medium shadow (hover)
shadow-[var(--shadow-xl)]   // Large shadow (modals)
```

### ❌ NEVER USE
```tsx
// ❌ NO hardcoded colors
bg-gray-900
text-blue-500
border-red-600

// ❌ NO external libraries
import { Card } from '@tabler/core'
import { Button } from 'shadcn/ui'

// ❌ NO emojis
<h1>💸 Title</h1>

// ❌ NO React hooks
useState()
useEffect()

// ❌ NO inline props
FC<{ title: string }>
```

---

## 🏗️ Component Template

```tsx
// src/components/[feature]/[ComponentName].tsx
import type { FC } from 'hono/jsx';
import { IconName } from '../icons';

// 1. Separate interface (REQUIRED)
interface ComponentNameProps {
  data: string;
  optional?: number;
}

// 2. Functional component
export const ComponentName: FC<ComponentNameProps> = ({ data, optional }) => {
  return (
    <div class="bg-card text-card-foreground border-2 border-border shadow-[var(--shadow)] p-4">
      <div class="flex items-center gap-2">
        <IconName />
        <h3 class="font-bold">{data}</h3>
      </div>
      {optional && <p class="text-muted-foreground">{optional}</p>}
    </div>
  );
};
```

---

## 🎯 HTMX Cheat Sheet

### Basic Actions
```html
<!-- GET request -->
<button hx-get="/api/data" hx-target="#result">Load</button>

<!-- POST form -->
<form hx-post="/api/submit" hx-target="#list" hx-swap="afterbegin">

<!-- PUT update -->
<button hx-put="/api/item/123" hx-include="closest form">Save</button>

<!-- DELETE -->
<button 
  hx-delete="/api/item/123" 
  hx-target="closest tr"
  hx-swap="outerHTML swap:1s"
  hx-confirm="Delete this item?"
>Delete</button>
```

### Triggers
```html
<!-- On change -->
<select hx-get="/api/filter" hx-trigger="change">

<!-- Debounced search -->
<input 
  type="search"
  hx-get="/api/search"
  hx-trigger="keyup changed delay:300ms"
>

<!-- On load -->
<div hx-get="/api/stats" hx-trigger="load">

<!-- Polling -->
<div hx-get="/api/stats" hx-trigger="every 30s">
```

### Targeting
```html
<!-- By ID -->
hx-target="#expense-list"

<!-- Closest parent -->
hx-target="closest tr"

<!-- This element -->
hx-target="this"

<!-- Include form data -->
hx-include="closest form"
hx-include="[name='category']"
```

---

## 📱 Responsive Design

### Breakpoints (Mobile-First)
```tsx
// Default: Mobile
class="text-sm p-4"

// Tablet (768px+)
class="text-sm md:text-base md:p-6"

// Desktop (1024px+)
class="text-sm md:text-base lg:text-lg lg:p-8"

// Large Desktop (1280px+)
class="text-sm md:text-base lg:text-lg xl:text-xl"
```

### Common Patterns
```tsx
// Stack on mobile, grid on desktop
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

// Hide on mobile, show on desktop
<div class="hidden lg:block">

// Show on mobile, hide on desktop
<div class="block lg:hidden">

// Responsive padding
<div class="p-4 md:p-6 lg:p-8">
```

---

## 🎭 Icon Usage

### Import Icons
```tsx
import { 
  PlusIcon, 
  EditIcon, 
  TrashIcon, 
  SearchIcon,
  WalletIcon 
} from '../icons';
```

### Use in Components
```tsx
// In button
<button class="flex items-center gap-2">
  <PlusIcon />
  <span>Add</span>
</button>

// With size/color
<WalletIcon class="w-6 h-6 text-primary" />

// Standalone
<div class="flex items-center justify-center">
  <SearchIcon />
</div>
```

---

## ♿ Accessibility Quick Checks

```tsx
// ✅ Labels for inputs
<label for="amount" class="block text-sm font-semibold mb-2">
  Amount
</label>
<input id="amount" name="amount" type="number" />

// ✅ ARIA labels for buttons with only icons
<button aria-label="Edit expense" hx-get="/api/edit">
  <EditIcon />
</button>

// ✅ Semantic HTML
<time datetime="2025-11-07">Nov 7, 2025</time>

// ✅ Focus states
class="focus:outline-none focus:ring-2 focus:ring-ring"

// ✅ Required fields
<input required aria-required="true" />
```

---

## 🧪 Testing Component

```typescript
import { describe, it, expect } from 'bun:test';
import { ComponentName } from './ComponentName';

describe('ComponentName', () => {
  it('renders props correctly', () => {
    const html = ComponentName({ data: 'test', optional: 42 });
    
    expect(html).toContain('test');
    expect(html).toContain('42');
  });
  
  it('handles missing optional props', () => {
    const html = ComponentName({ data: 'test' });
    
    expect(html).toContain('test');
    expect(html).not.toContain('undefined');
  });
});
```

---

## 📂 File Structure

```
src/
├── components/
│   ├── expenses/          # Feature: Expenses
│   │   ├── ExpenseForm.tsx
│   │   ├── ExpenseRow.tsx
│   │   └── ExpenseFilters.tsx
│   ├── accounts/          # Feature: Accounts
│   │   ├── AccountsList.tsx
│   │   └── AccountForm.tsx
│   ├── icons/             # Central icon library
│   │   ├── index.ts       # ⭐ Export all icons here
│   │   ├── PlusIcon.tsx
│   │   ├── EditIcon.tsx
│   │   └── ...
│   └── shared/            # Shared/layout components
│       ├── Layout.tsx
│       ├── Sidebar.tsx
│       └── Page.tsx
├── pages/
│   ├── ExpensesPage.tsx
│   ├── AccountsPage.tsx
│   └── DashboardPage.tsx
└── styles/
    ├── main.css           # Global styles
    └── class.css          # Custom utility classes (rare)
```

---

## 🚨 Pre-Commit Checklist

Before committing any component:

- [ ] **Props**: Separate interface defined
- [ ] **Styling**: Only Tailwind utilities + semantic tokens
- [ ] **Colors**: No hardcoded colors (no bg-gray-\*, text-blue-\*)
- [ ] **Shadows**: Uses `shadow-[var(--shadow)]` pattern
- [ ] **Icons**: SVG imports from `../icons`, no emojis
- [ ] **HTMX**: All interactions use HTMX attributes
- [ ] **Responsive**: Mobile-first with breakpoints
- [ ] **Accessibility**: Labels, ARIA, semantic HTML
- [ ] **Dark Mode**: Uses theme-aware tokens
- [ ] **TypeScript**: Proper typing, no `any`
- [ ] **Imports**: Correct paths, from correct folders
- [ ] **No React**: No useState/useEffect/hooks

---

## 🆘 Common Issues & Fixes

### Issue: Component not updating
```tsx
// ❌ Wrong: Missing hx-target
<button hx-post="/api/submit">Submit</button>

// ✅ Correct: Specify target
<button 
  hx-post="/api/submit" 
  hx-target="#result"
  hx-swap="innerHTML"
>Submit</button>
```

### Issue: Form not resetting after submit
```tsx
// ✅ Add reset callback
<form 
  hx-post="/api/submit"
  hx-on::after-request="if(event.detail.successful) this.reset()"
>
```

### Issue: Shadow not showing
```tsx
// ❌ Wrong: Hardcoded shadow
class="shadow-lg"

// ✅ Correct: CSS variable
class="shadow-[var(--shadow)]"
```

### Issue: Icon not displaying
```tsx
// ❌ Wrong: Emoji
<span>💸</span>

// ✅ Correct: SVG component
import { WalletIcon } from '../icons';
<WalletIcon />
```

---

## 📚 Documentation Links

- **UX/UI Designer**: `/docs/design/ux-ui-designer-finance-tracker.md`
- **Frontend Engineer**: `/docs/frontend/frontend-engineer-finance-tracker.md`
- **Color System**: `/docs/design/colors.md`
- **Design Conventions**: `/docs/design/design-conventions.md`
- **Validation**: Use component validation prompt before merging

---

**Print this card and keep it visible while coding!** 🎯