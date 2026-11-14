// src/features/createTransaction/__tests__/SmartFormProvider.spec.tsx
import { render, fireEvent, waitFor } from "@testing-library/react";
import { toast } from "sonner";
import { SmartFormProvider } from "../providers/SmartFormProvider";

jest.mock("sonner", () => ({
  toast: {
    error: jest.fn(),
    success: jest.fn(),
    info: jest.fn(),
  },
}));

jest.mock("next-intl", () => ({
  useTranslations: () => {
    const t = (key: string) => key;
    t.has = () => false;
    t.raw = () => ({});
    return t;
  },
}));

jest.mock("../hooks/createMutationHooks", () => ({
  useCreateTransaction: () => ({
    mutateAsync: jest.fn(),
    isPending: false,
  }),
}));

// Keep the wizard chrome out of this test — we submit the form directly.
jest.mock("../components/FormContainer", () => ({
  FormContainer: () => null,
}));

describe("SmartFormProvider", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("shows a visible, non-empty toast when submit fails validation", async () => {
    // #54 defect 3: onInvalid toasted the STALE errorMessageEnd string from
    // the last render (empty when no prior errors) — the failed Save looked
    // like a silent no-op.
    render(<SmartFormProvider onClose={jest.fn()} />);

    const form = document.querySelector("form");
    expect(form).not.toBeNull();
    fireEvent.submit(form!);

    await waitFor(() => expect(toast.error).toHaveBeenCalled());

    const message = (toast.error as jest.Mock).mock.calls[0][0];
    expect(typeof message).toBe("string");
    expect(message.trim().length).toBeGreaterThan(0);
    expect(message).not.toBe("");
  });
});
