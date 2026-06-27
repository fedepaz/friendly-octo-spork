// src/features/cards/components/cards-view-form.tsx
"use client";

import { useTranslations } from "next-intl";
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
import { CardStatementRow, SOURCE_LABELS, SOURCE_COLORS } from "../types/card.type";
import { RecurrenceDTO } from "@repo/shared";

interface CardViewFormProps {
  selectedCardStatementItem: CardStatementRow;
}

export function CardViewForm({ selectedCardStatementItem }: CardViewFormProps) {
  const cvfT = useTranslations("CardsViewForm");

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

  const rawRecurrence =
    "frequency" in _raw ? (_raw as RecurrenceDTO) : _raw.recurrence;
  const frequency = rawRecurrence?.frequency || "ONE_TIME";

  const labelMap: Record<string, string> = {
    recurrence: cvfT("sourceRecurrence"),
    oneTimer: cvfT("sourceOneTimer"),
    payment: cvfT("sourcePayment"),
  };

  const iconMap: Record<string, typeof Clock> = {
    recurrence: Clock,
    oneTimer: Database,
    payment: Database,
  };

  const Icon = iconMap[source];

  // Calculate progress for installments
  let progress = 0;
  let installmentLabel = cvfT("singlePayment");
  let partsDetail = null;

  if (installmentInfo) {
    const [current, total] = installmentInfo.split("/").map(Number);
    progress = (current / total) * 100;
    installmentLabel = cvfT("installmentOf", { current, total });
    const remaining = total - current;

    partsDetail = {
      current,
      total,
      remaining,
      status:
        remaining === 0
          ? cvfT("statusCompleted")
          : source === "recurrence"
            ? cvfT("statusPending")
            : cvfT("statusPaid"),
    };

    if (remaining > 0) {
      installmentLabel += ` (${cvfT("remaining", { remaining })})`;
    } else {
      installmentLabel = cvfT("completingPlan");
    }
  } else if (source === "recurrence") {
    installmentLabel =
      frequency === "MONTHLY" ? cvfT("monthlyRecurrence") : cvfT("pendingLabel");
  }

  return (
    <div className="space-y-6 pb-4">
      <div
        className={cn(
          "p-3 border-2 flex items-center justify-between animate-premium-in",
          SOURCE_COLORS[source],
        )}
      >
        <div className="flex items-center gap-2">
          {source === "recurrence" ? (
            <Clock className="h-4 w-4 animate-pulse" />
          ) : (
            <Database className="h-4 w-4" />
          )}
          <div className="flex items-center gap-2">
            <span className="text-2.5 font-black uppercase tracking-tighter">
              {labelMap[source]}
            </span>
            <span className={cn("inline-block px-1 py-0.5 text-[9px] font-black uppercase tracking-wider border", SOURCE_COLORS[source])}>
              {SOURCE_LABELS[source]}
            </span>
          </div>
        </div>
        <div className="font-mono text-2.5 font-bold opacity-80">
          {cvfT("idPrefix")} {id.slice(-8).toUpperCase()}
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-2.5 uppercase font-bold text-muted-foreground opacity-50 flex items-center gap-2">
          <Target className="h-3 w-3" />
          {cvfT("financialImpact")}
        </p>
        <div className="flex items-baseline gap-2">
          <p className="text-4xl font-mono font-black tracking-tighter text-foreground">
            {formatCurrency(Number(amount))}
          </p>
          <span className="text-xs font-bold text-muted-foreground opacity-50 mb-1">
            {cvfT("currency")}
          </span>
        </div>
      </div>

      <div className="space-y-3">
        <h4 className="text-2.5 font-bold uppercase tracking-widest text-muted-foreground border-b border-border/40 pb-1 flex items-center justify-between">
          <span>{cvfT("expenseStructure")}</span>
          <span className="bg-muted px-1.5 py-0.5 text-[10px] border border-border/60">
            {frequency}
          </span>
        </h4>

        <div className="bg-muted/30 p-3 border-2 border-border/60 relative overflow-hidden">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">{installmentLabel}</span>
            <Icon className="size-3 text-muted-foreground/60" />
          </div>
          {partsDetail ? (
            <div className="space-y-3">
              <div className="flex justify-between items-end">
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-muted-foreground uppercase opacity-60">
                    {cvfT("installmentProgress")}
                  </span>
                  <span className="text-lg font-mono font-black text-foreground">
                    {partsDetail.current}{" "}
                    <span className="text-muted-foreground/70 font-normal">
                      /
                    </span>{" "}
                    {partsDetail.total}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-bold text-muted-foreground uppercase opacity-60">
                    {cvfT("statusLabel")}
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
                  <span>{cvfT("progressStart")}</span>
                  <span>{cvfT("progressComplete", { progress: Math.round(progress) })}</span>
                  <span>{cvfT("progressEnd")}</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex justify-between items-center">
              <span className="text-2.5 font-bold text-foreground/70 uppercase">
                {cvfT("chargeType")}
              </span>
              <span className="font-mono text-[10px] font-black tracking-widest text-primary">
                {cvfT("singleDirectPayment")}
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
            <span className="opacity-40 uppercase text-[10px]">{cvfT("origin")}</span>
            <span className="font-bold text-foreground">
              {sourceAccount?.name || cvfT("notAssigned")}
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
              <span className="opacity-40 uppercase text-[10px]">{cvfT("destination")}</span>
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
              {cvfT("registrationDate")}
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
                {cvfT("category")}
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
            {cvfT("systemMetadata")}
          </p>
          <pre className="text-[10px] font-mono bg-muted/40 p-2 border border-border/40 overflow-x-auto text-muted-foreground">
            {JSON.stringify(_raw.metadata, null, 2)}
          </pre>
        </div>
      ) : null}
    </div>
  );
}
