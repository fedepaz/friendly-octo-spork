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

  async getRecurrencesWithHistory(userId: string) {
    return this.prisma.recurrence.findMany({
      where: {
        userId,
        active: true,
      },
      include: {
        category: true,
        sourceAccount: true,
        targetAccount: true,
        transactions: {
          orderBy: { date: 'desc' },
          // only need recent ones to check payment status
          take: 3,
        },
      },
      orderBy: { nextDate: 'asc' },
    });
  }

  // For dashboard — what's coming up next
  async getUpcoming(userId: string) {
    return this.prisma.recurrence.findMany({
      where: {
        userId,
        active: true,
        nextDate: { gte: new Date() },
      },
      include: { category: true, sourceAccount: true },
      orderBy: { nextDate: 'asc' },
    });
  }

  // For detecting missed payments
  async getOverdue(userId: string) {
    return this.prisma.recurrence.findMany({
      where: {
        userId,
        active: true,
        nextDate: { lt: new Date() },
      },
      include: { category: true, sourceAccount: true },
      orderBy: { nextDate: 'asc' },
    });
  }
}
