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

  async getRecurrenceById(id: string): Promise<Recurrence | null> {
    return await prisma.recurrence.findFirst({
      where: {
        id,
      },
    });
  }

  async saveRecurrence(
    data: Prisma.RecurrenceUncheckedCreateInput,
    tx?: Prisma.TransactionClient,
  ): Promise<Recurrence> {
    const client = tx || prisma;
    return await client.recurrence.create({
      data,
    });
  }

  async updateRecurrence(
    id: string,
    data: Prisma.RecurrenceUncheckedUpdateInput,
    tx?: Prisma.TransactionClient,
  ): Promise<Recurrence> {
    const client = tx || prisma;
    return await client.recurrence.update({
      where: { id },
      data,
    });
  }
}
