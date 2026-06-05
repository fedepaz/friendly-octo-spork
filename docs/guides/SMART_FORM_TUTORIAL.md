# Tutorial: Creating a "Smart Form" with Step-by-Step Validation

This document outlines the architecture for creating complex, multi-step forms using **React Hook Form**, **Zod**, and **Material UI**. This pattern ensures that a user cannot proceed to the next step unless the current step's data is 100% valid.

## 🛠 Required Dependencies

```bash
npm install react-hook-form @hookform/resolvers zod @mui/material @mui/icons-material
```

---

## 🏗 Roadmap: 5 Core Files

### 1. The Schema (`formSchema.ts`)
Define the entire form structure in one place. This is your "Single Source of Truth."

```typescript
import { z } from "zod";

export const smartFormSchema = z.object({
  // Step 0: Basic Info
  firstName: z.string().min(1, "Required"),
  lastName: z.string().min(1, "Required"),
  
  // Step 1: Complex Details (Example of nested logic)
  email: z.string().email("Invalid email"),
  age: z.number().min(18, "Must be an adult"),
  
  // Step 2: Lists (Example of array validation)
  hobbies: z.array(z.string()).min(1, "Add at least one hobby"),
});

export type SmartFormSchema = z.infer<typeof smartFormSchema>;

export const defaultValues: SmartFormSchema = {
  firstName: "",
  lastName: "",
  email: "",
  age: 18,
  hobbies: [],
};
```

### 2. The Orchestrator (`SmartFormProvider.tsx`)
This component initializes the form and wraps the entire process in a `FormProvider`.

```tsx
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { smartFormSchema, SmartFormSchema, defaultValues } from "./formSchema";
import { SmartFormContainer } from "./SmartFormContainer";

export function SmartFormProvider() {
  const [activeStep, setActiveStep] = useState(0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const methods = useForm<SmartFormSchema>({
    mode: "onChange",
    resolver: zodResolver(smartFormSchema),
    defaultValues,
  });

  const onSubmit = async (data: SmartFormSchema) => {
    try {
      setErrorMessage(null);
      await api.post("/endpoint", data);
      setActiveStep(0);
      methods.reset();
    } catch (error) {
      const parsed = parseApiError(error);
      if (parsed.type === "VALIDATION" && error instanceof ApiError) {
        // Use the mapping utility to push errors to fields
        mapServerErrorsToForm(error.details, methods.setError);
      } else {
        setErrorMessage(parsed.message);
      }
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <SmartFormContainer 
          activeStep={activeStep} 
          setActiveStep={setActiveStep} 
          setGlobalError={setErrorMessage}
        />
        {/* Render a Snackbar here using the errorMessage state */}
      </form>
    </FormProvider>
  );
}
```

### 3. The Gatekeeper Hook (`useStepValidation.ts`)
This is the most critical file. It maps steps to specific schema fields and blocks navigation.

```typescript
import { useFormContext, Path } from "react-hook-form";
import { SmartFormSchema } from "./formSchema";

// Map each step index to the fields it contains
const stepFields: Record<number, Path<SmartFormSchema>[]> = {
  0: ["firstName", "lastName"],
  1: ["email", "age"],
  2: ["hobbies"],
};

export function useStepValidation(activeStep: number) {
  const { trigger } = useFormContext<SmartFormSchema>();

  const validateCurrentStep = async () => {
    const fields = stepFields[activeStep];
    // trigger() runs Zod validation ONLY for these specific fields
    const isValid = await trigger(fields);
    return isValid;
  };

  return { validateCurrentStep };
}
```

### 4. The Main Container (`SmartFormContainer.tsx`)
Handles the UI layout and the "Next/Back" buttons.

```tsx
import { Button, Stack, Stepper, Step, StepLabel } from "@mui/material";
import { useStepValidation } from "./useStepValidation";

export function SmartFormContainer({ activeStep, setActiveStep, setGlobalError }) {
  const { validateCurrentStep } = useStepValidation(activeStep);

  const handleNext = async () => {
    const isValid = await validateCurrentStep();
    if (isValid) {
      setActiveStep((prev) => prev + 1);
      setGlobalError(null);
    } else {
      setGlobalError("Please fix the errors in this step.");
    }
  };

  const renderStep = () => {
    switch (activeStep) {
      case 0: return <StepBasicInfo />;
      case 1: return <StepDetails />;
      case 2: return <StepHobbies />;
      default: return null;
    }
  };

  return (
    <Stack spacing={3}>
      <Stepper activeStep={activeStep}>
        <Step><StepLabel>Identity</StepLabel></Step>
        <Step><StepLabel>Details</StepLabel></Step>
        <Step><StepLabel>Hobbies</StepLabel></Step>
      </Stepper>

      {renderStep()}

      <Stack direction="row" justifyContent="space-between">
        <Button disabled={activeStep === 0} onClick={() => setActiveStep(s => s - 1)}>
          Back
        </Button>
        {activeStep === 2 ? (
          <Button type="submit" variant="contained">Finish</Button>
        ) : (
          <Button variant="contained" onClick={handleNext}>Next</Button>
        )}
      </Stack>
    </Stack>
  );
}
```

### 5. Step Components (`StepBasicInfo.tsx`, etc.)
These stay "clean" by using `useFormContext` to connect to the inputs.

```tsx
import { useFormContext } from "react-hook-form";
import { TextField } from "@mui/material";

export function StepBasicInfo() {
  const { register, formState: { errors } } = useFormContext();
  
  return (
    <Stack spacing={2}>
      <TextField 
        {...register("firstName")} 
        label="First Name" 
        error={!!errors.firstName}
        helperText={errors.firstName?.message as string}
      />
      {/* ... other inputs */}
    </Stack>
  );
}
```

---

## 💡 Pro Tips for Partners

1.  **Strict Blocking:** The `handleNext` function is the only way to move forward. If `trigger()` returns false, RHF will automatically populate the `errors` object, and your UI will show them.
2.  **Cross-Step Validation:** If Step 2 depends on a value from Step 0, Zod's `.refine()` in the main schema handles it perfectly.
3.  **The Review Page:** Before the final submit, you can add a `StepReview` that simply calls `getValues()` from the form context and displays a read-only summary of the whole object.
