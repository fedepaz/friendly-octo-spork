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
    icon: "✓",
  },
  error: {
    bgColor: "bg-destructive",
    textColor: "text-destructive-foreground",
    borderColor: "border-destructive",
    icon: "✗",
  },
  info: {
    bgColor: "bg-primary",
    textColor: "text-primary-foreground",
    borderColor: "border-primary",
    icon: "ℹ",
  },
};

export const Toast: FC<ToastProps> = ({ message, type }) => {
  const { bgColor, textColor, borderColor, icon } = toastTypes[type];

  return (
    <div
      class={`
        ${bgColor} ${textColor}
        border-2 ${borderColor}
        shadow-[var(--shadow-lg)]
        p-4 rounded-md
        flex items-center gap-3
        min-w-[300px] max-w-md
        animate-slide-in-right
      `}
      role="alert"
      aria-live="assertive"
      hx-swap-oob="true"
      hx-on--after-load="setTimeout(() => this.remove(), 5000)"
    >
      <span class="text-2xl font-bold flex-shrink-0">{icon}</span>
      <span class="flex-1 font-semibold text-sm">{message}</span>
      <button
        class="
          flex-shrink-0
          w-8 h-8
          rounded-md
          flex items-center justify-center
          font-bold text-lg
          transition-all duration-150
          hover:bg-background/20 hover:scale-110
        "
        onclick="this.closest('[role=alert]').remove()"
        aria-label="Close toast"
      >
        ✕
      </button>
    </div>
  );
};
