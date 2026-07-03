// apps/backend/test/integration/helpers/app.helper.ts
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { AppModule } from '../../../src/app.module';

export async function createTestApp(): Promise<INestApplication> {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  const app = moduleFixture.createNestApplication();

  await app.init();

  // Register cleanup: disconnect Prisma when app closes
  const originalClose = app.close.bind(app);
  app.close = async () => {
    try {
      const prisma = app.get(PrismaClient);
      await prisma.$disconnect();
    } catch {
      // PrismaClient not available — ignore
    }
    return originalClose();
  };

  return app;
}
