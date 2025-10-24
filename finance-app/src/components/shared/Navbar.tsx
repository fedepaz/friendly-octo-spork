import type { FC } from "hono/jsx";

interface NavbarProps {
  activeNavItem?: string;
}

export const Navbar: FC<NavbarProps> = ({ activeNavItem }) => {
  return (
    <nav class="bg-background text-foreground border-b-2 border-border p-4 flex justify-between items-center">
      <div class="text-2xl font-bold uppercase">
        <a href="/" class="hover:text-primary transition-colors duration-150">
          Finance Tracker
        </a>
      </div>
      <ul class="flex space-x-4">
        <li>
          <a
            href="/accounts"
            class={`neo-btn ${
              activeNavItem === "accounts"
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground"
            } text-sm py-2 px-3`}
          >
            ACCOUNTS
          </a>
        </li>
        <li>
          <a
            href="/categories"
            class={`neo-btn ${
              activeNavItem === "categories"
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground"
            } text-sm py-2 px-3`}
          >
            CATEGORIES
          </a>
        </li>
        <li>
          <a
            href="/recurrences"
            class={`neo-btn ${
              activeNavItem === "recurrences"
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground"
            } text-sm py-2 px-3`}
          >
            RECURRENCES
          </a>
        </li>
        <li>
          <a
            href="/logout"
            class={`neo-btn ${
              activeNavItem === "logout"
                ? "bg-destructive text-destructive-foreground"
                : "bg-muted text-muted-foreground"
            } text-sm py-2 px-3`}
          >
            LOGOUT
          </a>
        </li>
      </ul>
    </nav>
  );
};
