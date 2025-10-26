import type { FC } from "hono/jsx";

interface SidebarProps {
  activeNavItem?: string;
}

export const Sidebar: FC<SidebarProps> = ({ activeNavItem }) => {
  const navLinks = [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/expenses", label: "Expenses" },
    { href: "/accounts", label: "Accounts" },
    { href: "/categories", label: "Categories" },
    { href: "/profile", label: "Profile" },
  ];

  return (
    <aside class="sidebar p-4 bg-card text-card-foreground border-r-2 border-border shadow-[var(--shadow)] h-full flex flex-col fixed inset-y-0 left-0 transform -translate-x-full lg:translate-x-0 transition-transform duration-200 ease-in-out z-40">
      <div class="text-2xl font-bold text-primary mb-6">FINANCE TRACKER</div>
      <nav
        class="flex flex-col gap-2"
        role="navigation"
        aria-label="Main navigation"
      >
        {navLinks.map((link) => (
          <a
            href={link.href}
            class={`px-4 py-2 rounded-md text-sm font-semibold uppercase tracking-wide transition-all duration-150 hover:bg-muted hover:text-muted-foreground
              ${
                activeNavItem === link.href
                  ? "bg-secondary text-secondary-foreground border-l-4 border-accent"
                  : "text-foreground"
              }`}
            aria-current={activeNavItem === link.href ? "page" : undefined}
          >
            {link.label}
          </a>
        ))}
      </nav>
    </aside>
  );
};
