// src/features/dashboard/components/charts/sidebar-charts-recTrans.tsx

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { cn } from "@/lib/utils";
import { PremiumAmountCell } from "@/components/data-display/data-table";
import { useRecurrencesToPay } from "@/features/dashboard/hooks/dashboardHooks";

export function SidebarChartsRecentTransactions() {
  const { data: recentTransactions = [] } = useRecurrencesToPay();
  return (
    <Card className="bg-card/40 border-border/40 shadow-premium rounded-none flex-1 min-h-0 flex flex-col overflow-hidden">
      <CardHeader className="pb-3 px-5 pt-4 shrink-0">
        <CardTitle className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">
          Registros Recientes
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 min-h-0 px-5 pb-4 overflow-hidden">
        <div className="h-full overflow-y-auto pr-1 custom-scrollbar">
          <Table>
            <TableHeader className="sticky top-0 bg-card/90 backdrop-blur-md z-10">
              <TableRow className="hover:bg-transparent border-b border-border/40">
                <TableHead className="font-black text-[9px] h-8 px-0 uppercase tracking-widest opacity-40">
                  Descripción
                </TableHead>
                <TableHead className="font-black text-[9px] text-right h-8 px-0 uppercase tracking-widest opacity-40">
                  Monto
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentTransactions.map((tx) => (
                <TableRow
                  key={tx.id}
                  className="group hover:bg-foreground/5 border-border/10 cursor-pointer transition-premium"
                >
                  <TableCell className="py-2.5 px-0">
                    <div className="flex flex-col">
                      <p className="text-[11px] font-black uppercase tracking-tight text-foreground/90 group-hover:text-primary transition-premium">
                        {tx.name}
                      </p>
                      <span className="font-mono text-[8px] text-muted-foreground/40 uppercase font-bold">
                        {tx.type}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell
                    className={cn(
                      "font-mono text-[11px] font-black text-right tabular-nums py-2.5 px-0",
                      parseFloat(tx.amount) > 0
                        ? "text-secondary"
                        : "text-foreground",
                    )}
                  >
                    <PremiumAmountCell
                      amount={tx.amount}
                      currency="ARS"
                      isNegative={parseFloat(tx.amount) < 0}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
