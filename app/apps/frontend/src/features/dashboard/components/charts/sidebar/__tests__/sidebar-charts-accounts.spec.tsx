// src/features/dashboard/components/charts/sidebar/__tests__/sidebar-charts-accounts.spec.tsx
import { render } from "@testing-library/react";
import { SidebarChartsAccounts } from "../sidebar-charts-accounts";
import { useRecentAccounts } from "@/features/dashboard/hooks/dashboardHooks";

jest.mock("next-intl", () => ({
  useTranslations: () => () => "label",
}));

jest.mock("@/features/dashboard/hooks/dashboardHooks", () => ({
  useRecentAccounts: jest.fn(() => ({ data: [] })),
}));

describe("SidebarChartsAccounts mobile flow", () => {
  it("does not clip or self-scroll below lg", () => {
    const { container } = render(<SidebarChartsAccounts />);
    const card = container.firstElementChild as HTMLElement;

    expect(card.className).not.toMatch(/(?:^| )overflow-hidden(?: |$)/);
    expect(card.className).not.toMatch(/(?:^| )min-h-0(?: |$)/);
    expect(card.className).toContain("lg:overflow-hidden");
    expect(card.className).toContain("lg:min-h-0");

    const content = card.querySelector("[class*='space-y-2']");
    expect(content).not.toBeNull();
    expect(content?.className).not.toMatch(/(?:^| )overflow-y-auto(?: |$)/);
    expect(content?.className).toContain("lg:overflow-y-auto");
  });
});
