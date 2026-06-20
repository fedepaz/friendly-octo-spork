// backend/src/modules/users/users.module.ts

import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UserRepository } from '../../repositories/user.repository';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, UserRepository],
  exports: [UsersService],
})
export class UsersModule {}
