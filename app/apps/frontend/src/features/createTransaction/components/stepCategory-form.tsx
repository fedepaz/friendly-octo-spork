// src/features/createTransaction/components/stepAmount-form.tsx

import { Label } from "@/components/ui/label";
import { CreateTransactionInput } from "@repo/shared";
import { UseFormReturn } from "react-hook-form";
import { useCategorie } from "../hooks/useCategoriesHook";
import { FieldError } from "./TransactionWizard";

interface StepCategoryProps {
  formCreateTransaction: UseFormReturn<CreateTransactionInput>;
}

export function StepCategoryComponent({
  formCreateTransaction,
}: StepCategoryProps) {
  const watched = formCreateTransaction.watch();
  const { data: categories = [] } = useCategorie();
  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-lg font-mono font-bold uppercase tracking-wider text-foreground">
        What was this for?
      </h3>

      <div>
        <Label>Description</Label>
        <input
          {...formCreateTransaction.register("description")}
          type="text"
          placeholder="e.g. Netflix, Rent, Salary..."
          autoFocus
          className="w-full bg-background border-2 border-border px-4 py-3 text-sm font-mono focus:outline-none focus:border-foreground transition-colors"
          // TODO: onBlur → call GET /transactions/suggest-category?description=...
          // backend checks past transactions with similar description
          // returns { categoryId, categoryName, confidence, reason }
          // show suggestion banner: "You usually put this in Entertainment →"
        />
        <FieldError
          message={formCreateTransaction.formState.errors.description?.message}
        />
      </div>

      {/* TODO: suggestion banner goes here */}
      {/* Example:
        {categorySuggestion && (
          <div
            className="border border-border bg-muted px-3 py-2 flex justify-between items-center cursor-pointer"
            onClick={() => form.setValue("categoryId", categorySuggestion.categoryId)}
          >
            <span className="text-xs font-mono text-muted-foreground">
              {categorySuggestion.reason}
            </span>
            <span className="text-xs font-mono font-bold text-foreground">Apply →</span>
          </div>
        )} */}

      <div>
        <Label>Category</Label>
        <div className="grid grid-cols-2 gap-2">
          {categories.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => formCreateTransaction.setValue("categoryId", c.id)}
              className={`p-3 border-2 text-left transition-all font-mono text-sm
                  ${
                    watched.categoryId === c.id
                      ? "border-foreground bg-muted font-bold"
                      : "border-border text-muted-foreground hover:bg-muted"
                  }`}
            >
              {c.name}
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={() => formCreateTransaction.setValue("categoryId", null)}
          className="mt-2 text-xs font-mono text-muted-foreground underline"
        >
          No category
        </button>
      </div>
    </div>
  );
}
