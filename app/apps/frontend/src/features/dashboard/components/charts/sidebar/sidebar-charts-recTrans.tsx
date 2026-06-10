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
import { RecurrenceDTO } from "@repo/shared";
import { Button } from "@/components/ui/button";

export function SidebarChartsRecentTransactions() {
  const { data: recurrences = [] } = useRecurrencesToPay();

  const handlePay = (recurrence: RecurrenceDTO) => {
    console.log("Paying recurrence", recurrence);
  };
  return (
    <Card className="bg-card/40 border-border/40 shadow-premium rounded-none flex-1 min-h-0 flex flex-col overflow-hidden">
      <CardHeader className="pb-3 px-5 pt-4 shrink-0">
        <CardTitle className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">
          Pendientes{" "}
        </CardTitle>
      </CardHeader>

      <CardContent className="flex-1 min-h-0 px-5 pb-4 overflow-hidden">
        <div className="h-full overflow-y-auto pr-1 custom-scrollbar">
          {recurrences.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-32 text-center">
              <p className="text-[9px] text-muted-foreground/40 mt-1">
                No hay transacciones pendientes
              </p>
            </div>
          ) : (
            <Table>
              <TableHeader className="sticky top-0 bg-card/90 backdrop-blur-md z-10">
                <TableRow className="hover:bg-transparent border-b border-border/40">
                  <TableHead className="font-black text-[9px] h-8 px-0 uppercase tracking-widest opacity-40 w-1/2">
                    Concepto
                  </TableHead>
                  <TableHead className="font-black text-[9px] text-center h-8 px-0 uppercase tracking-widest opacity-40 w-1/4">
                    Cuota
                  </TableHead>
                  <TableHead className="font-black text-[9px] text-right h-8 px-0 uppercase tracking-widest opacity-40 w-1/4">
                    Monto
                  </TableHead>
                  <TableHead className="w-12" /> {/* Pay button column */}
                </TableRow>
              </TableHeader>

              <TableBody>
                {recurrences.map((recurrence) => (
                  <TableRow
                    key={recurrence.id}
                    className="group hover:bg-foreground/5 border-border/10 transition-premium"
                  >
                    {/* Name + Type */}
                    <TableCell className="py-2.5 px-0">
                      <div className="flex flex-col gap-0.5">
                        <p className="text-[11px] font-black uppercase tracking-tight text-foreground/90 group-hover:text-primary transition-premium line-clamp-1">
                          {recurrence.name}
                        </p>
                        <div className="flex items-center gap-1">
                          <span className="font-mono text-[8px] text-muted-foreground/40 uppercase font-bold">
                            {recurrence.type}
                          </span>
                          {recurrence.isCardExpense && (
                            <span className="font-mono text-[7px] text-primary/60 bg-primary/5 px-1 rounded">
                              CARD
                            </span>
                          )}
                        </div>
                      </div>
                    </TableCell>

                    {/* Part Progress */}
                    <TableCell className="py-2.5 px-0 text-center">
                      {recurrence.totalParts && recurrence.currentPart ? (
                        <div className="flex flex-col items-center">
                          <span className="font-mono text-[10px] font-bold text-foreground/80">
                            {recurrence.currentPart + 1}
                            <span className="text-muted-foreground/40">/</span>
                            {recurrence.totalParts}
                          </span>
                          {/* Mini progress bar */}
                          <div className="w-full h-1 bg-border/30 rounded-full mt-1 overflow-hidden">
                            <div
                              className="h-full bg-primary/60 transition-all"
                              style={{
                                width: `${Math.min(
                                  ((recurrence.currentPart + 1) /
                                    recurrence.totalParts) *
                                    100,
                                  100,
                                )}%`,
                              }}
                            />
                          </div>
                        </div>
                      ) : (
                        <span className="font-mono text-[9px] text-muted-foreground/50 uppercase">
                          {recurrence.frequency}
                        </span>
                      )}
                    </TableCell>

                    {/* Amount */}
                    <TableCell
                      className={cn(
                        "font-mono text-[11px] font-black text-right tabular-nums py-2.5 px-0",
                        recurrence.type === "INCOME"
                          ? "text-secondary"
                          : "text-foreground",
                      )}
                    >
                      <PremiumAmountCell
                        amount={recurrence.amount}
                        currency="ARS"
                        isNegative={recurrence.type !== "INCOME"}
                      />
                    </TableCell>

                    {/* Pay Button */}
                    <TableCell className="py-2.5 px-0 text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handlePay(recurrence)}
                        className={cn(
                          "h-7 w-7 p-0 text-[10px] font-black uppercase tracking-tight rounded-none border border-border/40 hover:border-primary/60 hover:text-primary transition-premium opacity-40 cursor-not-allowed",
                        )}
                        title="Update recurrence"
                      >
                        💳
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
