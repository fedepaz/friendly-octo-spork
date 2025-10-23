import { html } from "hono/html";
import type { FC } from "hono/jsx";

interface LayoutProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children?: any;
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
        <style>
          /* Neo-Brutalism CSS Variables */
          :root {
            --background: #ffffff;
            --foreground: #000000;
            --card: #ffffff;
            --card-foreground: #000000;
            --popover: #ffffff;
            --popover-foreground: #000000;
            --primary: #ff3333;
            --primary-foreground: #ffffff;
            --secondary: #ffff00;
            --secondary-foreground: #000000;
            --muted: #f0f0f0;
            --muted-foreground: #333333;
            --accent: #0066ff;
            --accent-foreground: #ffffff;
            --destructive: #000000;
            --destructive-foreground: #ffffff;
            --border: #000000;
            --input: #000000;
            --ring: #ff3333;
            --chart-1: #ff3333;
            --chart-2: #ffff00;
            --chart-3: #0066ff;
            --chart-4: #00cc00;
            --chart-5: #cc00cc;
            --sidebar: #f0f0f0;
            --sidebar-foreground: #000000;
            --sidebar-primary: #ff3333;
            --sidebar-primary-foreground: #ffffff;
            --sidebar-accent: #0066ff;
            --sidebar-accent-foreground: #ffffff;
            --sidebar-border: #000000;
            --sidebar-ring: #ff3333;
            --font-sans: DM Sans, sans-serif;
            --font-serif: ui-serif, Georgia, Cambria, "Times New Roman", Times,
              serif;
            --font-mono: Space Mono, monospace;
            --radius: 0px;
            --shadow-x: 4px;
            --shadow-y: 4px;
            --shadow-blur: 0px;
            --shadow-spread: 0px;
            --shadow-opacity: 1;
            --shadow-color: hsl(0 0% 0%);
            --shadow-2xs: 4px 4px 0px 0px hsl(0 0% 0% / 0.5);
            --shadow-xs: 4px 4px 0px 0px hsl(0 0% 0% / 0.5);
            --shadow-sm: 4px 4px 0px 0px hsl(0 0% 0% / 1),
              4px 1px 2px -1px hsl(0 0% 0% / 1);
            --shadow: 4px 4px 0px 0px hsl(0 0% 0% / 1),
              4px 1px 2px -1px hsl(0 0% 0% / 1);
            --shadow-md: 4px 4px 0px 0px hsl(0 0% 0% / 1),
              4px 2px 4px -1px hsl(0 0% 0% / 1);
            --shadow-lg: 4px 4px 0px 0px hsl(0 0% 0% / 1),
              4px 4px 6px -1px hsl(0 0% 0% / 1);
            --shadow-xl: 4px 4px 0px 0px hsl(0 0% 0% / 1),
              4px 8px 10px -1px hsl(0 0% 0% / 1);
            --shadow-2xl: 4px 4px 0px 0px hsl(0 0% 0% / 2.5);
            --tracking-normal: 0em;
            --spacing: 0.25rem;
          }

          .dark {
            --background: #000000;
            --foreground: #ffffff;
            --card: #333333;
            --card-foreground: #ffffff;
            --popover: #333333;
            --popover-foreground: #ffffff;
            --primary: #ff6666;
            --primary-foreground: #000000;
            --secondary: #ffff33;
            --secondary-foreground: #000000;
            --muted: #1a1a1a;
            --muted-foreground: #cccccc;
            --accent: #3399ff;
            --accent-foreground: #000000;
            --destructive: #ffffff;
            --destructive-foreground: #000000;
            --border: #ffffff;
            --input: #ffffff;
            --ring: #ff6666;
            --chart-1: #ff6666;
            --chart-2: #ffff33;
            --chart-3: #3399ff;
            --chart-4: #33cc33;
            --chart-5: #cc33cc;
            --sidebar: #000000;
            --sidebar-foreground: #ffffff;
            --sidebar-primary: #ff6666;
            --sidebar-primary-foreground: #000000;
            --sidebar-accent: #3399ff;
            --sidebar-accent-foreground: #000000;
            --sidebar-border: #ffffff;
            --sidebar-ring: #ff6666;
            --font-sans: DM Sans, sans-serif;
            --font-serif: ui-serif, Georgia, Cambria, "Times New Roman", Times,
              serif;
            --font-mono: Space Mono, monospace;
            --radius: 0px;
            --shadow-x: 4px;
            --shadow-y: 4px;
            --shadow-blur: 0px;
            --shadow-spread: 0px;
            --shadow-opacity: 1;
            --shadow-color: hsl(0 0% 0%);
            --shadow-2xs: 4px 4px 0px 0px hsl(0 0% 0% / 0.5);
            --shadow-xs: 4px 4px 0px 0px hsl(0 0% 0% / 0.5);
            --shadow-sm: 4px 4px 0px 0px hsl(0 0% 0% / 1),
              4px 1px 2px -1px hsl(0 0% 0% / 1);
            --shadow: 4px 4px 0px 0px hsl(0 0% 0% / 1),
              4px 1px 2px -1px hsl(0 0% 0% / 1);
            --shadow-md: 4px 4px 0px 0px hsl(0 0% 0% / 1),
              4px 2px 4px -1px hsl(0 0% 0% / 1);
            --shadow-lg: 4px 4px 0px 0px hsl(0 0% 0% / 1),
              4px 4px 6px -1px hsl(0 0% 0% / 1);
            --shadow-xl: 4px 4px 0px 0px hsl(0 0% 0% / 1),
              4px 8px 10px -1px hsl(0 0% 0% / 1);
            --shadow-2xl: 4px 4px 0px 0px hsl(0 0% 0% / 2.5);
          }

          /* Neo-Brutalism Base Styles */
          body {
            background-color: var(--background);
            color: var(--foreground);
            font-family: var(--font-sans);
          }

          .neo-brutal {
            --neo-shadow: var(--shadow-sm);
            --neo-border: 2px solid var(--border);
            --neo-radius: var(--radius);
            --neo-bg: var(--card);
            --neo-text: var(--card-foreground);
          }

          .neo-card {
            background: var(--card);
            color: var(--card-foreground);
            border: var(--neo-border);
            border-radius: var(--neo-radius);
            box-shadow: var(--neo-shadow);
            transition: all 0.2s ease;
          }

          .neo-card:hover {
            transform: translate(-2px, -2px);
            box-shadow: var(--shadow-md);
          }

          .neo-btn {
            background: var(--primary);
            color: var(--primary-foreground);
            border: var(--neo-border);
            border-radius: var(--neo-radius);
            box-shadow: var(--neo-shadow);
            font-weight: 700;
            padding: 12px 24px;
            transition: all 0.2s ease;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            cursor: pointer;
          }

          .neo-btn:hover {
            transform: translate(-2px, -2px);
            box-shadow: var(--shadow-md);
            background: var(--accent);
            color: var(--accent-foreground);
          }

          .neo-btn-secondary {
            background: var(--secondary);
            color: var(--secondary-foreground);
          }

          .neo-btn-accent {
            background: var(--accent);
            color: var(--accent-foreground);
          }

          .neo-input {
            background: var(--card);
            border: var(--neo-border);
            border-radius: var(--neo-radius);
            box-shadow: var(--neo-shadow);
            color: var(--card-foreground);
            padding: 12px 16px;
            transition: all 0.2s ease;
          }

          .neo-input:focus {
            outline: none;
            transform: translate(-2px, -2px);
            box-shadow: var(--shadow-md);
            border-color: var(--ring);
          }

          /* Override Tabler styles for Neo-Brutalism */
          .page {
            background: var(--background) !important;
          }

          .container-xl {
            padding: 2rem;
          }

          /* Custom utility classes using the theme variables */
          .bg-neo-card {
            background-color: var(--card);
          }
          .text-neo-foreground {
            color: var(--card-foreground);
          }
          .border-neo {
            border-color: var(--border);
          }
          .shadow-neo {
            box-shadow: var(--shadow-sm);
          }
          .shadow-neo-hover {
            box-shadow: var(--shadow-md);
          }
        </style>
      </head>
      <body class="neo-brutal">
        <div class="page">
          <div class="mx-auto w-full min-h-screen p-4">
            <div class="mx-auto w-full min-h-screen">
              <div class="container-xl">${props.children}</div>
            </div>
          </div>
        </div>

        <script>
          // Force dark mode by default
          document.documentElement.classList.add("dark");
          localStorage.theme = "dark";

          // Optional: Add toggle functionality for future use
          function toggleTheme() {
            const isDark = document.documentElement.classList.contains("dark");
            if (isDark) {
              document.documentElement.classList.remove("dark");
              localStorage.theme = "light";
            } else {
              document.documentElement.classList.add("dark");
              localStorage.theme = "dark";
            }
          }
        </script>
      </body>
    </html>`;
};

export default Layout;
