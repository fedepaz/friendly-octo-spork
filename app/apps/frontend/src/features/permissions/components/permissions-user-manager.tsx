"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  useTables,
  useUserPermissions,
  useSetUserPermissions,
} from "../hooks/permsHooks";
import { PermissionRowItem } from "./permission-row-item";
import { getPermissionTypeLabel } from "../constants/table-meta";
import type { TablePermission, UserPermissions } from "@repo/shared";
import { useTranslations } from "next-intl";

interface PermissionsUserManagerProps {
  userId: string;
}

export function PermissionsUserManager({
  userId,
}: PermissionsUserManagerProps) {
  const { data: tables } = useTables();
  const { data: userPermissions } = useUserPermissions(userId);
  const setUserPermissions = useSetUserPermissions();

  const [localChanges, setLocalChanges] = useState<
    Record<string, Partial<TablePermission>>
  >({});
  const [search, setSearch] = useState("");
  const t = useTranslations("PermissionsUserManager");
  const metaT = useTranslations("PermissionTableMeta");

  const displayedPermissions = useMemo(() => {
    const merged: UserPermissions = { ...userPermissions };
    for (const [tableName, changes] of Object.entries(localChanges)) {
      merged[tableName] = {
        ...(merged[tableName] || {
          canCreate: false,
          canRead: false,
          canUpdate: false,
          canDelete: false,
          scope: "ALL",
          permissionType: "CRUD",
        }),
        ...changes,
      };
    }
    return merged;
  }, [userPermissions, localChanges]);

  const filteredTables = useMemo(() => {
    if (!search) return tables;
    const q = search.toLowerCase();
    return tables.filter(
      (t) =>
        t.label.toLowerCase().includes(q) || t.name.toLowerCase().includes(q),
    );
  }, [tables, search]);

  const grouped = useMemo(() => {
    const groups: Record<string, typeof filteredTables> = {};
    for (const table of filteredTables) {
      const pt = table.permissionType;
      if (!groups[pt]) groups[pt] = [];
      groups[pt].push(table);
    }
    return groups;
  }, [filteredTables]);

  const isDirty = Object.keys(localChanges).length > 0;

  const handlePermissionChange = (
    tableName: string,
    updated: Partial<TablePermission>,
  ) => {
    setLocalChanges((prev) => ({
      ...prev,
      [tableName]: { ...prev[tableName], ...updated },
    }));
  };

  const handleSave = () => {
    const permissions = Object.entries(localChanges).map(
      ([tableName, changes]) => {
        const existing = userPermissions[tableName] || {
          canCreate: false,
          canRead: false,
          canUpdate: false,
          canDelete: false,
          scope: "ALL" as const,
          permissionType: "CRUD" as const,
        };
        return {
          tableName,
          ...existing,
          ...changes,
        };
      },
    );
    setUserPermissions.mutate({ userId, permissions });
    setLocalChanges({});
  };

  const handleDiscard = () => {
    setLocalChanges({});
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm font-black uppercase tracking-widest">
          {t("title")}
        </CardTitle>
        <Input
          placeholder={t("searchEntity")}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="mt-2"
        />
      </CardHeader>
      <CardContent className="flex-1 flex flex-col min-h-0 overflow-hidden">
        <div className="flex-1 overflow-auto custom-scrollbar">
        {Object.entries(grouped).map(([permissionType, entityTables]) => (
          <div key={permissionType} className="mb-6">
            <h4 className="text-xs font-black uppercase tracking-widest text-muted-foreground mb-3 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-primary" />
              {getPermissionTypeLabel(permissionType, metaT)}
            </h4>
            <div className="space-y-1">
              {entityTables.map((entity) => {
                const perms = displayedPermissions[entity.name] || {
                  canCreate: false,
                  canRead: false,
                  canUpdate: false,
                  canDelete: false,
                  scope: "ALL",
                  permissionType: "CRUD",
                };
                return (
                  <PermissionRowItem
                    key={entity.name}
                    tableName={entity.name}
                    label={entity.label}
                    permissionType={entity.permissionType}
                    permissions={perms}
                    onChange={handlePermissionChange}
                  />
                );
              })}
            </div>
          </div>
        ))}
        </div>

        {isDirty && (
          <div className="flex justify-end gap-2 mt-4 pt-4 border-t">
            <Button variant="outline" onClick={handleDiscard}>
              {t("discard")}
            </Button>
            <Button
              onClick={handleSave}
              disabled={setUserPermissions.isPending}
            >
              {t("save")}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
