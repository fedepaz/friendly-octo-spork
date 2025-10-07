import { Hono } from "hono";
import dashboardRoutes from "./api/dashboard.routes";
import { serveStatic } from "hono/bun";
import { jsxRenderer } from "hono/jsx-renderer";
import Layout from "./components/layout";

const port = process.env.PORT ? Number(process.env.PORT) : 3001;
const app = new Hono();
// middlewares
app.use(
  jsxRenderer(({ children }) => {
    return <Layout>{children}</Layout>;
  })
);

// Serve static files (for Tailwind/Tabler assets later)
app.use("/output.css", serveStatic({ root: "./dist/static" }));
app.route("/", dashboardRoutes);

export default {
  port,
  fetch: app.fetch,
};
