// backend/prisma/seed.ts
import { PrismaClient } from '@prisma/client';
import { AccountType, Currency } from '../src/generated/prisma';
import { PrismaPg } from '@prisma/adapter-pg';

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });
async function main() {
  console.log('🌱 Starting database seeding...');

  // 2. Create the default primary User
  //const passwordHash = await bcrypt.hash('admin123', 10);
  const passwordHash = 'admin123';
  const user = await prisma.user.create({
    data: {
      name: 'Finance Manager',
      email: 'user@admin.com',
      passwordHash: passwordHash,
    },
  });

  console.log(`👤 Created user: ${user.name} (${user.email})`);

  // 3. Create initial Accounts for the user
  const bankAccount = await prisma.account.create({
    data: {
      userId: user.id,
      name: 'Banco Nación',
      type: AccountType.BANK,
      currency: Currency.ARS,
      balance: 150000.0,
    },
  });

  const cashWallet = await prisma.account.create({
    data: {
      userId: user.id,
      name: 'Efectivo',
      type: AccountType.CASH,
      currency: Currency.ARS,
      balance: 12500.0,
    },
  });

  const mercadoLibreWallet = await prisma.account.create({
    data: {
      userId: user.id,
      name: 'Mercado Libre',
      type: AccountType.WALLET,
      currency: Currency.ARS,
      balance: 500.0,
    },
  });

  const creditCard = await prisma.account.create({
    data: {
      userId: user.id,
      name: 'Visa Credit Card',
      type: AccountType.CARD,
      currency: Currency.ARS,
      balance: 0.0,
    },
  });

  console.log('💳 Seeded accounts.');
  console.log(
    `💰 Seeded ${bankAccount.name} with ${bankAccount.balance.toNumber()} ARS.`,
  );
  console.log(
    `💰 Seeded ${cashWallet.name} with ${cashWallet.balance.toNumber()} ARS.`,
  );
  console.log(
    `💰 Seeded ${mercadoLibreWallet.name} with ${mercadoLibreWallet.balance.toNumber()} ARS.`,
  );
  console.log(
    `💰 Seeded ${creditCard.name} with ${creditCard.balance.toNumber()} ARS.`,
  );

  // 4. Create your exact 25 consolidated master categories with their colors
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
    await prisma.category.create({
      data: {
        userId: user.id,
        name: cat.name,
        color: cat.color,
      },
    });
  }

  console.log('🏷️  Seeded consolidated categories successfully.');
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
