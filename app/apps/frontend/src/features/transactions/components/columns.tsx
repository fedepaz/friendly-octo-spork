// src/features/transactions/components/columns.tsx

import { Row, type ColumnDef } from "@tanstack/react-table";
import { SortableHeader } from "@/components/data-display/data-table";
import { TransactionDTO } from "@repo/shared";
import {
  formatCurrency,
  getTransactionTypeStyles,
  cn,
} from "@/lib/utils";
import { formatShortDate } from "@/lib/date-utils";
import {
  ArrowDownLeft,
  ArrowUpRight,
  RefreshCw,
  TrendingUp,
  CreditCard,
  Receipt,
  Minus,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface CellProps {
  row: Row<TransactionDTO>;
}

function TransactionTypeCell({ row }: CellProps) {
  const type = row.original.type;
  const styles = getTransactionTypeStyles(type);

  const Icon =
    type === "INCOME" || type === "RETURN"
      ? ArrowDownLeft
      : type === "EXPENSE"
        ? ArrowUpRight
        : type === "TRANSFER"
          ? RefreshCw
          : TrendingUp;

  return (
    <Badge
      variant="outline"
      className={cn(
        "gap-1 px-1.5 py-0 text-[10px] font-bold uppercase tracking-tighter",
        styles.bg,
        styles.color,
        styles.border,
      )}
    >
      <Icon className="h-3 w-3" />
      {styles.label}
    </Badge>
  );
}

function AmountCell({ row }: CellProps) {
  const { amount, type } = row.original;
  const isNegative = type === "EXPENSE" || type === "INVESTMENT";

  return (
    <div
      className={cn(
        "font-mono text-sm font-bold tabular-nums text-right",
        isNegative ? "text-destructive" : "text-secondary",
      )}
    >
      {isNegative ? "-" : "+"}
      {formatCurrency(amount)}
    </div>
  );
}

export const transactionsColumns: ColumnDef<TransactionDTO>[] = [
  {
    accessorKey: "date",
    header: ({ column }) => (
      <SortableHeader column={column}>Fecha</SortableHeader>
    ),
    cell: ({ row }) => (
      <span className="text-xs font-mono text-muted-foreground whitespace-nowrap">
        {formatShortDate(row.original.date)}
      </span>
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
    accessorKey: "description",
    header: ({ column }) => (
      <SortableHeader column={column}>Descripción</SortableHeader>
    ),
    cell: ({ row }) => (
      <div className="flex flex-col gap-0.5 max-w-[200px]">
        <span className="text-sm font-semibold truncate leading-none">
          {row.original.description}
        </span>
        <span className="text-[10px] text-muted-foreground truncate opacity-70">
          {row.original.category?.name || "Sin categoría"}
        </span>
      </div>
    ),
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
    accessorKey: "accounts",
    header: "Cuentas",
    cell: ({ row }) => (
      <div className="flex flex-col text-[10px] gap-0.5 font-mono text-muted-foreground">
        <div className="flex items-center gap-1">
          <span className="opacity-50">De:</span>
          <span className="truncate max-w-[80px]">
            {row.original.sourceAccount?.name || "-"}
          </span>
        </div>
        {row.original.targetAccount && (
          <div className="flex items-center gap-1">
            <span className="opacity-50">A:</span>
            <span className="truncate max-w-[80px]">
              {row.original.targetAccount.name}
            </span>
          </div>
        )}
      </div>
    ),
  },
  {
    id: "flags",
    header: "",
    cell: ({ row }) => (
      <div className="flex items-center gap-1.5 justify-end">
        {row.original.isCardExpense && (
          <Tooltip>
            <TooltipTrigger asChild>
              <CreditCard className="h-3.5 w-3.5 text-accent" />
            </TooltipTrigger>
            <TooltipContent side="top">Gasto con Tarjeta</TooltipContent>
          </Tooltip>
        )}
        {row.original.isBudgetedExpense && (
          <Tooltip>
            <TooltipTrigger asChild>
              <Receipt className="h-3.5 w-3.5 text-primary" />
            </TooltipTrigger>
            <TooltipContent side="top">Gasto Presupuestado</TooltipContent>
          </Tooltip>
        )}
        {!row.original.isCardExpense && !row.original.isBudgetedExpense && (
          <Minus className="h-3.5 w-3.5 opacity-10" />
        )}
      </div>
    ),
  },
];
