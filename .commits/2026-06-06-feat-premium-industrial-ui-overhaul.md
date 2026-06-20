feat: premium industrial UI/UX overhaul (FAANG-level polish)

Comprehensive refactor of the entire frontend to achieve 'FAANG-level' polish while
maintaining the project's 'Doom 64' industrial aesthetic. This overhaul introduces
premium micro-interactions, refined typographic hierarchy, and advanced visual depth.

Global Foundations:
- Inject modular typography scale and premium 200ms cubic-bezier transitions.
- Master OKLCH opacity hierarchy (replacing gray shades with semantic opacity).
- Introduce --shadow-premium and --shadow-etched for tactical depth.
- Add global 'animate-premium-in' entry animations for all major views.

Layout & Navigation:
- DashboardHeader: Implement glassmorphism (backdrop-blur-md) and refined week display.
- DesktopSidebar: Implement 'Logo-Control' pattern (logo as home/collapse toggle).
- DesktopSidebar: Refine navigation group styling with high-density hierarchy.

Dashboard & Components:
- RootDashboard: Total refactor into a high-density 'Bento Grid' layout.
- RootDashboard: Upgrade Recharts with OLED linear gradients and high-precision tooltips.
- DataTable: Implement glassmorphism headers, etched depth, and high-density row styling.
- MonthSelector: Transform into a tactical 'Control Instrument' with industrial styling.
- SlideOverForm: Implement backdrop-blur-2xl and tactical industrial footer.
- KPICard & FeatureCard: Standardize with modular scale and tactical depth.

Transaction Wizard:
- WizardModal: Refactor with backdrop-blur-2xl and high-density technical header.
- StepIndicator: Implement premium transitions and high-contrast active states.
- WizardFooter: Upgrade buttons to tactical instruments with shadow-premium.
- SmartFormProvider: Refactor error panels with high-fidelity etched styling.

Docs:
- Update components-list.md to reflect FAANG Polish status for all components.
- Finalize registry audit with 100% completion of the premium standard.
