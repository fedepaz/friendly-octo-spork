"use client";

import { UserX, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

export function PendingPermissionsPage() {
  const t = useTranslations("errors");

  return (
    <div className="grid min-h-dvh place-items-center px-6 py-24 sm:py-32 lg:px-8 bg-background">
      <div className="text-center max-w-2xl">
        <div className="relative mx-auto w-20 h-20 mb-6">
          <UserX className="w-20 h-20 text-muted-foreground/70" />
        </div>

        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-foreground text-balance sm:text-6xl">
          {t("pendingPermissions")}
        </h1>

        <p className="mt-6 text-lg font-medium text-pretty text-muted-foreground sm:text-xl/8">
          {t("pendingPermissionsDesc")}
        </p>

        <div className="mt-8 p-6 rounded-lg bg-muted/50 border border-border">
          <p className="text-base text-foreground font-medium mb-2">
            {t("whatNext")}
          </p>
          <p className="text-sm text-muted-foreground text-balance">
            {t("adminAssignRole")}
          </p>
        </div>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            variant="outline"
            className="gap-2 bg-transparent"
            onClick={() =>
              (window.location.href = "mailto:support@yourcompany.com")
            }
          >
            <Mail className="w-4 h-4" />
            {t("contactAdmin")}
          </Button>
          <Button onClick={() => window.location.reload()}>
            {t("refreshStatus")}
          </Button>
        </div>

        <p className="mt-8 text-sm text-muted-foreground">
          {t("contactAdminIfError")}
        </p>
      </div>
    </div>
  );
}
