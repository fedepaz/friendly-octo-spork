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
  ClipboardList,
  Shield,
  Briefcase,
} from "lucide-react";
import type { NavigationConfig } from "./navigation.types";

export const NAVIGATION_CONFIG: NavigationConfig = [
  {
    kind: "standalone",
    title: "Home",
    href: ROUTES.DASHBOARD,
    icon: Home,
    description: "Vista general y alertas",
  },

  {
    kind: "nestedGroup",
    id: "operations",
    title: "Operaciones",
    icon: Briefcase,
    items: [
      {
        title: "Transacciones",
        href: ROUTES.TRANSACTIONS,
        icon: History,
        description: "Gestión de transacciones del sistema",
        dashboard: { statsLabel: "Transacciones recientes" },
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

  {
    kind: "nestedGroup",
    id: "admin",
    title: "Administración",
    icon: Settings,
    items: [
      {
        kind: "subGroup",
        id: "usuarios",
        title: "Usuarios",
        icon: Users,
        items: [
          {
            title: "Lista",
            href: ROUTES.USERS,
            icon: Users,
            description: "Gestión de usuarios del sistema",
            dashboard: { statsLabel: "Usuarios activos" },
            requiredPermission: { tableName: "users", action: "read" },
          },
          {
            title: "Permisos",
            href: ROUTES.USER_PERMISSIONS,
            icon: Shield,
            description: "Configuración de permisos por usuario",
            dashboard: { statsLabel: "Permisos configurados" },
            requiredPermission: {
              tableName: "user_permissions",
              action: "read",
            },
          },
        ],
      },
    ],
  },

  {
    kind: "nestedGroup",
    id: "dev",
    title: "Desarrollo",
    icon: ClipboardList,
    items: [
      {
        title: "Auditoría",
        href: ROUTES.AUDIT_LOGS,
        icon: ClipboardList,
        description: "Registro de actividades del sistema",
        dashboard: { statsLabel: "Registros de auditoría" },
        requiredPermission: { tableName: "audit_logs", action: "read" },
      },
    ],
  },
];
