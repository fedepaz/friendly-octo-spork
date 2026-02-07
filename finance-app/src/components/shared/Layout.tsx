// src/components/shared/Layout.tsx

import { DollarSignIcon } from "@/components/icons/DollarSignIcon";
import { HamburgerMenu } from "./HamburgerMenu";
import { Sidebar } from "./Sidebar"; // New import
import type { Child, FC } from "hono/jsx";

interface LayoutProps {
  children?: Child;
  activeNavItem?: string;
}

const Layout: FC<LayoutProps> = (props) => {
  return (
    <div class="flex h-screen bg-background">
      {/* Desktop Sidebar - Always visible on large screens */}
      <div id="desktop-sidebar-container" class="hidden lg:block">
        {" "}
        {/* Renamed ID */}
        <Sidebar activeNavItem={props.activeNavItem} />
      </div>

      {/* Main content area */}
      <div class="flex-1 flex flex-col overflow-hidden">
        {/* Mobile header - Only visible on small screens */}
        <header class="lg:hidden flex items-center justify-between p-4 bg-card border-b-2 border-border shadow-[var(--shadow)] z-30 rounded-none">
          <a
            href="/"
            class="text-4xl md:text-5xl font-bold text-foreground mb-4 hover:-translate-y-0.5 transition-all duration-150 flex items-center gap-2 rounded-none"
          >
            <DollarSignIcon /> FINANCE TRACKER
          </a>
          <HamburgerMenu />
        </header>

        {/* Mobile sidebar - Toggleable */}
        <div
          id="mobile-sidebar-container"
          class="mobile-sidebar-container"
          hx-on:click="this.classList.remove('open')"
        >
          <div class="w-80 h-full" hx-on:click="event.stopPropagation()">
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
