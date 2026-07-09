import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { EntitiesRepository } from './repositories/entities.repository';
import { CreateEntityDto, Entity } from '@repo/shared';

@Injectable()
export class EntitiesService {
  constructor(private readonly entitiesRepo: EntitiesRepository) {}

  async findAll(): Promise<Entity[]> {
    return this.entitiesRepo.findAll();
  }

  async findById(id: string): Promise<Entity> {
    const entity = await this.entitiesRepo.findById(id);
    if (!entity) {
      throw new NotFoundException(`Entity with id ${id} not found`);
    }
    return entity;
  }

  async findByName(name: string) {
    return this.entitiesRepo.findByName(name);
  }

  async create(dto: CreateEntityDto): Promise<Entity> {
    const existing = await this.entitiesRepo.findByName(dto.name);
    if (existing) {
      throw new ConflictException(
        `Entity with name "${dto.name}" already exists`,
      );
    }
    return this.entitiesRepo.create(dto);
  }

  async deactivate(id: string): Promise<void> {
    await this.findById(id);
    await this.entitiesRepo.deactivate(id);
  }
}
