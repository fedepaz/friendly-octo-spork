# Design Conventions & Style Guide

## Typography Scale & Usage

### Headings

```tsx
// H1 - Page Title (Main page header, appears once per page)
// Use for: Dashboard title, "Expenses", "Reports", "Settings"
<h1 class="text-4xl md:text-5xl font-bold text-foreground mb-4">
  Dashboard
</h1>

// H2 - Section Header (Major sections within a page)
// Use for: "Recent Expenses", "Monthly Summary", "Budget Overview"
<h2 class="text-3xl md:text-4xl font-bold text-foreground mb-3">
  Recent Expenses
</h2>

// H3 - Subsection Header (Cards, panels, groups)
// Use for: Card titles, form section headers, "Add New Expense"
<h3 class="text-2xl md:text-3xl font-bold text-foreground mb-2">
  Add New Expense
</h3>

// H4 - Component Title (Within cards, smaller sections)
// Use for: Stat card labels, table section headers, "Total Spent"
<h4 class="text-xl md:text-2xl font-semibold text-foreground mb-2">
  Total Spent
</h4>

// H5 - Minor Headers (Small component headers)
// Use for: Form field group labels, accordion headers, "Personal Info"
<h5 class="text-lg font-semibold text-foreground mb-1">
  Personal Information
</h5>

// H6 - Micro Headers (Smallest headers)
// Use for: Inline section dividers, metadata groups
<h6 class="text-base font-semibold text-foreground mb-1">
  Details
</h6>
```

### Body Text

```tsx
// Body Large - Primary reading content
// Use for: Article text, long descriptions, feature explanations
<p class="text-lg text-foreground leading-relaxed">
  Your monthly spending summary shows...
</p>

// Body Base - Standard UI text (DEFAULT for most content)
// Use for: Button text, form labels, list items, general content
<p class="text-base text-foreground">
  Enter your expense details below
</p>

// Body Small - Secondary information
// Use for: Helper text, supporting details, metadata
<p class="text-sm text-muted-foreground">
  Last updated 2 hours ago
</p>

// Caption - Minimal text
// Use for: Timestamps, footnotes, legal text, tooltips
<p class="text-xs text-muted-foreground">
  Created on Oct 28, 2025
</p>
```

### Special Text Styles

```tsx
// Labels - Form field labels, stat labels
// Use for: Input labels, stat card labels, badge text
<label class="text-sm font-semibold uppercase tracking-wide text-foreground">
  AMOUNT
</label>

// Monetary Amounts - Always use monospace
// Use for: Dollar amounts, percentages, numeric data
<span class="text-2xl font-mono font-bold text-foreground">
  $1,234.56
</span>

// Dates & Timestamps - Use monospace for consistency
// Use for: Date displays, time displays, IDs
<time class="text-sm font-mono text-muted-foreground">
  2025-10-28
</time>

// Emphasis - Highlight important inline text
// Use for: Important words within sentences
<span class="font-semibold text-foreground">
  Important note:
</span>

// Links - Standard link styling
// Use for: Navigation links, text links
<a class="text-accent underline hover:text-accent-foreground transition-colors">
  View all expenses
</a>
```

---

## Color Usage Conventions

### Background Colors

```tsx
// Page Background
// Use for: <body>, main page wrapper
class="bg-background"

// Card/Panel Background
// Use for: Cards, panels, modals, dropdowns, forms
class="bg-card"

// Subtle Background (Muted)
// Use for: Table row hover, disabled states, secondary panels
class="bg-muted"

// Input Background
// Use for: Text inputs, textareas, selects
class="bg-input"

// Popover Background
// Use for: Tooltips, dropdown menus, context menus
class="bg-popover"
```

### Text Colors

```tsx
// Primary Text
// Use for: Main content, headings, body text
class="text-foreground"

// Card Text
// Use for: Text inside cards (auto-adjusts with bg-card)
class="text-card-foreground"

// Muted Text
// Use for: Secondary info, helper text, placeholders, timestamps
class="text-muted-foreground"

// Accent Text
// Use for: Links, highlights, info badges
class="text-accent"

// Destructive Text
// Use for: Error messages, delete warnings, negative values
class="text-destructive"

// Primary Text (on colored backgrounds)
// Use for: Text on primary buttons/badges
class="text-primary-foreground"

// Secondary Text (on colored backgrounds)
// Use for: Text on secondary buttons/badges
class="text-secondary-foreground"
```

### Button & Interactive Colors

