// src/features/dashboard/components/charts/analytics/__tests__/analytic-charts-main.spec.tsx
import enMessages from "../../../AnalyticChartsMain/messages/en.json";
import esMessages from "../../../AnalyticChartsMain/messages/es.json";

describe("AnalyticChartsMain messages", () => {
  it("titles the chart for what it actually plots (net flow, not net worth)", () => {
    // #63.3: the chart plots income − expenses (net flow) while the title
    // claimed "Historical evolution of monthly net worth".
    expect(enMessages.AnalyticChartsMain.title).toBe("Net Flow Evolution");
    expect(enMessages.AnalyticChartsMain.description).not.toMatch(
      /net worth/i,
    );

    expect(esMessages.AnalyticChartsMain.title).toBe(
      "Evolución del Flujo Neto",
    );
    expect(esMessages.AnalyticChartsMain.description).not.toMatch(
      /patrimonio|net worth/i,
    );
  });
});
