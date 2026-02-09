// src/api/recurrences/recurrences.service.ts

import { RecurrenceRepository } from "../repositories/recurrence.repository";
import type { CreateRecurrenceInput } from "./recurrences.schema";

export class RecurrencesService {
  private recurrenceRepository = new RecurrenceRepository();
  async findAllRecurrences(userId: string) {
    if (!userId) {
      throw new Error("User id is required");
    }
    const recurrences = await this.recurrenceRepository.getRecurrences();
    return recurrences;
  }

  async findRecurrenceById(recurrenceId: number) {
    if (!recurrenceId) {
      throw new Error("Recurrence id is required");
    }
    const recurrence =
      await this.recurrenceRepository.getRecurrenceById(recurrenceId);

    if (!recurrence) {
      throw new Error("Recurrence not found");
    }

    return recurrence;
  }

  async createRecurrence(userId: string, data: CreateRecurrenceInput) {
    const startDate = new Date(data.startDate);
    const nextDate = this.calculateNextDate(startDate, data.frequency);

    if (nextDate < startDate) {
      throw new Error("Start date must be before next date");
    }
    const recurrence = await this.recurrenceRepository.saveRecurrence({
      ...data,
      startDate,
      nextDate,
      userId,
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
