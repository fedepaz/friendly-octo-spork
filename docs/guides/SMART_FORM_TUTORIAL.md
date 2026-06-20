# Tutorial: The "Smart Form" Template (Wizard Pattern)

This document outlines the master architecture for creating complex, multi-step "Wizard" forms. This pattern ensures that a user cannot proceed to the next step unless the current step's data is 100% valid, decoupled from the final submission logic.

---

## 🏗 Roadmap: 5 Core Layers

### 1. The Schema Layer (`shared/schemas/feature.schema.ts`)
Define the entire form structure in a shared package. This is the **Single Source of Truth**.

```typescript
import { z } from "zod";

export const featureSchema = z.object({
  // Step 0: Basic Info
  name: z.string().min(1, "Required"),
  
  // Step 1: Specific Details
  email: z.string().email("Invalid email"),
  
  // Step 2: Confirmation/Metadata
  notes: z.string().optional(),
});

export type FeatureInput = z.infer<typeof featureSchema>;
```

### 2. The Orchestrator Layer (`SmartFormProvider.tsx`)
Initializes the form context and manages the wizard state.

```tsx
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { FeatureContainer } from "./FeatureContainer";

export function SmartFormProvider() {
  const [activeStep, setActiveStep] = useState(0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const methods = useForm<FeatureInput>({
    mode: "onChange",
    resolver: zodResolver(featureSchema),
    defaultValues: { name: "", email: "" },
  });

  const onSubmit = async (data: FeatureInput) => {
    if (activeStep < FINAL_STEP) return; // Guard against accidental submit
    try {
      await api.post("/feature", data);
      methods.reset();
    } catch (error) {
      // Map server errors back to fields if necessary
      mapServerErrorsToForm(error.details, methods.setError);
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <FeatureContainer activeStep={activeStep} setActiveStep={setActiveStep} />
      </form>
    </FormProvider>
  );
### 3. The Gatekeeper & Routing Layer (`routing.ts` & `useStepValidation.ts`)
Instead of complex `if/else` logic in the container, use a declarative routing helper.

```typescript
// routing.ts
export const STEP_CONFIGS = [
  { id: "basic", fields: ["name"], shouldShow: () => true },
  { id: "details", fields: ["email"], shouldShow: (v) => v.type === "PRO" },
];

export function getNextStepId(currentId, values) {
  const visible = STEP_CONFIGS.filter(s => s.shouldShow(values));
  // logic to find next...
}
```

Then, use `methods.trigger()` in your container to validate only the fields defined in the current step's config.

---

## 🏗 Roadmap: 5 Core Layers
### 4. The UI Container (`FeatureContainer.tsx`)
Handles the navigation UI (Stepper, Next/Back buttons).

```tsx
export function FeatureContainer({ activeStep, setActiveStep }) {
  const { validateCurrentStep } = useStepValidation(activeStep);

  const handleNext = async () => {
    const isValid = await validateCurrentStep();
    if (isValid) setActiveStep((prev) => prev + 1);
  };

  return (
    <div>
      <Stepper activeStep={activeStep} />
      
      {activeStep === 0 && <StepName />}
      {activeStep === 1 && <StepEmail />}
      {activeStep === 2 && <StepReview />}

      <NavigationControls 
        onBack={() => setActiveStep(s => s - 1)} 
        onNext={handleNext} 
        isFinalStep={activeStep === 2}
      />
    </div>
  );
}
```

### 5. The Step Components (`StepName.tsx`, etc.)
Clean components that use `useFormContext` to bind inputs.

---

## 💡 Engineering Mandates

1.  **Surgical Triggering**: Never use `handleSubmit` for intermediate step navigation. Use `trigger(fields)` to block navigation.
2.  **Submission Guards**: Always include an `activeStep` check in `onSubmit` to prevent HTML form submission via Enter key before the final step.
3.  **Review Before POST**: Always implement a read-only review step as the final wizard stage.
4.  **Error Mapping**: Ensure backend validation errors are mapped back to specific fields using the `mapServerErrorsToForm` utility.
