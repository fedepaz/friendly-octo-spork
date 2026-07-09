import { Shield } from "lucide-react";
import { useTranslations } from "next-intl";

export function EmptyState() {
  const t = useTranslations("PermissionsEmptyState");

  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <Shield className="h-12 w-12 text-muted-foreground/40 mb-4" />
      <h3 className="text-lg font-semibold">{t("title")}</h3>
      <p className="text-sm text-muted-foreground max-w-md mt-1">
        {t("description")}
      </p>
    </div>
  );
}
