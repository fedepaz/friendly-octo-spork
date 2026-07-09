import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../infra/prisma/prisma.service';
import { CreateEntityDto } from '@repo/shared';

@Injectable()
export class EntitiesRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.entity.findMany({
      where: { isActive: true },
      orderBy: { label: 'asc' },
    });
  }

  async findByName(name: string) {
    return this.prisma.entity.findUnique({ where: { name } });
  }

  async findById(id: string) {
    return this.prisma.entity.findUnique({ where: { id } });
  }

  async create(dto: CreateEntityDto) {
    return this.prisma.entity.create({
      data: {
        name: dto.name,
        label: dto.label,
        permissionType: dto.permissionType,
      },
    });
  }

  async deactivate(id: string) {
    return this.prisma.entity.update({
      where: { id },
      data: { isActive: false },
    });
  }
}
