// src/features/recurrences/components/columns.tsx

import { Row, type ColumnDef } from "@tanstack/react-table";
import { 
  SortableHeader, 
  TacticalTextCell, 
  PremiumAmountCell, 
  PremiumBadgeCell, 
  TacticalTypeCell 
} from "@/components/data-display/data-table";
import { RecurrenceDTO } from "@repo/shared";
import { getTransactionTypeStyles } from "@/lib/utils";
import {
  Calendar,
  Clock,
  ArrowDownLeft,
  ArrowUpRight,
  RefreshCw,
} from "lucide-react";

interface CellProps {
  row: Row<RecurrenceDTO>;
}

function TransactionTypeCell({ row }: CellProps) {
  const type = row.original.type;
  const styles = getTransactionTypeStyles(type);

  const Icon =
    type === "INCOME"
      ? ArrowDownLeft
      : type === "EXPENSE"
        ? ArrowUpRight
        : RefreshCw;

  return <TacticalTypeCell icon={Icon} label={styles.label} iconClassName={styles.color} />;
}

export const recurrenceColumns: ColumnDef<RecurrenceDTO>[] = [
  {
    id: "name",
    header: ({ column }) => (
      <SortableHeader column={column}>Nombre</SortableHeader>
    ),
    cell: ({ row }) => (
      <TacticalTextCell 
        title={row.original.name} 
        subtext={row.original.category?.name || "Sin categoría"} 
      />
    ),
  },
  {
    accessorKey: "type",
    header: ({ column }) => (
      <SortableHeader column={column}>Dirección</SortableHeader>
    ),
    cell: ({ row }) => <TransactionTypeCell row={row} />,
  },
  {
    accessorKey: "amount",
    header: ({ column }) => (
      <div className="text-right">
        <SortableHeader column={column}>Monto</SortableHeader>
      </div>
    ),
    cell: ({ row }) => (
      <PremiumAmountCell 
        amount={row.original.amount} 
        isNegative={row.original.type === "EXPENSE"} 
      />
    ),
  },
  {
    accessorKey: "frequency",
    header: "Frecuencia",
    cell: ({ row }) => {
      const frequency = row.original.frequency;
      const label = frequency === "MONTHLY"
        ? "Mensual"
        : frequency === "WEEKLY"
          ? "Semanal"
          : frequency === "YEARLY"
            ? "Anual"
            : "Cuotas";
      
      return (
        <div className="flex items-center gap-2">
          <Clock className="h-3 w-3 text-muted-foreground opacity-50" />
          <PremiumBadgeCell label={label} variant="accent" />
        </div>
      );
    },
  },
  {
    accessorKey: "parts",
    header: "Ciclos",
    cell: ({ row }) => {
      const { totalParts, currentPart } = row.original;
      if (!totalParts || !currentPart)
        return <span className="text-muted-foreground opacity-30">—</span>;

      return (
        <div className="flex items-center gap-1.5">
          <Calendar className="h-3 w-3 text-muted-foreground opacity-50" />
          <span className="font-mono text-[10px] font-black tracking-tighter">
            {currentPart.toString().padStart(2, "0")}
            <span className="text-muted-foreground opacity-30 mx-0.5">/</span>
            {totalParts.toString().padStart(2, "0")}
          </span>
        </div>
      );
    },
  },
];
