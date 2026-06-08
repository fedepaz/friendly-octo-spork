// src/features/users/components/columns.tsx

import { Row, type ColumnDef } from "@tanstack/react-table";
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const userColumns: ColumnDef<any>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <SortableHeader column={column}>Identidad</SortableHeader>
    ),
    cell: ({ row }) => (
      <div className="flex items-center gap-3">
        <div className="flex h-8 w-8 items-center justify-center bg-primary/10 border border-primary/20">
          <UserCircle className="h-5 w-5 text-primary" />
        </div>
        <TacticalTextCell 
          title={row.original.name || "Sin nombre"} 
          subtext={row.original.email} 
          id={row.original.id} 
        />
      </div>
    ),
  },
  {
    accessorKey: "role",
    header: ({ column }) => (
      <SortableHeader column={column}>Rango / Acceso</SortableHeader>
    ),
    cell: ({ row }) => <RoleCell row={row} />,
  },
  {
    accessorKey: "status",
    header: "Estado",
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
