export function AccountForm() {
  const action = "/api/accounts";
  const method = "POST";

  return (
    <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div class="bg-white rounded-lg p-6 w-full max-w-md">
        <h3 class="text-xl font-bold mb-4">Create New Account</h3>

        <form
          hx-post={action}
          hx-target="#accounts-list"
          hx-swap="innerHTML"
          class="space-y-4"
        >
          {/* Hidden input for PUT method (HTML forms only support GET/POST) */}

          <div>
            <label class="block text-sm font-medium mb-1">Account Name</label>
            <input
              type="text"
              name="name"
              value={""}
              required
              class="w-full border rounded px-3 py-2"
              placeholder="e.g., Main Checking"
            />
          </div>

          <div>
            <label class="block text-sm font-medium mb-1">Account Type</label>
            <select
              name="type"
              required
              class="w-full border rounded px-3 py-2"
            >
              <option value="">Select type...</option>
              <option value="BANK">Bank Account</option>
              <option value="WALLET">Digital Wallet</option>
              <option value="CASH">Cash</option>
              <option value="CARD">Credit Card</option>
              <option value="INVESTMENT">Investment</option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium mb-1">Currency</label>
            <select
              name="currency"
              required
              class="w-full border rounded px-3 py-2"
            >
              <option value="">Select currency...</option>
              <option value="ARS">ARS (Argentine Peso)</option>
              <option value="USD">USD (US Dollar)</option>
              <option value="USDT">USDT (Tether)</option>
            </select>
          </div>

          <div class="flex gap-2 justify-end">
            <button
              type="button"
              onclick="this.closest('.fixed').remove()"
              class="px-4 py-2 border rounded hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
