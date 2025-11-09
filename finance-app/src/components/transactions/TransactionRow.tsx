// src/components/transactions/TransactionRow.tsx

import type { FC } from "hono/jsx";
import { Button } from "@/components/shared/Button";
import type { TransactionResponse } from "@/api/transactions/transactions.schema";

interface TransactionRowProps {
  transaction: TransactionResponse;
}

export const TransactionRow: FC<TransactionRowProps> = ({ transaction }) => {
  const formattedDate = new Date(transaction.date).toLocaleDateString("en-US", {
    day: "numeric",
  });

  return (
    <tr
      id={`transaction-${transaction.id}`}
      class="border-b border-border hover:bg-muted transition-colors duration-150"
    >
      <td class="p-4 text-sm font-mono text-muted-foreground text-center">
        {formattedDate}
      </td>

      <td class="p-4 text-sm text-right">
        {transaction.amount.toString() || "-"}
      </td>
      <td class="p-4 text-sm text-left">{transaction.description || "-"}</td>
      <td class="p-4 text-sm text-left">{transaction.category?.name || "-"}</td>
      <td class="p-4 text-sm text-left">
        {transaction.sourceAccount?.name || "-"}
      </td>

      <td class="p-4 text-sm flex gap-2 justify-center">
        <Button
          type="button"
          class="bg-secondary text-secondary-foreground"
          hxGet={`/api/transactions/${transaction.id}/edit`}
          hxTarget="#modal-content"
          hxSwap="innerHTML"
          dataToggle="modal"
          dataTarget="#htmx-modal"
          aria-label={`Edit transaction ${transaction.description}`}
        >
          EDIT
        </Button>
      </td>
    </tr>
  );
};
