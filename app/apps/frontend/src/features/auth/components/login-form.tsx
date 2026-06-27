"use client";
import { Loader2, Lock, Eye, EyeOff, User } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useLogin } from "../hooks/useLogin";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { LoginAuthDto, LoginAuthSchema } from "@repo/shared";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { useTranslations } from "next-intl";

interface LoginFormProps {
  onDefaultPassword: () => void;
}

export function LoginForm({ onDefaultPassword }: LoginFormProps) {
  const t = useTranslations("AuthLoginForm");
  const { loginAsync, isLoading } = useLogin();

  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<LoginAuthDto>({
    resolver: zodResolver(LoginAuthSchema),
    defaultValues: {
      name: "",
      password: "",
    },
    mode: "onChange",
  });

  async function onSubmit(values: LoginAuthDto) {
    try {
      const response = await loginAsync(values);
      if (response.isDefaultPassword) {
        onDefaultPassword();
      }
    } catch {
      toast.error(t("errorMessage"));
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4 animate-premium-in"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="space-y-1.5">
              <FormLabel className="font-black text-[10px] uppercase tracking-widest text-muted-foreground/60">
                {t("usernameLabel")}
              </FormLabel>
              <FormControl>
                <div className="relative group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 rounded-none bg-primary/5 border border-primary/20 flex items-center justify-center transition-premium group-focus-within:bg-primary/20 group-focus-within:border-primary/40">
                    <User className="h-3.5 w-3.5 text-primary opacity-60 group-focus-within:opacity-100" />
                  </div>
                  <Input
                    {...field}
                    placeholder="lionelmessi87"
                    disabled={isLoading}
                    className="pl-14 h-12 text-[11px] font-bold  tracking-wider rounded-none border-border/40 bg-background/40 hover:border-primary/20 focus:border-primary/60 transition-premium shadow-etched"
                    autoFocus
                    tabIndex={0}
                  />
                </div>
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="space-y-1.5">
              <FormLabel className="font-black text-[10px] uppercase tracking-widest text-muted-foreground/60">
                {t("passwordLabel")}
              </FormLabel>
              <FormControl>
                <div className="relative group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 rounded-none bg-primary/5 border border-primary/20 flex items-center justify-center transition-premium group-focus-within:bg-primary/20 group-focus-within:border-primary/40">
                    <Lock className="h-3.5 w-3.5 text-primary opacity-60 group-focus-within:opacity-100" />
                  </div>
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="********"
                    disabled={isLoading}
                    className="pl-14 h-12 text-[11px] font-bold  tracking-wider rounded-none border-border/40 bg-background/40 hover:border-primary/20 focus:border-primary/60 transition-premium shadow-etched"
                    {...field}
                    tabIndex={0}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-none bg-foreground/5 flex items-center justify-center text-muted-foreground/70 hover:text-foreground hover:bg-foreground/10 transition-premium border border-border/20 cursor-pointer"
                    tabIndex={-1}
                    aria-label={showPassword ? t("hidePassword") : t("showPassword")}
                  >
                    {showPassword ? (
                      <EyeOff className="h-3.5 w-3.5" />
                    ) : (
                      <Eye className="h-3.5 w-3.5" />
                    )}
                  </button>
                </div>
              </FormControl>
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full h-12 bg-primary text-primary-foreground rounded-none px-4 py-2 cursor-pointer mt-4 border-2 border-primary-foreground/20 font-black text-xs uppercase tracking-widest shadow-premium hover:opacity-90 transition-premium"
          disabled={isLoading || !form.formState.isDirty}
          tabIndex={0}
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            t("submitText")
          )}
        </Button>
      </form>
    </Form>
  );
}
