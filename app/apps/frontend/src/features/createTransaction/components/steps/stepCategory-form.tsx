// src/features/createTransaction/components/steps/stepCategory-form.tsx
"use client";

import { Label } from "@/components/ui/label";
import { CreateTransactionInput } from "@repo/shared";
import { useFormContext } from "react-hook-form";
import { useTranslations } from "next-intl";
import { useCategorie } from "../../hooks/useCategoriesHook";
import { InLineError } from "@/components/ui/in-line-error";

export function StepCategoryComponent() {
  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext<CreateTransactionInput>();
  const watchedCategoryId = watch("categoryId");
  const { data: categories = [] } = useCategorie();
  const scT = useTranslations("StepCategoryForm");

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-lg font-mono font-bold uppercase tracking-wider text-foreground">
        {scT("title")}
      </h3>

      <div>
        <Label>{scT("descriptionLabel")}</Label>
        <input
          {...register("description")}
          type="text"
          placeholder={scT("descriptionPlaceholder")}
          autoFocus
          className="w-full bg-background border-2 border-border px-4 py-3 text-sm font-mono focus:outline-none focus:border-foreground transition-colors"
        />
        {errors.description && (
          <InLineError message={errors.description.message} />
        )}
      </div>

      <div>
        <Label>{scT("categoryLabel")}</Label>
        <div className="grid grid-cols-2 gap-2">
          {categories.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setValue("categoryId", c.id)}
              className={`cursor-pointer focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2 p-3 border-2 text-left transition-all font-mono text-sm
                  ${
                    watchedCategoryId === c.id
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
          onClick={() => setValue("categoryId", null)}
          className="cursor-pointer focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2 mt-2 text-xs font-mono text-muted-foreground underline"
        >
          {scT("noCategory")}
        </button>
        {errors.categoryId && (
          <InLineError message={errors.categoryId.message} />
        )}
      </div>
    </div>
  );
}
