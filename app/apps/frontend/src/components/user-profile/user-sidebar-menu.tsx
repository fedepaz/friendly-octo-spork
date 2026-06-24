"use client";

import { User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserMenu } from "../user-profile/user-menu";
import { useLogout } from "@/features/auth/hooks/useLogout";
import { useState } from "react";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { useAuthContext } from "@/features/auth/providers/AuthProvider";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

interface UserSidebarMenuProps {
  isCollapsed?: boolean;
}

export function UserSidebarMenu({ isCollapsed = false }: UserSidebarMenuProps) {
  const usmT = useTranslations("UserSidebarMenu");
  const { logoutAsync } = useLogout();
  const [openProfile, setOpenProfile] = useState(false);
  const { userProfile } = useAuthContext();

  const handleLogout = async () => {
    try {
      await logoutAsync();
    } catch {}
  };

  const initials = userProfile?.name
    ? userProfile.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "";

  return (
    <>
      <DropdownMenu>
        <TooltipProvider>
          <Tooltip delayDuration={0}>
            <TooltipTrigger asChild>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className={cn(
                    "relative flex items-center gap-3 transition-premium hover:bg-primary/5 rounded-none border border-transparent hover:border-primary/20",
                    isCollapsed ? "h-10 w-10 p-0 justify-center mx-auto" : "w-full justify-start p-2",
                  )}
                  aria-label={usmT("avatarLabel")}
                >
                  <div className={cn(
                    "shrink-0 bg-primary/10 border border-primary/30 flex items-center justify-center transition-premium shadow-inner",
                    isCollapsed ? "h-8 w-8" : "h-9 w-9"
                  )}>
                    <span className={cn(
                      "text-primary font-black tracking-tighter font-oxanium",
                      isCollapsed ? "text-[10px]" : "text-xs"
                    )}>
                      {initials || <User className="h-4 w-4" />}
                    </span>
                  </div>
                  
                  {!isCollapsed && (
                    <div className="flex flex-col items-start min-w-0 flex-1 overflow-hidden">
                      <p className="text-[11px] font-black text-foreground truncate leading-tight tracking-tighter uppercase font-oxanium w-full text-left">
                        {userProfile?.name}
                      </p>
                      <p className="text-[8px] font-bold text-muted-foreground truncate leading-tight tracking-widest uppercase opacity-40 font-mono w-full text-left mt-0.5">
                        {userProfile?.email}
                      </p>
                    </div>
                  )}
                </Button>
              </DropdownMenuTrigger>
            </TooltipTrigger>
            {isCollapsed && (
              <TooltipContent
                side="right"
                className="border border-border shadow-2xl bg-popover/90 backdrop-blur-xl rounded-none p-2"
              >
                <div className="flex flex-col gap-0.5">
                  <p className="font-black text-[10px] text-primary uppercase font-oxanium tracking-widest">{userProfile?.name}</p>
                  <p className="text-[8px] text-muted-foreground font-bold font-mono tracking-tighter uppercase opacity-60">{userProfile?.email}</p>
                </div>
              </TooltipContent>
            )}
          </Tooltip>
        </TooltipProvider>
        
        <DropdownMenuContent align={isCollapsed ? "start" : "end"} side={isCollapsed ? "right" : "top"} className="w-56 p-1 bg-popover/90 backdrop-blur-xl border border-border shadow-2xl rounded-none">
          <DropdownMenuLabel className="px-3 py-2 flex flex-col gap-0.5">
            <span className="text-[9px] font-black text-primary uppercase tracking-[0.2em] opacity-60">{usmT("terminalLabel")}</span>
            <span className="text-xs font-black truncate uppercase font-oxanium tracking-tight">{userProfile?.name}</span>
          </DropdownMenuLabel>
          <DropdownMenuSeparator className="mx-1 my-1 bg-border/40" />
          <DropdownMenuItem 
            onClick={() => setOpenProfile(true)}
            className="cursor-pointer rounded-none focus:bg-primary/10 focus:text-primary transition-premium py-2 px-3 text-[11px] font-bold uppercase tracking-tight"
          >
            <div className="flex items-center gap-2">
              <div className="h-1.5 w-1.5 bg-primary/40 rotate-45" />
              <span>{usmT("viewIdentity")}</span>
            </div>
          </DropdownMenuItem>
          <DropdownMenuSeparator className="mx-1 my-1 bg-border/40" />
          <DropdownMenuItem 
            className="cursor-pointer rounded-none focus:bg-destructive/10 focus:text-destructive transition-premium py-2 px-3 text-[11px] font-bold uppercase tracking-tight"
          >
            <button className="w-full text-left font-black cursor-pointer focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2" onClick={handleLogout}>
              {usmT("disconnect")}
            </button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <UserMenu open={openProfile} onOpenChange={setOpenProfile} />
    </>
  );
}
