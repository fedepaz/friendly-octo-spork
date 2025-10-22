import type { Account } from "@/generated/prisma";

type Props = {
  accounts: Account[];
};

export function AccountList({ accounts }: Props) {
  return (
    <div class="space-y-4">
      <div class="flex justify-between items-center">
        <h2 class="text-2xl font-bold">Your Accounts</h2>
        <button
          hx-get="/api/accounts/new"
          hx-target="#account-form-modal"
          hx-swap="innerHTML"
          class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          + New Account
        </button>
      </div>

      <div id="accounts-list" class="grid gap-4">
        {accounts.length === 0 ? (
          <p class="text-gray-500">
            No accounts yet. Create one to get started!
          </p>
        ) : (
          accounts.map((account) => (
            <div
              key={account.id}
              class="border rounded-lg p-4 hover:shadow-md transition"
            >
              <div class="flex justify-between items-start">
                <div>
                  <h3 class="font-semibold text-lg">{account.name}</h3>
                  <p class="text-sm text-gray-600">
                    {account.type} • {account.currency}
                  </p>
                </div>
                <div class="text-right">
                  <p class="text-2xl font-bold">
                    {account.currency} {account.balance.toString()}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal placeholder for forms */}
      <div id="account-form-modal"></div>
    </div>
  );
}
