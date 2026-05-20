// src/api/recurrences/recurrences.service.ts

import { RecurrenceRepository } from "../repositories/recurrence.repository";
import type { CreateRecurrenceInput } from "./recurrences.schema";
import { calculateNextDate } from "@/lib/date-utils";
import { RecurrenceType } from "@/generated/prisma";

export class RecurrencesService {
  private recurrenceRepository = new RecurrenceRepository();
  async findAllRecurrences(userId: string) {
    if (!userId) {
      throw new Error("User id is required");
    }
    const recurrences = await this.recurrenceRepository.getRecurrences(userId);
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
    const nextDate = calculateNextDate(startDate, data.frequency as RecurrenceType);

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
}
