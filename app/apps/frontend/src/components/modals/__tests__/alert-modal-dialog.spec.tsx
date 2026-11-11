// apps/frontend/src/components/modals/__tests__/alert-modal-dialog.spec.tsx

import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AlertModalProvider, useAlertModal } from "@/providers/alert-modal-provider";
import { AlertModalDialog } from "../alert-modal-dialog";

jest.mock("next-intl", () => ({
  useTranslations: () => (key: string) => {
    const messages: Record<string, string> = {
      title: "Alerts",
      description: "System alerts panel",
      emptyTitle: "No alerts",
      emptyDescription: "There are no alerts to review right now",
      noData: "No data",
      noDataDescription: "No data available",
    };
    return messages[key] ?? key;
  },
}));

function TestOpener() {
  const { openAlert } = useAlertModal();
  return <button onClick={() => openAlert("info")}>Open alerts</button>;
}

function renderWithProvider(ui: React.ReactElement) {
  return render(
    <AlertModalProvider>
      {ui}
      <AlertModalDialog />
    </AlertModalProvider>,
  );
}

describe("AlertModalDialog", () => {
  it("does not render dialog content while closed", () => {
    renderWithProvider(<TestOpener />);
    expect(screen.queryByRole("heading", { name: "Alerts" })).not.toBeInTheDocument();
  });

  it("opens with title Alerts when triggered", async () => {
    const user = userEvent.setup();
    renderWithProvider(<TestOpener />);
    await user.click(screen.getByText("Open alerts"));
    expect(screen.getByRole("heading", { name: "Alerts" })).toBeInTheDocument();
  });

  it("renders empty state content", async () => {
    const user = userEvent.setup();
    renderWithProvider(<TestOpener />);
    await user.click(screen.getByText("Open alerts"));
    expect(screen.getByText("No alerts")).toBeInTheDocument();
    expect(
      screen.getByText("There are no alerts to review right now"),
    ).toBeInTheDocument();
  });

  it("closes dialog on Escape key", async () => {
    const user = userEvent.setup();
    renderWithProvider(<TestOpener />);
    await user.click(screen.getByText("Open alerts"));
    expect(screen.getByRole("heading", { name: "Alerts" })).toBeInTheDocument();
    await user.keyboard("{Escape}");
    expect(
      screen.queryByRole("heading", { name: "Alerts" }),
    ).not.toBeInTheDocument();
  });
});
