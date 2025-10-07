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
          <div class="mx-auto w-full min-h-screen bg-gray-100">
            <div class="container-xl">${props.children}</div>
          </div>
        </div>
      </body>
    </html>
  `;
};

export default Layout;
