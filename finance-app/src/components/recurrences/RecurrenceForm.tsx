// src/components/recurrences/RecurrenceForm.tsx

export function RecurrenceForm() {
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
        <h3 class="text-xl font-bold mb-4">Create New Recurrence</h3>

        <form
          hx-post="/api/recurrences"
          hx-target="#recurrences-list"
          hx-swap="innerHTML"
          hx-on--after-request="if(event.detail.successful) document.getElementById('modal-backdrop').remove()"
          class="space-y-4"
        >
          <div>
            <label class="block text-sm font-medium mb-1">
              Recurrence Name
            </label>
            <input
              type="text"
              name="name"
              required
              class="w-full border rounded px-3 py-2"
              placeholder="e.g., Monthly Bills"
            />
          </div>

          <div>
            <label class="block text-sm font-medium mb-1">
              Recurrence Type
            </label>
            <select
              name="frequency"
              required
              class="w-full border rounded px-3 py-2"
            >
              <option value="">Select type...</option>
              <option value="MONTHLY">Monthly</option>
              <option value="WEEKLY">Weekly</option>
              <option value="YEARLY">Yearly</option>
              <option value="INSTALLMENT">Installment</option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium mb-1">Total Parts</label>
            <input
              type="number"
              name="totalParts"
              step="1"
              required
              class="w-full border rounded px-3 py-2"
              placeholder="e.g., 12"
            />
          </div>

          <div>
            <label class="block text-sm font-medium mb-1">Current Part</label>
            <input
              type="number"
              name="currentPart"
              step="1"
              required
              class="w-full border rounded px-3 py-2"
              placeholder="e.g., 1"
            />
          </div>

          <div>
            <label class="block text-sm font-medium mb-1">Start Date</label>
            <input
              type="date"
              name="startDate"
              required
              class="w-full border rounded px-3 py-2"
              placeholder="e.g., 2023-01-01"
            />
          </div>

          <div>
            <label class="block text-sm font-medium mb-1">Next Date</label>
            <input
              type="date"
              name="nextDate"
              required
              class="w-full border rounded px-3 py-2"
              placeholder="e.g., 2023-01-01"
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
