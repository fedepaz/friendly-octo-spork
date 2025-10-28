// src/components/shared/Sidebar.tsx

import type { FC } from "hono/jsx";

interface SidebarProps {
  activeNavItem?: string;
  isMobile?: boolean;
}

export const Sidebar: FC<SidebarProps> = ({
  activeNavItem,
  isMobile = false,
}) => {
  const navLinks = [
    { href: "/dashboard", label: "Dashboard", icon: "📊" },
    { href: "/expenses", label: "Expenses", icon: "💰" },
    { href: "/accounts", label: "Accounts", icon: "🏦" },
    { href: "/categories", label: "Categories", icon: "📁" },
    { href: "/profile", label: "Profile", icon: "👤" },
  ];

  return (
    <aside
      class={`
        w-80 h-full
        bg-card text-card-foreground
        border-r-2 border-border
        shadow-[var(--shadow)]
        flex flex-col
        ${isMobile ? "relative" : ""}
      `}
    >
      {/* Sidebar Header */}
      <div class="p-6 border-b-2 border-border bg-primary/5">
        <a href="/" class="block group">
          <div class="flex items-center gap-3">
            <div class="text-4xl transition-transform duration-150 group-hover:scale-110">
              💸
            </div>
            <div>
              <h1 class="text-2xl font-bold text-primary tracking-tight">
                FINANCE
              </h1>
              <p class="text-sm text-muted-foreground uppercase tracking-wider">
                Tracker
              </p>
            </div>
          </div>
        </a>
      </div>

      {/* Navigation */}
      <nav
        class="flex-1 p-4 space-y-2 overflow-y-auto"
        role="navigation"
        aria-label="Main navigation"
      >
        {navLinks.map((link) => {
          const isActive = activeNavItem === link.href;
          return (
            <a
              key={link.href}
              href={link.href}
              class={`
                group
                flex items-center gap-3
                px-4 py-3
                rounded-md
                text-sm font-semibold uppercase tracking-wide
                transition-all duration-150
                border-2
                ${
                  isActive
                    ? "bg-primary text-primary-foreground border-primary shadow-[var(--shadow)]"
                    : "bg-card text-foreground border-transparent hover:bg-muted hover:border-border hover:-translate-x-0.5 hover:shadow-[var(--shadow-sm)]"
                }
              `}
              aria-current={isActive ? "page" : undefined}
            >
              <span
                class={`
                  text-2xl
                  transition-transform duration-150
                  ${isActive ? "scale-110" : "group-hover:scale-110"}
                `}
              >
                {link.icon}
              </span>
              <span class="flex-1">{link.label}</span>
              {isActive && (
                <span class="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
              )}
            </a>
          );
        })}
      </nav>

      {/* Sidebar Footer */}
      <div class="p-4 border-t-2 border-border bg-muted/30">
        <div class="bg-accent/10 border-2 border-accent/30 rounded-md p-4">
          <div class="flex items-start gap-3">
            <span class="text-2xl">💡</span>
            <div>
              <p class="text-xs font-semibold uppercase tracking-wide text-accent mb-1">
                Pro Tip
              </p>
              <p class="text-xs text-muted-foreground leading-relaxed">
                Track daily expenses to stay within budget
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile close button */}
      {isMobile && (
        <button
          onclick="document.getElementById('sidebar-container').classList.add('hidden')"
          class="
            absolute top-4 right-4
            bg-destructive text-destructive-foreground
            border-2 border-border
            w-10 h-10
            rounded-md
            flex items-center justify-center
            font-bold text-xl
            transition-all duration-150
            hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[var(--shadow)]
          "
          aria-label="Close sidebar"
        >
          ✕
        </button>
      )}
    </aside>
  );
};
