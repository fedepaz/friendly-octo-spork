"use client";

import { Suspense, useState } from "react";
import { useTranslations } from "next-intl";
import { useUsers } from "@/features/users/hooks/usersHooks";
import { UserSelector } from "./user-selector";
import { UserSelectorSkeleton } from "./user-selector-skeleton";
import { PermissionsUserManager } from "./permissions-user-manager";
import { EmptyState } from "./empty-state";

export function PermissionsDashboard() {
  const t = useTranslations("Permissions");
  const { data: users } = useUsers();
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black tracking-tighter">{t("title")}</h1>
        <p className="text-sm text-muted-foreground">{t("description")}</p>
      </div>

      <Suspense fallback={<UserSelectorSkeleton />}>
        <UserSelector
          users={users || []}
          selectedUserId={selectedUserId}
          onSelect={setSelectedUserId}
        />
      </Suspense>

      {selectedUserId ? (
        <Suspense
          fallback={
            <div className="text-sm text-muted-foreground">
              {t("loading")}
            </div>
          }
        >
          <PermissionsUserManager userId={selectedUserId} />
        </Suspense>
      ) : (
        <EmptyState />
      )}
    </div>
  );
}
