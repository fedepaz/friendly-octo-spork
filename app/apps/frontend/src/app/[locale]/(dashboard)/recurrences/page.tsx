import { RecurrencesDashboard } from "@/features/recurrences";
import { setRequestLocale } from "next-intl/server";

export const dynamic = "force-dynamic";

export default async function RecurrencesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <RecurrencesDashboard />;
}
