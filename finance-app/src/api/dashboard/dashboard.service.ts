// src/api/dashboard/dashboard.service.ts

import { DashboardRepository } from "../repositories/dashboard.repository";
import type { DashboardInput } from "./dashboard.schema";

export class DashboardService {
  private dashboardRepository = new DashboardRepository();
  async findDashboardData(userId: string): Promise<DashboardInput> {
    if (!userId) {
      throw new Error("User id is required");
    }
    const dashboard = await this.dashboardRepository.getDashboardData(userId);
    if (!dashboard) {
      throw new Error("Dashboard Information not found");
    }
    return dashboard;
  }
}
