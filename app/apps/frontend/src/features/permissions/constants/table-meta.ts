import { Layers, Users, Shield, Settings, Briefcase } from "lucide-react";
import type { CrudColumn } from "../types/types";

export const ENTITY_ICONS: Record<
  string,
  React.ComponentType<{ className?: string }>
> = {
  users: Users,
  user_permissions: Shield,
  accounts: Layers,
  transactions: Briefcase,
  cards: Settings,
  recurrences: Layers,
  audit_logs: Layers,
};

export const CRUD_COLUMNS: CrudColumn[] = [
  { key: "canCreate", label: "C" },
  { key: "canRead", label: "R" },
  { key: "canUpdate", label: "U" },
  { key: "canDelete", label: "D" },
];

export function getScopeLabel(scope: string, t: (key: string) => string): string {
  const map: Record<string, string> = {
    NONE: t("scopeNone"),
    OWN: t("scopeOwn"),
    ALL: t("scopeAll"),
  };
  return map[scope] || scope;
}

export function getPermissionTypeLabel(
  type: string,
  t: (key: string) => string,
): string {
  const map: Record<string, string> = {
    CRUD: "CRUD",
    PROCESS: t("typeProcess"),
    READ_ONLY: t("typeReadOnly"),
  };
  return map[type] || type;
}
