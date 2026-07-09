import { Body, Controller, Get, Post } from '@nestjs/common';
import { EntitiesService } from './entities.service';
import { CreateEntityDto, Entity } from '@repo/shared';

@Controller('entities')
export class EntitiesController {
  constructor(private readonly entitiesService: EntitiesService) {}

  @Get()
  async findAll(): Promise<Entity[]> {
    return this.entitiesService.findAll();
  }

  @Post('entity')
  async create(@Body() dto: CreateEntityDto): Promise<Entity> {
    return this.entitiesService.create(dto);
  }
}
