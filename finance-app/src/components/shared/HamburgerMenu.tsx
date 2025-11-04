// src/components/shared/HamburgerMenu.tsx
import type { FC } from "hono/jsx";
import { Button } from "@/components/shared/Button";
import { html } from "hono/html";

export const HamburgerMenu: FC = () => {
  return (
    <>
      <Button
        type="button"
        id="hamburger-menu"
        class="p-3 w-12 h-12 rounded-none flex flex-col items-center justify-center gap-1 bg-primary text-primary-foreground border-2 border-border shadow-[var(--shadow)] transition-all duration-150 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[var(--shadow-md)] active:translate-x-1 active:translate-y-1 active:shadow-none"
        aria-label="Toggle navigation"
        aria-controls="mobile-sidebar-container"
        aria-expanded="false"
      >
        <div class="w-6 h-0.5 bg-primary-foreground"></div>
        <div class="w-6 h-0.5 bg-primary-foreground"></div>
        <div class="w-6 h-0.5 bg-primary-foreground"></div>
      </Button>

      {html`
        <script>
          document.addEventListener("DOMContentLoaded", function () {
            const hamburger = document.getElementById("hamburger-menu");
            const sidebar = document.getElementById("mobile-sidebar-container");

            if (hamburger && sidebar) {
              hamburger.addEventListener("click", function () {
                sidebar.classList.toggle("open");
                const isExpanded = sidebar.classList.contains("open");
                this.setAttribute("aria-expanded", isExpanded);
              });
            }
          });
        </script>
      `}
    </>
  );
};
