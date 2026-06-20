//src/app/(dashboard)/accounts/page.tsx

import { AccountDashboard } from "@/features/accounts";

export const dynamic = "force-dynamic";

export default function AccountsPage() {
  return <AccountDashboard />;
}
