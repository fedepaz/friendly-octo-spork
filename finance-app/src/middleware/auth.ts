// src/middleware/auth.ts

import type { Context, Next } from "hono";
import { deleteCookie, getCookie, setCookie } from "hono/cookie";
import { jwt, sign, verify } from "hono/jwt";

const JWT_SECRET =
  process.env.JWT_SECRET || "your-super-secret-key-change-this";

export const jwtMiddleware = jwt({
  secret: JWT_SECRET,
  cookie: "auth_token", // Token is in an httpOnly cookie
});

// Token expiration: 7 days in seconds
const TOKEN_EXPIRATION = 7 * 24 * 60 * 60; // 604800 seconds

interface JWTPayload {
  sub: string; // user id
  exp: number; // expiration timestamp
  iat: number; // issued at timestamp
}

/**
 * Generate a JWT token with 7-day expiration
 */
export async function generateToken(userId: string): Promise<string> {
  const now = Math.floor(Date.now() / 1000);

  const payload = {
    sub: userId,
    iat: now,
    exp: now + TOKEN_EXPIRATION,
  };

  return await sign(payload, JWT_SECRET);
}

/**
 * Set auth cookie with secure options
 */
export function setAuthCookie(c: Context, token: string) {
  setCookie(c, "auth_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // HTTPS only in production
    sameSite: "Lax",
    maxAge: TOKEN_EXPIRATION,
    path: "/",
  });
}

/**
 * Verify token and extract payload
 */
async function verifyToken(token: string) {
  try {
    const payload = await verify(token, JWT_SECRET);

    // Check if token is expired
    const now = Math.floor(Date.now() / 1000);
    if (payload.exp && payload.exp < now) {
      return null;
    }

    return payload;
  } catch (error) {
    console.error("Token verification failed:", error);
    return null;
  }
}

/**
 * Middleware: Require authentication
 * Redirects to /login if not authenticated
 */
export async function requireAuth(c: Context, next: Next) {
  const token = getCookie(c, "auth_token");

  if (!token) {
    return c.redirect("/login");
  }

  const payload = await verifyToken(token);

  if (!payload) {
    // Token is invalid or expired, clear it and redirect
    deleteCookie(c, "auth_token", {
      path: "/",
    });
    return c.redirect("/login");
  }

  // Set payload in context for use in route handlers
  c.set("jwtPayload", payload);
  c.set("userId", payload.sub);

  await next();
}

/**
 * Middleware: Redirect to dashboard if already authenticated
 * Use this on login/register pages
 */
export async function redirectIfAuth(c: Context, next: Next) {
  const token = getCookie(c, "auth_token");

  if (token) {
    const payload = await verifyToken(token);

    if (payload) {
      // Valid token exists, redirect to dashboard
      return c.redirect("/dashboard");
    }

    // Invalid token, clear it
    deleteCookie(c, "auth_token", {
      path: "/",
    });
  }

  // No valid token, proceed to login page
  await next();
}

/**
 * Optional: Middleware to auto-refresh token if it's close to expiration
 * Use this on protected routes to keep user logged in
 */
export async function refreshTokenIfNeeded(c: Context, next: Next) {
  const token = getCookie(c, "auth_token");

  if (token) {
    const payload = await verifyToken(token);

    if (payload && payload.exp) {
      const now = Math.floor(Date.now() / 1000);
      const timeUntilExpiry = payload.exp - now;

      // If token expires in less than 2 days, issue a new one
      if (timeUntilExpiry < 2 * 24 * 60 * 60) {
        const newToken = await generateToken(payload.sub as string);
        setAuthCookie(c, newToken);
      }
    }
  }

  await next();
}
