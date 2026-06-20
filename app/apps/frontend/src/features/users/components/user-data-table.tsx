//src/features/users/components/user-data-table.tsx
"use client";

import { useState } from "react";
import { useUsers } from "../hooks/usersHooks";
import { DataTable, SlideOverForm } from "@/components/data-display/data-table";
import { userColumns } from "./columns";
import { UserProfileDto } from "@repo/shared";
import { UserViewForm } from "./users-view-form";

export function UsersDataTable() {
  const { data: users = [] } = useUsers();
  const [selectedUser, setSelectedUser] = useState<UserProfileDto | null>(null);

  return (
    <div className="flex-1 flex flex-col min-h-0 animate-premium-in">
      <DataTable
        columns={userColumns}
        data={users}
        title="Directorio de Operadores"
        description="Gestión de identidades y privilegios del sistema"
        tableName="users"
        totalCount={users.length}
        onView={(row) => setSelectedUser(row)}
      />

      <SlideOverForm
        open={!!selectedUser}
        onOpenChange={(open) => !open && setSelectedUser(null)}
        title="Terminal de Seguridad"
        description={`IDENTIDAD: ${selectedUser?.name?.toUpperCase()}`}
      >
        {selectedUser && <UserViewForm selectedUser={selectedUser} />}
      </SlideOverForm>
    </div>
  );
}
