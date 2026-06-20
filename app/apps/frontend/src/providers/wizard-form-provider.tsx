// src/providers/wizard-form-provider.tsx
"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { SmartFormProvider } from "@/features/createTransaction";
import { SmartFormProviderRecurrence } from "@/features/updateRecurrence/providers/SmartFormProviderRecurrence";

type WizardType = "transaction" | "recurrence" | null;

interface WizardContextType {
  openTransaction: () => void;
  openRecurrence: (id: string) => void;
  closeWizard: () => void;
  activeWizard: WizardType;
  recurrenceId: string | null;
}

const WizardContext = createContext<WizardContextType | undefined>(undefined);

export function WizardFormProvider({ children }: { children: ReactNode }) {
  const [activeWizard, setActiveWizard] = useState<WizardType>(null);
  const [recurrenceId, setRecurrenceId] = useState<string | null>(null);

  const openTransaction = () => {
    setActiveWizard("transaction");
    setRecurrenceId(null);
  };

  const openRecurrence = (id: string) => {
    setRecurrenceId(id);
    setActiveWizard("recurrence");
  };

  const closeWizard = () => {
    setActiveWizard(null);
    setRecurrenceId(null);
  };

  return (
    <WizardContext.Provider
      value={{
        openTransaction,
        openRecurrence,
        closeWizard,
        activeWizard,
        recurrenceId,
      }}
    >
      {children}
      <WizardPortal />
    </WizardContext.Provider>
  );
}

function WizardPortal() {
  const { activeWizard, recurrenceId, closeWizard } = useWizard();

  if (activeWizard === "transaction") {
    return <SmartFormProvider onClose={closeWizard} />;
  }

  if (activeWizard === "recurrence" && recurrenceId) {
    return (
      <SmartFormProviderRecurrence
        recurrenceId={recurrenceId}
        onClose={closeWizard}
      />
    );
  }

  return null;
}

export function useWizard() {
  const context = useContext(WizardContext);
  if (context === undefined) {
    throw new Error("useWizard must be used within a WizardFormProvider");
  }
  return context;
}
