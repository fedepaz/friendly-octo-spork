// src/features/dashboard/components/charts/sidebar-charts-recTrans.tsx

import { useEffect, useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  CheckCircle2,
  ArrowUpRight,
  ArrowDownLeft,
  Wallet,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { PremiumAmountCell } from "@/components/data-display/data-table";
import { useRecurrencesToPay } from "@/features/dashboard/hooks/dashboardHooks";
import { RecurrenceDTO, TransactionType } from "@repo/shared";
import { Button } from "@/components/ui/button";

export function SidebarChartsRecentTransactions() {
  const { data: recurrences = [] } = useRecurrencesToPay();

  const recurrencesTypes = useMemo(
    () => [...new Set(recurrences.map((r) => r.type))],
    [recurrences]
  );

  const [selectedFilter, setSelectedFilter] = useState<TransactionType | null>(
    null
  );

  const activeFilter =
    selectedFilter && recurrencesTypes.includes(selectedFilter)
      ? selectedFilter
      : recurrencesTypes[0];

  const handlePay = (recurrence: RecurrenceDTO) => {
    console.log("Paying recurrence", recurrence);
  };

  const filteredRecurrences = recurrences.filter(
    (r) => r.type === activeFilter
  );

  const filterOptions: { label: string; value: TransactionType }[] = [
    { label: "INC", value: "INCOME" },
    { label: "EXP", value: "EXPENSE" },
    { label: "PAY", value: "PAYMENT" },
    { label: "RET", value: "RETURN" },
    { label: "TRANS", value: "TRANSFER" },
    { label: "INV", value: "INVESTMENT" },
  ];

  // Filter the types received on recurrences to render only the one that it's received
  const filterOptionsRender = filterOptions.filter((opt) => {
    return recurrencesTypes.includes(opt.value);
  });

  return (
    <Card className="bg-card/40 border-border/40 shadow-premium rounded-none flex-1 min-h-0 flex flex-col overflow-hidden">
      <CardHeader className="pb-3 px-5 pt-4 shrink-0 flex flex-row items-center justify-between">
        <CardTitle className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60 font-sans">
          Pendientes
        </CardTitle>
        <div className="flex items-center gap-1 bg-background/40 p-0.5 border border-border/20">
          {filterOptionsRender.map((opt) => (
            <Button
              key={opt.value}
              onClick={() => setSelectedFilter(opt.value)}
              variant="ghost"
              className={cn(
                "px-2 py-0.5 m-0.5 text-[10px] font-black uppercase tracking-tighter transition-all cursor-pointer",
                activeFilter === opt.value
                  ? "bg-primary/80 text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary"
                  : "text-muted-foreground/40 ",
              )}
            >
              {opt.label}
            </Button>
          ))}
        </div>
      </CardHeader>

      <CardContent className="flex-1 min-h-0 px-5 pb-4 overflow-hidden">
        <div className="h-full overflow-y-auto pr-1 custom-scrollbar">
          {filteredRecurrences.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-32 text-center border border-dashed border-border/20">
              <p className="text-[9px] text-muted-foreground/40 mt-1 uppercase font-black tracking-widest">
                Sin registros {`(${activeFilter})`}
              </p>
            </div>
          ) : (
            <Table>
              <TableHeader className="sticky top-0 bg-card/90 backdrop-blur-md z-10">
                <TableRow className="hover:bg-transparent border-b border-border/40">
                  <TableHead className="font-black text-[9px] h-8 px-0 uppercase tracking-widest opacity-40 w-1/2 font-sans">
                    Concepto
                  </TableHead>
                  <TableHead className="font-black text-[9px] text-center h-8 px-0 uppercase tracking-widest opacity-40 w-1/4 font-sans">
                    Cuota
                  </TableHead>
                  <TableHead className="font-black text-[9px] text-right h-8 px-0 uppercase tracking-widest opacity-40 w-1/4 font-sans">
                    Monto
                  </TableHead>
                  <TableHead className="w-10" />
                </TableRow>
              </TableHeader>

              <TableBody>
                {filteredRecurrences.map((recurrence) => (
                  <TableRow
                    key={recurrence.id}
                    className="group hover:bg-foreground/5 border-border/10 transition-premium"
                  >
                    {/* Name + Type */}
                    <TableCell className="py-2 px-0">
                      <div className="flex flex-col gap-0">
                        <p className="text-[11px] font-black uppercase tracking-tight text-foreground/90 group-hover:text-primary transition-premium line-clamp-1 font-sans">
                          {recurrence.name}
                        </p>
                        <div className="flex items-center gap-1.5">
                          <div
                            className={cn(
                              "p-0.5 border border-border/20",
                              recurrence.type === "INCOME"
                                ? "text-emerald-500/60"
                                : "text-rose-500/60",
                            )}
                          >
                            {recurrence.type === "INCOME" ? (
                              <ArrowUpRight className="h-2 w-2" />
                            ) : (
                              <ArrowDownLeft className="h-2 w-2" />
                            )}
                          </div>
                          <span className="font-mono text-[8px] text-muted-foreground/40 uppercase font-bold tracking-tighter">
                            {recurrence.type}
                          </span>
                          {recurrence.isCardExpense && (
                            <div className="flex items-center gap-0.5 text-[7px] text-primary/60 bg-primary/5 px-1 border border-primary/20 font-sans font-black">
                              <Wallet className="h-2 w-2" />
                              CARD
                            </div>
                          )}
                        </div>
                      </div>
                    </TableCell>

                    {/* Part Progress */}
                    <TableCell className="py-2 px-0 text-center">
                      {recurrence.totalParts && recurrence.currentPart ? (
                        <div className="flex flex-col items-center gap-1">
                          <span className="font-mono text-[10px] font-bold text-foreground/80 tabular-nums">
                            {recurrence.currentPart + 1}
                            <span className="text-muted-foreground/30 px-0.5">
                              /
                            </span>
                            {recurrence.totalParts}
                          </span>
                          {/* Industrial progress bar */}
                          <div className="w-8 h-1 bg-border/20 border border-border/10 flex gap-0.5 p-0.5">
                            {Array.from({ length: 4 }).map((_, i) => (
                              <div
                                key={i}
                                className={cn(
                                  "flex-1 h-full",
                                  i <
                                    Math.ceil(
                                      ((recurrence.currentPart! + 1) /
                                        recurrence.totalParts!) *
                                        4,
                                    )
                                    ? "bg-primary/40"
                                    : "bg-transparent",
                                )}
                              />
                            ))}
                          </div>
                        </div>
                      ) : (
                        <span className="font-mono text-[9px] text-muted-foreground/50 uppercase tracking-tighter">
                          {recurrence.frequency}
                        </span>
                      )}
                    </TableCell>

                    {/* Amount */}
                    <TableCell className="font-mono text-[11px] font-black text-right tabular-nums py-2 px-0">
                      <PremiumAmountCell
                        amount={recurrence.amount}
                        currency="ARS"
                        isNegative={recurrence.type !== "INCOME"}
                      />
                    </TableCell>

                    {/* Pay Button */}
                    <TableCell className="py-2 px-0 text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handlePay(recurrence)}
                        className={cn(
                          "h-6 w-6 p-0 rounded-none border border-border/40 hover:border-primary/60 hover:text-primary transition-premium bg-foreground/2 cursor-pointer",
                        )}
                        title="Procesar pago"
                      >
                        <CheckCircle2 className="h-3 w-3 opacity-40 group-hover:opacity-100 transition-premium" />
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
