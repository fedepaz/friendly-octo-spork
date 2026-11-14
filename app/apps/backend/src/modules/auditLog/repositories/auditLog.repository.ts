// src/modules/auditLog/repositories/auditLog.repository.ts

import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../infra/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { AuditLogQuery } from '../dto/audit-log.query';

@Injectable()
export class AuditLogRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAllByUserId(userId: string, query?: AuditLogQuery) {
    const where: Prisma.AuditLogWhereInput = {
      // userId: null rows are system entries (public auth POSTs have no
      // session user yet) — include them alongside the caller's own entries
      OR: [{ userId }, { userId: null }],
    };

    if (query?.action) {
      where.action = query.action;
    }
    if (query?.entityType) {
      where.entityType = query.entityType;
    }
    if (query?.month) {
      const year = query.year ?? new Date().getFullYear();
      where.createdAt = {
        gte: new Date(year, query.month - 1, 1),
        lte: new Date(year, query.month, 0, 23, 59, 59, 999),
      };
    }

    const logs = await this.prisma.auditLog.findMany({
      where,
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
