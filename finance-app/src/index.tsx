// src/index.ts
import { Hono } from "hono";
import { logger } from "hono/logger";
import { cors } from "hono/cors";

// Import middleware
import { errorHandler } from "./middleware/errorHandler";

const app = new Hono();

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

// ============================================
// ERROR HANDLER (must be last)
// ============================================
app.onError(errorHandler);

// 404 Handler
app.notFound((c) => {
  return c.render(
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
