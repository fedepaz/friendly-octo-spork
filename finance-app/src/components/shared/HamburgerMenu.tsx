import { FC } from 'hono/jsx';

export const HamburgerMenu: FC<{ onClick: string }> = ({ onClick }) => {
  return (
    <button
      class="hamburger-menu"
      hx-on:click={onClick}
      aria-label="Toggle navigation"
      aria-expanded="false" // This will be toggled by HTMX
      aria-controls="sidebar-container"
    >
      <div class="line"></div>
      <div class="line"></div>
      <div class="line"></div>
    </button>
  );
};
