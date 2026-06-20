//src/app/(dashboard)/layout.tsx

import type React from "react";
import { DesktopSidebar } from "@/components/layout/desktop-sidebar";
import { DashboardHeader } from "@/components/layout/dashboard-header";
import { DashboardProtectedLayout } from "@/components/common/dashboard-protected-layout";
export const dynamic = "force-dynamic";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  return (
    <DashboardProtectedLayout>
      <div className="flex h-dvh overflow-hidden bg-background">
        <DesktopSidebar />
        <div className="flex flex-1 flex-col min-w-0 overflow-hidden">
          <DashboardHeader />
          <main className="flex-1 overflow-y-auto md:overflow-hidden pb-safe-area-inset-bottom md:pb-0 px-1 sm:px-2 lg:px-4 py-1.5 flex flex-col">
            <div className="mx-auto w-full max-w-400 flex-1 flex flex-col min-h-0 space-y-4">
              {children}
            </div>
          </main>
        </div>
      </div>
    </DashboardProtectedLayout>
  );
}
