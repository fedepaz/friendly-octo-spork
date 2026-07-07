// src/features/auditLogs/components/auditLog-card.tsx

"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import type { AuditLogDto } from "@repo/shared";
import {
  User,
  Database,
  Clock,
  History,
  Smartphone,
  Monitor,
  Hash,
  Globe,
  Settings,
} from "lucide-react";
import { useTranslations, useLocale } from "next-intl";

interface AuditLogFormProps {
  selectedAuditLog: AuditLogDto;
}

export function AuditLogForm({ selectedAuditLog }: AuditLogFormProps) {
  const t = useTranslations("AuditLogFormDetail");
  const locale = useLocale();
  const isMobile = selectedAuditLog.userAgent?.includes("Mobile");

  return (
    <div className="flex flex-col gap-3 md:gap-6 pb-6 md:pb-8">
      {/* Información del Usuario */}
      {selectedAuditLog.user ? (
        <Card className="border-border/60 shadow-sm overflow-hidden">
          <CardHeader className="bg-muted/30 border-b py-2 md:py-4">
            <CardTitle className="flex items-center gap-2 text-sm md:text-base font-semibold">
              <User className="h-3.5 w-3.5 md:h-4 md:w-4 text-primary" />
              {t("responsible")}
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-4 pt-3 md:pt-4">
            <div className="space-y-0.5 md:space-y-1">
              <span className="text-[9px] md:text-[11px] font-bold uppercase tracking-wider text-muted-foreground/70">
                {t("fullName")}
              </span>
              <p className="text-xs md:text-sm font-medium">
                {selectedAuditLog.user.firstName}{" "}
                {selectedAuditLog.user.lastName}
              </p>
            </div>
            <div className="space-y-0.5 md:space-y-1">
              <span className="text-[9px] md:text-[11px] font-bold uppercase tracking-wider text-muted-foreground/70">
                {t("username")}
              </span>
              <p className="text-xs md:text-sm font-medium truncate">
                {selectedAuditLog.user.username}
              </p>
            </div>
            <div className="sm:col-span-2 space-y-0.5 md:space-y-1">
              <span className="text-[9px] md:text-[11px] font-bold uppercase tracking-wider text-muted-foreground/70">
                {t("internalId")}
              </span>
              <div className="flex items-center gap-2 mt-0.5">
                <code className="text-[9px] md:text-[10px] font-mono bg-muted/50 border border-border/50 px-2 py-0.5 md:py-1 rounded select-all">
                  {selectedAuditLog.userId}
                </code>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : null}

      {/* Entidad Afectada */}
      <Card className="border-border/60 shadow-sm overflow-hidden">
        <CardHeader className="bg-muted/30 border-b py-2 md:py-4">
          <CardTitle className="flex items-center gap-2 text-sm md:text-base font-semibold">
            <Database className="h-3.5 w-3.5 md:h-4 md:w-4 text-primary" />
            {t("affectedEntity")}
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-4 pt-3 md:pt-4">
          <div className="space-y-0.5 md:space-y-1">
            <span className="text-[9px] md:text-[11px] font-bold uppercase tracking-wider text-muted-foreground/70">
              {t("resourceType")}
            </span>
            <div className="pt-0.5">
              <Badge
                variant="outline"
                className="bg-primary/5 text-primary border-primary/20 font-bold uppercase tracking-widest text-[9px] md:text-[10px] h-4 md:h-5 px-1.5"
              >
                {selectedAuditLog.entityType}
              </Badge>
            </div>
          </div>
          <div className="space-y-0.5 md:space-y-1">
            <span className="text-[9px] md:text-[11px] font-bold uppercase tracking-wider text-muted-foreground/70">
              {t("identifier")}
            </span>
            <div className="flex items-center gap-2 pt-0.5">
              <Hash className="h-2.5 w-2.5 md:h-3 md:w-3 text-muted-foreground" />
              <code className="text-[9px] md:text-[10px] font-mono bg-muted/50 border border-border/50 px-2 py-0.5 md:py-1 rounded select-all truncate">
                {selectedAuditLog.entityId}
              </code>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Registro de Cambios */}
      <Card className="border-border/60 shadow-sm overflow-hidden">
        <CardHeader className="bg-muted/30 border-b py-2 md:py-4">
          <CardTitle className="flex items-center gap-2 text-sm md:text-base font-semibold">
            <History className="h-3.5 w-3.5 md:h-4 md:w-4 text-primary" />
            {t("changeLog")}
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-3 md:pt-4">
          <div className="relative rounded-lg border bg-card p-3 md:p-4 font-mono text-[10px] md:text-xs overflow-hidden">
            <div className="absolute right-2 top-2">
              <Settings className="h-3 w-3 md:h-3.5 md:w-3.5 text-muted-foreground animate-spin-slow" />
            </div>
            <pre className="text-muted-foreground overflow-auto max-h-40 md:max-h-80 custom-scrollbar">
              {JSON.stringify(selectedAuditLog.changes, null, 2)}
            </pre>
          </div>
        </CardContent>
      </Card>

      {/* Metadatos Técnicos */}
      <Card className="border-border/60 shadow-sm overflow-hidden">
        <CardHeader className="bg-muted/30 border-b py-2 md:py-4">
          <CardTitle className="flex items-center gap-2 text-sm md:text-base font-semibold">
            <Clock className="h-3.5 w-3.5 md:h-4 md:w-4 text-primary" />
            {t("technicalInfo")}
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-6 pt-3 md:pt-4">
          <div className="space-y-0.5 md:space-y-1.5">
            <div className="flex items-center gap-1.5">
              <Clock className="h-3 w-3 md:h-3.5 md:w-3.5 text-muted-foreground" />
              <span className="text-[9px] md:text-[11px] font-bold uppercase tracking-wider text-muted-foreground/70">
                {t("timestamp")}
              </span>
            </div>
            <p className="text-xs md:text-sm font-medium leading-none md:leading-normal">
              {new Date(selectedAuditLog.createdAt).toLocaleDateString(locale)}
              <br className="hidden md:block" />
              <span className="text-muted-foreground text-[10px] md:text-xs md:ml-0 ml-2">
                {new Date(selectedAuditLog.createdAt).toLocaleTimeString(
                  locale,
                )}
              </span>
            </p>
          </div>

          <div className="space-y-0.5 md:space-y-1.5">
            <div className="flex items-center gap-1.5">
              <Globe className="h-3 w-3 md:h-3.5 md:w-3.5 text-muted-foreground" />
              <span className="text-[9px] md:text-[11px] font-bold uppercase tracking-wider text-muted-foreground/70">
                {t("ipAddress")}
              </span>
            </div>
            <p className="text-xs md:text-sm font-mono font-medium">
              {selectedAuditLog.ipAddress || t("notRecorded")}
            </p>
          </div>

          <div className="space-y-0.5 md:space-y-1.5">
            <div className="flex items-center gap-1.5">
              {isMobile ? (
                <Smartphone className="h-3 w-3 md:h-3.5 md:w-3.5 text-muted-foreground" />
              ) : (
                <Monitor className="h-3 w-3 md:h-3.5 md:w-3.5 text-muted-foreground" />
              )}
              <span className="text-[9px] md:text-[11px] font-bold uppercase tracking-wider text-muted-foreground/70">
                {t("platform")}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Badge
                variant="secondary"
                className="font-semibold text-[8px] md:text-[10px] h-4 md:h-5"
              >
                {isMobile ? t("mobile") : t("desktop")}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
