import { html } from "hono/html";

import { HamburgerMenu } from "./HamburgerMenu";
import { Sidebar } from "./Sidebar";
import type { FC } from "hono/jsx";

interface LayoutProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children?: any;
  activeNavItem?: string;
}

const Layout: FC<LayoutProps> = (props) => {
  return html` <!DOCTYPE html>
    <html lang="en" class="dark">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Finance App</title>
        <!-- Tailwind CSS -->
        <link rel="stylesheet" href="/output.css" />
        <!-- HTMX -->
        <script src="https://unpkg.com/htmx.org@1.9.10"></script>
      </head>
      <body class="font-sans bg-background text-foreground flex">
        <div id="sidebar-container" class="lg:block hidden">
          ${(<Sidebar activeNavItem={props.activeNavItem} />)}
        </div>
        <div class="flex-1 flex flex-col">
          <header
            class="lg:hidden flex items-center justify-between p-4 bg-card border-b-2 border-border shadow-[var(--shadow)]"
          >
            <a
              href="/"
              class="text-2xl font-bold text-primary hover:-translate-y-0.5 transition-transform"
            >
              FINANCE TRACKER
            </a>
            ${(
              <HamburgerMenu onClick="htmx.toggleClass(document.getElementById('sidebar-container'), 'hidden')" />
            )}
          </header>
          <main class="page flex-1">
            <div class="container-xl p-4">${props.children}</div>
          </main>
        </div>
        <div id="toast-container" class="fixed top-0 right-0 p-4 z-50"></div>
      </body>
    </html>`;
};

export default Layout;
