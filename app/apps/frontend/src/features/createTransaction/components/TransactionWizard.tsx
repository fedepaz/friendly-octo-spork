// src/features/createTransaction/components/TransactionWizard.tsx

"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createTransactionSchema,
  type CreateTransactionInput,
} from "@repo/shared";

import { useAccounts } from "@/features/accounts/hooks/accountsHooks";
import { useCategorie } from "../hooks/useCategoriesHook";
import { useRecurrences } from "@/features/recurrences/hooks/recurrenceHooks";
import { getLocalDateStr } from "@/lib/date-utils";
import { useCreateTransaction } from "../hooks/createMutationHooks";

// ─── Types ───────────────────────────────────────────────────────────────────

type Step =
  | "type"
  | "amount"
  | "accounts"
  | "category"
  | "recurrence"
  | "review";

const STEPS: Step[] = [
  "type",
  "amount",
  "accounts",
  "category",
  "recurrence",
  "review",
];

const TRANSACTION_TYPES = [
  {
    value: "EXPENSE",
    label: "Expense",
    hint: "Money going out",
    color: "border-destructive text-destructive",
  },
  {
    value: "INCOME",
    label: "Income",
    hint: "Money coming in",
    color: "border-secondary   text-secondary",
  },
  {
    value: "TRANSFER",
    label: "Transfer",
    hint: "Move between accounts",
    color: "border-accent      text-accent",
  },
  {
    value: "INVESTMENT",
    label: "Investment",
    hint: "Put money to work",
    color: "border-primary     text-primary",
  },
  {
    value: "RETURN",
    label: "Return",
    hint: "Investment coming back",
    color: "border-secondary/70 text-secondary/70",
  },
  {
    value: "PAYMENT",
    label: "Payment",
    hint: "Card / loan payment",
    color: "border-primary/70   text-primary/70",
  },
] as const;

type TransactionTypeValue = (typeof TRANSACTION_TYPES)[number]["value"];

function needsSource(type: string) {
  return ["EXPENSE", "TRANSFER", "INVESTMENT", "PAYMENT"].includes(type);
}
function needsTarget(type: string) {
  return ["INCOME", "TRANSFER", "RETURN"].includes(type);
}

// ─── Sub-components ──────────────────────────────────────────────────────────

function StepIndicator({ current, total }: { current: number; total: number }) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className={`h-1 flex-1 transition-all ${
            i <= current ? "bg-foreground" : "bg-border"
          }`}
        />
      ))}
    </div>
  );
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="text-xs font-mono text-destructive mt-1">{message}</p>;
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-xs font-mono font-bold uppercase tracking-widest text-muted-foreground block mb-2">
      {children}
    </span>
  );
}

// ─── Props ───────────────────────────────────────────────────────────────────

interface TransactionWizardProps {
  isOpen: boolean;
  onClose: () => void;
}

// ─── Wizard ──────────────────────────────────────────────────────────────────

