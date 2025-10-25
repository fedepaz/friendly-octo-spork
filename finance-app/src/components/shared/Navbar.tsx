import type { FC } from "hono/jsx";

interface NavLinkProps {
  href: string;
  active: boolean;
  children: string;
}

const NavLink: FC<NavLinkProps> = ({ href, active, children }) => (
  <a
    href={href}
    class={`
      px-4 py-2
      font-semibold uppercase tracking-wide text-sm
      transition-all duration-150
      ${active
        ? "bg-primary text-primary-foreground border-2 border-border shadow-[var(--shadow)]"
        : "hover:bg-muted hover:-translate-y-0.5"
      }
    `}
    aria-label={`Navigate to ${children}`}
  >
    {children}
  </a>
);

interface NavbarProps {
  activeNavItem?: string;
}

export const Navbar: FC<NavbarProps> = ({ activeNavItem }) => (
  <nav class="bg-card text-card-foreground border-b-2 border-border shadow-[var(--shadow)]">
    <div class="container mx-auto px-4">
      <div class="flex items-center justify-between h-16">
        <a href="/" class="text-2xl font-bold text-primary hover:-translate-y-0.5 transition-transform">
          FINANCE TRACKER
        </a>
        <div class="flex gap-1">
          <NavLink href="/" active={activeNavItem === "dashboard"}>DASHBOARD</NavLink>
          <NavLink href="/expenses" active={activeNavItem === "expenses"}>EXPENSES</NavLink>
          <NavLink href="/accounts" active={activeNavItem === "accounts"}>ACCOUNTS</NavLink>
          <NavLink href="/categories" active={activeNavItem === "categories"}>CATEGORIES</NavLink>
        </div>
        <form action="/logout" method="post">
          <button
            type="submit"
            class="bg-secondary text-secondary-foreground border-2 border-border shadow-[var(--shadow)] px-4 py-2 text-sm font-bold uppercase hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[var(--shadow-md)] transition-all duration-150"
            aria-label="Logout"
          >
            LOGOUT
          </button>
        </form>
      </div>
    </div>
  </nav>
);
