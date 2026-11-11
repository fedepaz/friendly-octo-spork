# Alert Display Patterns — Design Reference

**Research date:** 2026-07-25
**Source:** sistemaDemo alert prototypes; current `dev` verification: 2026-10-30 (`1feaef2`)
**Purpose:** Document 3 alert display patterns so future projects never need to re-research this.

**Current implementation status:** V1 is the current sistemaDemo UI. V2 and V3 are
retained as design alternatives/prototypes; they are not present as feature
directories in the current `dev` tree.

---

## Why This Doc Exists

During sistemaDemo development, 3 different approaches to displaying alerts were
researched and prototyped (UX/UI only — backend is the same for all). V1 was chosen
as the current sistemaDemo implementation and best fit for its use case.

This document captures all 3 patterns so that when building a new app, you can **pick the right pattern in 5 minutes** instead of spending hours researching designs again.

---

## Backend Context (Same for All Versions)

The backend exposes 4 alert types via API endpoints. Each returns an array of alert objects with domain-specific fields. The frontend consumes these and displays them differently per version.

### Alert Types

| Alert Type | Key Fields | Severity |
|---|---|---|
| Siembra Retrasada | Partida, Codigo, Especie, Fecha Sug. Siembra, Contenedor, Cantidad | Warning |
| Falta Germinacion | Partida, Codigo, Especie, Contenedor, Invernadero | Info |
| Faltante Plantas | Partida, Codigo, Especie, Solicitadas, Germinadas, Invernadero | Critical or Warning (based on deficit ratio) |
| Falta Pre-Expedicion | Partida, Codigo, Especie, Fecha Entrega, Invernadero | Info |

### Shared Hooks

| Hook | Purpose |
|---|---|
| `useAlerts()` | 4 individual `useSuspenseQuery` hooks, one per alert type |
| `useHasAlerts(canRead)` | Composite hook firing all 4 queries in parallel, returns `{ hasAlerts, isLoading }` |
| `useAlertActions()` | Optimistic cache invalidation mutations + toast notifications |

---

## V1: Data Table Dashboard

**sistemaDemo's chosen implementation.**

### Layout

Vertical stack of data tables. The page is structured as:

1. **Summary cards row** (4 columns on lg, 2 on md) — count per alert type
2. **One section per alert type** (conditionally rendered only if count > 0):
   - Title + badge count
   - Description text
   - A `<DataTable>` (TanStack Table) with sortable columns, pagination, and PDF export

### UX Approach

- **Read-only / scan-oriented.** The user sees all alerts in tables they can sort, filter, and export to PDF.
- **No dismissal or action buttons.** There is no way to dismiss, comment on, or take action on an alert from the UI.
- All sections are shown vertically — no filtering or tabs.

### What Each Table Shows

| Alert Type | Columns |
|---|---|
| Siembra Retrasada | Partida, Codigo, Especie, Fecha Sug. Siembra, Contenedor, Cantidad |
| Falta Germinacion | Partida, Codigo, Especie, Contenedor, Invernadero |
| Faltante Plantas | Partida, Codigo, Especie, Solicitadas, Germinadas, Invernadero |
| Falta Pre-Expedicion | Partida, Codigo, Especie, Fecha Entrega, Invernadero |

### Complexity

| Metric | Value |
|---|---|
| Dashboard lines | ~160 |
| Data table wrapper | ~34 |
| Total | ~195 |
| File count | 2 |
| Local state | Minimal (Suspense only) |

### When to Use

- Users need to **scan and export** alert data (compliance reports, spreadsheets)
- Primary goal is visibility, not action
- Relatively few alerts, no need to interact individually
- Simplest possible implementation

---

## V2: Card Grid + Filter Tabs + Notification Center

### Layout

Card grid with filter tabs and a sidebar notification center:

1. **Filter tabs bar** at the top (All / Siembra / Germinacion / Faltante / Pre-Exp) with per-type counts
2. **Main area:** `grid-cols-1 md:grid-cols-2` — each alert is its own card
3. **Right sidebar** (280px, hidden on mobile): `NotificationCenter` showing audit trail notifications

