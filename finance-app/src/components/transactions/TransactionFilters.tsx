// src/components/transactions/TransactionFilters.tsx
import { FC } from "hono/jsx";

export const TransactionFilters: FC<{ filters: any }> = ({ filters }) => {
  return (
    <div class="card">
      <div class="card-header">
        <h3 class="card-title">Filter Transactions</h3>
      </div>
      <div class="card-body">
        <form
          hx-get="/api/transactions"
          hx-target="#transaction-list"
          hx-swap="innerHTML"
          hx-trigger="change, keyup delay:500ms"
        >
          <div class="row g-3">
            <div class="col-md-3">
              <label class="form-label">Type</label>
              <select name="type" class="form-select">
                <option value="">All Types</option>
                <option value="INCOME" selected={filters.type === "INCOME"}>Income</option>
                <option value="EXPENSE" selected={filters.type === "EXPENSE"}>Expense</option>
                <option value="TRANSFER" selected={filters.type === "TRANSFER"}>Transfer</option>
                <option value="INVESTMENT" selected={filters.type === "INVESTMENT"}>Investment</option>
                <option value="RETURN" selected={filters.type === "RETURN"}>Return</option>
              </select>
            </div>
            <div class="col-md-3">
              <label class="form-label">Category</label>
              <select name="categoryId" class="form-select">
                <option value="">All Categories</option>
                {/* Categories will be dynamically loaded here */}
              </select>
            </div>
            <div class="col-md-3">
              <label class="form-label">Start Date</label>
              <input type="date" name="startDate" class="form-control" value={filters.startDate} />
            </div>
            <div class="col-md-3">
              <label class="form-label">End Date</label>
              <input type="date" name="endDate" class="form-control" value={filters.endDate} />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
