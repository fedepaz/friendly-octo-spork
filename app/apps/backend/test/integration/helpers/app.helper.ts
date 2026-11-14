// apps/backend/test/integration/helpers/app.helper.ts
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { AppModule } from '../../../src/app.module';
import { AuditCrudInterceptor } from '../../../src/shared/interceptors/audit-crud.interceptor';
import { PrismaService } from '../../../src/infra/prisma/prisma.service';

export async function createTestApp(): Promise<INestApplication> {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  const app = moduleFixture.createNestApplication();

  // Mirror main.ts: the audit interceptor is registered globally there but
  // lives outside AppModule, so tests must register it themselves.
  app.useGlobalInterceptors(new AuditCrudInterceptor(app.get(PrismaService)));

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
