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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CreateAccountInput } from "@repo/shared";
import { UseFormReturn } from "react-hook-form";
import { useTranslations } from "next-intl";

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
  const acfT = useTranslations("AccountCreateForm");
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
              <FormLabel className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground opacity-50">
                {acfT("accountIdLabel")}
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder={acfT("namePlaceholder")}
                  className="h-12 w-full rounded-none border-0 border-b border-border/40 bg-background/20 px-3 font-oxanium text-sm text-foreground placeholder:text-[11px] placeholder:text-muted-foreground/70 focus-visible:ring-0 focus-visible:border-primary/60 transition-premium"
                />
              </FormControl>
              <FormMessage className="text-[10px] font-bold uppercase" />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem className="space-y-1.5">
                <FormLabel className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground opacity-50">
                  {acfT("typeLabel")}
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="h-12 w-full rounded-none border-0 border-b border-border/40 bg-background/20 px-3 font-oxanium text-sm text-foreground focus:ring-0 focus:border-primary/60 transition-premium">
                      <SelectValue placeholder={acfT("selectPlaceholder")} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="rounded-none border-border/40 bg-background/90 backdrop-blur-md">
                    <SelectItem
                      value="BANK"
                      className="rounded-none focus:bg-primary/10"
                    >
                      {acfT("typeBank")}
                    </SelectItem>
                    <SelectItem
                      value="WALLET"
                      className="rounded-none focus:bg-primary/10"
                    >
                      {acfT("typeWallet")}
                    </SelectItem>
                    <SelectItem
                      value="CASH"
                      className="rounded-none focus:bg-primary/10"
                    >
                      {acfT("typeCash")}
                    </SelectItem>
                    <SelectItem
                      value="CARD"
                      className="rounded-none focus:bg-primary/10"
                    >
                      {acfT("typeCard")}
                    </SelectItem>
                    <SelectItem
                      value="INVESTMENT"
                      className="rounded-none focus:bg-primary/10"
                    >
                      {acfT("typeInvestment")}
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage className="text-[10px] font-bold uppercase" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="currency"
            render={({ field }) => (
              <FormItem className="space-y-1.5">
                <FormLabel className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground opacity-50">
                  {acfT("currencyLabel")}
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="h-12 w-full rounded-none border-0 border-b border-border/40 bg-background/20 px-3 font-oxanium text-sm text-foreground focus:ring-0 focus:border-primary/60 transition-premium">
                      <SelectValue placeholder={acfT("selectPlaceholder")} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="rounded-none border-border/40 bg-background/90 backdrop-blur-md">
                    <SelectItem
                      value="ARS"
                      className="rounded-none focus:bg-primary/10"
                    >
                      ARS
                    </SelectItem>
                    <SelectItem
                      value="USD"
                      className="rounded-none focus:bg-primary/10"
                    >
                      USD
                    </SelectItem>
                    <SelectItem
                      value="USDT"
                      className="rounded-none focus:bg-primary/10"
                    >
                      USDT
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage className="text-[10px] font-bold uppercase" />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="balance"
          render={({ field }) => (
            <FormItem className="space-y-1.5">
              <FormLabel className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground opacity-50">
                {acfT("openingBalanceLabel")}
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="text"
                  inputMode="decimal"
                  placeholder="0.00"
                  className="h-12 w-full rounded-none border-0 border-b border-border/40 bg-background/20 px-3 font-mono text-lg font-black text-foreground placeholder:text-muted-foreground/70 focus-visible:ring-0 focus-visible:border-primary/60 transition-premium"
                />
              </FormControl>
              <FormMessage className="text-[10px] font-bold uppercase" />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
