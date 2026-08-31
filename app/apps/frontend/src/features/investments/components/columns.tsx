import { type Column, type ColumnDef } from "@tanstack/react-table";
import {
  TacticalTextCell,
  PremiumAmountCell,
  PremiumBadgeCell,
  SortableHeader,
} from "@/components/data-display/data-table";
import type { InvestmentDTO } from "../api/investmentsService";
import type { Currency } from "@repo/shared";
import { useTranslations } from "next-intl";

interface HeaderCellProps {
  column: Column<InvestmentDTO>;
}

function NameHeader({ column }: HeaderCellProps) {
  const icT = useTranslations("InvestmentColumns");
  return <SortableHeader column={column}>{icT("name")}</SortableHeader>;
}

function CurrencyHeader({ column }: HeaderCellProps) {
  const icT = useTranslations("InvestmentColumns");
  return (
    <div className="flex justify-center">
      <SortableHeader column={column}>{icT("currency")}</SortableHeader>
    </div>
  );
}

function PrincipalHeader({ column }: HeaderCellProps) {
  const icT = useTranslations("InvestmentColumns");
  return (
    <div className="text-right">
      <SortableHeader column={column}>{icT("principal")}</SortableHeader>
    </div>
  );
}

function EarnedHeader({ column }: HeaderCellProps) {
  const icT = useTranslations("InvestmentColumns");
  return (
    <div className="text-right">
      <SortableHeader column={column}>{icT("totalEarned")}</SortableHeader>
    </div>
  );
}

function TotalHeader({ column }: HeaderCellProps) {
  const icT = useTranslations("InvestmentColumns");
  return (
    <div className="text-right">
      <SortableHeader column={column}>{icT("totalValue")}</SortableHeader>
    </div>
  );
}

export const investmentColumns: ColumnDef<InvestmentDTO>[] = [
  {
    accessorKey: "name",
    header: NameHeader,
    cell: ({ row }) => (
      <TacticalTextCell
        title={row.original.name}
        id={row.original.id}
      />
    ),
  },
  {
    accessorKey: "currency",
    header: CurrencyHeader,
    cell: ({ row }) => (
      <div className="flex justify-center">
        <PremiumBadgeCell
          label={row.original.currency}
          variant={(row.original.currency as Currency) === "ARS" ? "primary" : "accent"}
        />
      </div>
    ),
  },
  {
    accessorKey: "principal",
    header: PrincipalHeader,
    cell: ({ row }) => (
      <PremiumAmountCell
        amount={row.original.principal}
        currency={row.original.currency as Currency}
      />
    ),
  },
  {
    accessorKey: "totalEarned",
    header: EarnedHeader,
    cell: ({ row }) => (
      <PremiumAmountCell
        amount={row.original.totalEarned}
        currency={row.original.currency as Currency}
      />
    ),
  },
  {
    accessorKey: "totalValue",
    header: TotalHeader,
    cell: ({ row }) => (
      <PremiumAmountCell
        amount={row.original.totalValue}
        currency={row.original.currency as Currency}
        className="font-black"
      />
    ),
  },
];
