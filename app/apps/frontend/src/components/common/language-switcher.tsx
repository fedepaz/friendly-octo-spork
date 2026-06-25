"use client";

import { Languages } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";

import { Button } from "../ui/button";
import { usePathname, useRouter } from "@/i18n/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "../ui/tooltip";

export function LanguageSwitcher() {
  const t = useTranslations("LanguageSwitcher");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = (newLocale: string) => {
    if (newLocale !== locale) {
      router.replace(pathname, { locale: newLocale });
      router.refresh();
    }
  };

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              aria-label={t("switch")}
              className="cursor-pointer"
            >
              <Languages className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="bg-popover/90 backdrop-blur-lg border-border shadow-2xl rounded-none p-3"
          >
            <DropdownMenuItem
              onClick={() => switchLocale("en")}
              className={`cursor-pointer ${locale === "en" ? "bg-accent" : ""}`}
            >
              <span className="inline-flex items-center justify-center w-8 h-6 text-[10px] font-black uppercase tracking-wider border border-primary/40 bg-primary/10 text-primary">
                EN
              </span>
              <span className="ml-2">{t("english")}</span>
              {locale === "en" && <span className="ml-auto">✓</span>}
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => switchLocale("es")}
              className={`cursor-pointer ${locale === "es" ? "bg-accent" : ""}`}
            >
              <span className="inline-flex items-center justify-center w-8 h-6 text-[10px] font-black uppercase tracking-wider border border-accent/40 bg-accent/10 text-accent">
                ES
              </span>
              <span className="ml-2">{t("spanish")}</span>
              {locale === "es" && <span className="ml-auto">✓</span>}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TooltipTrigger>
      <TooltipContent side="bottom" className="border border-border shadow-md">
        <p>{t("switch")}</p>
      </TooltipContent>
    </Tooltip>
  );
}