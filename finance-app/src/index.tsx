// src/index.ts
import { Hono } from "hono";
import { logger } from "hono/logger";
import { cors } from "hono/cors";
import { jsxRenderer } from "hono/jsx-renderer";
import { jwt } from "hono/jwt";
import { getCookie } from "hono/cookie";

// Import routes
import accountsRoutes from "./api/accounts/accounts.routes";
import categoriesRoutes from "./api/categories/categories.routes";
import recurrencesRoutes from "./api/recurrences/recurrences.routes";
import transactionsRoutes from "./api/transactions/transactions.routes";
import dashboardRoutes from "./api/dashboard/dashboard.routes";
import authRoutes from "./api/auth/auth.routes"; // New auth routes

// Import middleware
import { errorHandler } from "./middleware/errorHandler";
import { Layout } from "./components/shared/Layout";
import { LoginPage } from "./pages/LoginPage"; // New login page component
import { connectPrisma } from "./lib/prisma"; // Import connectPrisma

const app = new Hono();

// Connect Prisma Client on application startup
connectPrisma();

// ============================================
// GLOBAL MIDDLEWARE
// ============================================

// Logger
app.use("*", logger());

// CORS
app.use(
  "*",
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
  })
);

// JSX Renderer (wraps all pages in Layout) - applied explicitly to non-login pages

// ============================================
// AUTH MIDDLEWARE FOR PROTECTED ROUTES
// ============================================

const requireAuth = async (c: any, next: any) => {
  const token = getCookie(c, "auth_token");
  if (!token) {
    return c.redirect("/login");
  }

  try {
    // JWT middleware will have already verified the token and set the payload
    const payload = c.get("jwtPayload");
    if (!payload || !payload.sub) {
      return c.redirect("/login");
    }
    c.set("userId", payload.sub);
  } catch (e) {
    console.error("JWT verification failed:", e);
    return c.redirect("/login");
  }

  await next();
};

// ============================================
// PUBLIC ROUTES
// ============================================

// Health check
app.get("/health", (c) => {
  return c.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || "development",
  });
});

// Login page - renders directly without Layout
app.get("/login", (c) => {
  const token = getCookie(c, "auth_token");
  if (token) {
    return c.redirect("/dashboard");
  }
  return c.render(<LoginPage />);
});

// Landing page (redirects to login or dashboard)
app.get("/", (c) => {
  const token = getCookie(c, "auth_token");
  if (token) {
    return c.redirect("/dashboard");
  }
  return c.redirect("/login");
});

// ============================================
// PROTECTED ROUTES
// ============================================

// Apply JWT middleware to all API routes EXCEPT login
app.use("/api/*", async (c, next) => {
  if (c.req.path === "/api/auth/login") {
    await next();
    return;
  }
  return jwt({ secret: process.env.JWT_SECRET!, cookie: "auth_token" })(c, next);
});
app.use("/api/*", async (c, next) => {
  if (c.req.path === "/api/auth/login") {
    await next();
    return;
  }
  await requireAuth(c, next);
});

// Apply JSX Renderer and JWT middleware to all page routes
app.use("/dashboard/*", jsxRenderer(({ children }) => <Layout>{children}</Layout>));
app.use("/dashboard", jwt({ secret: process.env.JWT_SECRET!, cookie: "auth_token" }));
app.use("/dashboard", requireAuth);

app.use("/accounts/*", jsxRenderer(({ children }) => <Layout>{children}</Layout>));
app.use("/accounts", jwt({ secret: process.env.JWT_SECRET!, cookie: "auth_token" }));
app.use("/accounts", requireAuth);

app.use("/categories/*", jsxRenderer(({ children }) => <Layout>{children}</Layout>));
app.use("/categories", jwt({ secret: process.env.JWT_SECRET!, cookie: "auth_token" }));
app.use("/categories", requireAuth);

app.use("/recurrences/*", jsxRenderer(({ children }) => <Layout>{children}</Layout>));
app.use("/recurrences", jwt({ secret: process.env.JWT_SECRET!, cookie: "auth_token" }));
app.use("/recurrences", requireAuth);

app.use("/transactions/*", jsxRenderer(({ children }) => <Layout>{children}</Layout>));
app.use("/transactions", jwt({ secret: process.env.JWT_SECRET!, cookie: "auth_token" }));
app.use("/transactions", requireAuth);

// Mount API routes
app.route("/api/accounts", accountsRoutes);
app.route("/api/categories", categoriesRoutes);
app.route("/api/recurrences", recurrencesRoutes);
app.route("/api/transactions", transactionsRoutes);
app.route("/api/auth", authRoutes); // Mount new auth routes

// Mount page routes
app.route("/dashboard", dashboardRoutes);
app.route("/accounts", accountsRoutes); // Reuse for full page render
app.route("/categories", categoriesRoutes);
app.route("/recurrences", recurrencesRoutes);
app.route("/transactions", transactionsRoutes);

// ============================================
// ERROR HANDLER (must be last)
// ============================================
app.onError(errorHandler);

// 404 Handler
app.notFound((c) => {
  return c.html(
    <div class="page page-center">
      <div class="container-tight py-4">
        <div class="empty">
          <div class="empty-header">404</div>
          <p class="empty-title">Page not found</p>
          <p class="empty-subtitle text-muted">
            The page you're looking for doesn't exist.
          </p>
          <div class="empty-action">
            <a href="/dashboard" class="btn btn-primary">
              Go to dashboard
            </a>
          </div>
        </div>
      </div>
    </div>
  );
});

// ============================================
// START SERVER
// ============================================
export default {
  port: process.env.PORT || 3000,
  fetch: app.fetch,
};

console.log(
  `🚀 Server running on http://localhost:${process.env.PORT || 3000}`
);
