import type { Context } from "hono";
import Dashboard from "../components/dashboard";
import { getDashboardData } from "./dashboard.service";

const createDashboardController = (c: Context) => {
  const data = getDashboardData();
  return c.render(
    <Dashboard title={data.title} description={data.description} />
  );
};

export default createDashboardController;
