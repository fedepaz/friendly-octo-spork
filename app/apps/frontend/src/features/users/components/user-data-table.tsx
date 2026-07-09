//src/features/users/components/user-data-table.tsx
"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useUsers } from "../hooks/usersHooks";
import { DataTable, SlideOverForm } from "@/components/data-display/data-table";
import { userColumns } from "./columns";
import { UserProfileDto } from "@repo/shared";
import { UserViewForm } from "./users-view-form";
import { EmptyState } from "@/components/common/empty-state";

export function UsersDataTable() {
  const udT = useTranslations("UsersDashboard");
  const { data: users = [] } = useUsers();
  const [selectedUser, setSelectedUser] = useState<UserProfileDto | null>(null);

  if (!users || users.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="flex-1 flex flex-col min-h-0 animate-premium-in">
      <DataTable
        columns={userColumns}
        data={users}
        title={udT("title")}
        description={udT("description")}
        tableName="users"
        totalCount={users.length}
        onView={(row) => setSelectedUser(row)}
      />

      <SlideOverForm
        open={!!selectedUser}
        onOpenChange={(open) => !open && setSelectedUser(null)}
        title={udT("slideOverTitle")}
        description={udT("identityPrefix") + selectedUser?.name?.toUpperCase()}
      >
        {selectedUser && <UserViewForm selectedUser={selectedUser} />}
      </SlideOverForm>
    </div>
  );
}
