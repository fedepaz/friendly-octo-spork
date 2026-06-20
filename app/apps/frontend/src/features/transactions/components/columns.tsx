// src/features/transactions/components/columns.tsx

import { Row, type ColumnDef } from "@tanstack/react-table";
import { TransactionDTO } from "@repo/shared";
import { getTransactionTypeStyles } from "@/lib/utils";
import {
  ArrowDownLeft,
  ArrowUpRight,
  RefreshCw,
  TrendingUp,
  CreditCard,
  Receipt,
  Minus,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  PremiumAmountCell,
  PremiumBadgeCell,
  PremiumDateCell,
  SortableHeader,
  TacticalTextCell,
} from "@/components/data-display/data-table";

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
    <div className="flex items-center gap-2">
      <div className="flex h-6 w-6 items-center justify-center bg-muted/20 border border-border/40 shadow-inner">
        <Icon
          className={styles.color.replace("text-", "text-").concat(" h-3 w-3")}
        />
      </div>
      <PremiumBadgeCell
        label={styles.label}
        variant={
          type === "INCOME"
            ? "secondary"
            : type === "EXPENSE"
              ? "destructive"
              : "primary"
        }
      />
    </div>
  );
}

export const transactionsColumns: ColumnDef<TransactionDTO>[] = [
  {
    accessorKey: "date",
    header: ({ column }) => (
      <SortableHeader column={column}>Fecha</SortableHeader>
    ),
    cell: ({ row }) => <PremiumDateCell date={row.original.date} />,
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
      <TacticalTextCell
        title={row.original.category?.name || "Sin categoría"}
        subtext={row.original.description?.replaceAll("\n", " ")}
      />
    ),
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
      />
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
              <CreditCard className="h-3.5 w-3.5 text-accent opacity-70 hover:opacity-100 transition-opacity" />
            </TooltipTrigger>
            <TooltipContent side="top">Gasto con Tarjeta</TooltipContent>
          </Tooltip>
        )}
        {row.original.isBudgetedExpense && (
          <Tooltip>
            <TooltipTrigger asChild>
              <Receipt className="h-3.5 w-3.5 text-primary opacity-70 hover:opacity-100 transition-opacity" />
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
