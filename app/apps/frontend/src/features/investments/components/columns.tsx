import { type ColumnDef } from "@tanstack/react-table";
import {
  TacticalTextCell,
  PremiumAmountCell,
  PremiumBadgeCell,
  SortableHeader,
} from "@/components/data-display/data-table";
import type { InvestmentDTO } from "../api/investmentsService";
import type { Currency } from "@repo/shared";

export const investmentColumns: ColumnDef<InvestmentDTO>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <SortableHeader column={column}>Nombre</SortableHeader>
    ),
    cell: ({ row }) => (
      <TacticalTextCell
        title={row.original.name}
        id={row.original.id}
      />
    ),
  },
  {
    accessorKey: "currency",
    header: "Moneda",
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
    header: ({ column }) => (
      <div className="text-right">
        <SortableHeader column={column}>Capital</SortableHeader>
      </div>
    ),
    cell: ({ row }) => (
      <PremiumAmountCell
        amount={row.original.principal}
        currency={row.original.currency as Currency}
      />
    ),
  },
  {
    accessorKey: "totalEarned",
    header: ({ column }) => (
      <div className="text-right">
        <SortableHeader column={column}>Ganado</SortableHeader>
      </div>
    ),
    cell: ({ row }) => (
      <PremiumAmountCell
        amount={row.original.totalEarned}
        currency={row.original.currency as Currency}
      />
    ),
  },
  {
    accessorKey: "totalValue",
    header: ({ column }) => (
      <div className="text-right">
        <SortableHeader column={column}>Total</SortableHeader>
      </div>
    ),
    cell: ({ row }) => (
      <PremiumAmountCell
        amount={row.original.totalValue}
        currency={row.original.currency as Currency}
        className="font-black"
      />
    ),
  },
];
