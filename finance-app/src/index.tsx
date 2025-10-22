import { Hono } from "hono";
import { serveStatic } from "hono/bun";
import { jsxRenderer } from "hono/jsx-renderer";
import Layout from "./components/shared/Layout";
import { jwtMiddleware, redirectIfAuth, requireAuth } from "./middleware/auth";
import accountsRoutes from "./api/accounts/accounts.routes";
import { logger } from "hono/logger";
import { cors } from "hono/cors";
import authRoutes from "./api/auth/auth.routes";

const app = new Hono();

/**
  Global Middlewares
 */

app.use("*", logger());
app.use("*", cors());

// Middleware to wrap all routes in the Layout component
app.use(
  jsxRenderer(({ children }) => {
    return <Layout>{children}</Layout>;
  })
);

// Serve the compiled stylesheet
app.use("/output.css", serveStatic({ root: "./dist/static" }));

// Public routes: login should NOT use JWT middleware
app.use("/login", redirectIfAuth); // ← redirect if already logged in

// Protected API routes
app.use("/api/*", jwtMiddleware, requireAuth);

// Mount the API routes
app.route("/", authRoutes);
app.route("/api/accounts", accountsRoutes);

// Basic root route
app.notFound((c) => {
  return c.json({ error: "Not found" }, 404);
});

app.onError((err, c) => {
  console.error("Global error:", err);
  return c.json({ error: "Internal server error" }, 500);
});

const port = parseInt(process.env.PORT || "3000");

console.log(`Listening on port ${port}`);

export default {
  port,
  fetch: app.fetch,
};
