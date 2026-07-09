// src/components/layout/mobile-navigation.tsx

"use client";

import { cn } from "@/lib/utils";
import { Menu, ChevronDown } from "lucide-react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { usePathname } from "next/navigation";
import Link from "next/link";

import { NAVIGATION_CONFIG } from "@/lib/config/navigations";
import type {
  NavigationStandalone,
  NavigationItem,
  NavigationSubGroup,
} from "@/lib/config/navigation.types";
import { Logo } from "@/components/common/logo";
import { UserSidebarMenu } from "../user-profile/user-sidebar-menu";
import { useTranslations } from "next-intl";

function isSubGroup(
  item: NavigationSubGroup | NavigationItem,
): item is NavigationSubGroup {
  return "kind" in item && item.kind === "subGroup";
}

function getNavKey(href: string): string {
  const key = href.replace(/^\//, "");
  return key || "dashboard";
}

function NavItemLink({
  item,
  onClick,
}: {
  item: NavigationItem | NavigationStandalone;
  onClick: () => void;
}) {
  const pathname = usePathname();
  const navT = useTranslations("navigation");
  const isActive = pathname === item.href;
  const Icon = item.icon;

  return (
    <Link
      key={item.href}
      href={item.href}
      onClick={onClick}
      className="cursor-pointer focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2"
    >
      <div
        className={cn(
          "group flex items-center gap-3 p-2 rounded-none transition-premium relative h-12",
          isActive
            ? "bg-primary/10 text-primary border-y border-primary/20"
            : "text-muted-foreground/60 hover:text-foreground hover:bg-foreground/5",
        )}
      >
        {isActive && (
          <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-primary shadow-[0_0_10px_rgba(var(--primary),0.5)]" />
        )}

        <div
          className={cn(
            "flex h-8 w-8 items-center justify-center border transition-premium shrink-0",
            isActive
              ? "bg-primary/20 border-primary/40"
              : "bg-muted/10 border-border/40",
          )}
        >
          <Icon className="h-4 w-4" />
        </div>

        <div className="flex-1 min-w-0">
          <p className="text-[11px] font-black tracking-tighter uppercase font-oxanium truncate">
            {navT(getNavKey(item.href))}
          </p>
          {item.description && (
            <p className="text-[8px] font-mono font-bold text-muted-foreground/60 uppercase tracking-widest truncate leading-tight">
              {navT(getNavKey(item.href) + "Desc")}
            </p>
          )}
        </div>

        {item.badge && (
          <span className="text-[9px] font-mono font-black opacity-40 px-1 border border-border/40 bg-background/40">
            {item.badge}
          </span>
        )}
      </div>
    </Link>
  );
}

export function MobileNavigation() {
  const mnT = useTranslations("MobileNavigation");
  const navT = useTranslations("navigation");
  const [isOpen, setIsOpen] = useState(false);
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(
    new Set(["operations"]),
  );
  const [expandedSubGroups, setExpandedSubGroups] = useState<Set<string>>(
    new Set(),
  );

  const toggleGroup = (groupId: string) => {
    setExpandedGroups((prev) => {
      const next = new Set(prev);
      if (next.has(groupId)) {
        next.delete(groupId);
      } else {
        next.add(groupId);
      }
      return next;
    });
  };

  const toggleSubGroup = (subGroupId: string) => {
    setExpandedSubGroups((prev) => {
      const next = new Set(prev);
      if (next.has(subGroupId)) {
        next.delete(subGroupId);
      } else {
        next.add(subGroupId);
      }
      return next;
    });
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden h-10 w-10 flex items-center justify-center hover:bg-primary/5 transition-premium"
          aria-label={mnT("openMenuLabel")}
        >
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="w-72 p-0 h-dvh bg-background/95 backdrop-blur-xl border-r border-border/40 rounded-none flex flex-col overflow-hidden animate-premium-in"
      >
        <SheetHeader className="sr-only">
          <SheetTitle>{mnT("sheetTitle")}</SheetTitle>
          <SheetDescription>{mnT("sheetDescription")}</SheetDescription>
        </SheetHeader>

        <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-primary/40 to-transparent" />

        <div className="flex flex-col h-full">
          <div className="p-5 border-b border-border/40 shrink-0 bg-background/40">
            <Logo
              variant="sidebar"
              className="h-6 w-auto grayscale opacity-80"
            />
          </div>

          <nav className="flex-1 p-2 space-y-4 overflow-y-auto custom-scrollbar">
            {NAVIGATION_CONFIG.map((entry) => {
              switch (entry.kind) {
                case "standalone":
                  return (
                    <NavItemLink
                      key={entry.href}
                      item={entry}
                      onClick={() => setIsOpen(false)}
                    />
                  );

                case "group": {
                  const GroupIcon = entry.icon;
                  const isExpanded = expandedGroups.has(entry.id);

                  return (
                    <div key={entry.id} className="space-y-1">
                      <Button
                        variant="ghost"
                        onClick={() => toggleGroup(entry.id)}
                        className="w-full justify-start gap-3 px-3 font-black text-[10px] uppercase tracking-[0.2em] text-muted-foreground/70 hover:text-primary hover:bg-transparent transition-premium h-8"
                      >
                        <GroupIcon className="h-3.5 w-3.5 shrink-0 opacity-40" />
                        <span className="flex-1 text-left">{navT(entry.id)}</span>
                        <ChevronDown
                          className={cn(
                            "h-3 w-3 transition-transform duration-300 opacity-30",
                            isExpanded && "rotate-180",
                          )}
                        />
                      </Button>

                      {isExpanded && (
                        <div className="space-y-1 animate-premium-in">
                          {entry.items.map((item) => (
                            <NavItemLink
                              key={item.href}
                              item={item}
                              onClick={() => setIsOpen(false)}
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  );
                }

                case "nestedGroup": {
                  const GroupIcon = entry.icon;
                  const isExpanded = expandedGroups.has(entry.id);

                  return (
                    <div key={entry.id} className="space-y-1">
                      <Button
                        variant="ghost"
                        onClick={() => toggleGroup(entry.id)}
                        className="w-full justify-start gap-3 px-3 font-black text-[10px] uppercase tracking-[0.2em] text-muted-foreground/70 hover:text-primary hover:bg-transparent transition-premium h-8"
                      >
                        <GroupIcon className="h-3.5 w-3.5 shrink-0 opacity-40" />
                        <span className="flex-1 text-left">{navT(entry.id)}</span>
                        <ChevronDown
                          className={cn(
                            "h-3 w-3 transition-transform duration-300 opacity-30",
                            isExpanded && "rotate-180",
                          )}
                        />
                      </Button>

                      {isExpanded && (
                        <div className="space-y-1 animate-premium-in">
                          {entry.items.map((item) => {
                            if (isSubGroup(item)) {
                              const isSubExpanded = expandedSubGroups.has(
                                item.id,
                              );
                              const SubGroupIcon = item.icon;

                              return (
                                <div key={item.id} className="space-y-1">
                                  <Button
                                    variant="ghost"
                                    onClick={() => toggleSubGroup(item.id)}
                                    className="w-full justify-start gap-2 px-3 font-medium text-[9px] uppercase tracking-[0.15em] text-muted-foreground/50 hover:text-foreground transition-premium h-7"
                                  >
                                    <SubGroupIcon className="h-3 w-3 shrink-0 opacity-40" />
                                    <span className="flex-1 text-left pl-3">
                                      {navT(item.id)}
                                    </span>
                                    <ChevronDown
                                      className={cn(
                                        "h-3 w-3 transition-transform duration-300 opacity-30",
                                        isSubExpanded && "rotate-180",
                                      )}
                                    />
                                  </Button>
                                  {isSubExpanded && (
                                    <div className="space-y-1 ml-5 animate-premium-in">
                                      {item.items.map((subItem) => (
                                        <NavItemLink
                                          key={subItem.href}
                                          item={subItem}
                                          onClick={() => setIsOpen(false)}
                                        />
                                      ))}
                                    </div>
                                  )}
                                </div>
                              );
                            }

                            return (
                              <NavItemLink
                                key={item.href}
                                item={item}
                                onClick={() => setIsOpen(false)}
                              />
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                }

                default:
                  return null;
              }
            })}
          </nav>

          <div className="p-3 border-t border-border/40 shrink-0 bg-background/20">
            <UserSidebarMenu />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
