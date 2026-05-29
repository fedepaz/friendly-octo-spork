//src/features/users/components/user-data-table.tsx
"use client";

import { useUsers } from "../hooks/usersHooks";
import { DataTable } from "@/components/data-display/data-table";
import { userColumns } from "./columns";

export function UsersDataTable() {
  const { data: users = [] } = useUsers();

  return (
    <>
      <DataTable
        columns={userColumns}
        data={users}
        title="Usuarios"
        description="Gestión de los usuarios del sistema"
        tableName="users"
        totalCount={users.length}
      />
    </>
  );
}
