// tests/services/recurrences.test.ts
import { describe, it, expect, beforeEach, afterEach } from "bun:test";
import { prisma } from "../../src/lib/prisma";
import { RecurrencesService } from "../../src/api/recurrences/recurrences.service";
import { RecurrenceType } from "@prisma/client";

describe("RecurrencesService", () => {
  let service: RecurrencesService;
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

    service = new RecurrencesService();
  });

  afterEach(async () => {
    // Clean up
    await prisma.recurrence.deleteMany();
    await prisma.user.deleteMany();
  });

  it("should create a recurrence", async () => {
    const recurrence = await service.createRecurrence(testUserId, {
      name: "Test Recurrence",
      frequency: RecurrenceType.MONTHLY,
      startDate: "2025-01-01T00:00:00Z",
    });

    expect(recurrence).toBeDefined();
    expect(recurrence.name).toBe("Test Recurrence");
    expect(recurrence.userId).toBe(testUserId);
  });

  it("should get recurrences for a user", async () => {
    await service.createRecurrence(testUserId, {
      name: "Recurrence 1",
      frequency: RecurrenceType.MONTHLY,
      startDate: "2025-01-01T00:00:00Z",
    });
    await service.createRecurrence(testUserId, {
      name: "Recurrence 2",
      frequency: RecurrenceType.WEEKLY,
      startDate: "2025-01-01T00:00:00Z",
    });

    const recurrences = await service.getRecurrences(testUserId);
    expect(recurrences.length).toBe(2);
    expect(recurrences[0].name).toBe("Recurrence 1");
  });

  it("should get a single recurrence by ID", async () => {
    const createdRecurrence = await service.createRecurrence(testUserId, {
      name: "Single Recurrence",
      frequency: RecurrenceType.MONTHLY,
      startDate: "2025-01-01T00:00:00Z",
    });

    const fetchedRecurrence = await service.getRecurrenceById(testUserId, createdRecurrence.id);
    expect(fetchedRecurrence).toBeDefined();
    expect(fetchedRecurrence?.name).toBe("Single Recurrence");
  });

  it("should update a recurrence", async () => {
    const createdRecurrence = await service.createRecurrence(testUserId, {
      name: "Old Name",
      frequency: RecurrenceType.MONTHLY,
      startDate: "2025-01-01T00:00:00Z",
    });

    const updatedRecurrence = await service.updateRecurrence(testUserId, createdRecurrence.id, {
      name: "New Name",
    });

    expect(updatedRecurrence.name).toBe("New Name");
  });

  it("should delete a recurrence", async () => {
    const createdRecurrence = await service.createRecurrence(testUserId, {
      name: "To Delete",
      frequency: RecurrenceType.MONTHLY,
      startDate: "2025-01-01T00:00:00Z",
    });

    await service.deleteRecurrence(testUserId, createdRecurrence.id);

    const deletedRecurrence = await service.getRecurrenceById(testUserId, createdRecurrence.id);
    expect(deletedRecurrence).toBeNull();
  });

  it("should not get another user's recurrence", async () => {
    const otherUser = await prisma.user.create({
      data: { id: "other-user-id", name: "Other User" },
    });
    const otherRecurrence = await service.createRecurrence(otherUser.id, {
      name: "Other Recurrence",
      frequency: RecurrenceType.MONTHLY,
      startDate: "2025-01-01T00:00:00Z",
    });

    const fetchedRecurrence = await service.getRecurrenceById(testUserId, otherRecurrence.id);
    expect(fetchedRecurrence).toBeNull();
  });

  it("should pause a recurrence", async () => {
    const createdRecurrence = await service.createRecurrence(testUserId, {
      name: "To Pause",
      frequency: RecurrenceType.MONTHLY,
      startDate: "2025-01-01T00:00:00Z",
      active: true,
    });

    const pausedRecurrence = await service.pauseRecurrence(testUserId, createdRecurrence.id);
    expect(pausedRecurrence.active).toBe(false);
  });

  it("should resume a recurrence", async () => {
    const createdRecurrence = await service.createRecurrence(testUserId, {
      name: "To Resume",
      frequency: RecurrenceType.MONTHLY,
      startDate: "2025-01-01T00:00:00Z",
      active: false,
    });

    const resumedRecurrence = await service.resumeRecurrence(testUserId, createdRecurrence.id);
    expect(resumedRecurrence.active).toBe(true);
  });

  it("should execute a recurrence", async () => {
    const createdRecurrence = await service.createRecurrence(testUserId, {
      name: "To Execute",
      frequency: RecurrenceType.MONTHLY,
      startDate: "2025-01-01T00:00:00Z",
      nextDate: "2025-02-01T00:00:00Z",
    });

    const executedRecurrence = await service.executeNextRecurrence(testUserId, createdRecurrence.id);
    expect(executedRecurrence.nextDate).not.toBe(createdRecurrence.nextDate);
    expect(executedRecurrence.currentPart).toBe(1);
  });
});
