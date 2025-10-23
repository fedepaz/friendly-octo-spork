// src/components/categories/CategoryForm.tsx

import type { Category } from "@/generated/prisma";

export function CategoryForm({ category }: { category?: Category }) {
  if (!category) {
    return null;
  }

  return (
    <div
      id="modal-backdrop"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onclick="if(event.target === this) this.remove()"
    >
      <div
        class="bg-white rounded-lg p-6 w-full max-w-md"
        onclick="event.stopPropagation()"
      >
        <h3 class="text-xl font-bold mb-4">Edit Category</h3>

        <form
          hx-put={`/api/categories/${category.id}`}
          hx-target="#category-modal"
          hx-swap="outerHTML"
          hx-on--after-request="if(event.detail.successful) document.getElementById('modal-backdrop').remove()"
          class="space-y-4"
        >
          <div>
            <label class="block text-sm font-medium mb-1">Category Name</label>
            <input
              type="text"
              name="name"
              required
              class="w-full border rounded px-3 py-2"
              value={category.name}
              placeholder="e.g., Groceries"
            />
          </div>

          <div>
            <label class="block text-sm font-medium mb-1">Category Type</label>
            <select
              name="type"
              required
              class="w-full border rounded px-3 py-2"
            >
              <option value="">Select type...</option>
              <option value="EXPENSE">Expense</option>
              <option value="INCOME">Income</option>
              <option value="TRANSFER">Transfer</option>
              <option value="REVENUE">Revenue</option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium mb-1">Color</label>
            <input
              type="color"
              name="color"
              class="w-full border rounded px-3 py-2"
              value={category?.color || ""}
            />
          </div>

          <div class="flex gap-2 justify-end">
            <button
              type="button"
              onclick="document.getElementById('modal-backdrop').remove()"
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
