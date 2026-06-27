"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronDown } from "lucide-react";
import type { ComponentType } from "react";
import { cn } from "@/lib/utils";
import { useMemo, useState } from "react";
import { usePathname } from "next/navigation";

import { NAVIGATION_CONFIG } from "@/lib/config/navigations";
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Logo } from "@/components/common/logo";
import { UserSidebarMenu } from "../user-profile/user-sidebar-menu";
import { useTranslations } from "next-intl";

interface NavigationItem {
  title: string;
  href: string;
  icon: ComponentType<{ className?: string }>;
  description?: string;
  badge?: string;
  badgeVariant?: "default" | "secondary" | "destructive" | "outline";
}

interface NavigationGroup {
  id: string;
  title: string;
  icon: ComponentType<{ className?: string }>;
  items: NavigationItem[];
}

function getNavKey(href: string): string {
  const key = href.replace(/^\//, "");
  return key || "dashboard";
}

export function DesktopSidebar() {
  const dsT = useTranslations("DesktopSidebar");
  const navT = useTranslations("navigation");
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();

  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(
    new Set(["operations"]),
  );

  const toggleGroup = (groupId: string) => {
    const newExpandedGroups = new Set(expandedGroups);
    if (newExpandedGroups.has(groupId)) {
      newExpandedGroups.delete(groupId);
    } else {
      newExpandedGroups.add(groupId);
    }
    setExpandedGroups(newExpandedGroups);
  };

  const visibleNavigation: NavigationGroup[] = useMemo(() => {
    return NAVIGATION_CONFIG.map((group) => {
      const filteredItems = group.items.filter((item) => {
        if (!item.requiredPermission) return true;
        return true;
      });

      return {
        ...group,
        items: filteredItems,
      };
    }).filter((group) => group.items.length > 0);
  }, []);

  return (
    <aside
      className={cn(
        "hidden md:flex flex-col bg-card/40 backdrop-blur-xl border-r border-border/40 transition-all duration-300 ease-in-out relative overflow-hidden",
        isCollapsed ? "w-14" : "w-56",
      )}
    >
      <div className="absolute top-0 right-0 w-px h-full bg-linear-to-b from-transparent via-primary/20 to-transparent" />

      <div className="p-3 border-b border-border/40 bg-background/40">
        <div
          className={cn(
            "flex items-center transition-all duration-300",
            isCollapsed ? "justify-center" : "justify-between px-1",
          )}
        >
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="group relative flex items-center justify-center transition-premium hover:opacity-80 cursor-pointer"
            aria-label={isCollapsed ? dsT("expandLabel") : dsT("collapseLabel")}
          >
            <Logo
              variant={isCollapsed ? "icon" : "sidebar"}
              className={cn(
                "h-6 w-auto transition-all duration-300 grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100",
                isCollapsed ? "h-6" : "h-5",
              )}
            />
            {isCollapsed && (
              <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-primary/40 rounded-none rotate-45 opacity-0 group-hover:opacity-100 transition-premium" />
            )}
          </button>

          {!isCollapsed && (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsCollapsed(!isCollapsed)}
                  className="h-7 w-7 text-muted-foreground/60 hover:text-foreground hover:bg-primary/5 rounded-none border border-transparent hover:border-primary/20 transition-premium"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent
                side="right"
                className="bg-popover/90 backdrop-blur-md border border-border shadow-2xl rounded-none"
              >
                <p className="text-[10px] uppercase font-black tracking-widest font-oxanium">
                  {dsT("collapseTooltip")}
                </p>
              </TooltipContent>
            </Tooltip>
          )}
        </div>
      </div>

      <nav className="flex-1 space-y-2 overflow-y-auto p-2 custom-scrollbar">
        {visibleNavigation.map((group) => {
          const GroupIcon = group.icon;
          const isExpanded = expandedGroups.has(group.id);

          return (
            <div key={group.id} className="mb-4">
              {!isCollapsed && (
                <Button
                  variant="ghost"
                  onClick={() => !isCollapsed && toggleGroup(group.id)}
                  className={cn(
                    "h-8 w-full justify-start gap-3 px-2 font-black text-[9px] uppercase tracking-[0.2em] text-muted-foreground/70 hover:text-primary hover:bg-transparent transition-premium mb-1",
                  )}
                >
                  <GroupIcon className="h-3.5 w-3.5 shrink-0 opacity-40" />
                  <>
                    <span className="flex-1 text-left">{navT(group.id)}</span>
                    <ChevronDown
                      className={cn(
                        "h-3 w-3 transition-transform duration-300 opacity-30",
                        isExpanded && "rotate-180",
                      )}
                    />
                  </>
                </Button>
              )}

              {(isExpanded || isCollapsed) && (
                <div className={cn("space-y-1 animate-premium-in")}>
                  {group.items.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href;

                    return (
                      <Link key={item.href} href={item.href}>
                        <Tooltip delayDuration={0}>
                          <TooltipTrigger asChild>
                            <div
                              className={cn(
                                "group flex items-center gap-3 p-2 rounded-none transition-premium cursor-pointer relative",
                                isActive
                                  ? "bg-primary/10 text-primary border-y border-primary/20"
                                  : "text-muted-foreground/60 hover:text-foreground hover:bg-foreground/5",
                                isCollapsed && "justify-center px-0 h-10",
                              )}
                              aria-label={navT(getNavKey(item.href))}
                            >
                              {isActive && (
                                <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-primary shadow-[0_0_12px_rgba(var(--primary),0.6)]" />
                              )}
                              
                              <div className={cn(
                                "flex h-8 w-8 items-center justify-center border transition-premium shrink-0",
                                isActive 
                                  ? "bg-primary/20 border-primary/40 shadow-[inset_0_0_8px_rgba(var(--primary),0.2)]" 
                                  : "bg-muted/10 border-border/40 group-hover:border-primary/30 group-hover:bg-primary/5"
                              )}>
                                <Icon
                                  className={cn(
                                    "h-4 w-4 transition-premium",
                                    isActive
                                      ? "opacity-100 scale-110"
                                      : "opacity-40 group-hover:opacity-80 group-hover:scale-105",
                                  )}
                                />
                              </div>

                              {item.badge && isCollapsed && (
                                <div className="absolute -top-1 -right-1 h-3.5 w-3.5 flex items-center justify-center bg-primary text-[8px] font-black text-primary-foreground font-mono shadow-premium">
                                  {item.badge.length > 2 ? "!" : item.badge}
                                </div>
                              )}

                              {!isCollapsed && (
                                <>
                                  <div className="flex-1 min-w-0">
                                    <p
                                      className={cn(
                                        "text-[11px] font-black tracking-tighter uppercase font-oxanium truncate transition-premium",
                                        isActive
                                          ? "text-foreground"
                                          : "text-muted-foreground/80 group-hover:text-foreground",
                                      )}
                                    >
                                      {navT(getNavKey(item.href))}
                                    </p>
                                    {item.description && (
                                      <p className="text-[8px] font-mono font-bold text-muted-foreground/60 uppercase tracking-widest truncate leading-tight mt-0.5">
                                        {navT(getNavKey(item.href) + "Desc")}
                                      </p>
                                    )}
                                  </div>
                                  {item.badge && (
                                    <span className="text-[9px] font-mono font-black opacity-40 px-1 border border-border/40 bg-background/40">
                                      {item.badge}
                                    </span>
                                  )}
                                </>
                              )}
                            </div>
                          </TooltipTrigger>
                          <TooltipContent
                            side="right"
                            className={cn(
                              "bg-popover/90 backdrop-blur-xl border border-border shadow-2xl rounded-none p-2",
                              !isCollapsed && "hidden",
                            )}
                          >
                            <div className="flex flex-col gap-1">
                              <p className="text-[10px] font-black uppercase tracking-widest font-oxanium text-primary">
                                {navT(getNavKey(item.href))}
                              </p>
                              {item.description && (
                                <p className="text-[9px] font-mono font-bold text-muted-foreground uppercase tracking-tighter">
                                  {navT(getNavKey(item.href) + "Desc")}
                                </p>
                              )}
                            </div>
                          </TooltipContent>
                        </Tooltip>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      <div className="p-3 border-t border-border/40 bg-background/20">
        <UserSidebarMenu isCollapsed={isCollapsed} />
      </div>
    </aside>
  );
}
