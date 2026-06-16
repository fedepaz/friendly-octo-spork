// src/features/cards/components/columns.tsx

import { Row, type ColumnDef } from "@tanstack/react-table";
import {
  SortableHeader,
  TacticalTextCell,
  PremiumAmountCell,
  PremiumBadgeCell,
  TacticalTypeCell,
} from "@/components/data-display/data-table";
import { getTransactionTypeStyles } from "@/lib/utils";
import {
  Calendar,
  Clock,
  ArrowDownLeft,
  ArrowUpRight,
  RefreshCw,
} from "lucide-react";
import { CardDTO, CardStatementItem } from "@repo/shared";

interface CellProps {
  row: Row<CardDTO>;
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
    <TacticalTypeCell
      icon={Icon}
      label={styles.label}
      iconClassName={styles.color}
    />
  );
}

export const cardColumns: ColumnDef<CardStatementItem>[] = [
  {
    accessorKey: "amount",
    header: ({ column }) => (
      <div className="text-right">
        <SortableHeader column={column}>Monto</SortableHeader>
      </div>
    ),
    cell: ({ row }) => <PremiumAmountCell amount={row.original.amount} />,
  },
  {
    accessorKey: "frequency",
    header: "Frecuencia",
    cell: ({ row }) => {
      const frequency = row.original.installmentInfo;
      const label =
        frequency === "MONTHLY"
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
];