### UX Approach

- **Action-oriented.** Every alert card has specific action buttons.
- **Tab filtering** via shared `FilterTabs` component to narrow by type.
- **Inline forms** for data entry (germination card has dynamic sub-partida builder).
- **Inline comments** on siembra and faltante cards (local state, not persisted).
- **Notification center** for audit trail emails (local state only).

### Card Details Per Alert Type

**SiembraRetrasadaCard:**
- Shows: Partida ID, species code/name, fecha sugerida siembra, contenedor, cantidad
- Badge: "Siembra retrasada" (warning)
- Actions: "Sembrada" (outline) and "Anular" (destructive) buttons
- Inline comment system: text input + send button

**FaltaGerminacionCard:**
- Shows: Partida ID, species code/name, contenedor, invernadero
- Badge: "Esperando recuento" (info)
- Action: "Cargar Recuento de Germinacion" button → toggles inline form with:
  - Solicitadas input
  - Dynamic sub-partida list (add/remove rows with germinadas count)
  - Shortage warning when total < solicitadas
  - Submit button ("Registrar Recuento")

**FaltantePlantasCard:**
- Shows: Partida ID, species code/name, solicited/germinated/percentage in 3-column stats row
- Visual: color-coded progress bar (green >=80%, yellow >=50%, red <50%)
- Collapsible "Detalle subpartidas" section
- Badge: "Faltante: {deficit}" (destructive)
- Inline comment system
- Action: "Intervenir y Resolver" (destructive) button

**FaltaPreExpedicionCard:**
- Shows: Partida ID, species code/name, fecha entrega, invernadero
- Badge: "Pre-expedicion faltante" (info)
- Helper text: "Se activa miercoles de la semana anterior a la fecha de entrega"
- Action: "Cargar Datos de Pre-expedicion" button

**NotificationCenter:**
- Fixed sidebar panel (w-72, hidden on large screens)
- Shows audit notifications (destino, fecha, mensaje)
- "Limpiar todo" button + per-item X dismiss (visible on hover)
- Pulsing red dot on bell icon when notifications exist

### Complexity

| Metric | Value |
|---|---|
| Dashboard lines | ~162 |
| Card components (4) | 74-169 lines each |
| NotificationCenter | ~107 |
| Total | ~700+ |
| File count | 6 |
| Local state | Heavy (forms, comments, collapsible sections) |

### When to Use

- Users need to **take action on each alert** (dismiss, register data, resolve)
- Workload is moderate (tens of alerts, not hundreds)
- You want inline data entry without navigating away from the dashboard
- Notification center for audit trail adds operational value

---

## V3: Master-Detail Panel (List + Detail)

### Layout

Master-detail split panel:

1. **Top bar:** "N alertas activas" counter + close button on mobile
2. **Two-column layout** on desktop (`grid-cols-[300px_1fr]`):
   - **Left panel (300px):** Scrollable alert list grouped by severity
   - **Right panel (flex-1):** Detail view of the selected alert
3. **On mobile:** List shown normally, selecting an alert opens a `<Sheet>` (bottom sheet, 85dvh) with the detail

### Alert List Panel (Left Side)

- All 4 alert types merged into a single unified list (`AlertListItem[]`)
- Grouped and sorted by severity: **Critical > Warning > Info**
- Each group is collapsible (expand/collapse chevron)
- Group headers: icon + label ("Criticas" / "Advertencias" / "Informativas") + count badge
- Each list item: severity dot color, species code, species name, partida ID, one-line stat summary

### Severity System

```typescript
type SeverityLevel = "critical" | "warning" | "info"
```

Rules:
- **Faltante Plantas**: deficit ratio > 50% of solicitadas → "critical", else "warning"
- **Siembra Retrasada**: always "warning"
- **Falta Germinacion** and **Falta Pre-Expedicion**: always "info"

### Detail Panel (Right Side)

