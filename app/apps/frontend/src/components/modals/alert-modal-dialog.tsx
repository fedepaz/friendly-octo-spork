"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { EmptyState } from "@/components/common/empty-state";
import { useAlertModal } from "@/providers/alert-modal-provider";
import { Bell } from "lucide-react";
import { useTranslations } from "next-intl";

export function AlertModalDialog() {
  const { state, closeAlert } = useAlertModal();
  const t = useTranslations("AlertModal");
  const { isOpen } = state;

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) closeAlert();
      }}
    >
      <DialogContent
        className="sm:max-w-5xl lg:max-w-7xl max-h-[90dvh] overflow-y-auto p-(--space-6)"
        showCloseButton={false}
      >
        <DialogHeader className="border-b border-border/40 pb-(--space-4)">
          <div className="flex items-center justify-center gap-(--space-3)">
            <div className="p-(--space-2) rounded-lg bg-primary/10">
              <Bell className="h-5 w-5 text-primary" />
            </div>
            <DialogTitle className="text-xl sm:text-2xl font-black uppercase tracking-widest">
              {t("title")}
            </DialogTitle>
          </div>
          <DialogDescription className="sr-only">
            {t("description")}
          </DialogDescription>
        </DialogHeader>
        <EmptyState
          icon={<Bell className="h-7 w-7 text-muted-foreground" />}
          title={t("emptyTitle")}
          description={t("emptyDescription")}
        />
      </DialogContent>
    </Dialog>
  );
}
