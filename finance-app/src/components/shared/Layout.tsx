import { DollarSignIcon } from "../icons/DollarSignIcon";
// src/components/shared/Layout.tsx

import { HamburgerMenu } from "./HamburgerMenu";
import { Sidebar } from "./Sidebar";
import type { FC } from "hono/jsx";

interface LayoutProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children?: any;
  activeNavItem?: string;
}

const Layout: FC<LayoutProps> = (props) => {
  return (
    <div class="flex h-screen bg-background">
      {/* Desktop Sidebar - Always visible on large screens */}
      <div id="sidebar-container" class="hidden lg:block">
        <Sidebar activeNavItem={props.activeNavItem} />
      </div>

      {/* Main content area */}
      <div class="flex-1 flex flex-col overflow-hidden">
        {/* Mobile header - Only visible on small screens */}
        <header class="lg:hidden flex items-center justify-between p-4 bg-card border-b-2 border-border shadow-[var(--shadow)] z-30">
          <a
            href="/"
            class="text-4xl md:text-5xl font-bold text-foreground mb-4 hover:-translate-y-0.5 transition-all duration-150 flex items-center gap-2"
          >
            <DollarSignIcon /> FINANCE TRACKER
          </a>
          <HamburgerMenu onClick="htmx.toggleClass(document.getElementById('sidebar-container'), 'hidden')" />
        </header>

        {/* Mobile sidebar - Toggleable */}
        <div
          id="sidebar-container"
          class="hidden fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
        >
          <div class="w-80 h-full" onclick="event.stopPropagation()">
            <Sidebar activeNavItem={props.activeNavItem} isMobile={true} />
          </div>
        </div>

        {/* Main content */}
        <main class="flex-1 overflow-y-auto bg-background">
          <div class="container mx-auto p-4 md:p-6 lg:p-8 max-w-7xl">
            {props.children}
          </div>
        </main>
      </div>

      {/* Toast container */}
      <div
        id="toast-container"
        class="fixed top-4 right-4 p-4 z-50 space-y-2"
      ></div>
    </div>
  );
};
export default Layout;
