// src/features/dashboard/components/charts/sidebar-charts-accounts.tsx

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PremiumAmountCell } from "@/components/data-display/data-table";
import { useRecentAccounts } from "@/features/dashboard/hooks/dashboardHooks";

export function SidebarChartsAccounts() {
  const { data: accounts = [] } = useRecentAccounts();
  return (
    <Card className="bg-card/40 border-border/40 shadow-premium rounded-none shrink-0 flex flex-col max-h-[25%] overflow-hidden">
      <CardHeader className="pb-2 px-5 pt-4 shrink-0">
        <CardTitle className="text-[10px] font-black uppercase tracking-widest text-primary">
          Instrumental de Cuentas
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2 px-5 pb-4 overflow-y-auto custom-scrollbar">
        {accounts.map((account) => (
          <div
            key={account.id}
            className="flex items-center justify-between group hover:translate-x-1 transition-premium border-l-2 border-transparent hover:border-primary pl-2"
          >
            <div className="min-w-0">
              <p className="text-[11px] font-black text-foreground truncate uppercase tracking-tighter">
                {account.name}
              </p>
              <p className="font-mono text-[8px] uppercase text-muted-foreground/40 font-bold leading-none">
                {account.type}
              </p>
            </div>

            <PremiumAmountCell amount={account.balance} currency="ARS" />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
