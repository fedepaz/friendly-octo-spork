import type { FC } from "hono/jsx";

interface NavbarProps {
  activeNavItem?: string;
}

export const Navbar: FC<NavbarProps> = ({ activeNavItem }) => (
  <nav
    class="
    bg-card text-card-foreground
    border-b-2 border-border
    shadow-[var(--shadow)]
  "
  >
    <div class="container mx-auto px-4">
      <div class="flex items-center justify-between h-16">
        {/* Logo */}
        <a
          href="/"
          class="
            text-2xl font-bold
            text-primary
            hover:-translate-y-0.5
            transition-transform
          "
        >
          FINANCE TRACKER
        </a>

        {/* Navigation Links */}
        <div class="flex gap-1">
          <a
            href="/"
            class={`
              px-4 py-2
              font-semibold uppercase tracking-wide text-sm
              transition-all duration-150
              ${
                activeNavItem === "dashboard"
                  ? "bg-primary text-primary-foreground border-2 border-border shadow-[var(--shadow)]"
                  : "hover:bg-muted hover:-translate-y-0.5"
              }
            `}
          >
            DASHBOARD
          </a>
          <a
            href="/expenses"
            class={`
              px-4 py-2
              font-semibold uppercase tracking-wide text-sm
              transition-all duration-150
              ${
                activeNavItem === "expenses"
                  ? "bg-primary text-primary-foreground border-2 border-border shadow-[var(--shadow)]"
                  : "hover:bg-muted hover:-translate-y-0.5"
              }
            `}
          >
            EXPENSES
          </a>
          <a
            href="/accounts"
            class={`
              px-4 py-2
              font-semibold uppercase tracking-wide text-sm
              transition-all duration-150
              ${
                activeNavItem === "accounts"
                  ? "bg-primary text-primary-foreground border-2 border-border shadow-[var(--shadow)]"
                  : "hover:bg-muted hover:-translate-y-0.5"
              }
            `}
          >
            ACCOUNTS
          </a>
          <a
            href="/categories"
            class={`
              px-4 py-2
              font-semibold uppercase tracking-wide text-sm
              transition-all duration-150
              ${
                activeNavItem === "categories"
                  ? "bg-primary text-primary-foreground border-2 border-border shadow-[var(--shadow)]"
                  : "hover:bg-muted hover:-translate-y-0.5"
              }
            `}
          >
            CATEGORIES
          </a>
        </div>

        {/* User Menu */}
        <div>
          <button
            class="
            bg-secondary text-secondary-foreground
            border-2 border-border
            shadow-[var(--shadow)]
            px-4 py-2
            text-sm font-bold uppercase
            hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[var(--shadow-md)]
            transition-all duration-150
          "
          >
            LOGOUT
          </button>
        </div>
      </div>
    </div>
  </nav>
);
