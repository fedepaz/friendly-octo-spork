// src/features/users/components/columns.tsx

import { Row, type ColumnDef, type Column } from "@tanstack/react-table";
import { useTranslations } from "next-intl";
import { 
  SortableHeader, 
  TacticalTextCell, 
  TacticalTypeCell, 
  PremiumBadgeCell 
} from "@/components/data-display/data-table";
import { User, Shield, UserCircle } from "lucide-react";

interface CellProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  row: Row<any>;
}

interface HeaderProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  column: Column<any>;
}

function RoleCell({ row }: CellProps) {
  const role = row.original.role || "USER";
  
  return (
    <TacticalTypeCell 
      icon={role === "ADMIN" ? Shield : User} 
      label={role} 
      iconClassName={role === "ADMIN" ? "text-primary" : "text-muted-foreground"} 
    />
  );
}

function NameHeader({ column }: HeaderProps) {
  const ucT = useTranslations("UserColumns");
  return <SortableHeader column={column}>{ucT("identityHeader")}</SortableHeader>;
}

function NameCell({ row }: CellProps) {
  const ucT = useTranslations("UserColumns");
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-8 w-8 items-center justify-center bg-primary/10 border border-primary/20">
        <UserCircle className="h-5 w-5 text-primary" />
      </div>
      <TacticalTextCell 
        title={row.original.name || ucT("noName")} 
        subtext={row.original.email} 
        id={row.original.id} 
      />
    </div>
  );
}

function RoleHeader({ column }: HeaderProps) {
  const ucT = useTranslations("UserColumns");
  return <SortableHeader column={column}>{ucT("rankAccessHeader")}</SortableHeader>;
}

function StatusHeader() {
  const ucT = useTranslations("UserColumns");
  return ucT("statusHeader");
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const userColumns: ColumnDef<any>[] = [
  {
    accessorKey: "name",
    header: NameHeader,
    cell: NameCell,
  },
  {
    accessorKey: "role",
    header: RoleHeader,
    cell: ({ row }) => <RoleCell row={row} />,
  },
  {
    accessorKey: "status",
    header: StatusHeader,
    cell: ({ row }) => {
      const status = row.original.status || "ACTIVE";
      return (
        <PremiumBadgeCell 
          label={status} 
          variant={status === "ACTIVE" ? "secondary" : "muted"} 
        />
      );
    },
  },
];
