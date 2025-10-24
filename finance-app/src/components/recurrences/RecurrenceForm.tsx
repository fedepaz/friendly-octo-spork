// src/components/recurrences/RecurrenceForm.tsx

export function RecurrenceForm() {
  return (
    <div
      id="modal-backdrop"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      hx-get="/api/recurrences"
      hx-target="#recurrences-list"
      hx-swap="innerHTML"
      hx-trigger="click target:#modal-backdrop"
    >
      <div
        class="neo-card p-6 w-full max-w-md"
        onclick="event.stopPropagation()"
      >
        <h3 class="text-2xl font-bold mb-4">CREATE NEW RECURRENCE</h3>

        <form
          hx-post="/api/recurrences"
          hx-target="#recurrences-list"
          hx-swap="innerHTML"
          hx-on--after-request="if(event.detail.successful) document.getElementById('modal-backdrop').remove()"
          class="space-y-4"
        >
          <div>
            <label class="block text-sm font-semibold uppercase mb-2">
              Recurrence Name
            </label>
            <input
              type="text"
              name="name"
              required
              class="neo-input w-full bg-card text-card-foreground"
              placeholder="e.g., Monthly Bills"
            />
          </div>

          <div>
            <label class="block text-sm font-semibold uppercase mb-2">
              Recurrence Type
            </label>
            <select
              name="frequency"
              required
              class="neo-input w-full bg-card text-card-foreground"
            >
              <option value="">SELECT TYPE...</option>
              <option value="MONTHLY">MONTHLY</option>
              <option value="WEEKLY">WEEKLY</option>
              <option value="YEARLY">YEARLY</option>
              <option value="INSTALLMENT">INSTALLMENT</option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-semibold uppercase mb-2">Total Parts</label>
            <input
              type="number"
              name="totalParts"
              step="1"
              required
              class="neo-input w-full bg-card text-card-foreground"
              placeholder="e.g., 12"
            />
          </div>

          <div>
            <label class="block text-sm font-semibold uppercase mb-2">Current Part</label>
            <input
              type="number"
              name="currentPart"
              step="1"
              required
              class="neo-input w-full bg-card text-card-foreground"
              placeholder="e.g., 1"
            />
          </div>

          <div>
            <label class="block text-sm font-semibold uppercase mb-2">Start Date</label>
            <input
              type="date"
              name="startDate"
              required
              class="neo-input w-full bg-card text-card-foreground"
              placeholder="e.g., 2023-01-01"
            />
          </div>

          <div>
            <label class="block text-sm font-semibold uppercase mb-2">Next Date</label>
            <input
              type="date"
              name="nextDate"
              required
              class="neo-input w-full bg-card text-card-foreground"
              placeholder="e.g., 2023-01-01"
            />
          </div>

          <div class="flex gap-2 justify-end mt-6">
            <button
              type="button"
              onclick="document.getElementById('modal-backdrop').remove()"
              class="neo-btn bg-muted text-muted-foreground"
            >
              CANCEL
            </button>
            <button
              type="submit"
              class="neo-btn bg-primary text-primary-foreground"
            >
              <svg class="htmx-indicator animate-spin h-5 w-5 mr-2 hidden">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              SAVE
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
