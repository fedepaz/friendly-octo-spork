// src/components/categories/CategoryForm.tsx
import { FC } from "hono/jsx";

export const CategoryForm: FC = () => {
  return (
    <div class="card">
      <div class="card-header">
        <h3 class="card-title">Add New Category</h3>
      </div>
      <div class="card-body">
        <form
          hx-post="/api/categories"
          hx-target="#category-list"
          hx-swap="afterbegin"
          hx-on::after-request="this.reset()"
        >
          <div class="row g-3">
            <div class="col-md-6">
              <label class="form-label">Category Name</label>
              <input type="text" name="name" class="form-control" required />
            </div>
            <div class="col-md-6">
              <label class="form-label">Category Type</label>
              <select name="type" class="form-select" required>
                <option value="">Select Type</option>
                <option value="GASTO">Expense</option>
                <option value="PAGO">Payment</option>
                <option value="INGRESO">Income</option>
                <option value="RENDIMIENTO">Yield</option>
              </select>
            </div>
            <div class="col-md-6">
              <label class="form-label">Color (Optional)</label>
              <input type="text" name="color" class="form-control" placeholder="e.g., blue, #FF0000" />
            </div>
          </div>
          <div class="form-footer mt-3">
            <button type="submit" class="btn btn-primary">
              Add Category
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
