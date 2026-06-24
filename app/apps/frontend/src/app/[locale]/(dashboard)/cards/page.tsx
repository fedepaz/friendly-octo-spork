import { CardsDashboard } from "@/features/cards";
import { setRequestLocale } from "next-intl/server";

export const dynamic = "force-dynamic";

export default async function CardsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <CardsDashboard />;
}
