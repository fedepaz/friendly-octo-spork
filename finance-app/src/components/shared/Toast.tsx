import type { FC } from "hono/jsx";

interface ToastProps {
  message: string;
  type: "success" | "error" | "info";
}

export const Toast: FC<ToastProps> = ({ message, type }) => {
  const bgColor = type === "success" ? "bg-primary" : type === "error" ? "bg-destructive" : "bg-accent";
  const textColor = type === "success" ? "text-primary-foreground" : type === "error" ? "text-destructive-foreground" : "text-accent-foreground";

  return (
    <div
      class={`fixed top-4 right-4 ${bgColor} ${textColor} p-4 border-2 border-border shadow-neo z-50`}
      hx-swap-oob="true"
      hx-on--after-load="setTimeout(() => this.remove(), 3000)"
    >
      {type === "success" && "✓ "}
      {type === "error" && "✗ "}
      {type === "info" && "ℹ️ "}
      {message}
    </div>
  );
};
