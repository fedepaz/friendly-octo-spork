import { Icon } from "./Icon"; // New import
import { Button } from "./Button"; // New import
// src/components/shared/Toast.tsx

import type { FC } from "hono/jsx";

interface ToastProps {
  message: string;
  type: "success" | "error" | "info";
}

const toastTypes = {
  success: {
    bgColor: "bg-accent",
    textColor: "text-accent-foreground",
    borderColor: "border-accent",
    iconName: "check", // Using icon name
  },
  error: {
    bgColor: "bg-destructive",
    textColor: "text-destructive-foreground",
    borderColor: "border-destructive",
    iconName: "alert-triangle", // Using icon name
  },
  info: {
    bgColor: "bg-primary",
    textColor: "text-primary-foreground",
    borderColor: "border-primary",
    iconName: "info", // Using icon name
  },
};

export const Toast: FC<ToastProps> = ({ message, type }) => {
  const { bgColor, textColor, borderColor, iconName } = toastTypes[type];

  return (
    <div
      class={`
        ${bgColor} ${textColor}
        border-2 ${borderColor}
        shadow-[var(--shadow)]
        p-4
        flex items-center gap-4
        min-w-[300px] max-w-md
        animate-slide-in-right
        rounded-none
      `}
      role="alert"
      aria-live="assertive"
      hx-swap-oob="true"
      hx-on--after-load="setTimeout(() => this.remove(), 5000)"
    >
      <span class="text-2xl font-bold flex-shrink-0"><Icon name={iconName} /></span>
      <span class="flex-1 font-semibold text-sm">{message}</span>
      <Button
        type="button" // Explicitly set type to "button"
        class={`
          flex-shrink-0
          w-8 h-8
          flex items-center justify-center
          font-bold text-lg
          bg-transparent text-current border-none shadow-none // Override default button styles
          hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[var(--shadow-md)]
          active:translate-x-1 active:translate-y-1 active:shadow-none
          rounded-none
        `}
        onClick="this.closest('[role=alert]').remove()"
        aria-label="Close toast"
      >
        <Icon name="x" />
      </Button>
    </div>
  );
};
