// src/components/shared/HamburgerMenu.tsx
import type { FC } from "hono/jsx";
import { Button } from "@/components/shared/Button";

export const HamburgerMenu: FC = () => {
  return (
    <Button
      type="button"
      id="hamburger-menu"
      class="p-3 w-12 h-12 rounded-none flex flex-col items-center justify-center gap-1 bg-primary text-primary-foreground border-2 border-border shadow-[var(--shadow)] transition-all duration-150 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[var(--shadow-md)] active:translate-x-1 active:translate-y-1 active:shadow-none"
      aria-label="Toggle navigation"
      aria-controls="mobile-sidebar-container"
      aria-expanded="false"
      hx-on:click="const sidebar = document.getElementById('mobile-sidebar-container'); if (sidebar) { sidebar.classList.toggle('open'); this.setAttribute('aria-expanded', sidebar.classList.contains('open')); }"
    >
      <div class="w-6 h-0.5 bg-primary-foreground"></div>
      <div class="w-6 h-0.5 bg-primary-foreground"></div>
      <div class="w-6 h-0.5 bg-primary-foreground"></div>
    </Button>
  );
};
