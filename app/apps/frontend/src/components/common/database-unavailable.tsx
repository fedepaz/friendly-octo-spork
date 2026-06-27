"use client";

import { DatabaseZap, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

export function DatabaseUnavailablePage() {
  const t = useTranslations("errors");

  return (
    <div className="grid min-h-dvh place-items-center px-6 py-24 sm:py-32 lg:px-8 bg-background">
      <div className="text-center max-w-2xl">
        <div className="relative mx-auto w-20 h-20 mb-6">
          <DatabaseZap className="w-20 h-20 text-muted-foreground/70" />
        </div>

        <h1 className="mt-4 text-4xl font-black uppercase tracking-tighter text-foreground text-balance sm:text-6xl">
          {t("serviceUnavailable")}
        </h1>

        <p className="mt-6 text-lg font-medium text-pretty text-muted-foreground sm:text-xl/8 font-mono">
          {t("maintenanceDesc")}
        </p>

        <div className="mt-8 p-6 rounded-none bg-muted/50 border-2 border-border">
          <p className="text-base text-foreground font-bold uppercase tracking-widest mb-2">
            {t("systemMaintenance")}
          </p>
          <p className="text-sm text-muted-foreground text-balance font-mono">
            {t("teamWorking")}
          </p>
        </div>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            variant="outline"
            className="gap-2 bg-transparent rounded-none border-2 font-bold uppercase tracking-wider"
            onClick={() => window.location.reload()}
          >
            <RefreshCw className="w-4 h-4" />
            {t("tryAgain")}
          </Button>
          <Button
            variant="secondary"
            className="rounded-none border-2 border-secondary-foreground/20 font-bold uppercase tracking-wider"
            onClick={() => (window.location.href = "/")}
          >
            {t("goToHome")}
          </Button>
        </div>

        <div className="mt-8 flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-none bg-destructive opacity-75"></span>
              <span className="relative inline-flex rounded-none h-3 w-3 bg-destructive"></span>
            </span>
            <span className="text-[10px] font-black uppercase tracking-widest">{t("maintenanceInProgress")}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
