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
  CreditCard,
  Hash,
} from "lucide-react";
import { CardStatementRow, SOURCE_LABELS, SOURCE_COLORS } from "../types/card.type";

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
        <TacticalTextCell
          title={description}
          subtext={category?.name}
          className="text-sm"
        />
      );
    },
  },

  // ── Source / Tipo ─────────────────────────────────────────────────────────
  {
    id: "source",
    header: "Tipo",
    cell: ({ row }) => {
      const { source } = row.original;
      return (
        <span
          className={cn(
            "inline-block px-1.5 py-0.5 text-[9px] font-black uppercase tracking-wider border",
            SOURCE_COLORS[source],
          )}
        >
          {SOURCE_LABELS[source]}
        </span>
      );
    },
  },

  // ── Installment info ─────────────────────────────────────────────────────
  {
    id: "installmentInfo",
    header: "Plan / Estado",
    cell: ({ row }) => {
      const { installmentInfo, source } = row.original;
      if (installmentInfo) {
        return (
          <div className="flex items-center gap-1.5">
            <RefreshCw className="h-3 w-3 text-muted-foreground opacity-50" />
            <PremiumBadgeCell
              label={installmentInfo}
              variant="accent"
              className="font-black"
            />
          </div>
        );
      }
      if (source === "recurrence") {
        return (
          <div className="flex items-center gap-1.5">
            <Clock className="h-3 w-3 text-accent animate-pulse" />
            <PremiumBadgeCell
              label="Proyectado"
              variant="primary"
              className="bg-accent/10 border-accent/40 text-accent font-black"
            />
          </div>
        );
      }
      return (
        <div className="flex items-center gap-1.5 opacity-30">
          <CreditCard className="h-3 w-3" />
          <span className="text-[10px] font-bold uppercase">Único</span>
        </div>
      );
    },
  },

  // ── Card type ────────────────────────────────────────────────────────────
  {
    accessorKey: "cardType",
    header: "Tarjeta",
    cell: ({ row }) => {
      const cardType = row.original.cardType;
      if (!cardType)
        return (
          <span className="text-muted-foreground text-[10px] font-mono opacity-20 italic">
            n/a
          </span>
        );
      return (
        <div className="flex items-center gap-1.5">
          <div className="p-1 bg-muted/40 border border-border/40">
            <CreditCard className="h-3 w-3 text-muted-foreground" />
          </div>
          <span className="text-[10px] font-black uppercase tracking-wider">
            {cardType}
          </span>
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
        <div className="flex items-center gap-2 font-mono text-xs text-muted-foreground tabular-nums opacity-80">
          <Calendar className="h-3 w-3 opacity-40" />
          <span>
            {new Date(date).toLocaleDateString("es-AR", {
              day: "2-digit",
              month: "short",
            })}
          </span>
        </div>
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
      const { amount, type, source } = row.original;
      const isPending = source === "recurrence";

      return (
        <div className={cn("text-right font-mono", isPending && "opacity-60")}>
          <PremiumAmountCell
            amount={type === "TRANSFER" ? `+${amount}` : `-${amount}`}
            className={cn("text-sm", isPending && "italic")}
          />
        </div>
      );
    },
  },
];
