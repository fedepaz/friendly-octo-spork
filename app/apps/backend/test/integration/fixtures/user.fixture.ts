// apps/backend/test/integration/fixtures/user.fixture.ts
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

interface CreateUserParams {
  name?: string;
  email?: string;
  password?: string;
}

export async function createTestUser(
  prisma: PrismaClient,
  params?: CreateUserParams,
) {
  const name = params?.name ?? `user_${Date.now()}`;
  const email = params?.email ?? `${name}@test.com`;
  const password = params?.password ?? 'testpass123';
  const passwordHash = await bcrypt.hash(password, 12);

  return prisma.user.create({
    data: {
      name,
      email,
      passwordHash,
    },
  });
}
