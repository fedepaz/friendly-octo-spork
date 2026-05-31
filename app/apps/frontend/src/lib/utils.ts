import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format currency for ARS, USD, and USDT with industrial precision.
 */
export function formatCurrency(
  amount: number,
  currency: "ARS" | "USD" | "USDT" = "ARS",
  showSymbol = true,
) {
  const formatter = new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: currency === "USDT" ? "USD" : currency, // USDT uses USD formatting
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  let formatted = formatter.format(amount);

  if (currency === "USDT") {
    formatted = formatted.replace("$", "₮");
  }

  return showSymbol ? formatted : formatted.replace(/[^\d,.-]/g, "").trim();
}

/**
 * Tactical color mapping for transaction types.
 */
export function getTransactionTypeStyles(type: string) {
  switch (type) {
    case "INCOME":
      return {
        color: "text-secondary",
        bg: "bg-secondary/10",
        border: "border-secondary/30",
        label: "Ingreso",
      };
    case "EXPENSE":
      return {
        color: "text-destructive",
        bg: "bg-destructive/10",
        border: "border-destructive/30",
        label: "Gasto",
      };
    case "TRANSFER":
      return {
        color: "text-accent",
        bg: "bg-accent/10",
        border: "border-accent/30",
        label: "Transferencia",
      };
    case "INVESTMENT":
      return {
        color: "text-primary",
        bg: "bg-primary/10",
        border: "border-primary/30",
        label: "Inversión",
      };
    case "RETURN":
      return {
        color: "text-secondary",
        bg: "bg-secondary/10",
        border: "border-secondary/30",
        label: "Rendimiento",
      };
    default:
      return {
        color: "text-muted-foreground",
        bg: "bg-muted/10",
        border: "border-muted/30",
        label: type,
      };
  }
}
