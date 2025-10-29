// src/components/shared/Button.tsx
import type { FC } from "hono/jsx";

interface ButtonProps {
  children: string | JSX.Element | JSX.Element[];
  onClick?: () => void;
  hxGet?: string;
  hxTarget?: string;
  hxSwap?: string;
  dataToggle?: string;
  dataTarget?: string;
  class?: string; // Allow additional classes to be passed
  type?: "button" | "submit" | "reset"; // Add type attribute for button
}

export const Button: FC<ButtonProps> = ({
  children,
  onClick,
  hxGet,
  hxTarget,
  hxSwap,
  dataToggle,
  dataTarget,
  class: additionalClasses,
  type = "button", // Default to "button"
}) => {
  return (
    <button
      type={type} // Set the type attribute
      onClick={onClick}
      class={`
        bg-primary text-primary-foreground border-2 border-border shadow-[var(--shadow)] px-6 py-3 text-base rounded-none
        transition-all duration-150
        hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[var(--shadow-md)]
        active:translate-x-1 active:translate-y-1 active:shadow-none
        disabled:opacity-50 disabled:cursor-not-allowed
        ${additionalClasses || ""}
      `}
      hx-get={hxGet}
      hx-target={hxTarget}
      hx-swap={hxSwap}
      data-toggle={dataToggle}
      data-target={dataTarget}
    >
      {children}
    </button>
  );
};
