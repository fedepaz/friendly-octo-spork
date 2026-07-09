// apps/backend/test/integration/setup.ts
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

let prisma: PrismaClient;

const entitiesData = [
  { name: 'users', label: 'Usuarios', permissionType: 'CRUD' as const },
  {
    name: 'user_permissions',
    label: 'Permisos',
    permissionType: 'CRUD' as const,
  },
  { name: 'accounts', label: 'Cuentas', permissionType: 'CRUD' as const },
  {
    name: 'transactions',
    label: 'Transacciones',
    permissionType: 'CRUD' as const,
  },
  {
    name: 'recurrences',
    label: 'Recurrencias',
    permissionType: 'CRUD' as const,
  },
  { name: 'cards', label: 'Tarjetas', permissionType: 'CRUD' as const },
  {
    name: 'categories',
    label: 'Categorías',
    permissionType: 'READ_ONLY' as const,
  },
  {
    name: 'dashboard',
    label: 'Dashboard',
    permissionType: 'READ_ONLY' as const,
  },
  {
    name: 'audit_logs',
    label: 'Auditoría',
    permissionType: 'READ_ONLY' as const,
  },
  { name: 'user_profile', label: 'Perfil', permissionType: 'CRUD' as const },
];

beforeAll(async () => {
  const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL!,
  });
  prisma = new PrismaClient({ adapter });

  // Seed entities required by the permissions system
  await Promise.all(
    entitiesData.map((e) =>
      prisma.entity.upsert({
        where: { name: e.name },
        update: {},
        create: {
          name: e.name,
          label: e.label,
          permissionType: e.permissionType,
        },
      }),
    ),
  );
});

afterAll(async () => {
  if (prisma) {
    await prisma.$disconnect();
  }
});

export { prisma };
