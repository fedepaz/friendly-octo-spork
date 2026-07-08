import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../infra/prisma/prisma.service';

@Injectable()
export class DevAccountRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findByUserId(userId: string) {
    return this.prisma.devAccount.findUnique({ where: { userId } });
  }

  async isDevAccount(userId: string): Promise<boolean> {
    const account = await this.prisma.devAccount.findUnique({
      where: { userId },
    });
    return !!account;
  }
}
