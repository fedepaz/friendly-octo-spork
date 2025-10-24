// src/api/dashboard/dashboard.controller.tsx

import type { Context } from "hono";
import { DashboardService } from "./dashboard.service";
import { DashboardPage } from "@/pages/DashboardPage";
import { ErrorPage } from "@/pages/ErrorPage";

export class DashboardController {
  private dashboardService = new DashboardService();

  getDashboardData = async (c: Context) => {
    try {
      const payload = c.get("jwtPayload") as { sub: string };
      const userId = payload.sub;
      const data = await this.dashboardService.getDashboardData(userId);
      return c.render(<DashboardPage data={data} />);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown error";
      const stack = error instanceof Error ? error.stack : undefined;
      return c.render(<ErrorPage message={message} stack={stack} />);
    }
  };
}
