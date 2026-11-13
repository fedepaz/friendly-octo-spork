// src/modules/auditLog/repositories/auditLog.repository.ts

import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../infra/prisma/prisma.service';

@Injectable()
export class AuditLogRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAllByUserId(userId: string) {
    const logs = await this.prisma.auditLog.findMany({
      // userId: null rows are system entries (public auth POSTs have no
      // session user yet) — include them alongside the caller's own entries
      where: { OR: [{ userId }, { userId: null }] },
      orderBy: { createdAt: 'desc' },
    });

    // AuditLog has no Prisma relation to User — join manually with a
    // select-only query so passwordHash never leaves the database
    const userIds = [
      ...new Set(
        logs.map((log) => log.userId).filter((id): id is string => id !== null),
      ),
    ];
    const users = userIds.length
      ? await this.prisma.user.findMany({
          where: { id: { in: userIds } },
          select: { id: true, name: true, email: true },
        })
      : [];
    const userById = new Map(users.map((user) => [user.id, user]));

    return logs.map((log) => ({
      ...log,
      user: log.userId ? userById.get(log.userId) : undefined,
    }));
  }
}
