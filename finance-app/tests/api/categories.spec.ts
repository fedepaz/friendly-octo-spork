// tests/api/categories.test.ts
import { describe, it, expect, beforeEach, afterEach } from "bun:test";
import { prisma } from "@/lib/prisma";
import app from "@/index";
import { sign } from "hono/jwt";
import { CategoryType } from "@prisma/client";

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

describe("Categories API", () => {
  let testUserId: string;

  beforeEach(async () => {
    // Clean database
    await prisma.category.deleteMany();
    await prisma.user.deleteMany();

    // Create a test user
    const user = await prisma.user.create({
      data: { id: "test-user-123", name: "Test User" },
    });
    testUserId = user.id;
  });

  afterEach(async () => {
    // Clean up
    await prisma.category.deleteMany();
    await prisma.user.deleteMany();
  });

  describe("POST /api/categories", () => {
    it("should create a category with valid data and return an HTML partial", async () => {
      const authCookie = await generateAuthCookie(testUserId);

      const res = await app.request("/api/categories", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Cookie: authCookie,
        },
        body: "name=Food&type=GASTO&color=red",
      });

      expect(res.status).toBe(201);
      const html = await res.text();
      expect(html).toContain("Food");

      const dbCategory = await prisma.category.findFirst({
        where: { userId: testUserId, name: "Food" },
      });
      expect(dbCategory).toBeDefined();
    });

    it("should reject invalid data", async () => {
      const authCookie = await generateAuthCookie(testUserId);

      const res = await app.request("/api/categories", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Cookie: authCookie,
        },
        body: "name=&type=GASTO", // Invalid name
      });

      expect(res.status).toBe(400);
      const error = await res.json();
      expect(error.error).toBe("Validation failed");
    });

    it("should require authentication", async () => {
      const res = await app.request("/api/categories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: "Food",
          type: CategoryType.GASTO,
        }),
      });

      expect(res.status).toBe(302); // Redirect to login
      expect(res.headers.get("location")).toBe("/login");
    });
  });

  describe("GET /api/categories", () => {
    it("should list categories for the authenticated user", async () => {
      await prisma.category.createMany({
        data: [
          { userId: testUserId, name: "Food", type: CategoryType.GASTO },
          { userId: testUserId, name: "Salary", type: CategoryType.INGRESO },
        ],
      });

      const authCookie = await generateAuthCookie(testUserId);

      const res = await app.request("/api/categories", {
        method: "GET",
        headers: {
          Cookie: authCookie,
        },
      });

      expect(res.status).toBe(200);
      const categories = await res.json();
      expect(categories.length).toBe(2);
      expect(categories[0].name).toBe("Food");
    });

    it("should not list other users' categories", async () => {
      const otherUser = await prisma.user.create({
        data: { id: "other-user-id", name: "Other User" },
      });
      await prisma.category.create({
        data: { userId: otherUser.id, name: "Other Category", type: CategoryType.GASTO },
      });

      const authCookie = await generateAuthCookie(testUserId);

      const res = await app.request("/api/categories", {
        method: "GET",
        headers: {
          Cookie: authCookie,
        },
      });

      expect(res.status).toBe(200);
      const categories = await res.json();
      expect(categories.length).toBe(0);
    });
  });

  describe("GET /api/categories/:id", () => {
    it("should get a single category by ID", async () => {
      const category = await prisma.category.create({
        data: { userId: testUserId, name: "Single Category", type: CategoryType.GASTO },
      });

      const authCookie = await generateAuthCookie(testUserId);

      const res = await app.request(`/api/categories/${category.id}`, {
        method: "GET",
        headers: {
          Cookie: authCookie,
        },
      });

      expect(res.status).toBe(200);
      const fetchedCategory = await res.json();
      expect(fetchedCategory.name).toBe("Single Category");
    });

    it("should not get another user's category", async () => {
      const otherUser = await prisma.user.create({
        data: { id: "other-user-id", name: "Other User" },
      });
      const otherCategory = await prisma.category.create({
        data: { userId: otherUser.id, name: "Other Category", type: CategoryType.GASTO },
      });

      const authCookie = await generateAuthCookie(testUserId);

      const res = await app.request(`/api/categories/${otherCategory.id}`, {
        method: "GET",
        headers: {
          Cookie: authCookie,
        },
      });

      expect(res.status).toBe(404);
    });
  });

  describe("PUT /api/categories/:id", () => {
    it("should update a category", async () => {
      const category = await prisma.category.create({
        data: { userId: testUserId, name: "Old Name", type: CategoryType.GASTO },
      });

      const authCookie = await generateAuthCookie(testUserId);

      const res = await app.request(`/api/categories/${category.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Cookie: authCookie,
        },
        body: JSON.stringify({ name: "New Name" }),
      });

      expect(res.status).toBe(200);
      const updatedCategory = await res.json();
      expect(updatedCategory.name).toBe("New Name");

      const dbCategory = await prisma.category.findUnique({
        where: { id: category.id },
      });
      expect(dbCategory?.name).toBe("New Name");
    });

    it("should not update another user's category", async () => {
      const otherUser = await prisma.user.create({
        data: { id: "other-user-id", name: "Other User" },
      });
      const otherCategory = await prisma.category.create({
        data: { userId: otherUser.id, name: "Other Name", type: CategoryType.GASTO },
      });

      const authCookie = await generateAuthCookie(testUserId);

      const res = await app.request(`/api/categories/${otherCategory.id}`, {
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

  describe("DELETE /api/categories/:id", () => {
    it("should delete a category", async () => {
      const category = await prisma.category.create({
        data: { userId: testUserId, name: "To Delete", type: CategoryType.GASTO },
      });

      const authCookie = await generateAuthCookie(testUserId);

      const res = await app.request(`/api/categories/${category.id}`, {
        method: "DELETE",
        headers: {
          Cookie: authCookie,
        },
      });

      expect(res.status).toBe(204);

      const dbCategory = await prisma.category.findUnique({
        where: { id: category.id },
      });
      expect(dbCategory).toBeNull();
    });

    it("should not delete another user's category", async () => {
      const otherUser = await prisma.user.create({
        data: { id: "other-user-id", name: "Other User" },
      });
      const otherCategory = await prisma.category.create({
        data: { userId: otherUser.id, name: "Other Category", type: CategoryType.GASTO },
      });

      const authCookie = await generateAuthCookie(testUserId);

      const res = await app.request(`/api/categories/${otherCategory.id}`, {
        method: "DELETE",
        headers: {
          Cookie: authCookie,
        },
      });

      expect(res.status).toBe(404);
    });
  });
});
