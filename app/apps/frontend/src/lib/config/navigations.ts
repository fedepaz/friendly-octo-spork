// src/lib/config/navigations.ts

import { ROUTES } from "@/constants/routes";
import { Home, Settings, UserCircle } from "lucide-react";

export interface NavigationItem {
  title: string;
  href: string;
  icon: React.ComponentType;
  description?: string;
  badge?: string;
  badgeVariant?: "default" | "secondary" | "destructive" | "outline";
  dashboard?: {
    statsLabel: string; // e.g., "Entidades activas"
    // Note: Actual stats value will come from KPIs hook
  };
  requiredPermission?: {
    table: string; // must match Prisma @@map name
    action: "read"; // for visibility, we only care about read
  };
}

export interface NavigationGroup {
  id: string;
  title: string;
  icon: React.ComponentType;
  items: NavigationItem[];
}

export const NAVIGATION_CONFIG: NavigationGroup[] = [
  {
    id: "operations",
    title: "Operaciones",
    icon: Home,
    items: [
      {
        title: "Dashboard",
        href: ROUTES.DASHBOARD,
        icon: Home,
        description: "Vista general y alertas",
      },
    ],
  },

  {
    id: "admin",
    title: "Administración",
    icon: Settings,
    items: [
      {
        title: "Usuarios",
        href: ROUTES.USERS,
        icon: UserCircle,
        description: "Gestión de usuarios del sistema",
        dashboard: { statsLabel: "Usuarios activos" },
        requiredPermission: { table: "users", action: "read" },
      },
    ],
  },
];
