"use client";

import { AccountDTO, Currency } from "@repo/shared";
import { cn } from "@/lib/utils";
import { ArrowDownLeft, ArrowUpRight, History } from "lucide-react";
import {
  PremiumAmountCell,
  PremiumDateCell,
} from "@/components/data-display/data-table";
import { useTranslations } from "next-intl";

interface AccountViewFormProps {
  selectedAccount: AccountDTO;
}

export function AccountViewForm({ selectedAccount }: AccountViewFormProps) {
  const avfT = useTranslations("AccountViewForm");
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
    <div className="space-y-8 animate-premium-in">
      {/* Tactical KPI Area */}
      <div className="grid grid-cols-2 gap-px bg-border/40 border border-border/40 shadow-etched">
        <div className="bg-background/40 p-4 space-y-1">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground opacity-50">
            {avfT("operativeType")}
          </p>
          <p className="text-sm font-black font-oxanium uppercase tracking-tighter">
            {selectedAccount.type}
          </p>
        </div>
        <div className="bg-background/40 p-4 space-y-1">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground opacity-50">
            {avfT("baseCurrency")}
          </p>
          <p className="text-sm font-black font-oxanium uppercase tracking-tighter">
            {selectedAccount.currency}
          </p>
        </div>
      </div>

      <div className="p-6 bg-primary/5 border-2 border-primary/20 shadow-premium relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-2 opacity-5 group-hover:opacity-10 transition-opacity">
          <History className="h-16 w-16 -mr-4 -mt-4 rotate-12" />
        </div>
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary mb-2">
          {avfT("consolidatedBalance")}
        </p>

        <PremiumAmountCell
          amount={selectedAccount.balance}
          currency={selectedAccount.currency}
        />
      </div>

      {/* Recent Activity Feed */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-border/40 pb-2">
          <div className="flex items-center gap-2 text-primary">
            <History className="h-3.5 w-3.5" />
            <h4 className="text-[11px] font-black uppercase tracking-[0.2em]">
              {avfT("terminalHistory")}
            </h4>
          </div>
          <span className="text-[9px] font-mono text-muted-foreground opacity-40 uppercase">
            {avfT("lastRecords")}
          </span>
        </div>

        <div className="space-y-px bg-border/20 border border-border/20">
          {recentActivity.length > 0 ? (
            recentActivity.map((tx) => (
              <div
                key={tx.id}
                className="flex items-center justify-between px-4 py-3 bg-background/20 hover:bg-muted/30 transition-premium group"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={cn(
                      "flex h-7 w-7 items-center justify-center border border-border/40 shadow-inner transition-colors",
                      tx.displayType === "IN"
                        ? "bg-secondary/5 text-secondary/60"
                        : "bg-destructive/5 text-destructive/60",
                    )}
                  >
                    {tx.displayType === "IN" ? (
                      <ArrowDownLeft className="h-3.5 w-3.5" />
                    ) : (
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    )}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-black text-foreground/80 tracking-tighter uppercase font-oxanium truncate max-w-37.5">
                      {tx.description}
                    </span>
                    <PremiumDateCell date={tx.date} className="text-[9px]" />
                  </div>
                </div>

                <div className="text-right">
                  <PremiumAmountCell
                    amount={tx.amount}
                    currency={selectedAccount.currency as Currency}
                    isNegative={tx.displayType === "OUT"}
                    className="text-xs"
                  />
                </div>
              </div>
            ))
          ) : (
            <div className="p-8 text-center bg-background/10">
              <p className="text-[10px] font-black uppercase tracking-widest opacity-20">
                {avfT("noMovements")}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