```tsx
// Primary Action Button
// Use for: Main actions (Add, Save, Submit, Create, Confirm)
class="bg-primary text-primary-foreground"

// Secondary Action Button
// Use for: Secondary actions (Edit, Modify, Update, View Details)
class="bg-secondary text-secondary-foreground"

// Accent Button
// Use for: Special actions (Filter, Sort, Export, Download)
class="bg-accent text-accent-foreground"

// Destructive Button
// Use for: Dangerous actions (Delete, Remove, Cancel subscription)
class="bg-destructive text-destructive-foreground"

// Ghost Button (Transparent)
// Use for: Tertiary actions, icon buttons, toolbar buttons
class="bg-transparent text-foreground hover:bg-muted"

// Muted Button (Subtle)
// Use for: Disabled state, inactive tabs, cancel actions
class="bg-muted text-muted-foreground"
```

### Border Colors

```tsx
// Standard Border
// Use for: All borders (cards, inputs, buttons, dividers)
class="border-border"

// Focus Ring
// Use for: Focus states on interactive elements
class="ring-ring"

// Input Border
// Use for: Form inputs (usually same as border)
class="border-input"

// Destructive Border
// Use for: Error state inputs, warning boxes
class="border-destructive"
```

### Status & Badge Colors

```tsx
// Success/Positive
// Use for: Success badges, positive indicators
class="bg-accent text-accent-foreground"

// Warning/Alert
// Use for: Warning badges, attention needed
class="bg-secondary text-secondary-foreground"

// Error/Negative
// Use for: Error badges, overdue status
class="bg-destructive text-destructive-foreground"

// Info/Neutral
// Use for: Info badges, category tags, status labels
class="bg-primary text-primary-foreground"

// Muted/Inactive
// Use for: Inactive status, archived items
class="bg-muted text-muted-foreground"
```

---

## Spacing & Layout Conventions

### Padding Scale

```tsx
// Compact Spacing (p-2 = 8px)
// Use for: Badges, small buttons, tight layouts
class="p-2"

// Standard Spacing (p-4 = 16px)
// Use for: Default padding for most elements
class="p-4"

// Comfortable Spacing (p-6 = 24px)
// Use for: Cards, forms, panels
class="p-6"

// Generous Spacing (p-8 = 32px)
// Use for: Major sections, hero areas
class="p-8"

// Large Spacing (p-12 = 48px)
// Use for: Page-level spacing, feature sections
class="p-12"

// Directional Padding Examples
class="px-4 py-2"  // Button: horizontal 16px, vertical 8px
class="px-6 py-3"  // Larger button: horizontal 24px, vertical 12px
class="pt-8 pb-4"  // Section: top 32px, bottom 16px
```

### Margin & Gap Scale

```tsx
// Vertical Spacing Between Elements
// Small gaps (mb-2 = 8px)
// Use for: Between label and input, between lines
class="mb-2"

// Standard gaps (mb-4 = 16px)
// Use for: Between form fields, between paragraphs
class="mb-4"

// Section gaps (mb-6 = 24px)
// Use for: Between card sections, between components
class="mb-6"

// Major gaps (mb-8 = 32px)
// Use for: Between major sections on a page
class="mb-8"

// Large gaps (mb-12 = 48px)
// Use for: Between page sections, hero to content
class="mb-12"

// Using space-y for vertical stacking
class="space-y-4"  // 16px gap between all children
class="space-y-6"  // 24px gap between all children
class="space-y-8"  // 32px gap between all children

// Using gap for flex/grid layouts
class="gap-2"  // 8px gap in grid/flex
class="gap-4"  // 16px gap (standard)
class="gap-6"  // 24px gap (comfortable)
```

### Width Conventions

```tsx
// Full Width
// Use for: Mobile inputs, stacked layouts
class="w-full"

// Fixed Widths
class="w-64"   // 256px - Sidebar width
class="w-80"   // 320px - Narrow forms
class="w-96"   // 384px - Medium forms

// Max Width Constraints
class="max-w-xs"   // 320px - Narrow content
class="max-w-sm"   // 384px - Small forms
class="max-w-md"   // 448px - Medium forms
class="max-w-lg"   // 512px - Large forms
class="max-w-xl"   // 576px - Wide forms
class="max-w-2xl"  // 672px - Article width
class="max-w-4xl"  // 896px - Content width
class="max-w-6xl"  // 1152px - Page width
class="max-w-7xl"  // 1280px - Max page width

// Container
// Use for: Page-level centering
class="container mx-auto"  // Centered with breakpoint-based max-width
```

### Height Conventions

```tsx
// Auto Height (Default)
// Use for: Most elements (let content determine height)
class="h-auto"

// Fixed Heights
class="h-10"  // 40px - Standard input height
class="h-12"  // 48px - Large input height
class="h-16"  // 64px - Header height
class="h-24"  // 96px - Large button/card

// Min/Max Heights
class="min-h-screen"  // Full viewport height (pages)
class="min-h-[200px]" // Minimum content height
class="max-h-96"      // 384px max (scrollable areas)
```

