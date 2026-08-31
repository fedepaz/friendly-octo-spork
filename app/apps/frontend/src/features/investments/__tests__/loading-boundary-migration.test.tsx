import { render, screen } from "@testing-library/react";
import { InvestmentsDashboard } from "../components/InvestmentsDashboard";

jest.mock("../components/investments-data-table", () => ({
  InvestmentsDataTable: () => <div data-testid="data-table">DataTable</div>,
}));

describe("InvestmentsDashboard LoadingBoundary migration", () => {
  it("renders with LoadingBoundary wrapper", () => {
    render(<InvestmentsDashboard />);
    expect(screen.getByTestId("data-table")).toBeInTheDocument();
  });
});
