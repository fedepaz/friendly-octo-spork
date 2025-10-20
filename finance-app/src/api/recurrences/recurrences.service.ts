// src/api/recurrences/recurrences.service.ts
import { prisma } from "../../lib/prisma";
import type { CreateRecurrenceInput, UpdateRecurrenceInput } from "./recurrences.schema";

export class RecurrencesService {
  async getRecurrences(userId: string) {
    return await prisma.recurrence.findMany({
      where: { userId },
      orderBy: { name: "asc" },
    });
  }

  async getRecurrenceById(userId: string, id: number) {
    return await prisma.recurrence.findFirst({
      where: { id, userId },
    });
  }

  async createRecurrence(userId: string, data: CreateRecurrenceInput) {
    return await prisma.recurrence.create({
      data: {
        ...data,
        userId,
      },
    });
  }

  async updateRecurrence(userId: string, id: number, data: UpdateRecurrenceInput) {
    return await prisma.recurrence.update({
      where: { id, userId },
      data,
    });
  }

  async deleteRecurrence(userId: string, id: number) {
    return await prisma.recurrence.delete({
      where: { id, userId },
    });
  }

  async pauseRecurrence(userId: string, id: number) {
    return await prisma.recurrence.update({
      where: { id, userId },
      data: { active: false },
    });
  }

  async resumeRecurrence(userId: string, id: number) {
    return await prisma.recurrence.update({
      where: { id, userId },
      data: { active: true },
    });
  }

  async executeNextRecurrence(userId: string, id: number) {
    // This is a simplified example. In a real app, this would involve:
    // 1. Fetching the recurrence details.
    // 2. Creating a new transaction based on the recurrence.
    // 3. Updating the recurrence's nextDate and currentPart.
    // For now, we'll just update the nextDate.
    const recurrence = await this.getRecurrenceById(userId, id);
    if (!recurrence) {
      throw new Error("Recurrence not found");
    }

    let nextDate = new Date(recurrence.nextDate || recurrence.startDate);
    switch (recurrence.frequency) {
      case "MONTHLY":
        nextDate.setMonth(nextDate.getMonth() + 1);
        break;
      case "WEEKLY":
        nextDate.setDate(nextDate.getDate() + 7);
        break;
      case "YEARLY":
        nextDate.setFullYear(nextDate.getFullYear() + 1);
        break;
      case "INSTALLMENT":
        // For installments, nextDate might be calculated differently
        // based on totalParts and currentPart
        break;
    }

    return await prisma.recurrence.update({
      where: { id, userId },
      data: {
        nextDate: nextDate,
        currentPart: recurrence.currentPart ? recurrence.currentPart + 1 : 1,
      },
    });
  }
}