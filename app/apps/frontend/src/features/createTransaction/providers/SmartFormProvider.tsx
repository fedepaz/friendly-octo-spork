// src/features/createTransaction/providers/SmartFormProvider.tsx

import { zodResolver } from "@hookform/resolvers/zod";
import { CreateTransactionInput, createTransactionSchema } from "@repo/shared";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";
import { FormContainer } from "../components/FormContainer";
import { useCreateTransaction } from "../hooks/createMutationHooks";

export function SmartFormProvider() {
  const [activeStep, setActiveStep] = useState(0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { mutateAsync: createTransaction, isPending: isSubmitting } =
    useCreateTransaction();

  const methods = useForm<CreateTransactionInput>({
    mode: "onChange",
    resolver: zodResolver(createTransactionSchema),
    defaultValues: {
      date: new Date(),
      isRecurrence: false,
    },
  });

  const onSubmit = async (data: CreateTransactionInput) => {
    try {
      await createTransaction(data);
      toast.success("Transaction created successfully");
      setActiveStep(0);
      methods.reset();
    } catch (error) {
      const errorMessage =
        'Failed to create transaction. Error: "' + error + '"';
      setErrorMessage(errorMessage);
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <FormContainer
          activeStep={activeStep}
          setActiveStep={setActiveStep}
          setGlobalError={setErrorMessage}
          isSubmitting={isSubmitting}
        />
        {errorMessage && (
          <div className="px-4 pb-4">
            <p className="text-xs font-mono text-destructive border-2 border-destructive bg-destructive/10 p-2">
              {errorMessage}
            </p>
          </div>
        )}
      </form>
    </FormProvider>
  );
}
