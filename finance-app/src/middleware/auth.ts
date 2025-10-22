// src/middleware/auth.ts

import type { Context, Next } from "hono";
import { jwt } from "hono/jwt";

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
  try {
    const payload = c.get("jwtPayload") as { sub: string };
    if (payload) {
      return c.redirect("/dashboard");
    }
  } catch (error) {
    console.error("Error redirecting if authenticated:", error);
  }

  await next();
}
