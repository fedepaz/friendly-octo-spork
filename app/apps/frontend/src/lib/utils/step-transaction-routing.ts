// src/lib/utils/step-transaction-routing.ts

import { CreateTransactionInput } from "@repo/shared";

export type StepId =
  | "type"
  | "amount"
  | "accounts"
  | "category"
  | "recurrence"
  | "budget"
  | "review";

export interface StepConfig {
  id: StepId;
  label: string;
  /** Fields to validate when this step is active */
  fields: Array<keyof CreateTransactionInput>;
  /**
   * Determine if this step should be shown.
   * Return true = show, false = skip.
   */
  shouldShow?: (values: Partial<CreateTransactionInput>) => boolean;
}

// ─── STEP DEFINITIONS ─────────────────────────────────────────────────────
export const STEP_CONFIGS: StepConfig[] = [
  {
    id: "type",
    label: "Transaction Type",
    fields: ["type"],
  },
  {
    id: "amount",
    label: "Amount & Date",
    fields: ["amount", "date"],
  },
  {
    id: "accounts",
    label: "Accounts",
    fields: ["sourceAccountId", "targetAccountId"],
  },
  {
    id: "category",
    label: "Category",
    fields: ["description", "categoryId"],
  },
  {
    id: "recurrence",
    label: "Recurrence",
    fields: [
      "isRecurrence",
      "recurrenceName",
      "frequency",
      "totalParts",
      "isFirstPayment",
      "isCardExpense",
      "cardType",
    ],
    // ✅ Available for ALL transaction types (as you decided)
    shouldShow: () => true,
  },
  {
    id: "budget",
    label: "Budget",
    fields: ["isBudgetedExpense", "budgetCategory"],
    // ✅ Only show for EXPENSE transactions
    shouldShow: (values) => values.type === "EXPENSE",
  },
  {
    id: "review",
    label: "Review",
    fields: [], // Review doesn't need validation — just display
  },
];

// ─── HELPER FUNCTIONS ─────────────────────────────────────────────────────

/**
 * Get the list of visible step IDs based on current form values
 */
export function getVisibleSteps(
  values: Partial<CreateTransactionInput>,
): StepId[] {
  return STEP_CONFIGS.filter((step) => step.shouldShow?.(values) ?? true).map(
    (step) => step.id,
  );
}

/**
 * Get the next visible step ID after the current one
 */
export function getNextStepId(
  currentId: StepId,
  values: Partial<CreateTransactionInput>,
): StepId | null {
  const visible = getVisibleSteps(values);
  const currentIndex = visible.indexOf(currentId);
  return visible[currentIndex + 1] ?? null;
}

/**
 * Get the previous visible step ID before the current one
 */
export function getPrevStepId(
  currentId: StepId,
  values: Partial<CreateTransactionInput>,
): StepId | null {
  const visible = getVisibleSteps(values);
  const currentIndex = visible.indexOf(currentId);
  return visible[currentIndex - 1] ?? null;
}

/**
 * Convert StepId to numeric index (for progress bar, etc.)
 */
export function stepIdToIndex(stepId: StepId): number {
  return STEP_CONFIGS.findIndex((s) => s.id === stepId);
}

/**
 * Convert numeric index to StepId
 */
export function indexToStepId(index: number): StepId | null {
  return STEP_CONFIGS[index]?.id ?? null;
}

/**
 * Get fields to validate for a given step (only if step is visible)
 */
export function getValidationFields(
  stepId: StepId,
  values: Partial<CreateTransactionInput>,
): Array<keyof CreateTransactionInput> {
  const step = STEP_CONFIGS.find((s) => s.id === stepId);
  if (!step) return [];

  // Only validate if step is visible
  if (step.shouldShow && !step.shouldShow(values)) {
    return [];
  }

  return step.fields;
}