---

## Position & Layout Conventions

### Grid Layouts

```tsx
// Responsive Grid - Standard Pattern
// 1 column mobile → 2 columns tablet → 4 columns desktop
class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"

// Stats Dashboard Grid (3 columns on desktop)
class="grid grid-cols-1 md:grid-cols-3 gap-6"

// Form Grid (2 columns on tablet+)
class="grid grid-cols-1 md:grid-cols-2 gap-4"

// Complex Grid with Spanning
<div class="grid grid-cols-1 lg:grid-cols-4 gap-4">
  <div class="lg:col-span-3">Main Content</div>
  <div class="lg:col-span-1">Sidebar</div>
</div>

// Auto-fit Grid (automatically fits columns)
class="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4"
```

### Flex Layouts

```tsx
// Horizontal Stack with Space Between
// Use for: Header with logo + nav, card with title + action
class="flex items-center justify-between"

// Centered Content
// Use for: Empty states, loading indicators, modals
class="flex items-center justify-center"

// Horizontal List with Gaps
// Use for: Button groups, badge lists, action buttons
class="flex gap-2"

// Vertical Stack
// Use for: Form fields, card content, article sections
class="flex flex-col gap-4"

// Responsive Flex (stack on mobile, row on desktop)
class="flex flex-col md:flex-row gap-4"

// Wrap Items
// Use for: Tag lists, badge collections, responsive toolbars
class="flex flex-wrap gap-2"
```

### Position Utilities

```tsx
// Fixed Header
// Use for: Sticky navigation, fixed toolbars
class="fixed top-0 left-0 right-0 z-50"

// Sticky Section Header
// Use for: Table headers, section titles that stick on scroll
class="sticky top-0 z-10"

// Absolute Positioning (within relative parent)
// Use for: Icons inside inputs, badges on cards, close buttons
class="relative"  // Parent
class="absolute top-2 right-2"  // Child (top-right corner)
class="absolute left-3 top-1/2 -translate-y-1/2"  // Child (left-centered)

// Centered Modal/Overlay
// Use for: Modals, dialogs, overlays
class="fixed inset-0 flex items-center justify-center z-50"
```

---

## Component-Specific Conventions

### Buttons

```tsx
// Small Button
// Use for: Inline actions, table row actions, compact UIs
class="px-4 py-2 text-sm"

// Medium Button (DEFAULT)
// Use for: Standard form actions, toolbar buttons
class="px-6 py-3 text-base"

// Large Button
// Use for: Primary CTAs, hero actions, featured buttons
class="px-8 py-4 text-lg"

// Full-Width Button (Mobile)
// Use for: Mobile forms, modal actions
class="w-full md:w-auto px-6 py-3"

// Icon Button (Square)
// Use for: Icon-only actions, toolbar icons
class="p-3 w-12 h-12"
```

### Inputs

```tsx
// Standard Input
// Use for: Text, email, password, number inputs
class="w-full px-4 py-3 text-base"

// Small Input
// Use for: Compact forms, inline editing
class="w-full px-3 py-2 text-sm"

// Large Input
// Use for: Emphasized inputs, hero forms
class="w-full px-6 py-4 text-lg"

// Input with Icon (Left)
<div class="relative">
  <span class="absolute left-3 top-1/2 -translate-y-1/2">$</span>
  <input class="w-full pl-10 pr-4 py-3" />
</div>

// Input with Icon (Right)
<div class="relative">
  <input class="w-full pl-4 pr-10 py-3" />
  <span class="absolute right-3 top-1/2 -translate-y-1/2">✓</span>
</div>
```

### Cards

```tsx
// Standard Card
// Use for: General content cards, stat cards, info panels
class="bg-card border-2 border-border shadow-[var(--shadow)] p-6"

// Compact Card
// Use for: List items, small widgets
class="bg-card border-2 border-border shadow-[var(--shadow)] p-4"

// Large Card
// Use for: Feature cards, dashboard sections
class="bg-card border-2 border-border shadow-[var(--shadow)] p-8"

// Interactive Card (Hover Effect)
// Use for: Clickable cards, selectable items
class="bg-card border-2 border-border shadow-[var(--shadow)] p-6 
       transition-all duration-150
       hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[var(--shadow-md)]
       cursor-pointer"
```

### Tables

```tsx
// Table Container
class="border-2 border-border shadow-[var(--shadow)] overflow-hidden"

// Table Header
class="bg-primary text-primary-foreground"

// Table Cell Padding
class="p-4"  // Standard cell padding

// Table Header Cell
class="p-4 text-left font-bold uppercase tracking-wide"

// Responsive Table Cells (Hide on Mobile)
class="hidden md:table-cell"  // Show on tablet+
class="hidden lg:table-cell"  // Show on desktop+

// Table Row Hover
class="hover:bg-muted transition-colors"
```

