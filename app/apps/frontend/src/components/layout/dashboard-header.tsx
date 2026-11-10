"use client";

import { MobileNavigation } from "./mobile-navigation";

import { useLogout } from "@/features/auth/hooks/useLogout";
import { LoadingSpinner } from "../common/loading-spinner";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/features/auth/providers/AuthProvider";
import { useEffect } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "../ui/button";
import { Logo } from "../common/logo";
import { getISOWeek, getTotalWeeks, formatSpanishDate } from "@/lib/date-utils";
import { ThemeToggle } from "../common/theme-toggle";
import { useTranslations } from "next-intl";
import { LanguageSwitcher } from "../common/language-switcher";
import { Bell } from "lucide-react";
import { useAlertModal } from "@/providers/alert-modal-provider";
import { AlertModalDialog } from "@/components/modals/alert-modal-dialog";
import { usePermission } from "@/hooks/usePermission";

export function DashboardHeader() {
  const t = useTranslations("DashboardHeader");
  const { isLoading } = useLogout();
  const router = useRouter();
  const { userProfile } = useAuthContext();
  const { openAlert } = useAlertModal();
  const { canRead } = usePermission("alerts");

  const currentDate = new Date();
  const weekNum = getISOWeek(currentDate);
  const totalWeeks = getTotalWeeks(currentDate.getFullYear());
  const formattedDate = formatSpanishDate(currentDate);

  useEffect(() => {
    if (!userProfile) {
      router.push("/");
    }
  }, [userProfile, router]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/60 backdrop-blur-md supports-backdrop-filter:bg-background/40 shrink-0">
      <div className="container mx-auto px-2">
        <div className="flex h-10 xl:h-12 2xl:h-14 items-center justify-between">
          <div className="flex items-center space-x-3">
            <MobileNavigation />
            <div className="flex items-center space-x-2 md:hidden">
              <Logo
                variant="icon"
                className="h-4 w-auto grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-premium"
              />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {canRead && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => openAlert("info")}
                    aria-label={t("alertsButton")}
                  >
                    <Bell className="h-5 w-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent
                  side="bottom"
                  className="bg-popover/90 backdrop-blur-lg border-border shadow-2xl rounded-none p-3"
                >
                  <p className="text-xs font-black text-foreground uppercase tracking-widest">
                    {t("alertsButton")}
                  </p>
                </TooltipContent>
              </Tooltip>
            )}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex items-center px-4 border-r border-border/40 h-(--header-height-compact) xl:h-12 cursor-help hover:bg-foreground/5 transition-premium">
                    <div className="flex flex-col items-end">
                      <p className="text-xl font-black text-foreground tracking-tighter leading-none">
                        S{weekNum}
                      </p>
                      <p className="text-xs font-black text-muted-foreground uppercase tracking-widest leading-none mt-1 opacity-60">
                        {t("weekLabel")}
                      </p>
                    </div>
                  </div>
                </TooltipTrigger>
                <TooltipContent
                  side="bottom"
                  className="bg-popover/90 backdrop-blur-lg border-border shadow-2xl rounded-none p-3"
                >
                  <div className="space-y-2">
                    <p className="text-xs font-black text-foreground uppercase tracking-widest">
                      {formattedDate}
                    </p>
                    <div className="space-y-1">
                      <p className="text-xs font-black text-muted-foreground leading-tight uppercase tracking-widest">
                        {t("weekOf")}{" "}
                        <span className="text-foreground font-mono">
                          {weekNum}
                        </span>{" "}
                        {t("of")}{" "}
                        <span className="text-foreground font-mono">
                          {totalWeeks}
                        </span>
                      </p>
                      <div className="pt-2 border-t border-border/40">
                        <p className="text-xs font-black text-muted-foreground/60 uppercase tracking-widest leading-tight">
                          {t("location")}
                        </p>
                      </div>
                    </div>
                  </div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            {/* Language Switcher */}
            <LanguageSwitcher />

            {/* Theme Toggle */}
            <ThemeToggle />
          </div>
        </div>
      </div>
      {canRead && <AlertModalDialog />}
    </header>
  );
}
