// src/components/data-display/data-table/__tests__/month-selector.spec.tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MonthSelector } from "../month-selector";

jest.mock("next-intl", () => ({
  useTranslations: () => (key: string) => {
    const translations: Record<string, string> = {
      monthlyPeriod: "Monthly Period",
      january: "January",
      february: "February",
      march: "March",
      april: "April",
      may: "May",
      june: "June",
      july: "July",
      august: "August",
      september: "September",
      october: "October",
      november: "November",
      december: "December",
      prevYear: "Previous year",
      nextYear: "Next year",
    };
    return translations[key] ?? key;
  },
  useLocale: () => "en",
}));

describe("MonthSelector", () => {
  const onMonthChange = jest.fn();
  const onYearChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the controlled month and year, not the current month", () => {
    // #76: the selection is owned by the parent — August 2026 must show even
    // though the real current month is different
    render(
      <MonthSelector
        month={7}
        year={2026}
        onMonthChange={onMonthChange}
        onYearChange={onYearChange}
      />,
    );

    expect(screen.getByText("August 2026")).toBeInTheDocument();
  });

  it("does not notify on mount (no silent reset of the parent's selection)", () => {
    // #76/#56: the old mount-time effect fired onMonthChange(currentMonth),
    // overwriting the parent's state on every remount
    render(
      <MonthSelector
        month={7}
        year={2026}
        onMonthChange={onMonthChange}
        onYearChange={onYearChange}
      />,
    );

    expect(onMonthChange).not.toHaveBeenCalled();
  });

  it("steps the year with the chevron controls", async () => {
    const user = userEvent.setup();
    render(
      <MonthSelector
        month={7}
        year={2026}
        onMonthChange={onMonthChange}
        onYearChange={onYearChange}
      />,
    );

    await user.click(screen.getByLabelText("Next year"));
    expect(onYearChange).toHaveBeenCalledWith(2027);

    await user.click(screen.getByLabelText("Previous year"));
    expect(onYearChange).toHaveBeenCalledWith(2025);
  });
});
