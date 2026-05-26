import { Injectable } from '@nestjs/common';
import { PrismaService } from '../infra/prisma/prisma.service';
import { Prisma, Recurrence } from '../generated/prisma';

@Injectable()
export class RecurrenceRepository {
  constructor(private prisma: PrismaService) {}

  async getRecurrences(userId: string): Promise<Recurrence[]> {
    return this.prisma.recurrence.findMany({
      where: {
        userId,
      },
    });
  }

  async getRecurrenceById(
    userId: string,
    id: string,
  ): Promise<Recurrence | null> {
    return this.prisma.recurrence.findFirst({
      where: {
        id,
        userId,
      },
    });
  }

  async saveRecurrence(
    data: Prisma.RecurrenceUncheckedCreateInput,
    tx?: Prisma.TransactionClient,
  ): Promise<Recurrence> {
    const client = tx || this.prisma;
    return client.recurrence.create({
      data,
    });
  }

  async updateRecurrence(
    id: string,
    data: Prisma.RecurrenceUncheckedUpdateInput,
    tx?: Prisma.TransactionClient,
  ): Promise<Recurrence> {
    const client = tx || this.prisma;
    return client.recurrence.update({
      where: { id },
      data,
    });
  }
}
