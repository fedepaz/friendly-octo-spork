// src/features/users/components/users-view-form.tsx
"use client";

import { useTranslations } from "next-intl";
import { UserProfileDto } from "@repo/shared";

import { formatShortDate } from "@/lib/date-utils";
import { User, Mail, Shield, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";

interface UserViewFormProps {
  selectedUser: UserProfileDto;
}

export function UserViewForm({ selectedUser }: UserViewFormProps) {
  const uvfT = useTranslations("UsersViewForm");

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center p-6 bg-muted/20 border border-dashed border-border">
        <div className="h-16 w-16 bg-primary/10 border border-primary/20 flex items-center justify-center mb-3">
          <User className="h-8 w-8 text-primary" />
        </div>
        <p className="text-lg font-black tracking-tighter uppercase">
          {selectedUser.name || uvfT("unknownIdentity")}
        </p>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-3 p-3 bg-background border border-border">
          <Mail className="h-4 w-4 text-muted-foreground opacity-50" />
          <div className="flex-1">
            <p className="text-[10px] font-bold text-muted-foreground uppercase leading-none">
              {uvfT("email")}
            </p>
            <p className="text-sm font-semibold">{selectedUser.email}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3 bg-background border border-border">
          <Shield
            className={cn(
              "h-4 w-4",
              selectedUser.isActive ? "text-secondary" : "text-destructive",
            )}
          />
          <div className="flex-1">
            <p className="text-[10px] font-bold text-muted-foreground uppercase leading-none">
              {uvfT("systemStatus")}
            </p>
            <p className="text-sm font-semibold">
              {selectedUser.isActive
                ? uvfT("authorizedAccess")
                : uvfT("restrictedAccess")}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3 bg-background border border-border">
          <Calendar className="h-4 w-4 text-muted-foreground opacity-50" />
          <div className="flex-1">
            <p className="text-[10px] font-bold text-muted-foreground uppercase leading-none">
              {uvfT("registrationDate")}
            </p>
            <p className="text-sm font-semibold">
              {formatShortDate(selectedUser.createdAt)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
