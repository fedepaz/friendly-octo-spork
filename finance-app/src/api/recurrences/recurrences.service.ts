// src/api/recurrences/recurrences.service.ts

import { RecurrenceRepository } from "../repositories/recurrence.repository";
import type {
  CreateRecurrenceInput,
  RecurrenceInput,
  UpdateRecurrenceInput,
} from "./recurrences.schema";
import { calculateNextDate } from "@/lib/date-utils";
import { RecurrenceType, TransactionType } from "@/generated/prisma";
import { Prisma } from "@/generated/prisma";

export class RecurrencesService {
  private recurrenceRepository = new RecurrenceRepository();

  /**
   * Maps a Prisma Recurrence object to the RecurrenceInput type
   * Converts Prisma.Decimal to number for amount field
   */
  private mapToRecurrenceInput(
    recurrence: Prisma.RecurrenceGetPayload<object>,
  ): RecurrenceInput {
    return {
      ...recurrence,
      amount: Number(recurrence.amount), // Convert Prisma.Decimal to number
    };
  }

  async findAllRecurrences(userId: string): Promise<RecurrenceInput[]> {
    if (!userId) {
      throw new Error("User id is required");
    }
    const recurrences = await this.recurrenceRepository.getRecurrences(userId);
    return recurrences.map((recurrence) =>
      this.mapToRecurrenceInput(recurrence),
    );
  }

  async findRecurrenceById(recurrenceId: string): Promise<RecurrenceInput> {
    if (!recurrenceId) {
      throw new Error("Recurrence id is required");
    }
    const recurrence =
      await this.recurrenceRepository.getRecurrenceById(recurrenceId);

    if (!recurrence) {
      throw new Error("Recurrence not found");
    }

    return this.mapToRecurrenceInput(recurrence);
  }

  async createRecurrence(
    userId: string,
    data: CreateRecurrenceInput,
  ): Promise<RecurrenceInput> {
    const startDate = new Date(data.startDate);
    const nextDate = calculateNextDate(
      startDate,
      data.frequency as RecurrenceType,
    );

    // Validation removed: calculateNextDate always returns a date >= startDate
    // The actual validation for future dates happens in calculateNextDate itself
    const recurrence = await this.recurrenceRepository.saveRecurrence({
      ...data,
      startDate,
      nextDate,
      userId,
    });

    return this.mapToRecurrenceInput(recurrence);
  }

  async updateRecurrence(
    id: string,
    data: UpdateRecurrenceInput,
  ): Promise<RecurrenceInput> {
    const recurrence = await this.recurrenceRepository.updateRecurrence(
      id,
      data,
    );
    return this.mapToRecurrenceInput(recurrence);
  }
}
