import { Row, type Column, type ColumnDef } from "@tanstack/react-table";
import { SortableHeader, TacticalTypeCell, TacticalTextCell, PremiumBadgeCell, PremiumAmountCell } from "@/components/data-display/data-table";
import { AccountDTO, Currency } from "@repo/shared";
import { Building2, Wallet, Banknote, CreditCard, Landmark } from "lucide-react";
import { useTranslations } from "next-intl";

interface CellProps {
  row: Row<AccountDTO>;
}

interface HeaderCellProps {
  column: Column<AccountDTO>;
}

function AccountTypeCell({ row }: CellProps) {
  const acT = useTranslations("AccountColumns");
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
      ? acT("bank")
      : accountType === "WALLET"
        ? acT("wallet")
        : accountType === "CASH"
          ? acT("cash")
          : accountType === "CARD"
            ? acT("card")
            : acT("investment");

  return <TacticalTypeCell icon={Icon} label={label} />;
}

function NameHeader({ column }: HeaderCellProps) {
  const acT = useTranslations("AccountColumns");
  return <SortableHeader column={column}>{acT("identification")}</SortableHeader>;
}

function TypeHeader({ column }: HeaderCellProps) {
  const acT = useTranslations("AccountColumns");
  return <SortableHeader column={column}>{acT("operativeType")}</SortableHeader>;
}

function CurrencyHeader({ column }: HeaderCellProps) {
  const acT = useTranslations("AccountColumns");
  return (
    <div className="flex justify-center">
      <SortableHeader column={column}>{acT("currency")}</SortableHeader>
    </div>
  );
}

function BalanceHeader({ column }: HeaderCellProps) {
  const acT = useTranslations("AccountColumns");
  return (
    <div className="text-right">
      <SortableHeader column={column}>{acT("consolidatedBalance")}</SortableHeader>
    </div>
  );
}

export const accountColumns: ColumnDef<AccountDTO>[] = [
  {
    id: "name",
    header: NameHeader,
    cell: ({ row }) => (
      <TacticalTextCell title={row.original.name} id={row.original.id} />
    ),
  },
  {
    accessorKey: "type",
    header: TypeHeader,
    cell: ({ row }) => <AccountTypeCell row={row} />,
  },
  {
    accessorKey: "currency",
    header: CurrencyHeader,
    cell: ({ row }) => (
      <div className="flex justify-center">
        <PremiumBadgeCell label={row.original.currency} variant={row.original.currency === "ARS" ? "primary" : "accent"} />
      </div>
    ),
  },
  {
    accessorKey: "balance",
    header: BalanceHeader,
    cell: ({ row }) => (
      <PremiumAmountCell amount={row.original.balance} currency={row.original.currency as Currency} />
    ),
  },
];
