// src/middleware/auth.ts

import type { Context, Next } from "hono";
import { getCookie } from "hono/cookie";
import { jwt, verify } from "hono/jwt";

const JWT_SECRET =
  process.env.JWT_SECRET || "your-super-secret-key-change-this";

export const jwtMiddleware = jwt({
  secret: JWT_SECRET,
  cookie: "auth_token", // Token is in an httpOnly cookie
});

export async function requireAuth(c: Context, next: Next) {
  const payload = c.get("jwtPayload") as { sub: string };

  if (!payload) {
    return c.json({ error: "Unauthorized" }, 401);
  }

  await next();
}

export async function redirectIfAuth(c: Context, next: Next) {
  const token = getCookie(c, "auth_token");

  if (token) {
    try {
      const payload = await verify(token, JWT_SECRET);
      if (payload) {
        // If token is valid, redirect to the dashboard
        return c.redirect("/dashboard");
      }
    } catch (error) {
      // Invalid token, proceed to show the login page
      console.error("Invalid token during redirect check:", error);
    }
  }

  // No token or invalid token, proceed to the login page
  await next();
}
