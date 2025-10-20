// src/components/transactions/TransactionForm.tsx
import { FC } from "hono/jsx";

export const TransactionForm: FC = () => {
  return (
    <div class="card">
      <div class="card-header">
        <h3 class="card-title">Add New Transaction</h3>
      </div>
      <div class="card-body">
        <form
          hx-post="/api/transactions"
          hx-target="#transaction-list"
          hx-swap="afterbegin"
          hx-on::after-request="this.reset()"
        >
          <div class="row g-3">
            <div class="col-md-4">
              <label class="form-label">Type</label>
              <select name="type" class="form-select" required>
                <option value="">Select Type</option>
                <option value="INCOME">Income</option>
                <option value="EXPENSE">Expense</option>
                <option value="TRANSFER">Transfer</option>
                <option value="INVESTMENT">Investment</option>
                <option value="RETURN">Return</option>
              </select>
            </div>
            <div class="col-md-4">
              <label class="form-label">Amount</label>
              <input
                type="number"
                name="amount"
                step="0.01"
                class="form-control text-end"
                placeholder="0.00"
                required
              />
            </div>
            <div class="col-md-4">
              <label class="form-label">Date</label>
              <input type="date" name="date" class="form-control" required />
            </div>
            <div class="col-md-6">
              <label class="form-label">Description</label>
              <input type="text" name="description" class="form-control" required />
            </div>
            <div class="col-md-6">
              <label class="form-label">Category (Optional)</label>
              <select name="categoryId" class="form-select">
                <option value="">Select Category</option>
                {/* Categories will be dynamically loaded here */}
              </select>
            </div>
            <div class="col-md-6">
              <label class="form-label">Source Account (Optional)</label>
              <select name="sourceAccountId" class="form-select">
                <option value="">Select Source Account</option>
                {/* Accounts will be dynamically loaded here */}
              </select>
            </div>
            <div class="col-md-6">
              <label class="form-label">Target Account (Optional)</label>
              <select name="targetAccountId" class="form-select">
                <option value="">Select Target Account</option>
                {/* Accounts will be dynamically loaded here */}
              </select>
            </div>
          </div>
          <div class="form-footer mt-3">
            <button type="submit" class="btn btn-primary">
              Add Transaction
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
