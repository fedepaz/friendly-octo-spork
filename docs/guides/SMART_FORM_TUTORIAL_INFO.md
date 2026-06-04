✦ This is a structural breakdown and implementation guide for your "Smart Form" architecture. It is designed to be a "recipe" you can follow for future complex forms, maintaining the rigid step-by-step enforcement
  you created.

  The "Smart Form" Architecture Recipe

  To replicate this, you need five specific layers:

  ---

  1. The Schema Layer (schema.ts)
  Purpose: Defines the "Source of Truth" using Zod.
   * Key Logic: Use z.object for standard fields and .superRefine() or .refine() for complex cross-field dependencies (e.g., "Departure must be after Arrival").
   * Enforcement: This schema must represent the entire form, even if the user only sees small parts at a time.

  2. The Orchestrator Layer (FormProvider.tsx)
  Purpose: Initializes React Hook Form and manages the "Global" form state.
   * Wrapping: Wrap everything in <FormProvider {...methods}>.
   * State Management:
       * activeStep: The current index.
       * showReview: A boolean to toggle the pre-submission summary.
       * errorMessage: A string state used to trigger a global Snackbar.
   * Final Submission: Contains the onSubmit and a handleFinalize function that parses the entire schema one last time before allowing the user to see the "Review" page.

  3. The Surgical Validation Hook (useStepValidation.ts)
  Purpose: The "Gatekeeper" that prevents the user from clicking "Next" if the current view has errors.
   * The Map: Create a constant detailedStepFields that maps each step index to an array of string paths (e.g., 0: ["user.name", "user.email"]).
   * The Magic Tool: Use methods.trigger(fieldPaths) from RHF. Unlike handleSubmit, trigger allows you to validate only the fields in the current step.
   * Array Logic: If a step involves dynamic lists, add custom checks here (e.g., if (list.length === 0) return "Add at least one item").

  4. The Navigation Layer (FormContainer.tsx)
  Purpose: Renders the Stepper and handles the transitions.
   * Blocking Flow:

   1     const handleNext = async () => {
   2       const isValid = await validateCurrentStep(); // Calls the hook
   3       if (isValid) {
   4         setActiveStep(prev => prev + 1);
   5       }
   6     };
   * Local Error Boundaries: Inside renderStepContent, wrap each step in an ErrorProvider. This separates "Form Validation Errors" (Zod/Snackbar) from "System/API Errors" (Loading/ErrorPage).

  5. The Review Layer (FormReview.tsx)
  Purpose: Final confirmation before the POST request.
   * Final Fields: Use this view to capture fields that only make sense at the end (e.g., horaFin).
   * Safety: It receives all data via getValues() to show a read-only summary, ensuring the user is 100% sure before hitting the final POST.

  ---

  Technical Review & Improvements

  Your implementation is robust, but for future projects, consider these "pro" refinements that maintain your same result with cleaner code:

   1. Consolidated Error Handling (Step 2 & 3):
       * Observation: You have validation logic in Zod and manual array checks in the hook.
       * Improvement: For future forms, you can use z.array().min(1) in the schema for those arrays. Then, in useStepValidation, simply trigger the array path. This removes the need for validateArrayFields and
         keeps all "What is valid?" logic inside the Zod file.

   2. Provider Granularity:
       * Observation: You wrap renderStepContent in an ErrorProvider every time the step changes. 
       * Improvement: Since the ErrorProvider seems to handle the appError state for the whole form flow, you can wrap the entire <Stack> once in Planillas.tsx. This prevents the provider from re-mounting every
         time the user clicks "Next", which is more efficient for React.

   3. Path Mapping:
       * Observation: The detailedStepFields is hardcoded with strings.
       * Improvement: Use the Path<Schema> type from React Hook Form to ensure that if you rename a field in your schema, TypeScript will immediately throw an error in your validation map.

  Summary for your Doc
  When building a "SmartForm":
   1. Define everything in Zod first.
   2. Map Steps to Schema Paths in a custom hook.
   3. Use methods.trigger() to block navigation.
   4. Review before POSTing.
   5. Use FormProvider to keep child components "clean" (using useFormContext instead of passing props).

  This structure is a "Smart Form" because it decouples Data (Zod), State (Provider), and Navigation Logic (Hook), making it extremely easy to add or remove steps without breaking the rest of the form.


