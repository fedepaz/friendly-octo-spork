// src/features/auditLogs/components/columns.tsx

import { type ColumnDef, type Column, type Row } from "@tanstack/react-table";
import { useTranslations, useLocale } from "next-intl";
import {
  SortableHeader,
  PremiumBadgeCell,
  TacticalTextCell,
} from "@/components/data-display/data-table";
import { AuditLogDto } from "@repo/shared";
import { formatChanges } from "../lib/format-changes";
import {
  Plus,
  Pencil,
  Trash2,
  FileText,
  Globe,
  Smartphone,
  User,
} from "lucide-react";

interface CellProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  row: Row<any>;
}

interface HeaderProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  column: Column<any>;
}

function ActionHeader({ column }: HeaderProps) {
  const t = useTranslations("AuditLogColumns");
  return <SortableHeader column={column}>{t("action")}</SortableHeader>;
}

const getActionIcon = (action: string) => {
  switch (action) {
    case "CREATE":
      return <Plus className="h-4 w-4 text-primary" />;
    case "UPDATE":
      return <Pencil className="h-4 w-4 text-secondary" />;
    case "DELETE":
      return <Trash2 className="h-4 w-4 text-destructive" />;
    default:
      return <FileText className="h-4 w-4 text-muted-foreground" />;
  }
};

function ActionCell({ row }: CellProps) {
  const action = row.original.action as string;
  const variantMap: Record<
    string,
    "primary" | "secondary" | "destructive" | "muted"
  > = {
    CREATE: "primary",
    UPDATE: "secondary",
    DELETE: "destructive",
  };

  return (
    <div className="flex items-center space-x-1.5">
      {getActionIcon(action)}
      <PremiumBadgeCell
        label={action}
        variant={variantMap[action] || "muted"}
      />
    </div>
  );
}

function UserHeader({ column }: HeaderProps) {
  const t = useTranslations("AuditLogColumns");
  return <SortableHeader column={column}>{t("user")}</SortableHeader>;
}

function UserCell({ row }: CellProps) {
  const user = row.original.user;
  const username = user?.name || "—";

  return (
    <div className="flex items-center gap-2.5 min-w-[160px]">
      <div className="flex h-7 w-7 items-center justify-center bg-muted/20 border border-border/40 shadow-inner">
        <User className="h-3.5 w-3.5 text-muted-foreground" />
      </div>
      <TacticalTextCell title={username} />
    </div>
  );
}

function ChangesHeader({ column }: HeaderProps) {
  const t = useTranslations("AuditLogColumns");
  return <SortableHeader column={column}>{t("changes")}</SortableHeader>;
}

function ChangesCell({ row }: CellProps) {
  const changes = row.original.changes as Record<string, unknown> | null;
  return (
    <div className="text-xs font-mono text-muted-foreground truncate max-w-[200px]">
      {formatChanges(changes)}
    </div>
  );
}

function DateHeader({ column }: HeaderProps) {
  const t = useTranslations("AuditLogColumns");
  return <SortableHeader column={column}>{t("date")}</SortableHeader>;
}

function DateCell({ row }: CellProps) {
  const date = new Date(row.original.createdAt);
  const locale = useLocale();
  return (
    <div className="flex flex-col text-xs min-w-[140px]">
      <span className="font-mono font-bold">
        {date.toLocaleDateString(locale, {
          day: "2-digit",
          month: "2-digit",
          year: "2-digit",
        })}
      </span>
      <span className="text-xs font-mono text-muted-foreground/60">
        {date.toLocaleTimeString(locale, {
          hour: "2-digit",
          minute: "2-digit",
        })}
      </span>
    </div>
  );
}

function IpHeader({ column }: HeaderProps) {
  const t = useTranslations("AuditLogColumns");
  return <SortableHeader column={column}>{t("ip")}</SortableHeader>;
}

function IpCell({ row }: CellProps) {
  const ip = row.original.ipAddress;
  return (
    <div className="flex items-center space-x-1 text-xs font-mono text-muted-foreground min-w-[120px]">
      <Globe className="h-3 w-3 flex-shrink-0" />
      <span className="truncate max-w-[100px]">{ip || "—"}</span>
    </div>
  );
}

function DeviceHeader({ column }: HeaderProps) {
  const t = useTranslations("AuditLogColumns");
  return <SortableHeader column={column}>{t("device")}</SortableHeader>;
}

function DeviceCell({ row }: CellProps) {
  const ua = (row.original.userAgent || "") as string;
  const isMobile = /mobile|android|iphone|ipad/i.test(ua.toLowerCase());
  const t = useTranslations("AuditLogFormDetail");

  return (
    <div className="flex items-center space-x-1 text-xs text-muted-foreground min-w-[140px]">
      {isMobile ? (
        <Smartphone className="h-3 w-3 text-info" />
      ) : (
        <Globe className="h-3 w-3 text-muted-foreground" />
      )}
      <span className="truncate max-w-[120px]">
        {isMobile ? t("mobile") : t("desktop")}
      </span>
    </div>
  );
}

export const auditLogColumns: ColumnDef<AuditLogDto>[] = [
  {
    accessorKey: "action",
    header: ActionHeader,
    cell: ActionCell,
  },
  {
    id: "user.name",
    accessorFn: (row) => row.user?.name ?? "",
    header: UserHeader,
    cell: UserCell,
  },
  {
    accessorKey: "changes",
    header: ChangesHeader,
    cell: ChangesCell,
  },
  {
    accessorKey: "createdAt",
    header: DateHeader,
    cell: DateCell,
  },
  {
    accessorKey: "ipAddress",
    header: IpHeader,
    cell: IpCell,
  },
  {
    accessorKey: "userAgent",
    header: DeviceHeader,
    cell: DeviceCell,
  },
];
