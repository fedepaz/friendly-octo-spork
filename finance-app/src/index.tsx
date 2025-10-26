import { Hono } from "hono";
import { serveStatic } from "hono/bun";
import { jsxRenderer } from "hono/jsx-renderer";

import {
  jwtMiddleware,
  refreshTokenIfNeeded,
  requireAuth,
} from "./middleware/auth";
import accountsRoutes from "./api/accounts/accounts.routes";
import { logger } from "hono/logger";
import { cors } from "hono/cors";
import authRoutes from "./api/auth/auth.routes";
import { ErrorPage } from "./pages/ErrorPage";
import categoriesRoutes from "./api/categories/categories.routes";
import recurrencesRoutes from "./api/recurrences/recurrences.routes";
import dashboardRoutes from "./api/dashboard/dashboard.routes";
import Layout from "./components/shared/Layout";
import Injection from "./styles/injection";

const app = new Hono();

/**
  Global Middlewares
 */

app.use("*", logger());
app.use("*", cors());

// Middleware to wrap all routes in the Layout component
app.use(
  jsxRenderer(({ children }) => {
    return <Injection>{children}</Injection>;
  })
);

// Serve the compiled stylesheet
app.use("/output.css", serveStatic({ root: "./dist/static" }));
/**
 * Public Routes (no authentication required)
 */
// Auth routes (login/logout) - these should redirect if already authenticated
app.route("/", authRoutes);

/**
 * Protected Routes (authentication required)
 */
// Apply auth middleware to all protected routes
app.use("/dashboard/*", requireAuth, refreshTokenIfNeeded);
app.use("/accounts/*", requireAuth, refreshTokenIfNeeded);
app.use("/categories/*", requireAuth, refreshTokenIfNeeded);
app.use("/recurrences/*", requireAuth, refreshTokenIfNeeded);
app.use("/api/*", requireAuth, refreshTokenIfNeeded);

// Mount the protected API routes
app.route("/accounts", accountsRoutes);
app.route("/categories", categoriesRoutes);
app.route("/recurrences", recurrencesRoutes);
app.route("/dashboard", dashboardRoutes);

/**
 * Error Handlers
 */
app.notFound((c) => {
  if (c.req.path.startsWith("/api")) {
    return c.json({ error: "Not found" }, 404);
  }

  return c.render(<ErrorPage message="Not found" statusCode={404} />);
});

app.onError((err, c) => {
  const message = err instanceof Error ? err.message : "Unknown error";
  const stack = err instanceof Error ? err.stack : undefined;

  // For API requests, return JSON error
  if (c.req.path.startsWith("/api")) {
    return c.json({ error: message, stack });
  }

  // For page requests, render the ErrorPage
  return c.render(<ErrorPage message={message} stack={stack} />);
});

const port = parseInt(process.env.PORT || "3000");

console.log(`Listening on port ${port}`);

export default {
  port,
  fetch: app.fetch,
};
