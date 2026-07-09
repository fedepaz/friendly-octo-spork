"use client";

import { Switch } from "@/components/ui/switch";
import { CRUD_COLUMNS } from "../constants/table-meta";
import type { TablePermission } from "@repo/shared";

interface PermissionRowItemProps {
  tableName: string;
  label: string;
  permissionType: string;
  permissions: TablePermission;
  onChange: (tableName: string, updated: Partial<TablePermission>) => void;
  readOnly?: boolean;
}

export function PermissionRowItem({
  tableName,
  label,
  permissionType,
  permissions,
  onChange,
  readOnly = false,
}: PermissionRowItemProps) {
  const allowedColumns = CRUD_COLUMNS.filter((col) => {
    if (permissionType === "READ_ONLY") return col.key === "canRead";
    if (permissionType === "PROCESS")
      return col.key === "canRead" || col.key === "canCreate";
    return true;
  });

  return (
    <div className="flex items-center gap-4 py-2 border-b border-border/40 last:border-0">
      <div className="w-40 shrink-0">
        <p className="text-sm font-medium">{label}</p>
        <p className="text-xs text-muted-foreground">{tableName}</p>
      </div>
      <div className="flex items-center gap-6">
        {allowedColumns.map((col) => (
          <div key={col.key} className="flex flex-col items-center gap-1">
            <Switch
              checked={permissions[col.key]}
              onCheckedChange={(checked) =>
                onChange(tableName, { [col.key]: checked })
              }
              disabled={readOnly}
              aria-label={`${label} ${col.label}`}
            />
            <span className="text-[10px] font-mono text-muted-foreground">
              {col.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
