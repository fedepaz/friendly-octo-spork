# The "Smart Form" Architecture Recipe

This guide serves as a reusable blueprint for implementing robust, multi-step forms in any client project. It decouples data validation, state management, and navigation logic.

---

### 1. The Schema Layer (`schema.ts`)

**Purpose**: Defines the "Source of Truth" using Zod.

- **Key Logic**: Use `z.object` for standard fields and `.refine()` for cross-field dependencies.
- **Enforcement**: The schema must represent the _entire_ form data structure.

### 2. The Orchestrator Layer (`FormProvider.tsx`)

**Purpose**: Initializes React Hook Form and manages global form state.

- **Wrapping**: All step components must be descendants of `<FormProvider {...methods}>`.
- **Submission**: Contains the final `onSubmit` logic with a guard: `if (activeStep < FINAL_STEP) return;`.

### 3. The Surgical Validation Hook (`useStepValidation.ts`)

**Purpose**: The "Gatekeeper" that prevents navigation if the current step is invalid.

- **The Map**: Map each `activeStep` index to an array of `Path<Schema>` strings.
- **The Magic**: Use `methods.trigger(fieldPaths)`. Unlike `handleSubmit`, it allows partial validation of only the visible fields.

### 4. The Navigation Layer (`FormContainer.tsx`)

**Purpose**: Renders the Stepper and handles step transitions.

- **Blocking Flow**:
  ```typescript
  const handleNext = async () => {
    const isValid = await validateCurrentStep(); // Calls the gatekeeper hook
    if (isValid) setActiveStep((prev) => prev + 1);
  };
  ```

### 5. The Review Layer (`FormReview.tsx`)

**Purpose**: Final confirmation before the network request.

- **Safety**: Use `getValues()` to show a read-only summary of the entire collected dataset.

---

### 💡 Implementation Refinements

1.  **Consolidated Validation**: Avoid manual array checks in the hook. Use `z.array().min(1)` in the Zod schema and simply `trigger()` that path in the hook.
2.  **Path Type Safety**: Always use the `Path<T>` type from React Hook Form for the step-to-field mapping. This ensures that renaming a field in the schema breaks the mapping at compile-time rather than runtime.
3.  **Global Error Handling**: Integrate the `mapServerErrorsToForm` utility in the Orchestrator's `onSubmit` catch block to provide surgical field highlighting for backend-driven validation failures.
4.  Consolidated Error Handling (Step 2 & 3):
    - Observation: You have validation logic in Zod and manual array checks in the hook.
    - Improvement: For future forms, you can use z.array().min(1) in the schema for those arrays. Then, in useStepValidation, simply trigger the array path. This removes the need for validateArrayFields and
      keeps all "What is valid?" logic inside the Zod file.
