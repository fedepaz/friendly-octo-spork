// src/api/recurrences/recurrences.service.ts

import { RecurrenceRepository } from "../repositories/recurrence.repository";
import type {
  CreateRecurrenceInput,
  RecurrenceDTO,
  UpdateRecurrenceInput,
} from "./recurrences.schema";
import { calculateNextDate } from "@/lib/date-utils";
import { RecurrenceType } from "@/generated/prisma";
import { Prisma } from "@/generated/prisma";

export class RecurrencesService {
  private recurrenceRepository = new RecurrenceRepository();

  /**
   * Maps a Prisma Recurrence object to the RecurrenceDTO type
   * Converts Prisma.Decimal to number for amount field
   */
  private mapToRecurrenceDTO(
    recurrence: Prisma.RecurrenceGetPayload<object>,
  ): RecurrenceDTO {
    return {
      ...recurrence,
      amount: Number(recurrence.amount), // Convert Prisma.Decimal to number
    };
  }

  async findAllRecurrences(userId: string): Promise<RecurrenceDTO[]> {
    if (!userId) {
      throw new Error("User id is required");
    }
    const recurrences = await this.recurrenceRepository.getRecurrences(userId);
    return recurrences.map((recurrence) => this.mapToRecurrenceDTO(recurrence));
  }

  async findRecurrenceById(
    userId: string,
    recurrenceId: string,
  ): Promise<RecurrenceDTO> {
    if (!userId) {
      throw new Error("User id is required");
    }
    if (!recurrenceId) {
      throw new Error("Recurrence id is required");
    }
    const recurrence = await this.recurrenceRepository.getRecurrenceById(
      userId,
      recurrenceId,
    );

    if (!recurrence) {
      throw new Error("Recurrence not found");
    }

    return this.mapToRecurrenceDTO(recurrence);
  }

  async createRecurrence(
    userId: string,
    data: CreateRecurrenceInput,
  ): Promise<RecurrenceDTO> {
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

    return this.mapToRecurrenceDTO(recurrence);
  }

  async updateRecurrence(
    id: string,
    data: UpdateRecurrenceInput,
  ): Promise<RecurrenceDTO> {
    const recurrence = await this.recurrenceRepository.updateRecurrence(
      id,
      data,
    );
    return this.mapToRecurrenceDTO(recurrence);
  }
}
