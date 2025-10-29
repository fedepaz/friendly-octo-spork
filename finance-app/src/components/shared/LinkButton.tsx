// src/components/shared/LinkButton.tsx
import type { FC } from "hono/jsx";

interface LinkButtonProps {
  href: string;
  children: string | JSX.Element | JSX.Element[];
  class?: string; // Allow additional classes to be passed
}

export const LinkButton: FC<LinkButtonProps> = ({
  href,
  children,
  class: additionalClasses,
}) => {
  return (
    <a
      href={href}
      class={`
        bg-primary text-primary-foreground border-2 border-border shadow-[var(--shadow)] px-4 py-2 text-sm font-bold uppercase rounded-none
        transition-all duration-150
        hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[var(--shadow-md)]
        active:translate-x-1 active:translate-y-1 active:shadow-none
        ${additionalClasses || ""}
      `}
    >
      {children}
    </a>
  );
};
