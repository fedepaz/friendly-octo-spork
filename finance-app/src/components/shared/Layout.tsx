// src/components/shared/Layout.tsx
import { FC } from "hono/jsx";

export const Layout: FC = ({ children }) => {
  return (
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Finance Tracker</title>
        {/* Tabler CSS */}
        <link
          href="https://cdn.jsdelivr.net/npm/@tabler/core@latest/dist/css/tabler.min.css"
          rel="stylesheet"
        />
        {/* HTMX */}
        <script src="https://unpkg.com/htmx.org@1.9.10"></script>
        {/* Custom styles */}
        <style>{`
          .htmx-indicator {
            display: none;
          }
          .htmx-request .htmx-indicator {
            display: inline-block;
          }
        `}</style>
      </head>
      <body>
        <div class="page">
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

          <div class="navbar-expand-md">
            <div class="collapse navbar-collapse" id="navbar-menu">
              <div class="navbar navbar-light">
                <div class="container-xl">
                  <ul class="navbar-nav">
                    <li class="nav-item">
                      <a class="nav-link" href="/dashboard">
                        <span class="nav-link-icon">📊</span>
                        <span class="nav-link-title">Dashboard</span>
                      </a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link" href="/transactions">
                        <span class="nav-link-icon">💸</span>
                        <span class="nav-link-title">Transactions</span>
                      </a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link" href="/accounts">
                        <span class="nav-link-icon">🏦</span>
                        <span class="nav-link-title">Accounts</span>
                      </a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link" href="/categories">
                        <span class="nav-link-icon">🏷️</span>
                        <span class="nav-link-title">Categories</span>
                      </a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link" href="/recurrences">
                        <span class="nav-link-icon">🔄</span>
                        <span class="nav-link-title">Recurrences</span>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div class="page-wrapper">
            {children}
          </div>
        </div>

        {/* Tabler JS */}
        <script src="https://cdn.jsdelivr.net/npm/@tabler/core@latest/dist/js/tabler.min.js"></script>
      </body>
    </html>
  );
};
