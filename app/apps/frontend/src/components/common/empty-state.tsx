"use client";

import { Inbox } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";

interface EmptyStateProps {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export function EmptyState({
  title,
  description,
  icon,
  action,
}: EmptyStateProps) {
  const t = useTranslations("EmptyState");

  return (
    <div className="flex flex-col items-center justify-center gap-3 py-16">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-muted">
        {icon || <Inbox className="h-7 w-7 text-muted-foreground" />}
      </div>
      <div className="flex flex-col items-center gap-1">
        <p className="text-sm font-medium text-foreground">
          {title || t("noData")}
        </p>
        <p className="text-center text-xs text-muted-foreground max-w-[250px]">
          {description || t("noDataDescription")}
        </p>
      </div>
      {action && (
        <Button onClick={action.onClick} variant="outline" size="sm" className="mt-2">
          {action.label}
        </Button>
      )}
    </div>
  );
}
