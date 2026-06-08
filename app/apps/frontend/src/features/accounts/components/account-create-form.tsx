// src/features/accounts/components/account-create-form.tsx
"use client";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { CreateAccountInput } from "@repo/shared";
import { UseFormReturn } from "react-hook-form";

interface AccountCreateFormProps {
  onSubmit: (data: CreateAccountInput) => void;
  onCancel: () => void;
  formId: string;
  form: UseFormReturn<CreateAccountInput>;
}

export function AccountCreateForm({
  onSubmit,
  formId,
  form,
}: AccountCreateFormProps) {
  return (
    <Form {...form}>
      <form
        id={formId}
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel className="text-muted-foreground opacity-50">
                Nombre
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Nombre de la cuenta"
                  className="h-12 w-full rounded-none border-0 bg-transparent px-3 text-sm text-foreground placeholder:text-[11px] placeholder:text-muted-foreground"
                />
              </FormControl>
              <FormDescription className="text-muted-foreground opacity-50">
                Nombre de la cuenta
              </FormDescription>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel className="text-muted-foreground opacity-50">
                Tipo
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Tipo de cuenta"
                  className="h-12 w-full rounded-none border-0 bg-transparent px-3 text-sm text-foreground placeholder:text-[11px] placeholder:text-muted-foreground"
                />
              </FormControl>
              <FormDescription className="text-muted-foreground opacity-50">
                Tipo de cuenta
              </FormDescription>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="currency"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel className="text-muted-foreground opacity-50">
                Moneda
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Moneda"
                  className="h-12 w-full rounded-none border-0 bg-transparent px-3 text-sm text-foreground placeholder:text-[11px] placeholder:text-muted-foreground"
                />
              </FormControl>
              <FormDescription className="text-muted-foreground opacity-50">
                Moneda
              </FormDescription>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
