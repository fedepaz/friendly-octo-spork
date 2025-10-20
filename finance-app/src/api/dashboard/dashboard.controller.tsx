// src/api/dashboard/dashboard.controller.tsx
import { Context } from "hono";
import { DashboardService } from "./dashboard.service";
import { DashboardPage } from "../../pages/DashboardPage";

// Assume these components exist and will be created later
const StatCard = (props: any) => <div>Stat Card</div>;
const MonthlyChart = (props: any) => <div>Monthly Chart</div>;
const RecentActivity = (props: any) => <div>Recent Activity</div>;

export class DashboardController {
  private service = new DashboardService();

  // GET /dashboard -> Renders the full page
  public getDashboardPage = async (c: Context) => {
    const userId = c.get("userId");
    const data = await this.service.getDashboardData(userId);
    return c.render(<DashboardPage stats={data} />);
  };

  // GET /api/dashboard/stats -> Returns monthly stats (for HTMX partial)
  public getMonthlyStats = async (c: Context) => {
    const userId = c.get("userId");
    const monthParam = c.req.query("month");
    const month = monthParam ? new Date(monthParam) : new Date();
    const stats = await this.service.getMonthlyStats(userId, month);
    // Assuming a StatCard component exists for rendering
    return c.html(<StatCard stats={stats} />);
  };

  // GET /api/dashboard/chart -> Returns monthly chart data (for HTMX partial)
  public getMonthlyChart = async (c: Context) => {
    const userId = c.get("userId");
    const monthParam = c.req.query("month");
    const month = monthParam ? new Date(monthParam) : new Date();
    const stats = await this.service.getMonthlyStats(userId, month);
    // Assuming a MonthlyChart component exists for rendering
    return c.html(<MonthlyChart data={stats.expenseByCategory} />);
  };

  // GET /api/dashboard/recent -> Returns recent transactions (for HTMX partial)
  public getRecentActivity = async (c: Context) => {
    const userId = c.get("userId");
    const monthParam = c.req.query("month");
    const month = monthParam ? new Date(monthParam) : new Date();
    const stats = await this.service.getMonthlyStats(userId, month);
    // Assuming a RecentActivity component exists for rendering
    return c.html(<RecentActivity transactions={stats.recentTransactions} />);
  };
}
