// src/features/users/components/user-create-form.tsx
"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RegisterAuthDto } from "@repo/shared";
import { UseFormReturn } from "react-hook-form";
import { useTranslations } from "next-intl";

interface UserCreateFormProps {
  onSubmit: (data: RegisterAuthDto) => void;
  onCancel: () => void;
  formId: string;
  form: UseFormReturn<RegisterAuthDto>;
}

export function UserCreateForm({
  onSubmit,
  formId,
  form,
}: UserCreateFormProps) {
  const ucfT = useTranslations("UserCreateForm");
  return (
    <Form {...form}>
      <form
        id={formId}
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="space-y-1.5">
              <FormLabel className="text-xs font-black uppercase tracking-widest text-muted-foreground opacity-50">
                {ucfT("nameLabel")}
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder={ucfT("namePlaceholder")}
                  className="h-12 w-full rounded-none border-0 border-b border-border/40 bg-background/20 px-3 font-oxanium text-sm text-foreground placeholder:text-xs placeholder:text-muted-foreground/70 focus-visible:ring-0 focus-visible:border-primary/60 transition-premium"
                />
              </FormControl>
              <FormMessage className="text-xs font-black uppercase tracking-widest" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="space-y-1.5">
              <FormLabel className="text-xs font-black uppercase tracking-widest text-muted-foreground opacity-50">
                {ucfT("emailLabel")}
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="email"
                  placeholder={ucfT("emailPlaceholder")}
                  className="h-12 w-full rounded-none border-0 border-b border-border/40 bg-background/20 px-3 font-oxanium text-sm text-foreground placeholder:text-xs placeholder:text-muted-foreground/70 focus-visible:ring-0 focus-visible:border-primary/60 transition-premium"
                />
              </FormControl>
              <FormMessage className="text-xs font-black uppercase tracking-widest" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="space-y-1.5">
              <FormLabel className="text-xs font-black uppercase tracking-widest text-muted-foreground opacity-50">
                {ucfT("passwordLabel")}
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="password"
                  placeholder={ucfT("passwordPlaceholder")}
                  className="h-12 w-full rounded-none border-0 border-b border-border/40 bg-background/20 px-3 font-oxanium text-sm text-foreground placeholder:text-xs placeholder:text-muted-foreground/70 focus-visible:ring-0 focus-visible:border-primary/60 transition-premium"
                />
              </FormControl>
              <FormMessage className="text-xs font-black uppercase tracking-widest" />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
