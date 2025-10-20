// src/pages/AccountsPage.tsx
import { FC } from "hono/jsx";
import { Layout } from "../components/shared/Layout";
import { AccountsList } from "../components/accounts/AccountsList";
import { AccountForm } from "../components/accounts/AccountForm";

// Placeholder for Account type
interface Account {
  id: number;
  name: string;
  type: string;
  currency: string;
  balance: number;
}

export const AccountsPage: FC<{ accounts: Account[] }> = ({ accounts }) => {
  return (
    <Layout title="Accounts">
      <div class="container-xl">
        <div class="page-header d-print-none">
          <div class="row align-items-center">
            <div class="col">
              <h2 class="page-title">Accounts</h2>
            </div>
          </div>
        </div>
        <div class="page-body">
          <div class="row row-cards">
            <div class="col-12">
              <AccountForm />
            </div>
            <div class="col-12">
              <AccountsList accounts={accounts} />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
