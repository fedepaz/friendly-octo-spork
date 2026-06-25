"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import { useIsMounted } from "@/hooks/useIsMounted";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function ThemeToggle() {
  const ttT = useTranslations("ThemeToggle");
  const { theme, setTheme } = useTheme();

  const mounted = useIsMounted();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  if (!mounted) {
    return (
      <Button
        variant="ghost"
        size="icon"
        className="agricultural-touch-target"
        disabled
      ></Button>
    );
  }

  const label = theme === "dark" ? ttT("lightMode") : ttT("darkMode");

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          aria-label={label}
        >
          {theme === "dark" ? (
            <Sun className="h-5 w-5" />
          ) : (
            <Moon className="h-5 w-5" />
          )}
        </Button>
      </TooltipTrigger>
      <TooltipContent side="bottom" className="border border-border shadow-md">
        <p>{label}</p>
      </TooltipContent>
    </Tooltip>
  );
}
