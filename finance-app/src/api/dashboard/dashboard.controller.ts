import { Context } from "hono";
import { DashboardService } from "./dashboard.service";
import { DashboardPage } from "../../pages/DashboardPage";
import { StatCard } from "../../components/dashboard/StatCard";
import { MonthlyChart } from "../../components/dashboard/MonthlyChart";
import { RecentActivity } from "../../components/dashboard/RecentActivity";

export class DashboardController {
  private dashboardService = new DashboardService();

  /**
   * GET / - Render full dashboard page
   */
  getDashboardPage = async (c: Context) => {
    const userId = c.get("userId");

    const stats = await this.dashboardService.getDashboardStats(userId);
    const recentTransactions =
      await this.dashboardService.getRecentTransactions(userId, 5);
    const chartData = await this.dashboardService.getMonthlyChartData(userId);
    const upcomingRecurrences =
      await this.dashboardService.getUpcomingRecurrences(userId);

    return c.render(
      <DashboardPage
        stats={stats}
        recentTransactions={recentTransactions}
        chartData={chartData}
        upcomingRecurrences={upcomingRecurrences}
      />
    );
  };

  /**
   * GET /stats (HTMX) - Get stats partial
   */
  getStats = async (c: Context) => {
    const userId = c.get("userId");
    const monthParam = c.req.query("month");
    const month = monthParam ? new Date(monthParam) : undefined;

    const stats = await this.dashboardService.getDashboardStats(userId, month);

    return c.html(<StatCard stats={stats} />);
  };

  /**
   * GET /chart (HTMX) - Get chart partial
   */
  getChart = async (c: Context) => {
    const userId = c.get("userId");

    const chartData = await this.dashboardService.getMonthlyChartData(userId);

    return c.html(<MonthlyChart data={chartData} />);
  };

  /**
   * GET /recent (HTMX) - Get recent transactions partial
   */
  getRecent = async (c: Context) => {
    const userId = c.get("userId");
    const limit = Number(c.req.query("limit")) || 5;

    const transactions = await this.dashboardService.getRecentTransactions(
      userId,
      limit
    );

    return c.html(<RecentActivity transactions={transactions} />);
  };
}
