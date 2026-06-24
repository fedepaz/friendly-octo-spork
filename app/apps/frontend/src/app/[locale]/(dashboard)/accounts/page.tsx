import { AccountDashboard } from "@/features/accounts";
import { setRequestLocale } from "next-intl/server";

export const dynamic = "force-dynamic";

export default async function AccountsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <AccountDashboard />;
}
