// tests/api/recurrences.test.ts
import { describe, it, expect, beforeEach, afterEach } from "bun:test";
import { prisma } from "../../src/lib/prisma";
import app from "../../src/index";
import { sign } from "hono/jwt";
import { RecurrenceType } from "@prisma/client";

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

describe("Recurrences API", () => {
  let testUserId: string;

  beforeEach(async () => {
    // Clean database
    await prisma.recurrence.deleteMany();
    await prisma.user.deleteMany();

    // Create a test user
    const user = await prisma.user.create({
      data: { id: "test-user-123", name: "Test User" },
    });
    testUserId = user.id;
  });

  afterEach(async () => {
    // Clean up
    await prisma.recurrence.deleteMany();
    await prisma.user.deleteMany();
  });

  describe("POST /api/recurrences", () => {
    it("should create a recurrence with valid data", async () => {
      const authCookie = await generateAuthCookie(testUserId);

      const res = await app.request("/api/recurrences", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: authCookie,
        },
        body: JSON.stringify({
          name: "Monthly Rent",
          frequency: RecurrenceType.MONTHLY,
          startDate: "2025-01-01T00:00:00Z",
        }),
      });

      expect(res.status).toBe(201);
      const newRecurrence = await res.json();
      expect(newRecurrence.name).toBe("Monthly Rent");

      const dbRecurrence = await prisma.recurrence.findFirst({
        where: { userId: testUserId, name: "Monthly Rent" },
      });
      expect(dbRecurrence).toBeDefined();
    });

    it("should reject invalid data", async () => {
      const authCookie = await generateAuthCookie(testUserId);

      const res = await app.request("/api/recurrences", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: authCookie,
        },
        body: JSON.stringify({
          name: "", // Invalid name
          frequency: RecurrenceType.MONTHLY,
          startDate: "2025-01-01T00:00:00Z",
        }),
      });

      expect(res.status).toBe(400);
      const error = await res.json();
      expect(error.error).toBe("Validation failed");
    });

    it("should require authentication", async () => {
      const res = await app.request("/api/recurrences", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: "Monthly Rent",
          frequency: RecurrenceType.MONTHLY,
          startDate: "2025-01-01T00:00:00Z",
        }),
      });

      expect(res.status).toBe(302); // Redirect to login
      expect(res.headers.get("location")).toBe("/login");
    });
  });

  describe("GET /api/recurrences", () => {
    it("should list recurrences for the authenticated user", async () => {
      await prisma.recurrence.createMany({
        data: [
          { userId: testUserId, name: "Rent", frequency: RecurrenceType.MONTHLY, startDate: new Date("2025-01-01") },
          { userId: testUserId, name: "Salary", frequency: RecurrenceType.MONTHLY, startDate: new Date("2025-01-01") },
        ],
      });

      const authCookie = await generateAuthCookie(testUserId);

      const res = await app.request("/api/recurrences", {
        method: "GET",
        headers: {
          Cookie: authCookie,
        },
      });

      expect(res.status).toBe(200);
      const recurrences = await res.json();
      expect(recurrences.length).toBe(2);
      expect(recurrences[0].name).toBe("Rent");
    });

    it("should not list other users' recurrences", async () => {
      const otherUser = await prisma.user.create({
        data: { id: "other-user-id", name: "Other User" },
      });
      await prisma.recurrence.create({
        data: { userId: otherUser.id, name: "Other Recurrence", frequency: RecurrenceType.MONTHLY, startDate: new Date("2025-01-01") },
      });

      const authCookie = await generateAuthCookie(testUserId);

      const res = await app.request("/api/recurrences", {
        method: "GET",
        headers: {
          Cookie: authCookie,
        },
      });

      expect(res.status).toBe(200);
      const recurrences = await res.json();
      expect(recurrences.length).toBe(0);
    });
  });

  describe("GET /api/recurrences/:id", () => {
    it("should get a single recurrence by ID", async () => {
      const recurrence = await prisma.recurrence.create({
        data: { userId: testUserId, name: "Single Recurrence", frequency: RecurrenceType.MONTHLY, startDate: new Date("2025-01-01") },
      });

      const authCookie = await generateAuthCookie(testUserId);

      const res = await app.request(`/api/recurrences/${recurrence.id}`, {
        method: "GET",
        headers: {
          Cookie: authCookie,
        },
      });

      expect(res.status).toBe(200);
      const fetchedRecurrence = await res.json();
      expect(fetchedRecurrence.name).toBe("Single Recurrence");
    });

    it("should not get another user's recurrence", async () => {
      const otherUser = await prisma.user.create({
        data: { id: "other-user-id", name: "Other User" },
      });
      const otherRecurrence = await prisma.recurrence.create({
        data: { userId: otherUser.id, name: "Other Recurrence", frequency: RecurrenceType.MONTHLY, startDate: new Date("2025-01-01") },
      });

      const authCookie = await generateAuthCookie(testUserId);

      const res = await app.request(`/api/recurrences/${otherRecurrence.id}`, {
        method: "GET",
        headers: {
          Cookie: authCookie,
        },
      });

      expect(res.status).toBe(404);
    });
  });

  describe("PUT /api/recurrences/:id", () => {
    it("should update a recurrence", async () => {
      const recurrence = await prisma.recurrence.create({
        data: { userId: testUserId, name: "Old Name", frequency: RecurrenceType.MONTHLY, startDate: new Date("2025-01-01") },
      });

      const authCookie = await generateAuthCookie(testUserId);

      const res = await app.request(`/api/recurrences/${recurrence.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Cookie: authCookie,
        },
        body: JSON.stringify({ name: "New Name" }),
      });

      expect(res.status).toBe(200);
      const updatedRecurrence = await res.json();
      expect(updatedRecurrence.name).toBe("New Name");

      const dbRecurrence = await prisma.recurrence.findUnique({
        where: { id: recurrence.id },
      });
      expect(dbRecurrence?.name).toBe("New Name");
    });

    it("should not update another user's recurrence", async () => {
      const otherUser = await prisma.user.create({
        data: { id: "other-user-id", name: "Other User" },
      });
      const otherRecurrence = await prisma.recurrence.create({
        data: { userId: otherUser.id, name: "Other Name", frequency: RecurrenceType.MONTHLY, startDate: new Date("2025-01-01") },
      });

      const authCookie = await generateAuthCookie(testUserId);

      const res = await app.request(`/api/recurrences/${otherRecurrence.id}`, {
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

  describe("DELETE /api/recurrences/:id", () => {
    it("should delete a recurrence", async () => {
      const recurrence = await prisma.recurrence.create({
        data: { userId: testUserId, name: "To Delete", frequency: RecurrenceType.MONTHLY, startDate: new Date("2025-01-01") },
      });

      const authCookie = await generateAuthCookie(testUserId);

      const res = await app.request(`/api/recurrences/${recurrence.id}`, {
        method: "DELETE",
        headers: {
          Cookie: authCookie,
        },
      });

      expect(res.status).toBe(204);

      const dbRecurrence = await prisma.recurrence.findUnique({
        where: { id: recurrence.id },
      });
      expect(dbRecurrence).toBeNull();
    });

    it("should not delete another user's recurrence", async () => {
      const otherUser = await prisma.user.create({
        data: { id: "other-user-id", name: "Other User" },
      });
      const otherRecurrence = await prisma.recurrence.create({
        data: { userId: otherUser.id, name: "Other Recurrence", frequency: RecurrenceType.MONTHLY, startDate: new Date("2025-01-01") },
      });

      const authCookie = await generateAuthCookie(testUserId);

      const res = await app.request(`/api/recurrences/${otherRecurrence.id}`, {
        method: "DELETE",
        headers: {
          Cookie: authCookie,
        },
      });

      expect(res.status).toBe(404);
    });
  });

  describe("PUT /api/recurrences/:id/pause", () => {
    it("should pause a recurrence", async () => {
      const recurrence = await prisma.recurrence.create({
        data: { userId: testUserId, name: "To Pause", frequency: RecurrenceType.MONTHLY, startDate: new Date("2025-01-01"), active: true },
      });

      const authCookie = await generateAuthCookie(testUserId);

      const res = await app.request(`/api/recurrences/${recurrence.id}/pause`, {
        method: "PUT",
        headers: {
          Cookie: authCookie,
        },
      });

      expect(res.status).toBe(200);
      const updatedRecurrence = await res.json();
      expect(updatedRecurrence.active).toBe(false);

      const dbRecurrence = await prisma.recurrence.findUnique({
        where: { id: recurrence.id },
      });
      expect(dbRecurrence?.active).toBe(false);
    });
  });

  describe("PUT /api/recurrences/:id/resume", () => {
    it("should resume a recurrence", async () => {
      const recurrence = await prisma.recurrence.create({
        data: { userId: testUserId, name: "To Resume", frequency: RecurrenceType.MONTHLY, startDate: new Date("2025-01-01"), active: false },
      });

      const authCookie = await generateAuthCookie(testUserId);

      const res = await app.request(`/api/recurrences/${recurrence.id}/resume`, {
        method: "PUT",
        headers: {
          Cookie: authCookie,
        },
      });

      expect(res.status).toBe(200);
      const updatedRecurrence = await res.json();
      expect(updatedRecurrence.active).toBe(true);

      const dbRecurrence = await prisma.recurrence.findUnique({
        where: { id: recurrence.id },
      });
      expect(dbRecurrence?.active).toBe(true);
    });
  });

  describe("POST /api/recurrences/:id/execute", () => {
    it("should execute a recurrence", async () => {
      const recurrence = await prisma.recurrence.create({
        data: { userId: testUserId, name: "To Execute", frequency: RecurrenceType.MONTHLY, startDate: new Date("2025-01-01"), nextDate: new Date("2025-02-01") },
      });

      const authCookie = await generateAuthCookie(testUserId);

      const res = await app.request(`/api/recurrences/${recurrence.id}/execute`, {
        method: "POST",
        headers: {
          Cookie: authCookie,
        },
      });

      expect(res.status).toBe(200);
      const updatedRecurrence = await res.json();
      expect(updatedRecurrence.nextDate).not.toBe(recurrence.nextDate);
      expect(updatedRecurrence.currentPart).toBe(1);
    });
  });
});
