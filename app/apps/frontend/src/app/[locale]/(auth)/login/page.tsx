import { AuthDashboard } from "@/features/auth";
import { setRequestLocale } from "next-intl/server";

export const dynamic = "force-dynamic";

export default async function LoginPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <AuthDashboard mode="login" />;
}