export function TransactionWizard({ isOpen, onClose }: TransactionWizardProps) {
  const { data: accounts = [] } = useAccounts();
  const { data: categories = [] } = useCategorie();
  const { data: recurrences = [] } = useRecurrences();
  const { mutateAsync: createTransaction, isPending: isSubmitting } =
    useCreateTransaction();
  const date = new Date();
  const today = getLocalDateStr(date);

  const [step, setStep] = useState<Step>("type");
  const [error, setError] = useState<string | null>(null);

  // TODO: wire to GET /transactions/suggest-category?description=...
  // const [categorySuggestion, setCategorySuggestion] = useState<{ categoryId: string; reason: string } | null>(null);

  const formCreateTransaction = useForm<CreateTransactionInput>({
    resolver: zodResolver(createTransactionSchema),
    defaultValues: {
      date: date,
      isRecurrence: false,
    },
  });

  const watched = formCreateTransaction.watch();
  const currentStepIndex = STEPS.indexOf(step);

  function next() {
    const nextStep = STEPS[currentStepIndex + 1];
    if (nextStep) setStep(nextStep);
  }

  function back() {
    const prevStep = STEPS[currentStepIndex - 1];
    if (prevStep) setStep(prevStep);
  }

  function reset() {
    formCreateTransaction.reset();
    setStep("type");
    setError(null);
  }

  function handleClose() {
    reset();
    onClose();
  }

  const handleSubmit = async () => {
    const valid = await formCreateTransaction.trigger();
    if (!valid) return;
    const formData = formCreateTransaction.getValues();
    setError(null);
    try {
      await createTransaction(formData);
      handleClose();
    } catch {}
  };

  if (!isOpen) return null;

  // ─── Step: Type ─────────────────────────────────────────────────────────────
  const StepType = (
    <div className="flex flex-col gap-3">
      <h3 className="text-lg font-mono font-bold uppercase tracking-wider text-foreground">
        What type of transaction?
      </h3>
      <div className="grid grid-cols-2 gap-2">
        {TRANSACTION_TYPES.map(({ value, label, hint, color }) => (
          <button
            key={value}
            type="button"
            onClick={() => {
              formCreateTransaction.setValue(
                "type",
                value as TransactionTypeValue,
              );
              // reset account fields when type changes
              formCreateTransaction.setValue("sourceAccountId", null);
              formCreateTransaction.setValue("targetAccountId", null);
              next();
            }}
            className={`flex flex-col gap-1 p-4 border-2 text-left transition-all hover:bg-muted
              ${watched.type === value ? `${color} bg-muted` : "border-border text-muted-foreground"}
            `}
          >
            <span className="font-mono font-bold text-sm uppercase tracking-wider">
              {label}
            </span>
            <span className="font-mono text-xs opacity-70">{hint}</span>
          </button>
        ))}
      </div>
    </div>
  );

  // ─── Step: Amount + Date ────────────────────────────────────────────────────
  const StepAmount = (
    <div className="flex flex-col gap-4">
      <h3 className="text-lg font-mono font-bold uppercase tracking-wider text-foreground">
        How much?
      </h3>
      <div>
        <Label>Amount</Label>
        <input
          {...formCreateTransaction.register("amount")}
          type="number"
          step="0.01"
          placeholder="0.00"
          autoFocus
          className="w-full bg-background border-2 border-border px-4 py-3 text-2xl font-mono text-right focus:outline-none focus:border-foreground transition-colors"
        />
        <FieldError
          message={formCreateTransaction.formState.errors.amount?.message}
        />
      </div>
      <div>
        <Label>Date</Label>
        <input
          {...formCreateTransaction.register("date")}
          type="date"
          className="w-full bg-background border-2 border-border px-4 py-3 text-sm font-mono focus:outline-none focus:border-foreground transition-colors"
          value={today}
          disabled
        />
        <FieldError
          message={formCreateTransaction.formState.errors.date?.message}
        />
      </div>
    </div>
  );

  // ─── Step: Accounts ─────────────────────────────────────────────────────────
  // TODO: backend could return GET /accounts/for-transaction?type=EXPENSE
  // sorted by balance desc so accounts with money appear first
  const StepAccounts = (
    <div className="flex flex-col gap-4">
      <h3 className="text-lg font-mono font-bold uppercase tracking-wider text-foreground">
        {watched.type === "TRANSFER"
          ? "From where, to where?"
          : "Which account?"}
      </h3>

      {needsSource(watched.type ?? "") && (
        <div>
          <Label>
            {watched.type === "TRANSFER" ? "From account" : "Account"}
          </Label>
          {/* TODO: accounts here ideally come from GET /accounts/for-transaction?type=EXPENSE */}
          {/* filtered & sorted by balance on the backend */}
          <div className="flex flex-col gap-2">
            {accounts.map((a) => (
              <button
                key={a.id}
                type="button"
                onClick={() =>
                  formCreateTransaction.setValue("sourceAccountId", a.id)
                }
                className={`flex justify-between items-center p-3 border-2 text-left transition-all
                  ${
                    watched.sourceAccountId === a.id
                      ? "border-foreground bg-muted"
                      : "border-border hover:bg-muted"
                  }`}
              >
                <span className="font-mono font-bold text-sm">{a.name}</span>
                <span className="font-mono text-sm text-muted-foreground">
                  {/* balance shown here — backend sorts by balance > 0 first */}
                  {a.currency} {Number(a.balance).toFixed(2)}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {needsTarget(watched.type ?? "") && (
        <div>
          <Label>
            {watched.type === "TRANSFER" ? "To account" : "Account"}
          </Label>
          <div className="flex flex-col gap-2">
            {accounts
              .filter((a) => a.id !== watched.sourceAccountId)
              .map((a) => (
                <button
                  key={a.id}
                  type="button"
                  onClick={() =>
                    formCreateTransaction.setValue("targetAccountId", a.id)
                  }
                  className={`flex justify-between items-center p-3 border-2 text-left transition-all
                    ${
                      watched.targetAccountId === a.id
                        ? "border-foreground bg-muted"
                        : "border-border hover:bg-muted"
                    }`}
                >
                  <span className="font-mono font-bold text-sm">{a.name}</span>
                  <span className="font-mono text-sm text-muted-foreground">
                    {a.currency} {Number(a.balance).toFixed(2)}
                  </span>
                </button>
              ))}
          </div>
        </div>
      )}
    </div>
  );

  // ─── Step: Category + Description ───────────────────────────────────────────
  const StepCategory = (
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

  // ─── Step: Recurrence ───────────────────────────────────────────────────────
  const FREQUENCIES = ["MONTHLY", "WEEKLY", "YEARLY", "INSTALLMENT"] as const;

  const StepRecurrence = (
    <div className="flex flex-col gap-4">
      <h3 className="text-lg font-mono font-bold uppercase tracking-wider text-foreground">
        Does this repeat?
      </h3>

      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={() => formCreateTransaction.setValue("isRecurrence", false)}
          className={`p-4 border-2 font-mono font-bold text-sm uppercase tracking-wider transition-all
            ${!watched.isRecurrence ? "border-foreground bg-muted" : "border-border text-muted-foreground hover:bg-muted"}`}
        >
          One-time
        </button>
        <button
          type="button"
          onClick={() => formCreateTransaction.setValue("isRecurrence", true)}
          className={`p-4 border-2 font-mono font-bold text-sm uppercase tracking-wider transition-all
            ${watched.isRecurrence ? "border-foreground bg-muted" : "border-border text-muted-foreground hover:bg-muted"}`}
        >
          Recurring
        </button>
      </div>

      {watched.isRecurrence && (
        <div className="flex flex-col gap-3 border-2 border-border p-3">
          <div>
            <Label>Frequency</Label>
            <div className="grid grid-cols-2 gap-2">
              {FREQUENCIES.map((f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => formCreateTransaction.setValue("frequency", f)}
                  className={`p-3 border-2 font-mono text-xs uppercase tracking-wider transition-all
                    ${
                      watched.frequency === f
                        ? "border-foreground bg-muted font-bold"
                        : "border-border text-muted-foreground hover:bg-muted"
                    }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          {watched.frequency === "INSTALLMENT" && (
            <div>
              <Label>Total installments</Label>
              <input
                {...formCreateTransaction.register("totalParts")}
                type="number"
                min="1"
                placeholder="e.g. 9"
                className="w-full bg-background border-2 border-border px-4 py-3 text-sm font-mono focus:outline-none focus:border-foreground"
              />
            </div>
          )}

          {recurrences.length > 0 && (
            <div>
              <Label>Link to existing recurrence (optional)</Label>
              {/* TODO: GET /recurrences/active returns only active ones */}
              <select
                {...formCreateTransaction.register("recurrenceId")}
                className="w-full bg-background border-2 border-border px-3 py-2 text-sm font-mono focus:outline-none focus:border-foreground"
              >
                <option value="">New recurrence...</option>
                {recurrences.map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.name} — {r.frequency}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
      )}
    </div>
  );

  // ─── Step: Review ───────────────────────────────────────────────────────────
  const selectedType = TRANSACTION_TYPES.find((t) => t.value === watched.type);
  const selectedSource = accounts.find((a) => a.id === watched.sourceAccountId);
  const selectedTarget = accounts.find((a) => a.id === watched.targetAccountId);
  const selectedCategory = categories.find((c) => c.id === watched.categoryId);

  const StepReview = (
    <div className="flex flex-col gap-3">
      <h3 className="text-lg font-mono font-bold uppercase tracking-wider text-foreground">
        Confirm transaction
      </h3>

      <div className="border-2 border-border divide-y divide-border">
        {[
          { label: "Type", value: selectedType?.label ?? "—" },
          {
            label: "Amount",
            value: watched.amount ? `${watched.amount}` : "—",
          },
          {
            label: "Date",
            value: watched.date
              ? new Date(watched.date).toLocaleDateString()
              : "—",
          },
          { label: "Description", value: watched.description ?? "—" },
          { label: "From", value: selectedSource?.name ?? "—" },
          { label: "To", value: selectedTarget?.name ?? "—" },
          { label: "Category", value: selectedCategory?.name ?? "None" },
          {
            label: "Recurring",
            value: watched.isRecurrence
              ? `Yes — ${watched.frequency ?? ""}${watched.totalParts ? ` x${watched.totalParts}` : ""}`
              : "No",
          },
        ]
          .filter(({ value }) => value !== "—")
          .map(({ label, value }) => (
            <div key={label} className="flex justify-between px-4 py-3">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-muted-foreground">
                {label}
              </span>
              <span className="text-sm font-mono font-bold text-foreground">
                {value}
              </span>
            </div>
          ))}
      </div>

      {error && (
        <div className="border-2 border-destructive bg-destructive/10 px-4 py-3">
          <p className="text-xs font-mono text-destructive">{error}</p>
        </div>
      )}
    </div>
  );

  const STEP_CONTENT: Record<Step, React.ReactNode> = {
    type: StepType,
    amount: StepAmount,
    accounts: StepAccounts,
    category: StepCategory,
    recurrence: StepRecurrence,
    review: StepReview,
  };

  const STEP_LABELS: Record<Step, string> = {
    type: "Type",
    amount: "Amount",
    accounts: "Account",
    category: "Category",
    recurrence: "Recurrence",
    review: "Review",
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70"
        onClick={handleClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div className="relative w-full max-w-md bg-background border-2 border-border flex flex-col max-h-[90dvh]">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b-2 border-border">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-muted-foreground">
            {STEP_LABELS[step]} — Step {currentStepIndex + 1} of {STEPS.length}
          </span>
          <button
            onClick={handleClose}
            className="w-7 h-7 flex items-center justify-center border border-border text-muted-foreground hover:border-foreground hover:text-foreground transition-all font-mono"
          >
            ✕
          </button>
        </div>

        {/* Progress */}
        <div className="px-4 pt-3">
          <StepIndicator current={currentStepIndex} total={STEPS.length} />
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-4 py-4">
          {STEP_CONTENT[step]}
        </div>

        {/* Footer — hide on type step since clicking a type auto-advances */}
        {step !== "type" && (
          <div className="px-4 py-4 border-t-2 border-border grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={back}
              className="py-3 px-4 text-xs font-mono font-bold uppercase tracking-widest border-2 border-border bg-background text-muted-foreground hover:border-foreground hover:text-foreground transition-all"
            >
              ← Back
            </button>
            {step === "review" ? (
              <button
                type="submit"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="py-3 px-4 text-xs font-mono font-bold uppercase tracking-widest bg-foreground text-background hover:opacity-90 transition-all disabled:opacity-50"
              >
                {isSubmitting ? "Saving..." : "Confirm ✓"}
              </button>
            ) : (
              <button
                type="button"
                onClick={next}
                className="py-3 px-4 text-xs font-mono font-bold uppercase tracking-widest bg-foreground text-background hover:opacity-90 transition-all"
              >
                Next →
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
