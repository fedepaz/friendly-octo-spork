// src/features/transactions/components/columns.tsx

import { Row, type ColumnDef, type Column } from "@tanstack/react-table";
import { useTranslations } from "next-intl";
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

interface HeaderProps {
  column: Column<TransactionDTO>;
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

function DateHeader({ column }: HeaderProps) {
  const tcT = useTranslations("TransactionColumns");
  return <SortableHeader column={column}>{tcT("dateHeader")}</SortableHeader>;
}

function TypeHeader({ column }: HeaderProps) {
  const tcT = useTranslations("TransactionColumns");
  return <SortableHeader column={column}>{tcT("typeHeader")}</SortableHeader>;
}

function DescriptionHeader({ column }: HeaderProps) {
  const tcT = useTranslations("TransactionColumns");
  return <SortableHeader column={column}>{tcT("descriptionHeader")}</SortableHeader>;
}

function DescriptionCell({ row }: CellProps) {
  const tcT = useTranslations("TransactionColumns");
  return (
    <TacticalTextCell
      title={row.original.category?.name || tcT("noCategory")}
      subtext={row.original.description?.replaceAll("\n", " ")}
    />
  );
}

function AmountHeader({ column }: HeaderProps) {
  const tcT = useTranslations("TransactionColumns");
  return (
    <div className="text-right">
      <SortableHeader column={column}>{tcT("amountHeader")}</SortableHeader>
    </div>
  );
}

function FlagsCell({ row }: CellProps) {
  const tcT = useTranslations("TransactionColumns");
  return (
    <div className="flex items-center gap-1.5 justify-end">
      {row.original.isCardExpense && (
        <Tooltip>
          <TooltipTrigger asChild>
            <CreditCard className="h-3.5 w-3.5 text-accent opacity-70 hover:opacity-100 transition-opacity" />
          </TooltipTrigger>
          <TooltipContent side="top">{tcT("cardExpenseTooltip")}</TooltipContent>
        </Tooltip>
      )}
      {row.original.isBudgetedExpense && (
        <Tooltip>
          <TooltipTrigger asChild>
            <Receipt className="h-3.5 w-3.5 text-primary opacity-70 hover:opacity-100 transition-opacity" />
          </TooltipTrigger>
          <TooltipContent side="top">{tcT("budgetedExpenseTooltip")}</TooltipContent>
        </Tooltip>
      )}
      {!row.original.isCardExpense && !row.original.isBudgetedExpense && (
        <Minus className="h-3.5 w-3.5 opacity-10" />
      )}
    </div>
  );
}

export const transactionsColumns: ColumnDef<TransactionDTO>[] = [
  {
    accessorKey: "date",
    header: DateHeader,
    cell: ({ row }) => <PremiumDateCell date={row.original.date} />,
  },
  {
    accessorKey: "type",
    header: TypeHeader,
    cell: ({ row }) => <TransactionTypeCell row={row} />,
  },
  {
    accessorKey: "description",
    header: DescriptionHeader,
    cell: DescriptionCell,
  },
  {
    accessorKey: "amount",
    header: AmountHeader,
    cell: ({ row }) => (
      <PremiumAmountCell
        amount={row.original.amount}
      />
    ),
  },
  {
    id: "flags",
    header: "",
    cell: FlagsCell,
  },
];
