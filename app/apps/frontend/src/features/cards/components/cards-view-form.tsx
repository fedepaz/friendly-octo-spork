// src/features/cards/components/cards-view-form.tsx
"use client";

import { formatCurrency, cn } from "@/lib/utils";
import { formatShortDate } from "@/lib/date-utils";
import {
  Calendar,
  Clock,
  Hash,
  Database,
  ArrowRight,
  CreditCard,
  Target,
} from "lucide-react";
import { CardStatementRow } from "../types/card.type";
import { RecurrenceDTO } from "@repo/shared";

interface CardViewFormProps {
  selectedCardStatementItem: CardStatementRow;
}

export function CardViewForm({ selectedCardStatementItem }: CardViewFormProps) {
  const {
    amount,
    date,
    description,
    source,
    installmentInfo,
    cardType,
    category,
    sourceAccount,
    targetAccount,
    id,
    _raw,
  } = selectedCardStatementItem;

  const isPending = source === "pending";
  const rawRecurrence =
    "frequency" in _raw ? (_raw as RecurrenceDTO) : _raw.recurrence;
  const frequency = rawRecurrence?.frequency || "ONE_TIME";

  // Calculate progress for installments
  let progress = 0;
  let installmentLabel = "PAGO ÚNICO";
  let partsDetail = null;

  if (installmentInfo) {
    const [current, total] = installmentInfo.split("/").map(Number);
    progress = (current / total) * 100;
    installmentLabel = `CUOTA ${current} DE ${total}`;
    const remaining = total - current;

    partsDetail = {
      current,
      total,
      remaining,
      status:
        remaining === 0 ? "FINALIZADO" : isPending ? "PENDIENTE" : "PAGADO",
    };

    if (remaining > 0) {
      installmentLabel += ` (${remaining} RESTANTES)`;
    } else {
      installmentLabel = "FINALIZANDO PLAN";
    }
  } else if (isPending) {
    installmentLabel =
      frequency === "MONTHLY" ? "RECURRENCIA MENSUAL" : "PENDIENTE";
  }

  return (
    <div className="space-y-6 pb-4">
      <div
        className={cn(
          "p-3 border-2 flex items-center justify-between animate-premium-in",
          isPending
            ? "bg-accent/10 border-accent/40 text-accent"
            : "bg-primary/10 border-primary/40 text-primary",
        )}
      >
        <div className="flex items-center gap-2">
          {isPending ? (
            <Clock className="h-4 w-4 animate-pulse" />
          ) : (
            <Database className="h-4 w-4" />
          )}
          <span className="text-2.5 font-black uppercase tracking-tighter">
            {isPending ? "PROYECCIÓN DE PAGO" : "TRANSACCIÓN ASENTADA"}
          </span>
        </div>
        <div className="font-mono text-2.5 font-bold opacity-80">
          ID: {id.slice(-8).toUpperCase()}
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-2.5 uppercase font-bold text-muted-foreground opacity-50 flex items-center gap-2">
          <Target className="h-3 w-3" />
          Impacto Financiero
        </p>
        <div className="flex items-baseline gap-2">
          <p className="text-4xl font-mono font-black tracking-tighter text-foreground">
            {formatCurrency(Number(amount))}
          </p>
          <span className="text-xs font-bold text-muted-foreground opacity-50 mb-1">
            ARS
          </span>
        </div>
      </div>

      <div className="space-y-3">
        <h4 className="text-2.5 font-bold uppercase tracking-widest text-muted-foreground border-b border-border/40 pb-1 flex items-center justify-between">
          <span>Estructura del Gasto</span>
          <span className="bg-muted px-1.5 py-0.5 text-[10px] border border-border/60">
            {frequency}
          </span>
        </h4>

        <div className="bg-muted/30 p-3 border-2 border-border/60 relative overflow-hidden">
          {partsDetail ? (
            <div className="space-y-3">
              <div className="flex justify-between items-end">
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-muted-foreground uppercase opacity-60">
                    Progreso de Cuotas
                  </span>
                  <span className="text-lg font-mono font-black text-foreground">
                    {partsDetail.current}{" "}
                    <span className="text-muted-foreground/40 font-normal">
                      /
                    </span>{" "}
                    {partsDetail.total}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-bold text-muted-foreground uppercase opacity-60">
                    Status
                  </span>
                  <p className="font-black text-[10px] text-primary tracking-widest">
                    {partsDetail.status}
                  </p>
                </div>
              </div>

              <div className="space-y-1">
                <div className="h-2 w-full bg-background border border-border/40 overflow-hidden p-0.5">
                  <div
                    className="h-full bg-primary transition-all duration-1000 shadow-[0_0_8px_rgba(var(--primary),0.4)]"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <div className="flex justify-between text-[9px] font-mono text-muted-foreground uppercase">
                  <span>Inicio</span>
                  <span>{Math.round(progress)}% Completo</span>
                  <span>Fin</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex justify-between items-center">
              <span className="text-2.5 font-bold text-foreground/70 uppercase">
                Tipo de Cargo
              </span>
              <span className="font-mono text-[10px] font-black tracking-widest text-primary">
                PAGO ÚNICO / DIRECTO
              </span>
            </div>
          )}
          <p className="text-2.5 font-mono text-muted-foreground leading-tight mt-3 pt-3 border-t border-dashed border-border/40 italic">
            {description}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-2">
        <div className="flex items-center justify-between p-3 bg-background border-2 border-border/60 font-mono text-2.5">
          <div className="flex flex-col">
            <span className="opacity-40 uppercase text-[10px]">Origen</span>
            <span className="font-bold text-foreground">
              {sourceAccount?.name || "SIN ASIGNAR"}
            </span>
          </div>
          <div className="flex items-center gap-2">
            {cardType && (
              <span className="bg-primary/20 text-primary px-1.5 py-0.5 border border-primary/40 text-[10px] font-black flex items-center gap-1">
                <CreditCard className="h-3 w-3" />
                {cardType}
              </span>
            )}
          </div>
        </div>

        {targetAccount && (
          <div className="flex items-center justify-between p-3 bg-background border-2 border-border/60 font-mono text-2.5">
            <div className="flex flex-col">
              <span className="opacity-40 uppercase text-[10px]">Destino</span>
              <span className="font-bold text-foreground">
                {targetAccount.name}
              </span>
            </div>
            <ArrowRight className="h-4 w-4 opacity-20" />
          </div>
        )}
      </div>

      <div className="flex items-center justify-between gap-3">
        <div className="flex-1 flex items-center gap-3 p-3 border-2 border-border/60 bg-muted/20">
          <Calendar className="h-5 w-5 text-muted-foreground opacity-30" />
          <div>
            <p className="text-[10px] font-bold uppercase leading-none opacity-40 mb-1">
              Fecha de Registro
            </p>
            <p className="font-mono text-xs font-black">
              {formatShortDate(new Date(date))}
            </p>
          </div>
        </div>

        {category && (
          <div
            className="flex-1 flex items-center gap-3 p-3 border-2 border-border/60 bg-muted/20"
            style={{ borderColor: `${category.color}40` }}
          >
            <Hash
              className="h-5 w-5 opacity-30"
              style={{ color: category.color || undefined }}
            />
            <div>
              <p className="text-[10px] font-bold uppercase leading-none opacity-40 mb-1">
                Categoría
              </p>
              <p className="text-xs font-black truncate">{category.name}</p>
            </div>
          </div>
        )}
      </div>

      {(_raw.metadata as JSON) ? (
        <div className="pt-4 border-t border-dashed border-border/40">
          <p className="text-[10px] font-bold uppercase opacity-30 mb-2 flex items-center gap-1">
            <Database className="h-3 w-3" />
            Metadatos del Sistema
          </p>
          <pre className="text-[10px] font-mono bg-muted/40 p-2 border border-border/40 overflow-x-auto text-muted-foreground">
            {JSON.stringify(_raw.metadata, null, 2)}
          </pre>
        </div>
      ) : null}
    </div>
  );
}
