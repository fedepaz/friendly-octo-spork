import { html } from "hono/html";
import type { FC } from "hono/jsx";

interface LayoutProps {
  children?: any;
}

const Layout: FC<LayoutProps> = (props) => {
  return html`
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Finance App</title>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@$ICONS_VERSION/dist/tabler-icons.min.css"
        />
        <!-- Tabler UI CSS -->
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/@tabler/core@latest/dist/css/tabler.min.css"
        />
        <!-- Tailwind CSS -->
        <link rel="stylesheet" href="/output.css" />
      </head>
      <body>
        <div class="page">
          <header class="navbar navbar-expand-md d-print-none">
            <div class="container-xl">
              <h1
                class="navbar-brand navbar-brand-autodark d-none-navbar-horizontal pe-0 pe-md-3"
              >
                <a href="."> Finance App </a>
              </h1>
            </div>
          </header>
          <div class="page-wrapper">
            <div class="page-body">
              <div class="container-xl">${props.children}</div>
            </div>
            <footer class="footer footer-transparent d-print-none">
              <div class="container-xl">
                <div
                  class="row text-center align-items-center flex-row-reverse"
                >
                  <div class="col-lg-auto ms-lg-auto">
                    <ul class="list-inline list-inline-dots mb-0">
                      <li class="list-inline-item">
                        Finance App - Made with ❤️
                      </li>
                    </ul>
                  </div>
                  <div class="col-12 col-lg-auto mt-3 mt-lg-0">
                    <ul class="list-inline list-inline-dots mb-0">
                      <li class="list-inline-item">
                        &copy; 2025 All rights reserved.
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </footer>
          </div>
        </div>
      </body>
    </html>
  `;
};

export default Layout;
