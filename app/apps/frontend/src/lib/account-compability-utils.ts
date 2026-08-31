// src/lib/account-compability-utils.ts

import { AccountDTO, AccountType, TransactionType } from "@repo/shared";

export type AccountRole = "source" | "target";

export interface AccountCompatibility {
  canBeSource: boolean;
  canBeTarget: boolean;
  /** Translation key for the tooltip note */
  noteKey?: string;
}

// ─── COMPATIBILITY MATRIX ──────────────────────────────────────────────────
// Define which account types can participate in which transaction types
export const ACCOUNT_COMPATIBILITY: Record<
  TransactionType,
  Record<AccountType, AccountCompatibility>
> = {
  // ── Money going out ─────────────────────────────────────────────────────
  EXPENSE: {
    BANK: { canBeSource: true, canBeTarget: false },
    WALLET: { canBeSource: true, canBeTarget: false },
    CASH: { canBeSource: true, canBeTarget: false },
    CARD: {
      canBeSource: true,
      canBeTarget: false,
      noteKey: "cardExpense",
    },
    INVESTMENT: {
      canBeSource: true,
      canBeTarget: false,
      noteKey: "withdrawFromInvestment",
    },
  },

  // ── Money coming in ─────────────────────────────────────────────────────
  INCOME: {
    BANK: { canBeSource: false, canBeTarget: true },
    WALLET: { canBeSource: false, canBeTarget: true },
    CASH: { canBeSource: false, canBeTarget: true },
    CARD: {
      canBeSource: false,
      canBeTarget: false,
      noteKey: "cardsNoIncome",
    },
    INVESTMENT: {
      canBeSource: false,
      canBeTarget: true,
      noteKey: "dividendsReturns",
    },
  },

  // ── Move between accounts ───────────────────────────────────────────────
  TRANSFER: {
    BANK: { canBeSource: true, canBeTarget: true },
    WALLET: { canBeSource: true, canBeTarget: true },
    CASH: { canBeSource: true, canBeTarget: true },
    CARD: {
      canBeSource: false,
      canBeTarget: true,
      noteKey: "receiveTransfers",
    },
    INVESTMENT: { canBeSource: true, canBeTarget: true },
  },

  // ── Putting money to work ───────────────────────────────────────────────
  INVESTMENT: {
    BANK: { canBeSource: true, canBeTarget: false },
    WALLET: { canBeSource: true, canBeTarget: false },
    CASH: {
      canBeSource: true,
      canBeTarget: false,
      noteKey: "investCash",
    },
    CARD: {
      canBeSource: false,
      canBeTarget: false,
      noteKey: "noInvestFromCard",
    },
    INVESTMENT: {
      canBeSource: false,
      canBeTarget: true,
      noteKey: "targetInvestment",
    },
  },

  // ── Investment returning ────────────────────────────────────────────────
  RETURN: {
    BANK: { canBeSource: false, canBeTarget: true },
    WALLET: { canBeSource: false, canBeTarget: true },
    CASH: { canBeSource: false, canBeTarget: true, noteKey: "cashOutReturns" },
    CARD: {
      canBeSource: false,
      canBeTarget: false,
      noteKey: "returnsNoCards",
    },
    INVESTMENT: {
      canBeSource: true,
      canBeTarget: true,
      noteKey: "reinvestReturn",
    },
  },

  // ── Paying debt ─────────────────────────────────────────────────────────
  PAYMENT: {
    BANK: { canBeSource: true, canBeTarget: false },
    WALLET: { canBeSource: true, canBeTarget: false },
    CASH: { canBeSource: true, canBeTarget: false },
    CARD: {
      canBeSource: true,
      canBeTarget: true,
      noteKey: "payCardDebt",
    },
    INVESTMENT: {
      canBeSource: true,
      canBeTarget: false,
      noteKey: "sellInvestment",
    },
  },
};

// ─── HELPER FUNCTIONS ─────────────────────────────────────────────────────

/**
 * Check if an account type can be used for a given transaction type and role
 */
export function canUseAccount(
  transactionType: TransactionType,
  accountType: AccountType,
  role: AccountRole,
): boolean {
  const config = ACCOUNT_COMPATIBILITY[transactionType]?.[accountType];
  if (!config) return false;
  return role === "source" ? config.canBeSource : config.canBeTarget;
}

/**
 * Filter accounts array based on transaction type and role
 */
export function filterAccountsByCompatibility(
  accounts: AccountDTO[],
  transactionType: TransactionType,
  role: AccountRole,
  excludeAccountId?: string | null,
): AccountDTO[] {
  return accounts.filter((account) => {
    // Always exclude the same account for transfers
    if (excludeAccountId && account.id === excludeAccountId) return false;

    // Apply compatibility rules
    return canUseAccount(transactionType, account.type, role);
  });
}

/**
 * Get UX hint translation key for why an account is disabled
 */
export function getAccountDisabledReason(
  transactionType: TransactionType,
  accountType: AccountType,
  role: AccountRole,
): string | undefined {
  const config = ACCOUNT_COMPATIBILITY[transactionType]?.[accountType];
  if (!config) return "notCompatible";

  const canUse = role === "source" ? config.canBeSource : config.canBeTarget;
  if (canUse) return undefined;

  return config.noteKey || "notCompatible";
}
