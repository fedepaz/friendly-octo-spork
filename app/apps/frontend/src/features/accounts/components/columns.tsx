// src/features/accounts/components/columns.tsx

import { Row, type ColumnDef } from "@tanstack/react-table";
import { SortableHeader } from "@/components/data-display/data-table";
import { AccountDTO, Currency } from "@repo/shared";
import { formatCurrency, cn } from "@/lib/utils";
import { Building2, Wallet, Banknote, CreditCard, Landmark } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface CellProps {
  row: Row<AccountDTO>;
}

function AccountTypeCell({ row }: CellProps) {
  const accountType = row.original.type;

  const Icon =
    accountType === "BANK"
      ? Building2
      : accountType === "WALLET"
        ? Wallet
        : accountType === "CASH"
          ? Banknote
          : accountType === "CARD"
            ? CreditCard
            : Landmark;

  const label =
    accountType === "BANK"
      ? "Banco"
      : accountType === "WALLET"
        ? "Billetera"
        : accountType === "CASH"
          ? "Efectivo"
          : accountType === "CARD"
            ? "Tarjeta"
            : "Inversión";

  return (
    <div className="flex items-center gap-2">
      <Icon className="h-3.5 w-3.5 text-muted-foreground opacity-70" />
      <span className="text-xs font-medium">{label}</span>
    </div>
  );
}

function CurrencyCell({ row }: CellProps) {
  const currency = row.original.currency;

  return (
    <Badge
      variant="outline"
      className={cn(
        "px-1.5 py-0 text-[10px] font-bold tabular-nums tracking-tighter",
        currency === "USD" || currency === "USDT"
          ? "bg-accent/5 text-accent border-accent/20"
          : "bg-primary/5 text-primary border-primary/20",
      )}
    >
      {currency}
    </Badge>
  );
}

function BalanceCell({ row }: CellProps) {
  const { balance, currency } = row.original;

  return (
    <div className="font-mono text-sm font-bold tabular-nums text-right text-foreground">
      {formatCurrency(balance, currency as Currency)}
    </div>
  );
}

export const accountColumns: ColumnDef<AccountDTO>[] = [
  {
    id: "name",
    header: ({ column }) => (
      <SortableHeader column={column}>Nombre</SortableHeader>
    ),
    cell: ({ row }) => (
      <span className="text-sm font-bold text-foreground tracking-tight">
        {row.original.name}
      </span>
    ),
  },
  {
    accessorKey: "type",
    header: ({ column }) => (
      <SortableHeader column={column}>Tipo</SortableHeader>
    ),
    cell: ({ row }) => <AccountTypeCell row={row} />,
  },
  {
    accessorKey: "currency",
    header: ({ column }) => (
      <div className="flex justify-center">
        <SortableHeader column={column}>Moneda</SortableHeader>
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex justify-center">
        <CurrencyCell row={row} />
      </div>
    ),
  },
  {
    accessorKey: "balance",
    header: ({ column }) => (
      <div className="text-right">
        <SortableHeader column={column}>Saldo</SortableHeader>
      </div>
    ),
    cell: ({ row }) => <BalanceCell row={row} />,
  },
];
