import { z } from "zod";

export const TransactionTypeSchema = z.enum([
  "INCOME",
  "EXPENSE",
  "TRANSFER",
  "INVESTMENT",
  "RETURN",
  "PAYMENT",
]);

export const AccountTypeSchema = z.enum([
  "BANK",
  "WALLET",
  "CASH",
  "CARD",
  "INVESTMENT",
]);

export const CurrencySchema = z.enum(["ARS", "USD", "USDT"]);

export const RecurrenceTypeSchema = z.enum([
  "MONTHLY",
  "WEEKLY",
  "YEARLY",
  "INSTALLMENT",
]);

export const BudgetCategorySchema = z.enum([
  "DAILY_EXPENSES",
  "FOOD_GROCERIES",
  "ENTERTAINMENT",
  "TRANSPORTATION",
  "HEALTH",
  "UTILITIES",
]);

export const CardTypeSchema = z.enum(["VISA", "MASTERCARD", "AMEX", "MAESTRO"]);

export type TransactionType = z.infer<typeof TransactionTypeSchema>;
export type AccountType = z.infer<typeof AccountTypeSchema>;
export type Currency = z.infer<typeof CurrencySchema>;
export type RecurrenceType = z.infer<typeof RecurrenceTypeSchema>;
export type BudgetCategory = z.infer<typeof BudgetCategorySchema>;
export type CardType = z.infer<typeof CardTypeSchema>;
