import { setRequestLocale } from "next-intl/server";
import { PermissionsDashboard } from "@/features/permissions";

export const dynamic = "force-dynamic";

export default async function UserPermissionsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <PermissionsDashboard />;
}
