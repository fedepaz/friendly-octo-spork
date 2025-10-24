import { html } from "hono/html";
import type { FC } from "hono/jsx";
import { Navbar } from "./Navbar";

interface LayoutProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children?: any;
  activeNavItem?: string;
}

const Layout: FC<LayoutProps> = (props) => {
  return html` <!DOCTYPE html>
    <html class="dark">
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

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossorigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;600;700&family=Space+Mono:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body class="bg-background text-foreground font-sans">
        ${(<Navbar activeNavItem={props.activeNavItem} />)}
        <div class="page">
          <div class="mx-auto w-full min-h-screen p-4">
            <div class="mx-auto w-full min-h-screen">
              <div class="container-xl">${props.children}</div>
            </div>
          </div>
        </div>
        <div id="toast-container" class="fixed top-0 right-0 p-4 z-50"></div>
      </body>
    </html>`;
};

export default Layout;
