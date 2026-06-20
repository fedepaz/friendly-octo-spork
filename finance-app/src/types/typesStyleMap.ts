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

const recurrenceTypeIcons: Record<string, string> = {
  MONTHLY: "calendar",
  WEEKLY: "calendar-days",
  YEARLY: "calendar",
  INSTALLMENT: "clipboard",
};

export const recurrenceTypeStyles: Record<
  string,
  { icon: string; textColor: string; bgColor: string; borderColor: string }
> = {
  MONTHLY: {
    icon: recurrenceTypeIcons.MONTHLY || "",
    textColor: "text-blue-500",
    bgColor: "bg-blue-500/10",
    borderColor: "border-blue-500/20",
  },
  WEEKLY: {
    icon: recurrenceTypeIcons.WEEKLY || "",
    textColor: "text-purple-500",
    bgColor: "bg-purple-500/10",
    borderColor: "border-purple-500/20",
  },
  YEARLY: {
    icon: recurrenceTypeIcons.YEARLY || "",
    textColor: "text-emerald-500",
    bgColor: "bg-emerald-500/10",
    borderColor: "border-emerald-500/20",
  },
  INSTALLMENT: {
    icon: recurrenceTypeIcons.INSTALLMENT || "",
    textColor: "text-amber-500",
    bgColor: "bg-amber-500/10",
    borderColor: "border-amber-500/20",
  },
};
