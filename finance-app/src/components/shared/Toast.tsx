import type { FC } from "hono/jsx";

interface ToastProps {
  message: string;
  type: "success" | "error" | "info";
}

const toastTypes = {
  success: {
    bgColor: "bg-primary",
    textColor: "text-primary-foreground",
    icon: "✓",
  },
  error: {
    bgColor: "bg-destructive",
    textColor: "text-destructive-foreground",
    icon: "✗",
  },
  info: {
    bgColor: "bg-accent",
    textColor: "text-accent-foreground",
    icon: "ℹ️",
  },
};

export const Toast: FC<ToastProps> = ({ message, type }) => {
  const { bgColor, textColor, icon } = toastTypes[type];

  return (
    <div
      class={`fixed top-4 right-4 ${bgColor} ${textColor} p-4 border-2 border-border shadow-[var(--shadow-lg)] z-50 flex items-center justify-between`}
      role="alert"
      aria-live="assertive"
      hx-swap-oob="true"
      hx-on--after-load="setTimeout(() => this.remove(), 3000)"
    >
      <div>
        <span class="font-bold">{icon}</span> {message}
      </div>
      <button
        class="ml-4 p-1 rounded-full hover:bg-background/20 transition-colors"
        onClick="this.parentElement.remove()"
        aria-label="Close toast"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clip-rule="evenodd"
          />
        </svg>
      </button>
    </div>
  );
};
