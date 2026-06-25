// src/components/user-profile/user-password.tsx

import { useChangePassword } from "@/features/auth/hooks/useChangePassword";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChangePasswordDto, ChangePasswordSchema } from "@repo/shared";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Eye, EyeOff, Lock } from "lucide-react";
import { useState } from "react";
import { useTranslations } from "next-intl";

interface ChangePasswordFormProps {
  onClose: () => void;
}

export function ChangePasswordForm({ onClose }: ChangePasswordFormProps) {
  const pwT = useTranslations("UserPassword");
  const { changePasswordAsync, isLoading, reset } = useChangePassword();
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);

  const form = useForm<ChangePasswordDto>({
    resolver: zodResolver(ChangePasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
    },
    mode: "onChange",
  });

  async function onSubmit(values: ChangePasswordDto) {
    try {
      await changePasswordAsync(values);
      setTimeout(() => {
        reset();
        onClose();
      }, 1000);
    } catch {}
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 font-sans"
      >
        <FormField
          control={form.control}
          name="currentPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-sans text-[10px] uppercase tracking-widest opacity-60">{pwT("currentPasswordLabel")}</FormLabel>
              <FormControl>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                    <Lock className="h-4 w-4 text-muted-foreground" />
                  </div>

                  <Input
                    placeholder="••••••••"
                    type={showCurrent ? "text" : "password"}
                    {...field}
                    disabled={isLoading}
                    className="pl-9 pr-10 rounded-none border-2"
                  />

                  <button
                    type="button"
                    onClick={() => setShowCurrent(!showCurrent)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-muted-foreground hover:text-foreground transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2 rounded-none border border-border"
                    aria-label={
                      showCurrent
                        ? pwT("hideCurrent")
                        : pwT("showCurrent")
                    }
                  >
                    {showCurrent ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="newPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-sans text-[10px] uppercase tracking-widest opacity-60">{pwT("newPasswordLabel")}</FormLabel>
              <FormControl>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                    <Lock className="h-4 w-4 text-muted-foreground" />
                  </div>

                  <Input
                    placeholder="••••••••"
                    type={showNew ? "text" : "password"}
                    {...field}
                    disabled={isLoading}
                    className="pl-9 pr-10 rounded-none border-2"
                  />

                  <button
                    type="button"
                    onClick={() => setShowNew(!showNew)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-muted-foreground hover:text-foreground transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2 rounded-none border border-border"
                    aria-label={
                      showNew
                        ? pwT("hideNew")
                        : pwT("showNew")
                    }
                  >
                    {showNew ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="w-full bg-primary rounded-none p-2 cursor-pointer border-2 border-primary-foreground/20 font-sans font-bold uppercase tracking-wider"
          disabled={isLoading || !form.formState.isDirty}
        >
          {pwT("submitButton")}
        </Button>
      </form>
    </Form>
  );
}
