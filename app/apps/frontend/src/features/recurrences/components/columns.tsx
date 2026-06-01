// src/features/recurrences/components/columns.tsx

import { Row, type ColumnDef } from "@tanstack/react-table";
import { SortableHeader } from "@/components/data-display/data-table";
import { RecurrenceDTO } from "@repo/shared";
import { formatCurrency, getTransactionTypeStyles, cn } from "@/lib/utils";
import { formatShortDate } from "@/lib/date-utils";
import { Badge } from "@/components/ui/badge";
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

  return (
    <div className={cn("flex items-center gap-1.5", styles.color)}>
      <Icon className="h-3.5 w-3.5" />
      <span className="text-[10px] font-bold uppercase tracking-tighter">
        {styles.label}
      </span>
    </div>
  );
}

function AmountCell({ row }: CellProps) {
  const { amount, type } = row.original;
  const isNegative = type === "EXPENSE";

  return (
    <div
      className={cn(
        "font-mono text-sm font-bold tabular-nums text-right",
        isNegative ? "text-destructive" : "text-secondary",
      )}
    >
      {formatCurrency(amount)}
    </div>
  );
}

function FrequencyCell({ row }: CellProps) {
  const frequency = row.original.frequency;

  return (
    <Badge
      variant="outline"
      className="bg-accent/5 text-accent border-accent/20 px-1.5 py-0 text-[10px] font-bold"
    >
      <Clock className="mr-1 h-3 w-3" />
      {frequency === "MONTHLY"
        ? "Mensual"
        : frequency === "WEEKLY"
          ? "Semanal"
          : frequency === "YEARLY"
            ? "Anual"
            : "Cuotas"}
    </Badge>
  );
}

function PartsCell({ row }: CellProps) {
  const { totalParts, currentPart } = row.original;
  if (!totalParts)
    return <span className="text-muted-foreground opacity-30">—</span>;
  if (!currentPart)
    return <span className="text-muted-foreground opacity-30">—</span>;

  const isLast = currentPart === totalParts;

  return (
    <div className="flex items-center gap-1 font-mono text-[10px]">
      <span className={cn(isLast ? "text-secondary" : "text-primary")}>
        [{currentPart.toString().padStart(2, "0")}
      </span>
      <span className="opacity-30">/</span>
      <span className="opacity-50">
        {totalParts.toString().padStart(2, "0")}]
      </span>
    </div>
  );
}

export const recurrenceColumns: ColumnDef<RecurrenceDTO>[] = [
  {
    id: "name",
    header: ({ column }) => (
      <SortableHeader column={column}>Nombre</SortableHeader>
    ),
    cell: ({ row }) => (
      <div className="flex flex-col gap-0.5">
        <span className="text-sm font-bold text-foreground leading-none">
          {row.original.name}
        </span>
        <span className="text-[10px] text-muted-foreground opacity-70 italic truncate max-w-[150px]">
          {row.original.categoryId || "Sin categoría"}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "type",
    header: ({ column }) => (
      <SortableHeader column={column}>Tipo</SortableHeader>
    ),
    cell: ({ row }) => <TransactionTypeCell row={row} />,
  },
  {
    accessorKey: "frequency",
    header: ({ column }) => (
      <SortableHeader column={column}>Frecuencia</SortableHeader>
    ),
    cell: ({ row }) => <FrequencyCell row={row} />,
  },
  {
    accessorKey: "parts",
    header: ({ column }) => (
      <SortableHeader column={column}>Progreso</SortableHeader>
    ),
    cell: ({ row }) => <PartsCell row={row} />,
  },
  {
    accessorKey: "amount",
    header: ({ column }) => (
      <div className="text-right">
        <SortableHeader column={column}>Monto</SortableHeader>
      </div>
    ),
    cell: ({ row }) => <AmountCell row={row} />,
  },
  {
    accessorKey: "nextDate",
    header: ({ column }) => (
      <SortableHeader column={column}>Próximo Pago</SortableHeader>
    ),
    cell: ({ row }) => (
      <div className="flex items-center gap-1.5 text-[11px] font-mono text-muted-foreground">
        <Calendar className="h-3 w-3 opacity-50" />
        {formatShortDate(row.original.nextDate)}
      </div>
    ),
  },
  {
    accessorKey: "accounts",
    header: "Cuentas",
    cell: ({ row }) => (
      <div className="flex flex-col text-[10px] gap-0.5 font-mono text-muted-foreground">
        <div className="flex items-center gap-1">
          <span className="opacity-50">Origen:</span>
          <span className="truncate max-w-[80px]">
            {row.original.sourceAccountId || "-"}
          </span>
        </div>
      </div>
    ),
  },
];
