// src/components/recurrences/RecurrenceForm.tsx
import { FC } from "hono/jsx";

export const RecurrenceForm: FC = () => {
  return (
    <div class="card">
      <div class="card-header">
        <h3 class="card-title">Add New Recurrence</h3>
      </div>
      <div class="card-body">
        <form
          hx-post="/api/recurrences"
          hx-target="#recurrence-list"
          hx-swap="afterbegin"
          hx-on::after-request="this.reset()"
        >
          <div class="row g-3">
            <div class="col-md-4">
              <label class="form-label">Recurrence Name</label>
              <input type="text" name="name" class="form-control" required />
            </div>
            <div class="col-md-4">
              <label class="form-label">Frequency</label>
              <select name="frequency" class="form-select" required>
                <option value="">Select Frequency</option>
                <option value="MONTHLY">Monthly</option>
                <option value="WEEKLY">Weekly</option>
                <option value="YEARLY">Yearly</option>
                <option value="INSTALLMENT">Installment</option>
              </select>
            </div>
            <div class="col-md-4">
              <label class="form-label">Start Date</label>
              <input type="date" name="startDate" class="form-control" required />
            </div>
            <div class="col-md-4">
              <label class="form-label">Total Parts (for Installment)</label>
              <input type="number" name="totalParts" class="form-control" />
            </div>
            <div class="col-md-4">
              <label class="form-label">Current Part (for Installment)</label>
              <input type="number" name="currentPart" class="form-control" />
            </div>
            <div class="col-md-4">
              <label class="form-label">Active</label>
              <select name="active" class="form-select">
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </div>
          </div>
          <div class="form-footer mt-3">
            <button type="submit" class="btn btn-primary">
              Add Recurrence
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
