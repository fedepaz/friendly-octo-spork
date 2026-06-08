// src/features/accounts/components/account-view-form.tsx
"use client";

import { AccountDTO, Currency } from "@repo/shared";
import { formatCurrency, cn } from "@/lib/utils";
import { formatShortDate } from "@/lib/date-utils";
import { ArrowDownLeft, ArrowUpRight, History } from "lucide-react";

interface AccountViewFormProps {
  selectedAccount: AccountDTO;
}

export function AccountViewForm({ selectedAccount }: AccountViewFormProps) {
  // Combine and sort recent transactions (limited to 5 for high density)
  const allTransactions = [
    ...(selectedAccount.transactionsFrom || []).map((t) => ({
      ...t,
      displayType: "OUT",
    })),
    ...(selectedAccount.transactionsTo || []).map((t) => ({
      ...t,
      displayType: "IN",
    })),
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const recentActivity = allTransactions.slice(0, 5);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4 border-b border-border/50 pb-4">
        <div>
          <p className="text-2.5 uppercase font-bold text-muted-foreground opacity-50">
            Tipo
          </p>
          <p className="text-sm font-semibold">{selectedAccount.type}</p>
        </div>
        <div>
          <p className="text-2.5 uppercase font-bold text-muted-foreground opacity-50">
            Moneda
          </p>
          <p className="text-sm font-semibold">{selectedAccount.currency}</p>
        </div>
      </div>

      <div className="p-4 bg-primary/5 border border-primary/20">
        <p className="text-2.5 uppercase font-bold text-primary mb-1">
          Saldo Actual
        </p>
        <p className="text-2xl font-mono font-black tabular-nums">
          {formatCurrency(
            selectedAccount.balance,
            selectedAccount.currency as Currency,
          )}
        </p>
      </div>

      {/* Recent Activity Feed */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-muted-foreground opacity-60">
          <History className="h-3 w-3" />
          <h4 className="text-2.5 font-bold uppercase tracking-widest">
            Actividad Reciente
          </h4>
        </div>

        <div className="border-2 border-border divide-y divide-border/50">
          {recentActivity.length > 0 ? (
            recentActivity.map((tx) => (
              <div
                key={tx.id}
                className="flex items-center justify-between px-3 py-2.5 hover:bg-muted/30 transition-colors"
              >
                <div className="flex flex-col gap-0.5">
                  <span className="text-[11px] font-bold leading-none truncate max-w-37.5">
                    {tx.description}
                  </span>
                  <span className="text-[9px] font-mono opacity-50 uppercase">
                    {formatShortDate(tx.date)}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <div
                    className={cn(
                      "font-mono text-xs font-black tabular-nums",
                      tx.displayType === "IN"
                        ? "text-secondary"
                        : "text-destructive",
                    )}
                  >
                    {tx.displayType === "IN" ? "+" : "-"}
                    {formatCurrency(
                      tx.amount,
                      selectedAccount.currency as Currency,
                      false,
                    )}
                  </div>
                  {tx.displayType === "IN" ? (
                    <ArrowDownLeft className="h-3 w-3 text-secondary opacity-50" />
                  ) : (
                    <ArrowUpRight className="h-3 w-3 text-destructive opacity-50" />
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="p-6 text-center italic text-muted-foreground opacity-30 text-xs">
              Sin movimientos registrados
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
