### Detailed Project Setup and Implementation (Revised)

This document details the specific configurations and code implementations used to set up the initial version of the Finance App.

**1. Core Technologies and Dependencies:**

The project is built with Bun, Hono, Hono's JSX for templating, Prisma, and Tailwind CSS. The frontend interactions are intended to be handled by HTMX. The exact dependencies and scripts are defined in `package.json`:

*   **Scripts**:
    *   `"dev": "concurrently \"bun run watch:css\" \"bun run --hot src/index.tsx\""`: This is the main development script. It uses `concurrently` to run two processes in parallel:
        1.  `watch:css`: This script uses the Tailwind CLI to watch for changes in `src/styles/main.css` and any files containing Tailwind classes, and then recompiles the CSS to `dist/static/output.css`.
        2.  `bun run --hot src/index.tsx`: This runs the Hono application with hot reloading.
*   **Dependencies**:
    *   `hono`: The web framework.
    *   `@prisma/client` and `prisma`: The ORM for database access.
    *   `htmx.org`: For handling frontend interactions and partial page updates.
    *   `tabler-ui`, `@tabler/icons`, `@tabler/icons-webfont`: For the UI components and icons.
*   **Dev Dependencies**:
    *   `tailwindcss`, `autoprefixer`, `postcss`: For the Tailwind CSS setup.
    *   `concurrently`: To run multiple scripts in parallel.

**2. Configuration Files:**

*   **`bunfig.toml`**:
    ```toml
    [serve.static]
    env = "BUN_PUBLIC_*"
    ```
    This file is used to configure Bun's built-in server.

*   **`tailwind.config.ts`**:
    ```typescript
    module.exports = {
      content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
      theme: {
        extend: {},
      },
      plugins: [],
    };
    ```
    The `content` array is configured to scan all `.html`, `.js`, `.jsx`, `.ts`, and `.tsx` files in the `src` directory. This is how Tailwind knows which classes are being used in your project.

**3. Application Entry Point (`src/index.tsx`):**

This file is the heart of the application and contains several key implementation details:

```typescript
import { Hono } from "hono";
import dashboardRoutes from "./api/dashboard.routes";
import { serveStatic } from "hono/bun";
import { jsxRenderer } from "hono/jsx-renderer";
import Layout from "./components/layout";

const app = new Hono();

// Middleware to wrap all routes in the Layout component
app.use(
  jsxRenderer(({ children }) => {
    return <Layout>{children}</Layout>;
  })
);

// Serve the compiled stylesheet
app.use("/output.css", serveStatic({ root: "./dist/static" }));

// Register the dashboard routes
app.route("/", dashboardRoutes);

export default {
  port: 3001,
  fetch: app.fetch,
};
```

*   **`jsxRenderer` Middleware**:
    This is a powerful feature of Hono. It's used here to automatically wrap every page/component rendered by the routes in the `Layout` component. This avoids having to manually wrap each page in the layout. This is what allows you to use `.tsx` files and JSX syntax without using React.
*   **`serveStatic` Middleware**:
    This is a crucial piece of the setup. It tells Hono to serve the `output.css` file from the `./dist/static` directory. This is how the browser is able to load the compiled Tailwind CSS.

**4. Layout and Styling:**

*   **`src/styles/main.css`**:
    ```css
    @import "tailwindcss";
    ```
    This file is the main entry point for your CSS. It simply uses the `@import` directive to include all of Tailwind's base styles, components, and utilities.

*   **`src/components/layout.tsx`**:
    ```typescript
    import { html } from "hono/html";
    import type { FC } from "hono/jsx";

    const Layout: FC = (props) => {
      return html`
        <!DOCTYPE html>
        <html>
          <head>
            ...
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
    ```
    *   The layout is a Hono functional component (`FC`) that uses `hono/html` for templating.
    *   The `<head>` section includes the links to the Tabler UI and icons from a CDN, and most importantly, a link to `/output.css`. This path works because of the `serveStatic` middleware configured in `src/index.tsx`.
    *   The `props.children` is used to render the actual content of each page inside the layout.
    *   The `div` with the class `mx-auto w-full min-h-screen bg-gray-100` is an example of how Tailwind's utility classes are used directly in the JSX to style the components.

This revised summary should now accurately reflect your project's setup and the technologies you are using.

**5. Database Setup (PostgreSQL with Docker Compose):**

To get the database up and running, we use Docker Compose to manage a PostgreSQL container. This provides an isolated and reproducible environment for your database.

*   **`docker/docker-compose.yml`**:
    This file defines the PostgreSQL service. It specifies the `postgres:13` image, sets up environment variables for the database user, password, and database name, and mounts a named volume for data persistence. This ensures your data is not lost when the container is stopped or removed.

    ```yaml
    version: '3.8'
    services:
      db:
        image: postgres:13
        container_name: finance-app-db
        restart: always
        ports:
          - '5432:5432'
        environment:
          POSTGRES_USER: user
          POSTGRES_PASSWORD: password
          POSTGRES_DB: finance-app
        volumes:
          - postgres_data:/var/lib/postgresql/data

    volumes:
      postgres_data:
    ```

*   **`finance-app/.env`**:
    This file, located in your `finance-app` directory, contains the `DATABASE_URL` that Prisma uses to connect to the PostgreSQL database. It should reflect the credentials and database name defined in your `docker-compose.yml`.

    ```
    DATABASE_URL="postgresql://user:password@localhost:5432/finance-app"
    ```

*   **Starting the Database Container:**
    Navigate to the `docker` directory and run the following command to start the PostgreSQL container in detached mode:

    ```bash
    cd docker
    sudo docker compose up -d
    ```

*   **Applying Prisma Migrations:**
    Once the database container is running, navigate to the `finance-app` directory and apply the Prisma migrations. This will create all the necessary tables in your PostgreSQL database based on your `prisma/schema.prisma` file.

    ```bash
    cd finance-app
    bunx prisma migrate dev --name init
    ```

*   **Verifying the Database Setup:**
    To confirm that the database is running and the tables have been created, you can execute a command to list the tables directly from the PostgreSQL container:

    ```bash
    sudo docker exec -it finance-app-db psql -U user -d finance-app -c "\\dt"
    ```
    You should see a list of tables including `Category`, `Gasto`, `Ingreso`, `Mes`, `Pago`, and `_prisma_migrations`.
