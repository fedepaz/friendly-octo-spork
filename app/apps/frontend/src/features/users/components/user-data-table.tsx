//src/features/users/components/user-data-table.tsx
"use client";

import { useState } from "react";
import { useUsers } from "../hooks/usersHooks";
import { DataTable, SlideOverForm } from "@/components/data-display/data-table";
import { userColumns } from "./columns";
import { UserProfileDto } from "@repo/shared";
import { formatSpanishDate } from "@/lib/date-utils";
import { User, Mail, Shield, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";

export function UsersDataTable() {
  const { data: users = [] } = useUsers();
  const [selectedUser, setSelectedUser] = useState<UserProfileDto | null>(null);

  return (
    <>
      <DataTable
        columns={userColumns}
        data={users}
        title="Usuarios"
        description="Gestión de los usuarios del sistema"
        tableName="users"
        totalCount={users.length}
        onView={(row) => setSelectedUser(row)}
      />

      <SlideOverForm
        open={!!selectedUser}
        onOpenChange={(open) => !open && setSelectedUser(null)}
        title="Perfil de Seguridad"
        description={selectedUser?.name}
      >
        {selectedUser && (
          <div className="space-y-6">
            <div className="flex flex-col items-center p-6 bg-muted/20 border border-dashed border-border">
              <div className="h-16 w-16 bg-primary/10 border border-primary/20 flex items-center justify-center mb-3">
                <User className="h-8 w-8 text-primary" />
              </div>
              <p className="text-lg font-black tracking-tighter uppercase">
                {selectedUser.name || "IDENTIDAD DESCONOCIDA"}
              </p>
              <p className="font-mono text-[10px] opacity-50">
                UUID: {selectedUser.id}
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-background border border-border">
                <Mail className="h-4 w-4 text-muted-foreground opacity-50" />
                <div className="flex-1">
                  <p className="text-[10px] font-bold text-muted-foreground uppercase leading-none">
                    Correo Electrónico
                  </p>
                  <p className="text-sm font-semibold">{selectedUser.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-background border border-border">
                <Shield
                  className={cn(
                    "h-4 w-4",
                    selectedUser.isActive ? "text-secondary" : "text-destructive",
                  )}
                />
                <div className="flex-1">
                  <p className="text-[10px] font-bold text-muted-foreground uppercase leading-none">
                    Estado del Sistema
                  </p>
                  <p className="text-sm font-semibold">
                    {selectedUser.isActive
                      ? "ACCESO AUTORIZADO"
                      : "ACCESO RESTRINGIDO"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-background border border-border">
                <Calendar className="h-4 w-4 text-muted-foreground opacity-50" />
                <div className="flex-1">
                  <p className="text-[10px] font-bold text-muted-foreground uppercase leading-none">
                    Fecha de Registro
                  </p>
                  <p className="text-sm font-semibold">
                    {formatSpanishDate(selectedUser.createdAt)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </SlideOverForm>
    </>
  );
}
