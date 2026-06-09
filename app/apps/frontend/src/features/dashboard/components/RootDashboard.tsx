//src/features/dashboard/components/RootDashboard.tsx
"use client";

import { useState } from "react";
import { SmartFormProvider } from "@/features/createTransaction";
import { KPIsDashboard } from "./kpis/kpis-dashboard";
import { MainChartsDashboard } from "./charts/main-charts-dashboard";

export function RootDashboard() {
  const [isOpen, setIsOpen] = useState(false);

  function openWizard() {
    setIsOpen(true);
  }

  return (
    <div className="flex flex-1 flex-col gap-3 min-h-0 overflow-hidden animate-premium-in mb-3">
      <KPIsDashboard onClick={openWizard} />
      {/* Main Bento Grid */}
      <MainChartsDashboard />

      {isOpen && <SmartFormProvider onClose={() => setIsOpen(false)} />}
    </div>
  );
}
