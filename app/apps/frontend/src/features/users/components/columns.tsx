// src/features/users/components/columns.tsx

import { Row, type ColumnDef } from "@tanstack/react-table";
import { SortableHeader } from "@/components/data-display/data-table";
import { UserProfileDto } from "@repo/shared";
import { formatShortDate } from "@/lib/date-utils";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { User, Mail, ShieldCheck, ShieldAlert } from "lucide-react";

interface CellProps {
  row: Row<UserProfileDto>;
}

function FullNameCell({ row }: CellProps) {
  const user = row.original;
  return (
    <div className="flex items-center gap-2">
      <div className="h-7 w-7 rounded-none bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
        <User className="h-4 w-4 text-primary" />
      </div>
      <div className="flex flex-col gap-0.5 overflow-hidden">
        <span className="text-sm font-bold text-foreground leading-none truncate">
          {user.name || "No name"}
        </span>
      </div>
    </div>
  );
}

function StatusCell({ row }: CellProps) {
  const isActive = row.original.isActive;
  
  return (
    <Badge 
      variant="outline" 
      className={cn(
        "gap-1 px-1.5 py-0 text-[10px] font-bold uppercase tracking-tighter",
        isActive 
          ? "bg-secondary/10 text-secondary border-secondary/30" 
          : "bg-muted/10 text-muted-foreground border-muted/30"
      )}
    >
      {isActive ? <ShieldCheck className="h-3 w-3" /> : <ShieldAlert className="h-3 w-3" />}
      {isActive ? "Activo" : "Inactivo"}
    </Badge>
  );
}

function CreatedAtCell({ row }: CellProps) {
  return (
    <span className="text-xs font-bold font-mono tracking-tighter text-muted-foreground opacity-80 whitespace-nowrap">
      {formatShortDate(row.original.createdAt)}
    </span>
  );
}

export const userColumns: ColumnDef<UserProfileDto>[] = [
  {
    id: "fullName",
    header: ({ column }) => (
      <SortableHeader column={column}>Identidad</SortableHeader>
    ),
    cell: ({ row }) => <FullNameCell row={row} />,
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <SortableHeader column={column}>Correo Electrónico</SortableHeader>
    ),
    cell: ({ row }) => (
      <div className="flex items-center gap-1.5 text-sm text-foreground">
        <Mail className="h-3.5 w-3.5 opacity-30 shrink-0" />
        <span className="truncate max-w-[180px] font-medium tracking-tight">
          {row.original.email}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "isActive",
    header: ({ column }) => (
      <SortableHeader column={column}>Estado</SortableHeader>
    ),
    cell: ({ row }) => <StatusCell row={row} />,
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <SortableHeader column={column}>Registro</SortableHeader>
    ),
    cell: ({ row }) => <CreatedAtCell row={row} />,
  },
];
