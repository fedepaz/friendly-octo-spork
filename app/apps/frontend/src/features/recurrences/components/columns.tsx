// src/features/recurrences/components/columns.tsx

import { Row, type ColumnDef, type Column } from "@tanstack/react-table";
import { useTranslations } from "next-intl";
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

interface HeaderProps {
  column: Column<RecurrenceDTO>;
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

function NameHeader({ column }: HeaderProps) {
  const rcT = useTranslations("RecurrenceColumns");
  return <SortableHeader column={column}>{rcT("nameHeader")}</SortableHeader>;
}

function NameCell({ row }: CellProps) {
  const rcT = useTranslations("RecurrenceColumns");
  return (
    <TacticalTextCell 
      title={row.original.name} 
      subtext={row.original.category?.name || rcT("noCategory")} 
    />
  );
}

function DirectionHeader({ column }: HeaderProps) {
  const rcT = useTranslations("RecurrenceColumns");
  return <SortableHeader column={column}>{rcT("directionHeader")}</SortableHeader>;
}

function AmountHeader({ column }: HeaderProps) {
  const rcT = useTranslations("RecurrenceColumns");
  return (
    <div className="text-right">
      <SortableHeader column={column}>{rcT("amountHeader")}</SortableHeader>
    </div>
  );
}

function FrequencyHeader() {
  const rcT = useTranslations("RecurrenceColumns");
  return rcT("frequencyHeader");
}

function FrequencyCell({ row }: CellProps) {
  const rcT = useTranslations("RecurrenceColumns");
  const frequency = row.original.frequency;
  const label = frequency === "MONTHLY"
    ? rcT("monthly")
    : frequency === "WEEKLY"
      ? rcT("weekly")
      : frequency === "YEARLY"
        ? rcT("yearly")
        : rcT("installments");

  return (
    <div className="flex items-center gap-2">
      <Clock className="h-3 w-3 text-muted-foreground opacity-50" />
      <PremiumBadgeCell label={label} variant="accent" />
    </div>
  );
}

function CyclesHeader() {
  const rcT = useTranslations("RecurrenceColumns");
  return rcT("cyclesHeader");
}

function CyclesCell({ row }: CellProps) {
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
}

export const recurrenceColumns: ColumnDef<RecurrenceDTO>[] = [
  {
    id: "name",
    header: NameHeader,
    cell: NameCell,
  },
  {
    accessorKey: "type",
    header: DirectionHeader,
    cell: ({ row }) => <TransactionTypeCell row={row} />,
  },
  {
    accessorKey: "amount",
    header: AmountHeader,
    cell: ({ row }) => (
      <PremiumAmountCell 
        amount={row.original.amount} 
        isNegative={row.original.type === "EXPENSE"} 
      />
    ),
  },
  {
    accessorKey: "frequency",
    header: FrequencyHeader,
    cell: FrequencyCell,
  },
  {
    accessorKey: "parts",
    header: CyclesHeader,
    cell: CyclesCell,
  },
];
