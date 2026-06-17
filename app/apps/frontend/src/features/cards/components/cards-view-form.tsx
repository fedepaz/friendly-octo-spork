// src/features/cards/components/cards-view-form.tsx
"use client";

import { formatCurrency, cn } from "@/lib/utils";
import { formatShortDate } from "@/lib/date-utils";
import { Calendar, Clock } from "lucide-react";
import { CardStatementItem } from "@repo/shared";
import { CardStatementRow } from "../types/card.type";

interface CardViewFormProps {
  selectedCardStatementItem: CardStatementRow;
}

export function CardViewForm({ selectedCardStatementItem }: CardViewFormProps) {
  return (
    <div className="space-y-6">
      <div className="p-3 bg-accent/5 border border-accent/20 flex items-center justify-between">
        <div className="flex items-center gap-2 text-accent">
          <Clock className="h-4 w-4" />
          <span className="text-2.5 font-black uppercase"></span>
        </div>
        <div className="font-mono text-2.5 font-bold"></div>
      </div>

      <div className="space-y-2">
        <p className="text-2.5 uppercase font-bold text-muted-foreground opacity-50">
          Impacto Financiero
        </p>
        <div className="flex items-end gap-2">
          <p>{selectedCardStatementItem.amount}</p>
          <span className="text-2.5 font-bold mb-1.5 opacity-50"></span>
        </div>
      </div>

      <div className="space-y-3">
        <h4 className="text-2.5 font-bold uppercase tracking-widest text-muted-foreground border-b border-border pb-1">
          Progreso del Plan
        </h4>
        <div className="bg-muted/30 p-3 border border-border">
          <div className="flex justify-between items-center mb-2">
            <span className="text-2.5 font-bold">ESTADO DE CUOTAS</span>
            <span className="font-mono text-2.5"></span>
          </div>
          <div className="h-1 w-full bg-border overflow-hidden">
            <div className="h-full bg-primary" />
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 p-3 border border-dashed border-border opacity-50">
        <Calendar className="h-4 w-4" />
        <div className="text-2.5">
          <p className="font-bold uppercase leading-none">Fecha de Inicio</p>
          <p className="font-mono"></p>
        </div>
      </div>
    </div>
  );
}
