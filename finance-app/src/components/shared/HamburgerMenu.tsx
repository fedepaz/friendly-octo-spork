// src/components/shared/HamburgerMenu.tsx

import type { FC } from "hono/jsx";
import { Button } from "@/components/shared/Button"; // New import

export const HamburgerMenu: FC = () => {
  return (
    <Button
      type="button" // Explicitly set type to "button"
      class="p-3 w-12 h-12 rounded-none flex flex-col items-center justify-center gap-1 bg-primary text-primary-foreground border-2 border-border shadow-[var(--shadow)] transition-all duration-150 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[var(--shadow-md)] active:translate-x-1 active:translate-y-1 active:shadow-none"
      hx-on:click="
        htmx.toggleClass(document.getElementById('sidebar-container'), 'hidden');
      "
      aria-label="Toggle navigation"
      aria-expanded="false"
      aria-controls="sidebar-container"
    >
      <div class="w-6 h-0.5 bg-primary-foreground"></div>
      <div class="w-6 h-0.5 bg-primary-foreground"></div>
      <div class="w-6 h-0.5 bg-primary-foreground"></div>
    </Button>
  );
};
