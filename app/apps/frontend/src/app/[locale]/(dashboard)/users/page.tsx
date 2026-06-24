import { UsersDashboard } from "@/features/users";
import { setRequestLocale } from "next-intl/server";

export const dynamic = "force-dynamic";

export default async function UsersPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <UsersDashboard />;
}
