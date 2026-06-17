// src/features/cards/components/columns.tsx

import { Row, type ColumnDef } from "@tanstack/react-table";
import {
  SortableHeader,
  TacticalTextCell,
  PremiumAmountCell,
  PremiumBadgeCell,
  TacticalTypeCell,
} from "@/components/data-display/data-table";
import { cn, getTransactionTypeStyles } from "@/lib/utils";
import {
  Calendar,
  Clock,
  ArrowDownLeft,
  ArrowUpRight,
  RefreshCw,
  CheckCircle2,
  CircleDashed,
  CreditCard,
} from "lucide-react";
import { CardStatementDTO } from "@repo/shared";
import { CardStatementRow } from "../types/card.type";

interface CellProps {
  row: Row<CardStatementDTO>;
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

export const cardColumns: ColumnDef<CardStatementRow>[] = [
  // ── Description ─────────────────────────────────────────────────────────
  {
    accessorKey: "description",
    header: ({ column }) => (
      <SortableHeader column={column}>Descripción</SortableHeader>
    ),
    cell: ({ row }) => {
      const { description, category } = row.original;
      return (
        <div className="flex flex-col gap-0.5">
          <span className="text-sm font-medium">{description}</span>
          {category && (
            <span className="text-xs text-muted-foreground">
              {category.name}
            </span>
          )}
        </div>
      );
    },
  },

  // ── Installment info ─────────────────────────────────────────────────────
  {
    id: "installmentInfo",
    header: "Cuotas",
    cell: ({ row }) => {
      const { installmentInfo, source } = row.original;
      if (installmentInfo) {
        return (
          <div className="flex items-center gap-1.5">
            <RefreshCw className="h-3 w-3 text-muted-foreground opacity-50" />
            <PremiumBadgeCell label={installmentInfo} variant="accent" />
          </div>
        );
      }
      if (source === "pending") {
        return (
          <div className="flex items-center gap-1.5">
            <Clock className="h-3 w-3 text-muted-foreground opacity-50" />
            <PremiumBadgeCell label="Mensual" variant="primary" />
          </div>
        );
      }
      return <span className="text-muted-foreground text-xs">—</span>;
    },
  },

  // ── Card type ────────────────────────────────────────────────────────────
  {
    accessorKey: "cardType",
    header: "Tarjeta",
    cell: ({ row }) => {
      const cardType = row.original.cardType;
      if (!cardType)
        return <span className="text-muted-foreground text-xs">—</span>;
      return (
        <div className="flex items-center gap-1.5">
          <CreditCard className="h-3 w-3 text-muted-foreground opacity-50" />
          <span className="text-xs capitalize">{cardType.toLowerCase()}</span>
        </div>
      );
    },
  },

  // ── Date ─────────────────────────────────────────────────────────────────
  {
    accessorKey: "date",
    header: ({ column }) => (
      <SortableHeader column={column}>Fecha</SortableHeader>
    ),
    cell: ({ row }) => {
      const date = row.original.date;
      return (
        <span className="text-sm text-muted-foreground tabular-nums">
          {new Date(date).toLocaleDateString("es-AR", {
            day: "2-digit",
            month: "short",
          })}
        </span>
      );
    },
  },

  // ── Amount ───────────────────────────────────────────────────────────────
  {
    accessorKey: "amount",
    header: ({ column }) => (
      <div className="text-right">
        <SortableHeader column={column}>Monto</SortableHeader>
      </div>
    ),
    cell: ({ row }) => {
      const { amount, type } = row.original;
      return (
        <div className={cn("text-right")}>
          <PremiumAmountCell
            amount={type === "TRANSFER" ? `+${amount}` : `-${amount}`}
          />
        </div>
      );
    },
  },
];
