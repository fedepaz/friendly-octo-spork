// src/components/accounts/AccountsList.tsx
import { FC } from "hono/jsx";

// Placeholder for Account type
interface Account {
  id: number;
  name: string;
  type: string;
  currency: string;
  balance: number;
}

export const AccountsList: FC<{ accounts: Account[] }> = ({ accounts }) => {
  return (
    <div class="card">
      <div class="card-header">
        <h3 class="card-title">Your Accounts</h3>
      </div>
      <div class="table-responsive">
        <table class="table table-vcenter card-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Type</th>
              <th>Currency</th>
              <th class="text-end">Balance</th>
              <th class="w-1">Actions</th>
            </tr>
          </thead>
          <tbody>
            {accounts.length === 0 ? (
              <tr>
                <td colspan="5" class="text-center text-muted">No accounts found. Add one above!</td>
              </tr>
            ) : (
              accounts.map((account) => (
                <tr id={`account-${account.id}`}>
                  <td>{account.name}</td>
                  <td>{account.type}</td>
                  <td>{account.currency}</td>
                  <td class="text-end text-monospace">{account.balance.toFixed(2)}</td>
                  <td>
                    <button
                      class="btn btn-sm btn-ghost-secondary"
                      hx-get={`/api/accounts/${account.id}/edit`}
                      hx-target={`#account-${account.id}`}
                      hx-swap="outerHTML"
                    >
                      Edit
                    </button>
                    <button
                      class="btn btn-sm btn-ghost-danger"
                      hx-delete={`/api/accounts/${account.id}`}
                      hx-target={`#account-${account.id}`}
                      hx-swap="outerHTML swap:1s"
                      hx-confirm="Delete this account?"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
