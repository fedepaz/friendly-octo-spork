// src/components/recurrences/RecurrenceEditForm.tsx

import type { FC } from "hono/jsx";
import { Button } from "@/components/shared/Button";
import { LoadingSpinnerIcon } from "@/components/icons/LoadingSpinnerIcon";
import type { RecurrenceDTO } from "@/api/recurrences/recurrences.schema";
import type { AccountDTO } from "@/api/accounts/accounts.schema";
import type { CategoryDTO } from "@/api/categories/categories.schema";

interface RecurrenceEditFormProps {
  recurrence: RecurrenceDTO;
  accounts: AccountDTO[];
  categories: CategoryDTO[];
}

export const RecurrenceEditForm: FC<RecurrenceEditFormProps> = ({
  recurrence,
  accounts = [],
  categories = [],
}) => {
  const formAction = `/recurrences/${recurrence.id}`;

  return (
    <div
      class="bg-card text-card-foreground border-2 border-border shadow-[var(--shadow-lg)] p-6 w-full max-w-md rounded-none"
      x-data={`{
        original: {
          name: "${recurrence.name}",
          amount: ${recurrence.amount},
          frequency: "${recurrence.frequency}",
          sourceAccountId: "${recurrence.sourceAccountId || ""}",
          categoryId: "${recurrence.categoryId || ""}"
        },
        current: {
          name: "${recurrence.name}",
          amount: ${recurrence.amount},
          frequency: "${recurrence.frequency}",
          sourceAccountId: "${recurrence.sourceAccountId || ""}",
          categoryId: "${recurrence.categoryId || ""}"
        },
        confirmUpdate(e) {
          const changes = [];
          if (this.original.name !== this.current.name) changes.push(\`Name: "\${this.original.name}" -> "\${this.current.name}"\`);
          if (Number(this.original.amount) !== Number(this.current.amount)) changes.push(\`Amount: \${this.original.amount} -> \${this.current.amount}\`);
          if (this.original.frequency !== this.current.frequency) changes.push(\`Frequency: \${this.original.frequency} -> \${this.current.frequency}\`);
          if (this.original.sourceAccountId !== this.current.sourceAccountId) {
            const oldName = document.querySelector(\`#sourceAccountId option[value="\${this.original.sourceAccountId}"]\`)?.text || "None";
            const newName = document.querySelector(\`#sourceAccountId option[value="\${this.current.sourceAccountId}"]\`)?.text || "None";
            changes.push(\`Source Account: \${oldName} -> \${newName}\`);
          }
          if (this.original.categoryId !== this.current.categoryId) {
            const oldName = document.querySelector(\`#categoryId option[value="\${this.original.categoryId}"]\`)?.text || "None";
            const newName = document.querySelector(\`#categoryId option[value="\${this.current.categoryId}"]\`)?.text || "None";
            changes.push(\`Category: \${oldName} -> \${newName}\`);
          }

          if (changes.length > 0) {
            if (!confirm("⚠️ BULLETPROOF CHECK ⚠️\\n\\nYou are making the following changes:\\n\\n" + changes.join("\\n") + "\\n\\nDo you want to proceed?")) {
              e.preventDefault();
              return false;
            }
          }
          return true;
        }
      }`}
    >
      <h3 class="text-2xl md:text-3xl font-bold text-foreground mb-2 uppercase">
        Edit Recurrence
      </h3>

      <form
        hx-patch={formAction}
        hx-target="#recurrences-list"
        hx-swap="innerHTML"
        hx-on--after-request="if(event.detail.successful) this.closest('[x-data]').__x.$data.open = false"
        x-on:submit="confirmUpdate($event)"
        class="space-y-4"
      >
        <input type="hidden" name="id" value={recurrence.id} />

        <div>
          <label
            for="name"
            class="block text-sm font-semibold uppercase tracking-wide text-foreground mb-2"
          >
            Recurrence Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            required={true}
            x-model="current.name"
            class="w-full bg-card text-card-foreground border-2 border-border shadow-[var(--shadow)] px-4 py-3 text-base transition-all duration-150 focus:outline-none focus:-translate-x-0.5 focus:-translate-y-0.5 focus:shadow-[var(--shadow-md)] focus:border-ring rounded-none"
          />
        </div>

        <div>
          <label
            for="amount"
            class="block text-sm font-semibold uppercase tracking-wide text-foreground mb-2"
          >
            Amount
          </label>
          <input
            type="number"
            step="0.01"
            name="amount"
            id="amount"
            required={true}
            x-model="current.amount"
            class="w-full bg-card text-card-foreground border-2 border-border shadow-[var(--shadow)] px-4 py-3 text-base transition-all duration-150 focus:outline-none focus:-translate-x-0.5 focus:-translate-y-0.5 focus:shadow-[var(--shadow-md)] focus:border-ring rounded-none"
          />
        </div>

        <div>
          <label
            for="frequency"
            class="block text-sm font-semibold uppercase tracking-wide text-foreground mb-2"
          >
            Recurrence Type
          </label>
          <select
            name="frequency"
            id="frequency"
            required={true}
            x-model="current.frequency"
            class="w-full bg-card text-card-foreground border-2 border-border shadow-[var(--shadow)] px-4 py-3 text-base transition-all duration-150 focus:outline-none focus:-translate-x-0.5 focus:-translate-y-0.5 focus:shadow-[var(--shadow-md)] focus:border-ring rounded-none"
          >
            <option value="MONTHLY">MONTHLY</option>
            <option value="WEEKLY">WEEKLY</option>
            <option value="YEARLY">YEARLY</option>
            <option value="INSTALLMENT">INSTALLMENT</option>
          </select>
        </div>

        <div>
          <label
            for="categoryId"
            class="block text-sm font-semibold uppercase tracking-wide text-foreground mb-2"
          >
            Category
          </label>
          <select
            name="categoryId"
            id="categoryId"
            x-model="current.categoryId"
            class="w-full bg-card text-card-foreground border-2 border-border shadow-[var(--shadow)] px-4 py-3 text-base transition-all duration-150 focus:outline-none focus:-translate-x-0.5 focus:-translate-y-0.5 focus:shadow-[var(--shadow-md)] focus:border-ring rounded-none"
          >
            <option value="">None</option>
            {categories.map((c) => (
              <option value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label
            for="sourceAccountId"
            class="block text-sm font-semibold uppercase tracking-wide text-foreground mb-2"
          >
            Source Account
          </label>
          <select
            name="sourceAccountId"
            id="sourceAccountId"
            x-model="current.sourceAccountId"
            class="w-full bg-card text-card-foreground border-2 border-border shadow-[var(--shadow)] px-4 py-3 text-base transition-all duration-150 focus:outline-none focus:-translate-x-0.5 focus:-translate-y-0.5 focus:shadow-[var(--shadow-md)] focus:border-ring rounded-none"
          >
            <option value="">None</option>
            {accounts.map((a) => (
              <option value={a.id}>
                {a.name} ({Number(a.balance).toFixed(2)} {a.currency})
              </option>
            ))}
          </select>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div>
            <label
              for="totalParts"
              class="block text-sm font-semibold uppercase tracking-wide text-foreground mb-2"
            >
              Total Parts
            </label>
            <input
              type="number"
              name="totalParts"
              id="totalParts"
              value={recurrence.totalParts?.toString() || ""}
              class="w-full bg-card text-card-foreground border-2 border-border shadow-[var(--shadow)] px-4 py-3 text-base rounded-none"
            />
          </div>

          <div>
            <label
              for="currentPart"
              class="block text-sm font-semibold uppercase tracking-wide text-foreground mb-2"
            >
              Current Part
            </label>
            <input
              type="number"
              name="currentPart"
              id="currentPart"
              value={recurrence.currentPart?.toString() || "0"}
              class="w-full bg-card text-card-foreground border-2 border-border shadow-[var(--shadow)] px-4 py-3 text-base rounded-none"
            />
          </div>
        </div>

        <div class="flex gap-2 justify-end mt-6">
          <Button
            type="button"
            hx-on:click="this.closest('[x-data]').__x.$data.open = false"
            class="bg-muted text-muted-foreground"
          >
            CANCEL
          </Button>
          <Button
            type="submit"
            class="bg-primary text-primary-foreground flex items-center gap-2"
          >
            <span class="htmx-indicator hidden">
              <LoadingSpinnerIcon />
            </span>
            UPDATE
          </Button>
        </div>
      </form>
    </div>
  );
};
