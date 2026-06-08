// src/features/accounts/components/columns.tsx

import { Row, type ColumnDef } from "@tanstack/react-table";
import { SortableHeader, TacticalTypeCell, TacticalTextCell, PremiumBadgeCell, PremiumAmountCell } from "@/components/data-display/data-table";
import { AccountDTO, Currency } from "@repo/shared";
import { Building2, Wallet, Banknote, CreditCard, Landmark } from "lucide-react";

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

  return <TacticalTypeCell icon={Icon} label={label} />;
}

export const accountColumns: ColumnDef<AccountDTO>[] = [
  {
    id: "name",
    header: ({ column }) => (
      <SortableHeader column={column}>Identificación</SortableHeader>
    ),
    cell: ({ row }) => (
      <TacticalTextCell title={row.original.name} id={row.original.id} />
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
        <PremiumBadgeCell label={row.original.currency} variant={row.original.currency === "ARS" ? "primary" : "accent"} />
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
    cell: ({ row }) => (
      <PremiumAmountCell amount={row.original.balance} currency={row.original.currency as Currency} />
    ),
  },
];
