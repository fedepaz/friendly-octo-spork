//src/features/users/components/user-kpi.tsx
"use client";

import { useTranslations } from "next-intl";
import { KPICard } from "@/components/data-display/kpi-card";
import { Users, UserCheck, UserX, Shield } from "lucide-react";

import { useUsers } from "../hooks/usersHooks";

function UserKPIs() {
  const ukT = useTranslations("UserKPIs");
  const { data } = useUsers();
  const totalUsers = data?.length || 0;
  const activeUsers = data?.filter((u) => u.isActive).length || 0;
  const inactiveUsers = data?.filter((u) => !u.isActive).length || 0;
  const emailUsers = data?.filter((u) => u.email?.includes("@")).length || 0;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 shrink-0 animate-premium-in">
      <KPICard
        title={ukT("totalOperators")}
        value={totalUsers}
        description={ukT("registeredIdentities")}
        icon={Users}
        trend={{ value: 5.0, label: ukT("vsPreviousPeriod"), isPositive: true }}
      />
      <KPICard 
        title={ukT("activeIdentities")}
        value={activeUsers} 
        description={ukT("onlineAvailable")}
        icon={UserCheck} 
      />
      <KPICard
        title={ukT("suspendedAccess")}
        value={inactiveUsers}
        description={ukT("requireReview")}
        icon={UserX}
      />
      <KPICard
        title={ukT("networkLinks")}
        value={emailUsers}
        description={ukT("verifiedEmails")}
        icon={Shield}
      />
    </div>
  );
}

export default UserKPIs;
