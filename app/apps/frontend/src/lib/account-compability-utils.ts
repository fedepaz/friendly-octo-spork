// src/lib/account-compability-utils.ts

import { AccountDTO, AccountType, TransactionType } from "@repo/shared";

export type AccountRole = "source" | "target";

export interface AccountCompatibility {
  canBeSource: boolean;
  canBeTarget: boolean;
  note?: string; // Optional hint for UX
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
      note: "Credit/debit card expense",
    },
    INVESTMENT: {
      canBeSource: true,
      canBeTarget: false,
      note: "Withdraw from investment",
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
      note: "Cards can't receive income directly",
    },
    INVESTMENT: {
      canBeSource: false,
      canBeTarget: true,
      note: "Dividends, returns",
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
      note: "Can receive transfers (pay down card)",
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
      note: "Invest cash directly",
    },
    CARD: {
      canBeSource: false,
      canBeTarget: false,
      note: "Can't invest from credit card",
    },
    INVESTMENT: {
      canBeSource: false,
      canBeTarget: true,
      note: "Target investment account",
    },
  },

  // ── Investment returning ────────────────────────────────────────────────
  RETURN: {
    BANK: { canBeSource: false, canBeTarget: true },
    WALLET: { canBeSource: false, canBeTarget: true },
    CASH: { canBeSource: false, canBeTarget: true, note: "Cash out returns" },
    CARD: {
      canBeSource: false,
      canBeTarget: false,
      note: "Returns don't go to cards",
    },
    INVESTMENT: {
      canBeSource: true,
      canBeTarget: false,
      note: "Source investment account",
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
      note: "Pay card debt (target) or use card to pay (source)",
    },
    INVESTMENT: {
      canBeSource: true,
      canBeTarget: false,
      note: "Sell investment to pay debt",
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
 * Get UX hint for why an account is disabled (optional)
 */
export function getAccountDisabledReason(
  transactionType: TransactionType,
  accountType: AccountType,
  role: AccountRole,
): string | undefined {
  const config = ACCOUNT_COMPATIBILITY[transactionType]?.[accountType];
  if (!config) return "Not compatible with this transaction type";

  const canUse = role === "source" ? config.canBeSource : config.canBeTarget;
  if (canUse) return undefined;

  return (
    config.note || `Cannot be ${role} for ${transactionType.toLowerCase()}`
  );
}
