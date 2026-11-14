// apps/backend/test/integration/scripts/history-import.e2e-spec.ts
import * as bcrypt from 'bcrypt';
import { prisma } from '../setup';
import { cleanDatabase } from '../helpers';
import { importHistory } from '../../../src/scripts/history-import/import';
import { parseSheets } from '../../../src/scripts/history-import/parse';
import { readSheetsFromBuffer } from '../../../src/scripts/history-import/ods';
import { buildOds } from '../../../src/scripts/history-import/__tests__/fixtures/buildOds';
import type { ParseResult } from '../../../src/scripts/history-import/types';

type Cell = string | number | null;

function sparse(m: Record<number, string | number>): Cell[] {
  const keys = Object.keys(m).map(Number);
  const max = keys.length ? Math.max(...keys) : -1;
  const arr: Cell[] = new Array(max + 1).fill(null);
  for (const k of keys) arr[k] = m[k];
  return arr;
}

function fixtureParse(): ParseResult {
  return parseSheets(
    readSheetsFromBuffer(
      buildOds([
        {
          name: 'mayo2025',
          rows: [
            sparse({ 0: 'GASTOS', 3: 'PAGOS' }),
            sparse({
              0: 'FECHA',
              1: 'MONTO',
              2: 'CONCEPTO',
              5: 'FECHA',
              6: 'MONTO',
              7: 'CONCEPTO',
            }),
            sparse({
              0: '01/may/25',
              1: '1.000,00',
              2: 'alquiler',
              5: '02/may/25',
              6: '380.000,00',
              7: 'internet',
            }),
            sparse({ 0: 'TOTAL', 1: '1.000,00', 5: 'TOTAL', 6: '380.000,00' }),
            sparse({ 10: 'INGRESOS' }),
            sparse({ 10: '01/may/25', 11: '500.000,00', 12: 'sueldo' }),
            sparse({ 14: 'GASTO DIARIO' }),
            sparse({ 14: '03/may/25', 15: '2.000,00', 16: 'sube' }),
            sparse({ 0: 'GASTOS TARJETA' }),
            sparse({ 0: 'FECHA', 1: 'MONTO', 2: 'CONCEPTO' }),
            sparse({ 0: '04/may/25', 1: '15.299,00', 2: 'disney+' }),
            sparse({ 20: 'TRANSFERENCIAS' }),
            sparse({ 20: 'FECHA', 21: 'MONTO', 22: 'CONCEPTO' }),
            sparse({ 20: '05/may/25', 21: '50.000,00', 22: 'mesPasado' }),
            sparse({ 10: 'saldoMP', 11: '7.119,30' }),
          ],
        },
      ]),
    ),
  );
}

const EMAIL = 'import-test@example.com';

describe('history-import (integration)', () => {
  beforeAll(async () => {
    await cleanDatabase(prisma);
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('imports a fresh user with accounts, categories, transactions and balances', async () => {
    const parsed = fixtureParse();

    const summary = await importHistory(prisma, parsed, {
      email: EMAIL,
      name: 'Import Test',
      password: 'Histpass1',
    });

    expect(summary.dryRun).toBe(false);
    expect(summary.userCreated).toBe(true);
    expect(summary.transactions).toBe(6);
    expect(summary.accounts).toBe(5);
    expect(summary.categories).toBe(25);

    const user = await prisma.user.findUnique({ where: { email: EMAIL } });
    expect(user).not.toBeNull();
    expect(await bcrypt.compare('Histpass1', user!.passwordHash)).toBe(true);

    // default permissions granted (same as registration)
    const perms = await prisma.userPermission.count({
      where: { userId: user!.id },
    });
    expect(perms).toBeGreaterThan(0);

    // account balances follow the app's updateBalancesForType semantics:
    // EXPENSE decrements source (except CARD), INCOME increments target,
    // TRANSFER moves source → target.
    const accounts = await prisma.account.findMany({
      where: { userId: user!.id },
      orderBy: { name: 'asc' },
    });
    const balances = Object.fromEntries(
      accounts.map((a) => [a.name, Number(a.balance)]),
    );
    expect(balances).toEqual({
      Banco: 70000,
      Efectivo: 47000,
      Mastercard: 0,
      'Mercado Pago': 0,
      Visa: 0,
    });

    const txs = await prisma.transaction.findMany({
      where: { userId: user!.id },
      include: { category: true, sourceAccount: true, targetAccount: true },
    });
    expect(txs).toHaveLength(6);
    expect(txs.every((t) => t.source === 'history-import')).toBe(true);

    const byDesc = (d: string) => txs.find((t) => t.description === d)!;

    const alquiler = byDesc('alquiler');
    expect(alquiler.type).toBe('EXPENSE');
    expect(alquiler.category?.name).toBe('Rent & Housing');
    expect(alquiler.sourceAccount?.name).toBe('Efectivo');

    const internet = byDesc('internet');
    expect(internet.sourceAccount?.name).toBe('Banco');
    expect(internet.category?.name).toBe('Utilities & Services');

    const sueldo = byDesc('sueldo');
    expect(sueldo.type).toBe('INCOME');
    expect(sueldo.targetAccount?.name).toBe('Banco');
    expect(sueldo.category?.name).toBe('Income');

    const sube = byDesc('sube');
    expect(sube.sourceAccount?.name).toBe('Efectivo');
    expect(sube.category?.name).toBe('Transportation - Public/Rideshare');

    const disney = byDesc('disney+');
    expect(disney.sourceAccount?.name).toBe('Visa');
    expect(disney.category?.name).toBe('Subscriptions & Memberships');

    const transfer = byDesc('mesPasado');
    expect(transfer.type).toBe('TRANSFER');
    expect(transfer.sourceAccount?.name).toBe('Banco');
    expect(transfer.targetAccount?.name).toBe('Efectivo');
    expect(transfer.categoryId).toBeNull();

    // the snapshot cell was NOT imported as a transaction
    expect(txs.find((t) => Number(t.amount) === 7119.3)).toBeUndefined();
  });

  it('dry-run reports what would be written without touching the DB', async () => {
    const parsed = fixtureParse();

    const summary = await importHistory(prisma, parsed, {
      email: 'dryrun-test@example.com',
      name: 'Dry Run',
      password: 'Histpass1',
      dryRun: true,
    });

    expect(summary.dryRun).toBe(true);
    expect(summary.transactions).toBe(6);
    expect(summary.accounts).toBe(5);
    expect(summary.categories).toBe(25);

    const user = await prisma.user.findUnique({
      where: { email: 'dryrun-test@example.com' },
    });
    expect(user).toBeNull();
  });

  it('refuses to run over an existing non-empty user without --force', async () => {
    const parsed = fixtureParse();

    await expect(
      importHistory(prisma, parsed, {
        email: EMAIL,
        name: 'Import Test',
        password: 'Histpass1',
      }),
    ).rejects.toThrow(/--force/);
  });

  it('--force wipes only the target user data and re-imports cleanly', async () => {
    const parsed = fixtureParse();

    const summary = await importHistory(prisma, parsed, {
      email: EMAIL,
      name: 'Import Test',
      password: 'Histpass1',
      force: true,
    });

    expect(summary.userCreated).toBe(false);
    expect(summary.transactions).toBe(6);

    const user = await prisma.user.findUnique({ where: { email: EMAIL } });
    const count = await prisma.transaction.count({
      where: { userId: user!.id },
    });
    expect(count).toBe(6); // not 12 — wiped before re-import
  });
});
