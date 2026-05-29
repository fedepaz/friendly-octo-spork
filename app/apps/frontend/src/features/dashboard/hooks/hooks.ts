//src/features/dashboard/hooks/hooks.ts

import { useSuspenseQuery } from "@tanstack/react-query";
import { dashboardService } from "../api/dashboardService";

export const ALERT_QUERY_KEY = {
  all: ["alerts"] as const,
  lists: () => [...ALERT_QUERY_KEY.all, "lists"] as const,
};

export const useDashboardAlerts = () => {
  return useSuspenseQuery({
    queryKey: ALERT_QUERY_KEY.lists(),
    queryFn: dashboardService.fetchAlerts,
  });
};
