// src/components/layout/auth-header.tsx
"use client";

import { usePathname } from "next/navigation";
import { ThemeToggle } from "../common/theme-toggle";
import { ROUTES } from "@/constants/routes";
import { Button } from "../ui/button";
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

export function AuthHeader() {
  const pathname = usePathname();
  const isLoginPage = pathname === ROUTES.LOGIN;
  const targetRoute = isLoginPage ? ROUTES.REGISTER : ROUTES.LOGIN;
  const targetLabel = isLoginPage ? "Registrarse" : "Iniciar Sesión";
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/60 backdrop-blur-md supports-backdrop-filter:bg-background/40 shrink-0">
      <div className="container mx-auto px-2">
        <div className="flex h-12 items-center justify-between">
          {/* Navigation Link */}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  asChild
                  className="text-[10px] font-black uppercase tracking-widest font-oxanium text-muted-foreground/60 hover:text-primary hover:bg-primary/5 rounded-none transition-premium"
                >
                  <Link href={targetRoute}>{targetLabel}</Link>
                </Button>
              </TooltipTrigger>
              <TooltipContent
                side="bottom"
                className="border border-border shadow-md"
              >
                <p>{isLoginPage ? "Crear cuenta" : "Tengo una cuenta"}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <div className="flex items-center space-x-4">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
