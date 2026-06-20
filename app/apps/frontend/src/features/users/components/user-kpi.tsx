//src/features/users/components/user-kpi.tsx
"use client";

import { KPICard } from "@/components/data-display/kpi-card";
import { Users, UserCheck, UserX, Shield } from "lucide-react";

import { useUsers } from "../hooks/usersHooks";

function UserKPIs() {
  const { data } = useUsers();
  const totalUsers = data?.length || 0;
  const activeUsers = data?.filter((u) => u.isActive).length || 0;
  const inactiveUsers = data?.filter((u) => !u.isActive).length || 0;
  const emailUsers = data?.filter((u) => u.email?.includes("@")).length || 0;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 shrink-0 animate-premium-in">
      <KPICard
        title="Operadores Totales"
        value={totalUsers}
        description="IDENTIDADES REGISTRADAS"
        icon={Users}
        trend={{ value: 5.0, label: "VS PERÍODO ANTERIOR", isPositive: true }}
      />
      <KPICard 
        title="Identidades Activas" 
        value={activeUsers} 
        description="EN LÍNEA / DISPONIBLES"
        icon={UserCheck} 
      />
      <KPICard
        title="Accesos Suspendidos"
        value={inactiveUsers}
        description="REQUIEREN REVISIÓN"
        icon={UserX}
      />
      <KPICard
        title="Enlaces de Red"
        value={emailUsers}
        description="CORREOS VERIFICADOS"
        icon={Shield}
      />
    </div>
  );
}

export default UserKPIs;
