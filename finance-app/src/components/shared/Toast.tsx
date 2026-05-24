// src/components/shared/Toast.tsx

import type { FC } from "hono/jsx";
import {
  CheckIcon,
  AlertTriangleIcon,
  InfoIcon,
  XIcon,
} from "@/components/icons";
import { Button } from "./Button";

interface ToastProps {
  message: string;
  type: "success" | "error" | "info";
}

const toastTypes = {
  success: {
    bgColor: "bg-primary",
    textColor: "text-primary-foreground",
    borderColor: "border-primary",
    iconName: "check", // Using icon name
  },
  error: {
    bgColor: "bg-destructive",
    textColor: "text-destructive-foreground",
    borderColor: "border-destructive",
    iconName: "alert-triangle", // Using icon name
  },
  info: {
    bgColor: "bg-accent",
    textColor: "text-accent-foreground",
    borderColor: "border-accent",
    iconName: "info", // Using icon name
  },
};

export const Toast: FC<ToastProps> = ({ message, type }) => {
  const { bgColor, textColor, borderColor, iconName } = toastTypes[type];

  return (
    <div id="toast-container" hx-swap-oob="beforeend">
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
        x-data="{ show: true }"
        x-init="setTimeout(() => show = false, 5000)"
        x-show="show"
        x-transition:leave="transition ease-in duration-300"
        x-transition:leave-start="opacity-100 translate-x-0"
        x-transition:leave-end="opacity-0 translate-x-full"
      >
        <span class="text-2xl font-bold flex-shrink-0">
          {iconName === "check" && <CheckIcon />}
          {iconName === "alert-triangle" && <AlertTriangleIcon />}
          {iconName === "info" && <InfoIcon />}
        </span>
        <span class="flex-1 font-semibold text-sm">{message}</span>
      </div>
    </div>
  );
};
