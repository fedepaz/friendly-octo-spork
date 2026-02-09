// src/api/repositories/recurrence.repository.ts

import type { Prisma, Recurrence } from "@/generated/prisma";
import { prisma } from "@/lib/prisma";

export class RecurrenceRepository {
  async getRecurrences(userId: string): Promise<Recurrence[]> {
    return await prisma.recurrence.findMany({
      where: {
        userId,
      },
    });
  }

  async getRecurrenceById(id: number): Promise<Recurrence | null> {
    return await prisma.recurrence.findFirst({
      where: {
        id,
      },
    });
  }

  async saveRecurrence(
    data: Prisma.RecurrenceUncheckedCreateInput,
  ): Promise<Recurrence> {
    return await prisma.recurrence.create({
      data,
    });
  }
}
