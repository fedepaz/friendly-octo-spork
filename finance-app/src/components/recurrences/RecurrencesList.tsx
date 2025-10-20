// src/components/recurrences/RecurrencesList.tsx
import { FC } from "hono/jsx";

// Placeholder for Recurrence type
interface Recurrence {
  id: number;
  name: string;
  frequency: string;
  startDate: string;
  nextDate?: string;
  active: boolean;
}

export const RecurrencesList: FC<{ recurrences: Recurrence[] }> = ({ recurrences }) => {
  return (
    <div class="card">
      <div class="card-header">
        <h3 class="card-title">Your Recurrences</h3>
      </div>
      <div class="table-responsive">
        <table class="table table-vcenter card-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Frequency</th>
              <th>Start Date</th>
              <th>Next Date</th>
              <th>Active</th>
              <th class="w-1">Actions</th>
            </tr>
          </thead>
          <tbody>
            {recurrences.length === 0 ? (
              <tr>
                <td colspan="6" class="text-center text-muted">No recurrences found. Add one above!</td>
              </tr>
            ) : (
              recurrences.map((recurrence) => (
                <tr id={`recurrence-${recurrence.id}`}>
                  <td>{recurrence.name}</td>
                  <td>{recurrence.frequency}</td>
                  <td>{new Date(recurrence.startDate).toLocaleDateString()}</td>
                  <td>{recurrence.nextDate ? new Date(recurrence.nextDate).toLocaleDateString() : "N/A"}</td>
                  <td>
                    {recurrence.active ? (
                      <span class="badge bg-success">Active</span>
                    ) : (
                      <span class="badge bg-danger">Paused</span>
                    )}
                  </td>
                  <td>
                    <button
                      class="btn btn-sm btn-ghost-secondary"
                      hx-get={`/api/recurrences/${recurrence.id}/edit`}
                      hx-target={`#recurrence-${recurrence.id}`}
                      hx-swap="outerHTML"
                    >
                      Edit
                    </button>
                    <button
                      class="btn btn-sm btn-ghost-danger"
                      hx-delete={`/api/recurrences/${recurrence.id}`}
                      hx-target={`#recurrence-${recurrence.id}`}
                      hx-swap="outerHTML swap:1s"
                      hx-confirm="Delete this recurrence?"
                    >
                      Delete
                    </button>
                    {recurrence.active ? (
                      <button
                        class="btn btn-sm btn-ghost-warning"
                        hx-put={`/api/recurrences/${recurrence.id}/pause`}
                        hx-target={`#recurrence-${recurrence.id}`}
                        hx-swap="outerHTML"
                      >
                        Pause
                      </button>
                    ) : (
                      <button
                        class="btn btn-sm btn-ghost-success"
                        hx-put={`/api/recurrences/${recurrence.id}/resume`}
                        hx-target={`#recurrence-${recurrence.id}`}
                        hx-swap="outerHTML"
                      >
                        Resume
                      </button>
                    )}
                    <button
                      class="btn btn-sm btn-ghost-info"
                      hx-post={`/api/recurrences/${recurrence.id}/execute`}
                      hx-confirm="Execute next instance of this recurrence?"
                    >
                      Execute Now
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
