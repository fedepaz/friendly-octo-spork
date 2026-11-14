// apps/backend/src/scripts/history-import/import.ts
// Stage 3: writes the validated parse result to a fresh user via Prisma.
import * as bcrypt from 'bcrypt';
import type { PrismaClient } from '@prisma/client';
import { FIXED_CATEGORIES, classifyCategory } from './keywords';
import { IMPORT_ACCOUNTS, computeBalances, expenseSource } from './accounts';
import type { ParseResult, ParsedRow } from './types';

/** Colors mirrored from prisma/seed.ts so the fresh user matches the seed. */
const CATEGORY_COLORS: Record<string, string> = {
  'Groceries & Food Shopping': '#4CAF50',
  'Restaurants & Takeout': '#FF9800',
  'Alcohol & Beverages': '#9C27B0',
  'Tobacco & Smoking': '#795548',
  'Transportation - Fuel': '#2196F3',
  'Transportation - Public/Rideshare': '#03A9F4',
  'Vehicle Maintenance': '#607D8B',
  'Rent & Housing': '#F44336',
  'Utilities & Services': '#FF5722',
  'Personal Care & Grooming': '#E91E63',
  'Clothing & Footwear': '#3F51B5',
  'Health & Medical': '#00BCD4',
  'Gym & Sports': '#8BC34A',
  'Entertainment & Social': '#FFEB3B',
  'Subscriptions & Memberships': '#673AB7',
  'Household & Cleaning': '#009688',
  'Hardware & Electronics': '#9E9E9E',
  'Home Improvement & Tools': '#FF6F00',
  'Gifts & Special Occasions': '#E91E63',
  'Miscellaneous/Other': '#757575',
  Income: '#2E7D32',
  Education: '#5E35B1',
  Pets: '#D84315',
  'Professional Services': '#455A64',
  'Taxes & Fees': '#C62828',
};

const READ_ONLY_ENTITIES = new Set([
  'categories',
  'dashboard',
  'audit_logs',
  'users',
  'user_permissions',
]);

const BCRYPT_ROUNDS = 12;

function accountNamesFor(row: ParsedRow): {
  source?: string;
  target?: string;
} {
  if (row.type === 'EXPENSE') return { source: expenseSource(row) };
  if (row.type === 'INCOME') return { target: 'Banco' };
  if (row.type === 'TRANSFER') return { source: 'Banco', target: 'Efectivo' };
  return {};
}

function dateFromISO(iso: string): Date {
  const [y, m, d] = iso.split('-').map(Number);
  return new Date(y, m - 1, d);
}

export interface ImportOptions {
  email: string;
  name: string;
  password: string;
  force?: boolean;
  dryRun?: boolean;
}

export interface ImportSummary {
  userId: string | null;
  dryRun: boolean;
  userCreated: boolean;
  accounts: number;
  categories: number;
  transactions: number;
  balanceByAccount: Record<string, number>;
}

export async function importHistory(
  prisma: PrismaClient,
  result: ParseResult,
  options: ImportOptions,
): Promise<ImportSummary> {
  const rows = result.tables.flatMap((t) => t.rows);
  const balances = computeBalances(rows);

  if (options.dryRun) {
    return {
      userId: null,
      dryRun: true,
      userCreated: false,
      accounts: IMPORT_ACCOUNTS.length,
      categories: FIXED_CATEGORIES.length,
      transactions: rows.length,
      balanceByAccount: balances,
    };
  }

  // ─── user ────────────────────────────────────────────────────────────────
  let user = await prisma.user.findUnique({ where: { email: options.email } });
  let userCreated = false;

  if (!user) {
    user = await prisma.user.create({
      data: {
        name: options.name,
        email: options.email,
        passwordHash: await bcrypt.hash(options.password, BCRYPT_ROUNDS),
      },
    });
    userCreated = true;
  } else {
    const existing = await prisma.transaction.count({
      where: { userId: user.id },
    });
    if (existing > 0 && !options.force) {
      throw new Error(
        `User ${options.email} already has ${existing} transactions — rerun with --force to wipe and re-import.`,
      );
    }
    if (options.force) {
      await prisma.transaction.deleteMany({ where: { userId: user.id } });
      await prisma.account.deleteMany({ where: { userId: user.id } });
      await prisma.category.deleteMany({ where: { userId: user.id } });
    }
  }
  const userId = user.id;

  // ─── default permissions (same as public registration) ───────────────────
  const existingPerms = await prisma.userPermission.count({
    where: { userId },
  });
  if (existingPerms === 0) {
    const entities = await prisma.entity.findMany();
    if (entities.length > 0) {
      await prisma.userPermission.createMany({
        data: entities.map((entity) => ({
          userId,
          entityId: entity.id,
          canCreate: !READ_ONLY_ENTITIES.has(entity.name),
          canRead: true,
          canUpdate: !READ_ONLY_ENTITIES.has(entity.name),
          canDelete: false,
          scope: 'OWN' as const,
          permissionType: entity.permissionType,
        })),
      });
    }
  }

  // ─── accounts ────────────────────────────────────────────────────────────
  for (const a of IMPORT_ACCOUNTS) {
    const found = await prisma.account.findUnique({
      where: { name_userId: { name: a.name, userId } },
    });
    if (!found) {
      await prisma.account.create({
        data: {
          userId,
          name: a.name,
          type: a.type,
          currency: a.currency,
          balance: 0,
        },
      });
    }
  }
  const accounts = await prisma.account.findMany({ where: { userId } });
  const accountIdByName = new Map(accounts.map((a) => [a.name, a.id]));

  // ─── categories (fixed seeded set) ───────────────────────────────────────
  for (const name of FIXED_CATEGORIES) {
    const found = await prisma.category.findUnique({
      where: { userId_name: { name, userId } },
    });
    if (!found) {
      await prisma.category.create({
        data: { userId, name, color: CATEGORY_COLORS[name] ?? null },
      });
    }
  }
  const categories = await prisma.category.findMany({ where: { userId } });
  const categoryIdByName = new Map(categories.map((c) => [c.name, c.id]));

  // ─── transactions ────────────────────────────────────────────────────────
  if (rows.length > 0) {
    await prisma.transaction.createMany({
      data: rows.map((row) => {
        const names = accountNamesFor(row);
        const category = classifyCategory(row.concept, row.type);
        return {
          userId,
          type: row.type,
          amount: row.amount,
          date: dateFromISO(row.dateISO),
          description: row.concept.slice(0, 255),
          categoryId:
            category === null ? null : (categoryIdByName.get(category) ?? null),
          sourceAccountId: names.source
            ? (accountIdByName.get(names.source) ?? null)
            : null,
          targetAccountId: names.target
            ? (accountIdByName.get(names.target) ?? null)
            : null,
          source: 'history-import',
          metadata: {
            importedFrom: 'ods',
            sheet: row.sheet,
            table: row.tableLabel,
            dateInferred: row.dateInferred,
          },
        };
      }),
    });
  }

  // ─── apply computed balances (mirrors app semantics) ─────────────────────
  for (const [name, balance] of Object.entries(balances)) {
    const id = accountIdByName.get(name);
    if (id) {
      await prisma.account.update({
        where: { id },
        data: { balance },
      });
    }
  }

  return {
    userId,
    dryRun: false,
    userCreated,
    accounts: IMPORT_ACCOUNTS.length,
    categories: FIXED_CATEGORIES.length,
    transactions: rows.length,
    balanceByAccount: balances,
  };
}
