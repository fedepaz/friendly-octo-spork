// tests/api/accounts.test.ts
import { describe, it, expect, beforeEach, afterEach } from "bun:test";
import { prisma } from "@/lib/prisma";
import app from "@/index";
import { setCookie } from "hono/cookie";
import { sign } from "hono/jwt";

// Mock environment variables for testing
process.env.JWT_SECRET = "test-jwt-secret";
process.env.ADMIN_USERNAME = "test-admin";
process.env.ADMIN_PASSWORD_HASH = await Bun.password.hash("test-password", {
  algorithm: "bcrypt",
  cost: 4,
});

const generateAuthCookie = async (userId: string) => {
  const token = await sign({ sub: userId }, process.env.JWT_SECRET!);
  return `auth_token=${token}`;
};

describe("Accounts API", () => {
  let testUserId: string;

  beforeEach(async () => {
    // Clean database
    await prisma.account.deleteMany();
    await prisma.user.deleteMany();

    // Create a test user
    const user = await prisma.user.create({
      data: { id: "test-user-123", name: "Test User" },
    });
    testUserId = user.id;
  });

  afterEach(async () => {
    // Clean up
    await prisma.account.deleteMany();
    await prisma.user.deleteMany();
  });

  describe("POST /api/accounts", () => {
    it("should create an account with valid data and return an HTML partial", async () => {
      const authCookie = await generateAuthCookie(testUserId);

      const res = await app.request("/api/accounts", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Cookie: authCookie,
        },
        body: "name=Test+Account&type=BANK&currency=ARS&balance=1000",
      });

      expect(res.status).toBe(201);
      const html = await res.text();
      expect(html).toContain("Test Account");

      const dbAccount = await prisma.account.findFirst({
        where: { userId: testUserId, name: "Test Account" },
      });
      expect(dbAccount).toBeDefined();
    });

    it("should reject invalid data", async () => {
      const authCookie = await generateAuthCookie(testUserId);

      const res = await app.request("/api/accounts", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Cookie: authCookie,
        },
        body: "name=&type=BANK&currency=ARS&balance=1000", // Invalid name
      });

      expect(res.status).toBe(400);
      const error = await res.json();
      expect(error.error).toBe("Validation failed");
    });

    it("should require authentication", async () => {
      const res = await app.request("/api/accounts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: "Test Account",
          type: "BANK",
          currency: "ARS",
          balance: 1000,
        }),
      });

      expect(res.status).toBe(302); // Redirect to login
      expect(res.headers.get("location")).toBe("/login");
    });
  });

  describe("GET /api/accounts", () => {
    it("should list accounts for the authenticated user", async () => {
      await prisma.account.createMany({
        data: [
          { userId: testUserId, name: "Account 1", type: "BANK", currency: "ARS", balance: 100 },
          { userId: testUserId, name: "Account 2", type: "CASH", currency: "USD", balance: 200 },
        ],
      });

      const authCookie = await generateAuthCookie(testUserId);

      const res = await app.request("/api/accounts", {
        method: "GET",
        headers: {
          Cookie: authCookie,
        },
      });

      expect(res.status).toBe(200);
      const accounts = await res.json();
      expect(accounts.length).toBe(2);
      expect(accounts[0].name).toBe("Account 1");
    });

    it("should not list other users' accounts", async () => {
      const otherUser = await prisma.user.create({
        data: { id: "other-user-id", name: "Other User" },
      });
      await prisma.account.create({
        data: { userId: otherUser.id, name: "Other Account", type: "BANK", currency: "ARS", balance: 500 },
      });

      const authCookie = await generateAuthCookie(testUserId);

      const res = await app.request("/api/accounts", {
        method: "GET",
        headers: {
          Cookie: authCookie,
        },
      });

      expect(res.status).toBe(200);
      const accounts = await res.json();
      expect(accounts.length).toBe(0);
    });
  });

  describe("GET /api/accounts/:id", () => {
    it("should get a single account by ID", async () => {
      const account = await prisma.account.create({
        data: { userId: testUserId, name: "Single Account", type: "BANK", currency: "ARS", balance: 1000 },
      });

      const authCookie = await generateAuthCookie(testUserId);

      const res = await app.request(`/api/accounts/${account.id}`, {
        method: "GET",
        headers: {
          Cookie: authCookie,
        },
      });

      expect(res.status).toBe(200);
      const fetchedAccount = await res.json();
      expect(fetchedAccount.name).toBe("Single Account");
    });

    it("should not get another user's account", async () => {
      const otherUser = await prisma.user.create({
        data: { id: "other-user-id", name: "Other User" },
      });
      const otherAccount = await prisma.account.create({
        data: { userId: otherUser.id, name: "Other Account", type: "BANK", currency: "ARS", balance: 500 },
      });

      const authCookie = await generateAuthCookie(testUserId);

      const res = await app.request(`/api/accounts/${otherAccount.id}`, {
        method: "GET",
        headers: {
          Cookie: authCookie,
        },
      });

      expect(res.status).toBe(404);
    });
  });

  describe("PUT /api/accounts/:id", () => {
    it("should update an account", async () => {
      const account = await prisma.account.create({
        data: { userId: testUserId, name: "Old Name", type: "BANK", currency: "ARS", balance: 1000 },
      });

      const authCookie = await generateAuthCookie(testUserId);

      const res = await app.request(`/api/accounts/${account.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Cookie: authCookie,
        },
        body: JSON.stringify({ name: "New Name" }),
      });

      expect(res.status).toBe(200);
      const updatedAccount = await res.json();
      expect(updatedAccount.name).toBe("New Name");

      const dbAccount = await prisma.account.findUnique({
        where: { id: account.id },
      });
      expect(dbAccount?.name).toBe("New Name");
    });

    it("should not update another user's account", async () => {
      const otherUser = await prisma.user.create({
        data: { id: "other-user-id", name: "Other User" },
      });
      const otherAccount = await prisma.account.create({
        data: { userId: otherUser.id, name: "Other Name", type: "BANK", currency: "ARS", balance: 500 },
      });

      const authCookie = await generateAuthCookie(testUserId);

      const res = await app.request(`/api/accounts/${otherAccount.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Cookie: authCookie,
        },
        body: JSON.stringify({ name: "Hacked Name" }),
      });

      expect(res.status).toBe(404);
    });
  });

  describe("DELETE /api/accounts/:id", () => {
    it("should delete an account", async () => {
      const account = await prisma.account.create({
        data: { userId: testUserId, name: "To Delete", type: "BANK", currency: "ARS", balance: 1000 },
      });

      const authCookie = await generateAuthCookie(testUserId);

      const res = await app.request(`/api/accounts/${account.id}`, {
        method: "DELETE",
        headers: {
          Cookie: authCookie,
        },
      });

      expect(res.status).toBe(204);

      const dbAccount = await prisma.account.findUnique({
        where: { id: account.id },
      });
      expect(dbAccount).toBeNull();
    });

    it("should not delete another user's account", async () => {
      const otherUser = await prisma.user.create({
        data: { id: "other-user-id", name: "Other User" },
      });
      const otherAccount = await prisma.account.create({
        data: { userId: otherUser.id, name: "Other Account", type: "BANK", currency: "ARS", balance: 500 },
      });

      const authCookie = await generateAuthCookie(testUserId);

      const res = await app.request(`/api/accounts/${otherAccount.id}`, {
        method: "DELETE",
        headers: {
          Cookie: authCookie,
        },
      });

      expect(res.status).toBe(404);
    });
  });
});
