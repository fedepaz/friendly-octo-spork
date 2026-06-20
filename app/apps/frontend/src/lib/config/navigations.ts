// src/lib/config/navigations.ts

import { ROUTES } from "@/constants/routes";
import {
  Home,
  Settings,
  History,
  Users,
  Landmark,
  Clock,
  IdCardIcon,
} from "lucide-react";

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
      {
        title: "Transacciones",
        href: ROUTES.TRANSACTIONS,
        icon: History,
        description: "Gestión de transacciones del sistema",
        dashboard: { statsLabel: "Transacciones recientes" },
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
        icon: Users,
        description: "Gestión de usuarios del sistema",
        dashboard: { statsLabel: "Usuarios activos" },
      },
      {
        title: "Cuentas",
        href: ROUTES.ACCOUNTS,
        icon: Landmark,
        description: "Gestión de cuentas del sistema",
        dashboard: { statsLabel: "Cuentas activas" },
      },
      {
        title: "Recurrencias",
        href: ROUTES.RECURRENCES,
        icon: Clock,
        description: "Gestión de recurrencias del sistema",
        dashboard: { statsLabel: "Recurrencias activas" },
      },
      {
        title: "Tarjeta",
        href: ROUTES.CARDS,
        icon: IdCardIcon,
        description: "Gestión de tarjetas de crédito",
        dashboard: { statsLabel: "Tarjetas de crédito" },
      },
    ],
  },
];
