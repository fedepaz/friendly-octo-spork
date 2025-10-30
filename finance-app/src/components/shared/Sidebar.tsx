import { Icon } from "./Icon"; // New import
import { Button } from "./Button"; // New import
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
    { href: "/dashboard", label: "Dashboard", icon: "line-chart" },
    { href: "/transactions", label: "Transactions", icon: "wallet" },
    { href: "/accounts", label: "Accounts", icon: "landmark" },
    { href: "/categories", label: "Categories", icon: "folder" },
  ];

  return (
    <aside
      class={`
        w-80 h-full
        bg-card text-card-foreground
        border-r-2 border-border
        shadow-[var(--shadow)]
        flex flex-col
        rounded-none
        ${isMobile ? "relative" : ""}
      `}
    >
      {/* Sidebar Header */}
      <div class="p-6 border-b-2 border-border bg-primary/5 rounded-none">
        <a href="/" class="block group">
          <div class="flex items-center gap-3">
            <div class="text-4xl transition-transform duration-150 group-hover:scale-110">
              <Icon name="dollar-sign" />
            </div>
            <div>
              <h1 class="text-4xl md:text-5xl font-bold text-foreground mb-4">
                FINANCE
              </h1>
              <p class="text-sm text-muted-foreground">Tracker</p>
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
                rounded-none 
                text-sm font-semibold uppercase tracking-wide
                transition-all duration-150
                border-2
                ${
                  isActive
                    ? "bg-primary text-primary-foreground border-primary shadow-[var(--shadow)] active:translate-x-1 active:translate-y-1 active:shadow-none"
                    : "bg-card text-foreground border-transparent shadow-[var(--shadow)] hover:bg-muted hover:border-border hover:-translate-x-0.5 hover:shadow-[var(--shadow-sm)] active:translate-x-1 active:translate-y-1 active:shadow-none"
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
                <Icon name={link.icon} />
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
      <div class="p-4 border-t-2 border-border bg-muted/30 rounded-none">
        <div class="bg-accent/10 border-2 border-accent/30 rounded-none p-4">
          <div class="flex items-start gap-3">
            <span class="text-2xl">
              <Icon name="lightbulb" />
            </span>
            <div>
              <p class="text-sm font-semibold uppercase tracking-wide text-foreground">
                Pro Tip
              </p>
              <p class="text-xs text-muted-foreground">
                Track daily expenses to stay within budget
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile close button */}
      {isMobile && (
        <Button
          type="button" // Explicitly set type to "button"
          hx-on:click="document.getElementById('mobile-sidebar-container').classList.add('hidden')"
          class="
            absolute top-4 right-4
            bg-destructive text-destructive-foreground
            border-2 border-border
            w-10 h-10
            rounded-none
            flex items-center justify-center
            font-bold text-xl
            transition-all duration-150
            shadow-[var(--shadow)]
            hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[var(--shadow)]
            active:translate-x-1 active:translate-y-1 active:shadow-none
          "
          aria-label="Close sidebar"
        >
          <Icon name="x" />
        </Button>
      )}
    </aside>
  );
};
