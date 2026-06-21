// src/providers/wizard-form-provider.tsx
"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { SmartFormProvider } from "@/features/createTransaction";
import { SmartFormProviderRecurrence } from "@/features/updateRecurrence/";
import { SmartFormProviderCard } from "@/features/updateCardBalance";

type WizardType = "transaction" | "recurrence" | "card" | null;

interface WizardContextType {
  openTransaction: () => void;
  openRecurrence: (id: string) => void;
  openCard: () => void;
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

  const openCard = () => {
    setActiveWizard("card");
    setRecurrenceId(null);
  };

  return (
    <WizardContext.Provider
      value={{
        openTransaction,
        openRecurrence,
        openCard,
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

  if (activeWizard === "card") {
    return <SmartFormProviderCard onClose={closeWizard} />;
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
