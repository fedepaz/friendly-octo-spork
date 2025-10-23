// src/api/recurrences/recurrences.service.ts

import { prisma } from "@/lib/prisma";
import type {
  CreateRecurrenceInput,
  RecurrenceFilterInput,
} from "./recurrences.schema";

export class RecurrencesService {
  async getRecurrences(userId: string, filters?: RecurrenceFilterInput) {
    const recurrences = await prisma.recurrence.findMany({
      where: {
        userId,
        ...(filters?.frequency && { frequency: filters.frequency }),
        ...(filters?.active && { active: filters.active }),
      },
      orderBy: [{ frequency: "asc" }, { name: "asc" }],
      include: {
        _count: {
          select: { transactions: true },
        },
      },
    });

    return recurrences;
  }

  async getRecurrenceById(userId: string, recurrenceId: number) {
    const recurrence = await prisma.recurrence.findFirst({
      where: {
        id: recurrenceId,
        userId,
      },
      include: {
        _count: {
          select: { transactions: true },
        },
        transactions: {
          orderBy: { date: "desc" },
          take: 10,
        },
      },
    });

    if (!recurrence) {
      throw new Error("Recurrence not found");
    }

    return recurrence;
  }

  async createRecurrence(userId: string, data: CreateRecurrenceInput) {
    const startDate = new Date(data.startDate || new Date());
    const nextDate = this.calculateNextDate(startDate, data.frequency);
    const recurrence = await prisma.recurrence.create({
      data: {
        userId,
        name: data.name,
        frequency: data.frequency,
        totalParts: data.totalParts,
        currentPart: data.currentPart,
        startDate: startDate,
        nextDate: nextDate,
        active: data.active,
      },
    });

    return recurrence;
  }
  private calculateNextDate(currentDate: Date, frequency: string): Date {
    const next = new Date(currentDate);

    switch (frequency) {
      case "MONTHLY":
        next.setMonth(next.getMonth() + 1);
        break;
      case "WEEKLY":
        next.setDate(next.getDate() + 7);
        break;
      case "YEARLY":
        next.setFullYear(next.getFullYear() + 1);
        break;
      case "INSTALLMENT":
        next.setMonth(next.getMonth() + 1);
        break;
      default:
        throw new Error("Invalid frequency");
    }

    return next;
  }
}
