import { useTranslations, useLocale } from "next-intl";
import { type ColumnDef, type Column, type Row } from "@tanstack/react-table";
import {
  SortableHeader,
  TacticalTextCell,
  PremiumAmountCell,
  PremiumBadgeCell,
} from "@/components/data-display/data-table";
import { cn } from "@/lib/utils";
import {
  Calendar,
  Clock,
  RefreshCw,
  CreditCard,
} from "lucide-react";
import { CardStatementRow, SOURCE_LABELS, SOURCE_COLORS } from "../types/card.type";

interface HeaderProps {
  column: Column<CardStatementRow>;
}

function DescriptionHeader({ column }: HeaderProps) {
  const ccT = useTranslations("CardsColumns");
  return <SortableHeader column={column}>{ccT("description")}</SortableHeader>;
}

function SourceHeader() {
  const ccT = useTranslations("CardsColumns");
  return ccT("type");
}

function SourceCell({ row }: { row: Row<CardStatementRow> }) {
  const ccT = useTranslations("CardsColumns");
  const { source } = row.original;
  return (
    <span
      className={cn(
        "inline-block px-1.5 py-0.5 text-[9px] font-black uppercase tracking-wider border",
        SOURCE_COLORS[source],
      )}
    >
      {ccT(SOURCE_LABELS[source])}
    </span>
  );
}

function PlanStatusHeader() {
  const ccT = useTranslations("CardsColumns");
  return ccT("planStatus");
}

function InstallmentInfoCell({ row }: { row: Row<CardStatementRow> }) {
  const ccT = useTranslations("CardsColumns");
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
          label={ccT("projected")}
          variant="primary"
          className="bg-accent/10 border-accent/40 text-accent font-black"
        />
      </div>
    );
  }
  return (
    <div className="flex items-center gap-1.5 opacity-30">
      <CreditCard className="h-3 w-3" />
      <span className="text-[10px] font-bold uppercase">{ccT("single")}</span>
    </div>
  );
}

function CardTypeHeader() {
  const ccT = useTranslations("CardsColumns");
  return ccT("card");
}

function CardTypeCell({ row }: { row: Row<CardStatementRow> }) {
  const ccT = useTranslations("CardsColumns");
  const cardType = row.original.cardType;
  if (!cardType)
    return (
      <span className="text-muted-foreground text-[10px] font-mono opacity-20 italic">
        {ccT("notAvailable")}
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
}

function DateHeader({ column }: HeaderProps) {
  const ccT = useTranslations("CardsColumns");
  return <SortableHeader column={column}>{ccT("date")}</SortableHeader>;
}

function DateCell({ row }: { row: Row<CardStatementRow> }) {
  const locale = useLocale();
  const date = row.original.date;
  return (
    <div className="flex items-center gap-2 font-mono text-xs text-muted-foreground tabular-nums opacity-80">
      <Calendar className="h-3 w-3 opacity-40" />
      <span>
        {new Date(date).toLocaleDateString(locale, {
          day: "2-digit",
          month: "short",
        })}
      </span>
    </div>
  );
}

function AmountHeader({ column }: HeaderProps) {
  const ccT = useTranslations("CardsColumns");
  return (
    <div className="text-right">
      <SortableHeader column={column}>{ccT("amount")}</SortableHeader>
    </div>
  );
}

export const cardColumns: ColumnDef<CardStatementRow>[] = [
  {
    accessorKey: "description",
    header: DescriptionHeader,
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
  {
    id: "source",
    header: SourceHeader,
    cell: SourceCell,
  },
  {
    id: "installmentInfo",
    header: PlanStatusHeader,
    cell: InstallmentInfoCell,
  },
  {
    accessorKey: "cardType",
    header: CardTypeHeader,
    cell: CardTypeCell,
  },
  {
    accessorKey: "date",
    header: DateHeader,
    cell: DateCell,
  },
  {
    accessorKey: "amount",
    header: AmountHeader,
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
