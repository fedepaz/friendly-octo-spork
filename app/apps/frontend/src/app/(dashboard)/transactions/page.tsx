//src/app/(dashboard)/transactions/page.tsx

import { TransactionsDashboard } from "@/features/transactions";

export const dynamic = "force-dynamic";

export default function Page() {
  return <TransactionsDashboard />;
}