- Back arrow button + partida header (ID, species code, species name)
- **Reuses V2 card components directly** (`SiembraRetrasadaCard`, `FaltaGerminacionCard`, `FaltantePlantasCard`, `FaltaPreExpedicionCard`)
- When no alert selected: empty state "Ninguna alerta seleccionada"

### UX Approach

- **Focus / drill-down oriented.** Scan compact severity-grouped list, tap to see full details and take action.
- List is compact and scannable — each item is one line with a colored severity dot.
- Selection-driven: clicking an item populates the detail panel (desktop) or opens a bottom sheet (mobile).
- `handleDismissAndClose` pattern: after dismissing, auto-closes detail panel and returns to list.
- Uses `useBreakpoint()` for desktop vs mobile layout.

### Complexity

| Metric | Value |
|---|---|
| Dashboard lines | ~231 |
| List panel | ~133 |
| Detail panel | ~178 |
| Severity utility | ~28 |
| Total (v3-specific) | ~570 |
| Reuses V2 cards | Yes (not counted above) |
| File count | 4 |
| Local state | Moderate (selectedId, useBreakpoint) |

### When to Use

- **Many alerts across all types** and users need to triage by severity before diving in
- You want a **focused workflow**: scan list → select → act → return to list
- App needs **responsive mobile experience** with bottom-sheet detail
- Severity-based prioritization matters (critical shortages vs informational reminders)
- You want V2's action capability but with a better navigational structure

---

## Comparison Table

| Aspect | V1 | V2 | V3 |
|---|---|---|---|
| **Layout** | Vertical stack of data tables | Card grid (2-col) + sidebar | Master-detail: list + panel |
| **Primary UX** | Read-only scan + export | Action cards with inline forms | Drill-down: select → act |
| **Filtering** | None (all sections visible) | Tab bar (per type) | Severity grouping (Critical/Warning/Info) |
| **Dismiss/Act** | Not supported | Per-card action buttons + forms | Reuses V2 cards in detail panel |
| **Comment System** | None | Inline on Siembra + Faltante cards | Same (via V2 cards) |
| **Data Entry** | None | Germination: dynamic sub-partida form | Same (via V2 cards) |
| **Export** | PDF export via ExportColumn | None | None |
| **Severity** | None (flat sections) | Implicit via card border color | Explicit: `getSeverity()` utility |
| **Mobile** | Works (tables scroll) | Card grid stacks, sidebar hidden | List visible, detail opens as Sheet |
| **Empty State** | Single message | Two (no alerts + no alerts of type) | Single + "no selection" state |
| **Total Lines** | ~195 | ~700+ | ~570 (reuses V2 cards) |
| **File Count** | 2 | 6 | 4 |
| **Local State** | Minimal | Heavy | Moderate |

---

## Decision Guide

**Choose V1 when:**
- Primary goal is visibility, not action
- Users scan and export data (compliance, reports)
- Few alerts, no interaction needed
- Want the simplest implementation

**Choose V2 when:**
- Users need to act on each alert (dismiss, register, resolve)
- Moderate alert volume (tens, not hundreds)
- Inline data entry is valuable
- Audit trail notifications add value

**Choose V3 when:**
- High alert volume across all types
- Triage by severity matters (critical first)
- Mobile experience is important (bottom-sheet detail)
- Want V2's action capability with better navigation

---

## Shared Components (All Versions)

| Component | Location | Purpose |
|---|---|---|
| `AlertSummaryCards` | `components/shared/` | 4-column count cards (used by V1) |
| `AlertDashboardSkeleton` | `components/shared/` | Loading skeleton (used by all) |
| `alert-columns.tsx` | `components/shared/` | TanStack Table column definitions (used by V1) |
| `FilterTabs` | `components/shared/` | Tab bar with per-type counts (used by V2) |

---

## What sistemaDemo Chose

**V1** — Because:
- Alerts are for visibility, not action in sistemaDemo's workflow
- Users scan for issues and handle them offline or in the field
- Simplest implementation = fastest delivery
- No need for inline forms or comments

When building a new app, start with V1. Upgrade to V2 or V3 only if users actually need to act on alerts from the dashboard.
