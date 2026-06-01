// src/features/accounts/components/account-view-form.tsx
"use client";

import { AccountDTO } from "@repo/shared";
import { formatCurrency } from "@/lib/utils";

interface AccountViewFormProps {
  selectedAccount: AccountDTO;
}

export function AccountViewForm({ selectedAccount }: AccountViewFormProps) {
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
          {formatCurrency(selectedAccount.balance, selectedAccount.currency)}
        </p>
      </div>

      <div className="space-y-4">
        <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
          Metadatos Técnicos
        </h4>
        <div className="font-mono text-2.5 space-y-2 opacity-70">
          <div className="flex justify-between">
            <span>ID SISTEMA</span>
            <span className="truncate ml-4">{selectedAccount.id}</span>
          </div>
          <div className="flex justify-between">
            <span>USUARIO</span>
            <span className="truncate ml-4">{selectedAccount.userId}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
