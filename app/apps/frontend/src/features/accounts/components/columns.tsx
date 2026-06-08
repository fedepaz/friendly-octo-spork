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
    <div className="flex items-center gap-2.5">
      <div className="flex h-7 w-7 items-center justify-center bg-muted/20 border border-border/40 shadow-inner">
        <Icon className="h-3.5 w-3.5 text-muted-foreground" />
      </div>
      <span className="text-[11px] font-bold uppercase tracking-tight text-foreground/80">
        {label}
      </span>
    </div>
  );
}

function CurrencyCell({ row }: CellProps) {
  const currency = row.original.currency;

  return (
    <Badge
      variant="outline"
      className={cn(
        "px-2 py-0.5 text-[9px] font-black tabular-nums tracking-widest rounded-none border-2 transition-premium",
        currency === "USD" || currency === "USDT"
          ? "bg-accent/10 text-accent border-accent/20"
          : "bg-primary/10 text-primary border-primary/20",
      )}
    >
      {currency}
    </Badge>
  );
}

function BalanceCell({ row }: CellProps) {
  const { balance, currency } = row.original;
  const numBalance = Number(balance);

  return (
    <div className={cn(
      "font-mono text-sm font-black tabular-nums text-right transition-premium",
      numBalance > 0 ? "text-emerald-400" : numBalance < 0 ? "text-rose-400" : "text-foreground"
    )}>
      {formatCurrency(balance, currency as Currency)}
    </div>
  );
}

export const accountColumns: ColumnDef<AccountDTO>[] = [
  {
    id: "name",
    header: ({ column }) => (
      <SortableHeader column={column}>Identificación</SortableHeader>
    ),
    cell: ({ row }) => (
      <div className="flex flex-col gap-0.5">
        <span className="text-sm font-black text-foreground tracking-tighter uppercase font-oxanium">
          {row.original.name}
        </span>
        <span className="text-[9px] font-mono text-muted-foreground/50 uppercase tracking-widest">
          ID: {row.original.id.slice(-8)}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "type",
    header: ({ column }) => (
      <SortableHeader column={column}>Tipo Operativo</SortableHeader>
    ),
    cell: ({ row }) => <AccountTypeCell row={row} />,
  },
  {
    accessorKey: "currency",
    header: ({ column }) => (
      <div className="flex justify-center">
        <SortableHeader column={column}>Divisa</SortableHeader>
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
        <SortableHeader column={column}>Saldo Consolidado</SortableHeader>
      </div>
    ),
    cell: ({ row }) => <BalanceCell row={row} />,
  },
];
