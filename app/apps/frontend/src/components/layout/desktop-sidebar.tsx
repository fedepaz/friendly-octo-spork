// src/components/layout/desktop-sidebar.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import { ChevronLeft, ChevronDown } from "lucide-react";
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

interface NavigationItem {
  title: string;
  href: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: any;
  description?: string;
  badge?: string;
  badgeVariant?: "default" | "secondary" | "destructive" | "outline";
}

interface NavigationGroup {
  id: string;
  title: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: any;
  items: NavigationItem[];
}

export function DesktopSidebar() {
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
        // In single-user mode, all items are visible
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
        "hidden md:flex flex-col bg-card/60 backdrop-blur-xl border-r transition-all duration-300 ease-in-out",
        isCollapsed ? "w-12" : "w-52",
      )}
    >
      <div className="p-2 border-b border-border/40">
        <div
          className={cn(
            "flex items-center transition-all duration-300",
            isCollapsed ? "justify-center" : "justify-between px-1",
          )}
        >
          <button 
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="group relative flex items-center justify-center transition-premium hover:opacity-80 cursor-pointer"
            aria-label={isCollapsed ? "Expandir" : "Contraer"}
          >
            <Logo
              variant={isCollapsed ? "icon" : "sidebar"}
              className={cn(
                "h-6 w-auto transition-all duration-300 grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100",
                isCollapsed ? "h-6" : "h-5"
              )}
            />
            {isCollapsed && (
              <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-1 h-1 bg-primary/40 rounded-full opacity-0 group-hover:opacity-100 transition-premium" />
            )}
          </button>

          {!isCollapsed && (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsCollapsed(!isCollapsed)}
                  className="h-6 w-6 text-muted-foreground/40 hover:text-foreground transition-premium"
                >
                  <ChevronLeft className="h-3.5 w-3.5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent
                side="right"
                className="bg-popover/90 backdrop-blur-md border border-border shadow-2xl rounded-none"
              >
                <p className="text-[10px] uppercase font-bold tracking-widest">Contraer</p>
              </TooltipContent>
            </Tooltip>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 overflow-y-auto p-1.5 custom-scrollbar">
        {visibleNavigation.map((group) => {
          const GroupIcon = group.icon;
          const isExpanded = expandedGroups.has(group.id);

          return (
            <div key={group.id} className="mb-2">
              {/* Group Header */}
              {!isCollapsed && (
                <Button
                  variant="ghost"
                  onClick={() => !isCollapsed && toggleGroup(group.id)}
                  className={cn(
                    "h-7 w-full justify-start gap-2.5 px-2 font-black text-[10px] uppercase tracking-widest text-muted-foreground/50 hover:text-foreground hover:bg-transparent transition-premium",
                  )}
                >
                  <GroupIcon className="h-3 w-3 shrink-0 opacity-60" />
                  <>
                    <span className="flex-1 text-left">{group.title}</span>
                    <ChevronDown
                      className={cn(
                        "h-2.5 w-2.5 transition-transform duration-300 opacity-40",
                        isExpanded && "rotate-180",
                      )}
                    />
                  </>
                </Button>
              )}

              {/* Group Items */}
              {(isExpanded || isCollapsed) && (
                <div
                  className={cn("space-y-0.5 animate-premium-in", !isCollapsed && "mt-1")}
                >
                  {group.items.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href;

                    return (
                      <Link key={item.href} href={item.href}>
                        <Tooltip delayDuration={0}>
                          <TooltipTrigger asChild>
                            <div
                              className={cn(
                                "group flex items-center space-x-3 p-2 rounded-none transition-premium cursor-pointer relative",
                                isActive
                                  ? "bg-primary/5 text-primary"
                                  : "text-muted-foreground/60 hover:text-foreground hover:bg-foreground/5",
                                isCollapsed && "justify-center px-0",
                              )}
                              aria-label={item.title}
                            >
                              {isActive && (
                                <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-primary shadow-[0_0_8px_rgba(var(--primary),0.5)]" />
                              )}
                              <div className="relative">
                                <Icon className={cn("h-4 w-4 transition-premium", isActive ? "opacity-100" : "opacity-60 group-hover:opacity-100")} />
                                {item.badge && isCollapsed && (
                                  <div className="absolute -top-1.5 -right-1.5 h-3 w-3 flex items-center justify-center bg-primary text-[8px] font-black text-primary-foreground">
                                    {item.badge.length > 2 ? "!" : item.badge}
                                  </div>
                                )}
                              </div>
                              {!isCollapsed && (
                                <>
                                  <div className="flex-1 min-w-0">
                                    <p className={cn(
                                      "text-[11px] font-bold tracking-tight truncate transition-premium",
                                      isActive ? "text-foreground" : "text-muted-foreground/80 group-hover:text-foreground"
                                    )}>
                                      {item.title}
                                    </p>
                                  </div>
                                  {item.badge && (
                                    <span className="text-[10px] font-mono font-black opacity-50 px-1 border border-border/40">
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
                              "bg-popover/90 backdrop-blur-md border border-border shadow-2xl rounded-none p-2",
                              !isCollapsed && "hidden",
                            )}
                          >
                            <div className="flex flex-col gap-0.5">
                              <p className="text-[11px] font-black uppercase tracking-wider">{item.title}</p>
                              {item.description && (
                                <p className="text-[10px] text-muted-foreground opacity-70 uppercase tracking-tight">
                                  {item.description}
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

      {/* User Info */}
      <div className="p-2 border-t">
        <UserSidebarMenu isCollapsed={isCollapsed} />
      </div>
    </aside>
  );
}
