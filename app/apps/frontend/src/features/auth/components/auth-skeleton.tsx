"use client";

import type React from "react";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { useTranslations } from "next-intl";

interface AuthSkeletonProps extends React.ComponentProps<"div"> {
  type?: "login" | "register";
}

export function AuthSkeleton({
  className,
  type = "login",
  ...props
}: AuthSkeletonProps) {
  const t = useTranslations("AuthSkeleton");

  return (
    <div
      className={cn("flex flex-col gap-6", className)}
      role="status"
      aria-label={t("ariaLabel")}
      {...props}
    >
      <Card className="shadow-lg">
        <CardHeader className="text-center">
          <Skeleton className="mx-auto h-7 w-40" />
          <Skeleton className="mx-auto mt-2 h-4 w-56" />
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-5">
            {type === "register" && (
              <div className="grid gap-2">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-9 w-full" />
              </div>
            )}

            <div className="grid gap-2">
              <Skeleton className="h-4 w-12" />
              <Skeleton className="h-9 w-full" />
            </div>

            <div className="grid gap-2">
              <div className="flex items-center justify-between">
                <Skeleton className="h-4 w-16" />
                {type === "login" && <Skeleton className="h-4 w-24" />}
              </div>
              <Skeleton className="h-9 w-full" />
            </div>

            {type === "register" && (
              <div className="grid gap-2">
                <Skeleton className="h-4 w-28" />
                <Skeleton className="h-9 w-full" />
              </div>
            )}

            <Skeleton className="h-10 w-full" />
          </div>
        </CardContent>
        <CardFooter className="flex-col gap-4 border-t pt-6">
          <Skeleton className="mx-auto h-4 w-48" />
        </CardFooter>
      </Card>
      <span className="sr-only">{t("loadingText")}</span>
    </div>
  );
}
