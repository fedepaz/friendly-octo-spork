// backend/src/repositories/recurrence.repository.ts

import { Injectable } from '@nestjs/common';
import { PrismaService } from '../infra/prisma/prisma.service';
import { Prisma } from '@prisma/client';

export type RecurrenceWithRelations = Prisma.RecurrenceGetPayload<{
  include: {
    category: true;
    sourceAccount: true;
    targetAccount: true;
  };
}>;

@Injectable()
export class RecurrenceRepository {
  constructor(private prisma: PrismaService) {}

  async getRecurrences(userId: string): Promise<RecurrenceWithRelations[]> {
    return this.prisma.recurrence.findMany({
      where: {
        userId,
      },
      include: {
        category: true,
        sourceAccount: true,
        targetAccount: true,
      },
    });
  }

  async getRecurrenceById(
    userId: string,
    id: string,
  ): Promise<RecurrenceWithRelations | null> {
    return this.prisma.recurrence.findFirst({
      where: {
        id,
        userId,
      },
      include: {
        category: true,
        sourceAccount: true,
        targetAccount: true,
      },
    });
  }

  async saveRecurrence(
    data: Prisma.RecurrenceUncheckedCreateInput,
    tx?: Prisma.TransactionClient,
  ): Promise<RecurrenceWithRelations> {
    const client = tx || this.prisma;
    return client.recurrence.create({
      data,
      include: {
        category: true,
        sourceAccount: true,
        targetAccount: true,
      },
    });
  }

  async updateRecurrence(
    id: string,
    data: Prisma.RecurrenceUncheckedUpdateInput,
    tx?: Prisma.TransactionClient,
  ): Promise<RecurrenceWithRelations> {
    const client = tx || this.prisma;
    return client.recurrence.update({
      where: { id },
      data,
      include: {
        category: true,
        sourceAccount: true,
        targetAccount: true,
      },
    });
  }
}
