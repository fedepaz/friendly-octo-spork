// src/styles/injection.tsx

import { html } from "hono/html";
import type { FC } from "hono/jsx";
interface injectionProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children: any;
}
const Injection: FC<injectionProps> = ({ children }) => {
  return html` <!DOCTYPE html>
    <html lang="en" class="dark">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Finance App</title>
        <!-- Tailwind CSS -->
        <link rel="stylesheet" href="/output.css" />
        <!-- HTMX -->
        <script src="https://unpkg.com/htmx.org@1.9.10"></script>
      </head>
      <body class="font-sans bg-background text-foreground flex">
        <main class="page flex-1">${children}</main>
        <div id="toast-container" class="fixed top-0 right-0 p-4 z-50"></div>
      </body>
    </html>`;
};

export default Injection;
