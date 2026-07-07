import { setRequestLocale } from "next-intl/server";
import { AuditLogDashboard } from "@/features/auditLogs";

export const dynamic = "force-dynamic";

export default async function AuditLogsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <AuditLogDashboard />;
}