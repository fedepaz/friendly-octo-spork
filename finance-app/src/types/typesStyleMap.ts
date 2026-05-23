// src/types/typesStyleMap.ts

export const typeStyleMap: Record<
  string,
  { bg: string; text: string; border: string; icon: string }
> = {
  BANK: {
    bg: "bg-[var(--accent)]/10",
    text: "text-[var(--accent)]",
    border: "border-[var(--accent)]",
    icon: "BankIcon",
  },
  CASH: {
    bg: "bg-[var(--primary)]/10",
    text: "text-[var(--primary)]",
    border: "border-[var(--primary)]",
    icon: "WalletIcon",
  },

  WALLET: {
    bg: "bg-[var(--secondary)]/10",
    text: "text-[var(--secondary)]",
    border: "border-[var(--secondary)]",
    icon: "WalletIcon",
  },
  CARD: {
    bg: "bg-[var(--accent)]/10",
    text: "text-[var(--accent)]",
    border: "border-[var(--accent)]",
    icon: "CreditCardIcon",
  },
};

// Example usage:
// const typeStyles = typeStyleMap[account.type] || {
//   bg: "bg-muted/20",
//   text: "text-muted-foreground",
//   border: "border-muted",
//   icon: "CreditCardIcon",
