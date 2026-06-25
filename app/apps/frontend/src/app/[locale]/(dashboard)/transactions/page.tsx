import { TransactionsDashboard } from "@/features/transactions";
import { setRequestLocale } from "next-intl/server";

export const dynamic = "force-dynamic";

export default async function TransactionsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <TransactionsDashboard />;
}
