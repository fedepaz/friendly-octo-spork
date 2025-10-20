// src/components/shared/Navbar.tsx
import { FC } from "hono/jsx";

export const Navbar: FC = () => {
  return (
    <header class="navbar navbar-expand-md navbar-light d-print-none">
      <div class="container-xl">
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbar-menu"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <h1 class="navbar-brand navbar-brand-autodark d-none-navbar-horizontal pe-0 pe-md-3">
          <a href="/dashboard">Finance Tracker</a>
        </h1>
        <div class="navbar-nav flex-row order-md-last">
          <div class="nav-item">
            <a href="/api/logout" class="nav-link">Sign Out</a>
          </div>
        </div>
      </div>
    </header>
  );
};
