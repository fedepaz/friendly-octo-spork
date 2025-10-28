// src/components/shared/HamburgerMenu.tsx

import type { FC } from "hono/jsx";

export const HamburgerMenu: FC = () => {
  return (
    <button
      class="hamburger-menu"
      hx-on:click="
        const sidebar = document.getElementById('sidebar-container').querySelector('.sidebar');
        const backdrop = document.getElementById('sidebar-backdrop');
        sidebar.classList.toggle('hidden');
        backdrop.classList.toggle('visible');
      "
      aria-label="Toggle navigation"
      aria-expanded="false"
      aria-controls="sidebar-container"
    >
      <div class="hamburger-line"></div>
      <div class="hamburger-line"></div>
      <div class="hamburger-line"></div>
    </button>
  );
};
