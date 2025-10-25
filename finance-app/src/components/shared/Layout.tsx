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
    <html lang="en" class="dark">
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
      <body class="font-sans bg-background text-foreground">
        ${(<Navbar activeNavItem={props.activeNavItem} />)}
        <main class="page">
          <div class="container-xl p-4">${props.children}</div>
        </main>
        <div id="toast-container" class="fixed top-0 right-0 p-4 z-50"></div>
      </body>
    </html>`;
};

export default Layout;
