// tests/api/auth.test.ts
import { describe, it, expect, beforeEach, afterEach } from "bun:test";
import app from "../../src/index";
import { prisma } from "../../src/lib/prisma";
import { getCookie } from "hono/cookie";

// Mock environment variables for testing
process.env.JWT_SECRET = "test-jwt-secret";
process.env.ADMIN_USERNAME = "test-admin";

describe("Auth API", () => {
  const testPassword = "secure-test-password";

  beforeEach(async () => {
    // Ensure the admin password hash is set for the AuthService
    process.env.ADMIN_PASSWORD_HASH = await Bun.password.hash(testPassword, {
      algorithm: "bcrypt",
      cost: 4,
    });
    // Clean up users if necessary (AuthService doesn't create them, but other tests might)
    await prisma.user.deleteMany();
  });

  afterEach(async () => {
    await prisma.user.deleteMany();
  });

  describe("POST /api/auth/login", () => {
    it("should successfully log in with correct credentials and set cookie", async () => {
      const res = await app.request("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `password=${testPassword}`,
      });

      expect(res.status).toBe(302); // Redirect to dashboard
      expect(res.headers.get("location")).toBe("/dashboard");

      const cookie = getCookie(res, "auth_token");
      expect(cookie).toBeDefined();
      expect(cookie?.length).toBeGreaterThan(0);
    });

    it("should reject login with incorrect credentials", async () => {
      const res = await app.request("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `password=wrong-password`,
      });

      expect(res.status).toBe(401);
      const error = await res.json();
      expect(error.error).toBe("Invalid credentials");

      const cookie = getCookie(res, "auth_token");
      expect(cookie).toBeUndefined();
    });
  });

  describe("GET /api/logout", () => {
    it("should successfully log out and clear cookie", async () => {
      // First, log in to get a cookie
      const loginRes = await app.request("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `password=${testPassword}`,
      });
      const authCookie = getCookie(loginRes, "auth_token");
      expect(authCookie).toBeDefined();

      // Then, log out
      const logoutRes = await app.request("/api/logout", {
        method: "GET",
        headers: {
          Cookie: `auth_token=${authCookie}`,
        },
      });

      expect(logoutRes.status).toBe(302); // Redirect to login
      expect(logoutRes.headers.get("location")).toBe("/login");

      // Verify cookie is cleared (by checking Set-Cookie header for expiration)
      const setCookieHeader = logoutRes.headers.get("set-cookie");
      expect(setCookieHeader).toContain("auth_token=;");
      expect(setCookieHeader).toContain("Max-Age=0");
    });
  });
});
