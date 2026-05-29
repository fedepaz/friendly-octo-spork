// src/features/users/components/user-create-form.tsx

import { UseFormReturn } from "react-hook-form";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RegisterAuthDto } from "@repo/shared";

interface FormProps {
  onSubmit: (data: RegisterAuthDto) => Promise<void>;
  onCancel: () => void;
  formId: string;
  form: UseFormReturn<RegisterAuthDto>;
}

export function UserCreateForm({ onSubmit, formId, form }: FormProps) {
  return (
    <Form {...form}>
      <form
        id={formId}
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-3 md:gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-4 md:pb-6"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="space-y-1.5 md:space-y-2">
              <FormLabel className="text-[10px] md:text-sm font-black uppercase tracking-widest text-foreground">Nombre Completo</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="ej: Juan Pérez"
                  className="h-10 md:h-12 rounded-xl border-border/60 bg-background shadow-sm text-sm md:text-base font-bold px-4"
                  autoFocus
                  tabIndex={0}
                />
              </FormControl>
              <FormDescription className="text-[9px] md:text-[10px] font-medium leading-tight md:leading-relaxed">
                El nombre completo del usuario.
              </FormDescription>
              <FormMessage className="text-[10px]" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="space-y-1.5 md:space-y-2">
              <FormLabel className="text-[10px] md:text-sm font-black uppercase tracking-widest text-foreground">Correo electrónico</FormLabel>
              <FormControl>
                <Input 
                  {...field} 
                  placeholder="Correo electrónico" 
                  className="h-10 md:h-12 rounded-xl border-border/60 bg-background shadow-sm text-sm md:text-base px-4"
                  tabIndex={0} 
                />
              </FormControl>
              <FormMessage className="text-[10px]" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="space-y-1.5 md:space-y-2">
              <FormLabel className="text-[10px] md:text-sm font-black uppercase tracking-widest text-foreground">Contraseña</FormLabel>
              <FormControl>
                <Input 
                  {...field} 
                  type="password"
                  placeholder="Contraseña" 
                  className="h-10 md:h-12 rounded-xl border-border/60 bg-background shadow-sm text-sm md:text-base px-4"
                  tabIndex={0} 
                />
              </FormControl>
              <FormMessage className="text-[10px]" />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
