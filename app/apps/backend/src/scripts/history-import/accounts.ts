// apps/backend/src/scripts/history-import/accounts.ts
// Canonical import accounts + balance effects (mirrors the app's
// TransactionService.updateBalancesForType semantics).
import type { ParsedRow } from './types';

export const IMPORT_ACCOUNTS = [
  { name: 'Efectivo', type: 'CASH', currency: 'ARS' },
  { name: 'Banco', type: 'BANK', currency: 'ARS' },
  { name: 'Visa', type: 'CARD', currency: 'ARS' },
  { name: 'Mastercard', type: 'CARD', currency: 'ARS' },
  { name: 'Mercado Pago', type: 'WALLET', currency: 'ARS' },
] as const;

export const CARD_ACCOUNT_NAMES: Set<string> = new Set(
  IMPORT_ACCOUNTS.filter((a) => a.type === 'CARD').map((a) => a.name),
);

export function accountTypeOf(name: string): string {
  const acc = IMPORT_ACCOUNTS.find((a) => a.name === name);
  if (!acc) throw new Error(`Unknown import account: ${name}`);
  return acc.type;
}

export function expenseSource(row: ParsedRow): string {
  switch (row.tableLabel) {
    case 'GASTO DIARIO':
      return 'Efectivo';
    case 'PAGOS':
      return 'Banco';
    case 'GASTOS TARJETA':
    case 'GASTOS TARJETA EXC':
    case 'gastosTarjetaVisa':
      return 'Visa';
    default: {
      const c = row.concept.toLowerCase();
      if (c.includes('mastercard')) return 'Mastercard';
      if (c.includes('visa')) return 'Visa';
      if (c.includes('mercado')) return 'Mercado Pago';
      return 'Efectivo';
    }
  }
}

export interface Effect {
  account: string;
  delta: number;
}

/**
 * Balance effects for one row — the single source of truth shared by the
 * import writer and the reconciliation report:
 * - EXPENSE decrements its source account (CARD sources never move)
 * - INCOME increments the target account (Banco)
 * - TRANSFER moves Banco → Efectivo
 */
export function effectsForRow(row: ParsedRow): Effect[] {
  if (row.type === 'EXPENSE') {
    const src = expenseSource(row);
    if (CARD_ACCOUNT_NAMES.has(src)) return [];
    return [{ account: src, delta: -row.amount }];
  }
  if (row.type === 'INCOME') {
    return [{ account: 'Banco', delta: row.amount }];
  }
  if (row.type === 'TRANSFER') {
    return [
      { account: 'Banco', delta: -row.amount },
      { account: 'Efectivo', delta: row.amount },
    ];
  }
  return [];
}

export function computeBalances(rows: ParsedRow[]): Record<string, number> {
  const balances: Record<string, number> = {};
  for (const a of IMPORT_ACCOUNTS) balances[a.name] = 0;
  for (const row of rows) {
    for (const eff of effectsForRow(row)) {
      balances[eff.account] += eff.delta;
    }
  }
  return balances;
}
