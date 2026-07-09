// backend/prisma/seed.ts
import { PrismaClient } from '@prisma/client';
import { AccountType, Currency } from '../src/generated/prisma';
import { PrismaPg } from '@prisma/adapter-pg';
import * as bcrypt from 'bcrypt';

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('🌱 Starting database seeding...');

  const passwordHash = await bcrypt.hash('admin123', 10);
  const user = await prisma.user.upsert({
    where: { email: 'user@admin.com' },
    update: {},
    create: {
      name: 'Finance Manager',
      email: 'user@admin.com',
      passwordHash,
    },
  });

  console.log(`👤 Created user: ${user.name} (${user.email})`);

  // Accounts (upsert by unique [name, userId])
  const accountsData = [
    { name: 'Banco Nación', type: AccountType.BANK, currency: Currency.ARS, balance: 150000.0 },
    { name: 'Efectivo', type: AccountType.CASH, currency: Currency.ARS, balance: 12500.0 },
    { name: 'Mercado Libre', type: AccountType.WALLET, currency: Currency.ARS, balance: 500.0 },
    { name: 'Visa Credit Card', type: AccountType.CARD, currency: Currency.ARS, balance: 0.0 },
  ];

  for (const a of accountsData) {
    await prisma.account.upsert({
      where: { name_userId: { name: a.name, userId: user.id } },
      update: {},
      create: { userId: user.id, ...a },
    });
  }

  console.log(`💳 Seeded ${accountsData.length} accounts.`);

  // Categories (upsert by unique [userId, name])
  const categoriesData = [
    { name: 'Groceries & Food Shopping', color: '#4CAF50' },
    { name: 'Restaurants & Takeout', color: '#FF9800' },
    { name: 'Alcohol & Beverages', color: '#9C27B0' },
    { name: 'Tobacco & Smoking', color: '#795548' },
    { name: 'Transportation - Fuel', color: '#2196F3' },
    { name: 'Transportation - Public/Rideshare', color: '#03A9F4' },
    { name: 'Vehicle Maintenance', color: '#607D8B' },
    { name: 'Rent & Housing', color: '#F44336' },
    { name: 'Utilities & Services', color: '#FF5722' },
    { name: 'Personal Care & Grooming', color: '#E91E63' },
    { name: 'Clothing & Footwear', color: '#3F51B5' },
    { name: 'Health & Medical', color: '#00BCD4' },
    { name: 'Gym & Sports', color: '#8BC34A' },
    { name: 'Entertainment & Social', color: '#FFEB3B' },
    { name: 'Subscriptions & Memberships', color: '#673AB7' },
    { name: 'Household & Cleaning', color: '#009688' },
    { name: 'Hardware & Electronics', color: '#9E9E9E' },
    { name: 'Home Improvement & Tools', color: '#FF6F00' },
    { name: 'Gifts & Special Occasions', color: '#E91E63' },
    { name: 'Miscellaneous/Other', color: '#757575' },
    { name: 'Income', color: '#2E7D32' },
    { name: 'Education', color: '#5E35B1' },
    { name: 'Pets', color: '#D84315' },
    { name: 'Professional Services', color: '#455A64' },
    { name: 'Taxes & Fees', color: '#C62828' },
  ];

  for (const cat of categoriesData) {
    await prisma.category.upsert({
      where: { userId_name: { userId: user.id, name: cat.name } },
      update: { color: cat.color },
      create: { userId: user.id, ...cat },
    });
  }

  console.log(`🏷️  Seeded ${categoriesData.length} categories.`);

  // Entities
  const entitiesData = [
    { name: 'users', label: 'Usuarios', permissionType: 'CRUD' as const },
    { name: 'user_permissions', label: 'Permisos', permissionType: 'CRUD' as const },
    { name: 'accounts', label: 'Cuentas', permissionType: 'CRUD' as const },
    { name: 'transactions', label: 'Transacciones', permissionType: 'CRUD' as const },
    { name: 'recurrences', label: 'Recurrencias', permissionType: 'CRUD' as const },
    { name: 'cards', label: 'Tarjetas', permissionType: 'CRUD' as const },
    { name: 'categories', label: 'Categorías', permissionType: 'READ_ONLY' as const },
    { name: 'dashboard', label: 'Dashboard', permissionType: 'READ_ONLY' as const },
    { name: 'audit_logs', label: 'Auditoría', permissionType: 'READ_ONLY' as const },
    { name: 'user_profile', label: 'Perfil', permissionType: 'CRUD' as const },
  ];

  const createdEntities = await Promise.all(
    entitiesData.map((e) =>
      prisma.entity.upsert({
        where: { name: e.name },
        update: {},
        create: {
          name: e.name,
          label: e.label,
          permissionType: e.permissionType,
        },
      })
    )
  );

  console.log(`🔐 Seeded ${createdEntities.length} entities`);

  // Grant admin user full permissions on all entities
  for (const entity of createdEntities) {
    await prisma.userPermission.upsert({
      where: {
        userId_entityId: { userId: user.id, entityId: entity.id },
      },
      update: {},
      create: {
        userId: user.id,
        entityId: entity.id,
        canCreate: true,
        canRead: true,
        canUpdate: true,
        canDelete: true,
        scope: 'ALL',
        permissionType: entity.permissionType,
      },
    });
  }

  console.log(`✅ Seeded admin permissions on ${createdEntities.length} entities`);

  // Dev account for admin
  await prisma.devAccount.upsert({
    where: { userId: user.id },
    update: {},
    create: {
      userId: user.id,
    },
  });

  console.log('🛠️  Seeded dev account for admin user');
  console.log('🏁 Database seeding complete!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
