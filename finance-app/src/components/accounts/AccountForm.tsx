// src/components/accounts/AccountForm.tsx
import { FC } from "hono/jsx";

export const AccountForm: FC = () => {
  return (
    <div class="card">
      <div class="card-header">
        <h3 class="card-title">Add New Account</h3>
      </div>
      <div class="card-body">
        <form
          hx-post="/api/accounts"
          hx-target="#account-list"
          hx-swap="afterbegin"
          hx-on::after-request="this.reset()"
        >
          <div class="row g-3">
            <div class="col-md-4">
              <label class="form-label">Account Name</label>
              <input type="text" name="name" class="form-control" required />
            </div>
            <div class="col-md-4">
              <label class="form-label">Account Type</label>
              <select name="type" class="form-select" required>
                <option value="">Select Type</option>
                <option value="BANK">Bank</option>
                <option value="WALLET">Wallet</option>
                <option value="CASH">Cash</option>
                <option value="CARD">Card</option>
                <option value="INVESTMENT">Investment</option>
              </select>
            </div>
            <div class="col-md-4">
              <label class="form-label">Currency</label>
              <select name="currency" class="form-select" required>
                <option value="">Select Currency</option>
                <option value="ARS">ARS</option>
                <option value="USD">USD</option>
                <option value="USDT">USDT</option>
              </select>
            </div>
            <div class="col-md-4">
              <label class="form-label">Initial Balance</label>
              <input
                type="number"
                name="balance"
                step="0.01"
                class="form-control text-end"
                value="0.00"
                required
              />
            </div>
          </div>
          <div class="form-footer mt-3">
            <button type="submit" class="btn btn-primary">
              Add Account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
