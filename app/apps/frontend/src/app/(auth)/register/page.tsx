// src/app/(auth)/register/page.tsx

import { AuthDashboard } from "@/features/auth";

export const dynamic = "force-dynamic";

export default function RegisterPage() {
  return <AuthDashboard mode="register" />;
}
