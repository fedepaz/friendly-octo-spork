// src/features/dashboard/api/dashboardService.ts

import { CurrencyRateInterface } from "../types";
import { fetchDolarBlue, fetchDolarOficial, fetchEuro } from "./dolarApi";

export const dashboardService = {
  async fetchAlerts(): Promise<CurrencyRateInterface[]> {
    const [oficial, blue, euro] = await Promise.all([
      fetchDolarOficial(),
      fetchDolarBlue(),
      fetchEuro(),
    ]);

    return [
      {
        name: "Dólar Oficial",
        code: "USD",
        buyRate: oficial.compra,
        sellRate: oficial.venta,
      },
      {
        name: "Dólar Blue",
        code: "BLUE",
        buyRate: blue.compra,
        sellRate: blue.venta,
      },
      {
        name: "Euro",
        code: "EUR",
        buyRate: euro.compra,
        sellRate: euro.venta,
      },
    ];
  },
};
