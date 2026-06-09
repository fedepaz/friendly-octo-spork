// backend/src/modules/dashboard/repositories/recurrenceDash.repository.ts

import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../infra/prisma/prisma.service';

@Injectable()
export class RecurrenceDashRepository {
  constructor(private prisma: PrismaService) {}
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