### Badges

```tsx
// Standard Badge
// Use for: Status labels, category tags
class="inline-flex items-center px-2 py-1 text-xs font-semibold uppercase tracking-wide"

// Small Badge
// Use for: Counts, notifications, inline tags
class="inline-flex items-center px-1.5 py-0.5 text-xs"

// Rounded Badge
// Use for: Notification dots, status indicators
class="inline-flex items-center justify-center w-6 h-6 rounded-full text-xs"
```

---

## Responsive Breakpoints

```tsx
// Mobile First Approach (always start with mobile base)

// sm: 640px+ (Large phones)
class="text-base sm:text-lg"

// md: 768px+ (Tablets)
class="grid-cols-1 md:grid-cols-2"

// lg: 1024px+ (Laptops)
class="hidden lg:block"

// xl: 1280px+ (Desktops)
class="container xl:max-w-7xl"

// 2xl: 1536px+ (Large desktops)
class="p-8 2xl:p-12"
```

---

## Animation & Transition Conventions

```tsx
// Standard Transition (150ms)
// Use for: Most interactive elements
class="transition-all duration-150"

// Medium Transition (300ms)
// Use for: Larger movements, color changes
class="transition-all duration-300"

// Slow Transition (500ms)
// Use for: Loading bars, progress indicators
class="transition-all duration-500"

// Hover Effects (Neo-Brutalism)
// Use for: Buttons, cards, interactive elements
class="hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[var(--shadow-md)]"

// Active Effects (Neo-Brutalism)
// Use for: Buttons when clicked
class="active:translate-x-1 active:translate-y-1 active:shadow-none"

// Focus Effects
// Use for: All focusable elements
class="focus:outline-none focus:-translate-x-0.5 focus:-translate-y-0.5 
       focus:shadow-[var(--shadow-md)] focus:border-ring"

// Loading Spinner
class="animate-spin"

// Fade In
class="animate-fade-in"

// Slide In
class="animate-slide-in-right"
```

---

## Accessibility Conventions

```tsx
// Focus Visible (Always include on interactive elements)
class="focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"

// Screen Reader Only Text
// Use for: Hidden labels, accessible descriptions
class="sr-only"

// Show on Focus (Skip Links)
class="sr-only focus:not-sr-only"

// ARIA Labels (Always add to icon-only buttons)
<button aria-label="Delete expense">
  <svg>...</svg>
</button>

// Required Fields
<label class="text-sm font-semibold uppercase">
  AMOUNT <span class="text-destructive">*</span>
</label>

// Error Messages (Link to input)
<input aria-describedby="amount-error" />
<p id="amount-error" class="text-sm text-destructive">
  Amount must be positive
</p>
```

---

## Z-Index Scale

```tsx
// Base Content
class="z-0"   // Default layer

// Dropdowns, Tooltips
class="z-10"  // Above content

// Sticky Headers
class="z-20"  // Above dropdowns

// Fixed Navigation
class="z-30"  // Above sticky elements

// Modals, Overlays
class="z-40"  // Above navigation

// Top-level Overlays (Notifications, Alerts)
class="z-50"  // Highest priority
```

---

## Quick Reference Card

```tsx
// TYPOGRAPHY
H1: text-4xl md:text-5xl font-bold
H2: text-3xl md:text-4xl font-bold
H3: text-2xl md:text-3xl font-bold
H4: text-xl md:text-2xl font-semibold
H5: text-lg font-semibold
Body: text-base (default)
Small: text-sm text-muted-foreground
Caption: text-xs text-muted-foreground
Label: text-sm font-semibold uppercase tracking-wide
Money: text-2xl font-mono font-bold
Date: text-sm font-mono text-muted-foreground

// SPACING
Compact: p-2 gap-2 mb-2
Standard: p-4 gap-4 mb-4
Comfortable: p-6 gap-6 mb-6
Generous: p-8 gap-8 mb-8
Large: p-12 gap-12 mb-12

// COLORS
Background: bg-background text-foreground
Cards: bg-card text-card-foreground
Muted: bg-muted text-muted-foreground
Primary: bg-primary text-primary-foreground
Secondary: bg-secondary text-secondary-foreground
Accent: bg-accent text-accent-foreground
Destructive: bg-destructive text-destructive-foreground

// BUTTONS
Small: px-4 py-2 text-sm
Medium: px-6 py-3 text-base
Large: px-8 py-4 text-lg

// RESPONSIVE
Mobile: grid-cols-1 (base)
Tablet: md:grid-cols-2
Desktop: lg:grid-cols-4
```
