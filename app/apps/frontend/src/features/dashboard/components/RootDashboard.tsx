//src/features/dashboard/components/RootDashboard.tsx
"use client";

import { useState } from "react";
import { SmartFormProvider } from "@/features/createTransaction";
import { KPIsDashboard } from "./kpis/kpis-dashboard";
import { MainChartsDashboard } from "./charts/main-charts-dashboard";
import { SmartFormProviderRecurrence } from "@/features/updateRecurrence/providers/SmartFormProviderRecurrence";

export function RootDashboard() {
  const [isNewTransaction, setIsNewTransaction] = useState(false);
  const [isUpdateRecurrence, setIsUpdateRecurrence] = useState(false);
  const [recurrenceId, setRecurrenceId] = useState("");

  function openNewTransaction() {
    setIsNewTransaction(true);
  }

  function openUpdateRecurrence(recurrenceId: string) {
    setRecurrenceId(recurrenceId);
    setIsUpdateRecurrence(true);
  }

  return (
    <div className="flex flex-1 flex-col gap-3 min-h-0 overflow-hidden animate-premium-in mb-3">
      <KPIsDashboard onClick={openNewTransaction} />
      {/* Main Bento Grid */}
      <MainChartsDashboard onPayClick={openUpdateRecurrence} />

      {isNewTransaction && (
        <SmartFormProvider onClose={() => setIsNewTransaction(false)} />
      )}
      {isUpdateRecurrence && (
        <SmartFormProviderRecurrence
          recurrenceId={recurrenceId}
          onClose={() => setIsUpdateRecurrence(false)}
        />
      )}
    </div>
  );
}
