import { RootDashboard } from "@/features/dashboard";
import { setRequestLocale } from "next-intl/server";

export const dynamic = "force-dynamic";

export default async function DashboardPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <RootDashboard />;
}
