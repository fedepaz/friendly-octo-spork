import type { FC } from "hono/jsx";

interface IconProps {
  class?: string;
}

export const BankIcon: FC<IconProps> = ({ class: additionalClasses }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class={`lucide lucide-banknote ${additionalClasses}`}>
      <rect width="20" height="12" x="2" y="6" rx="3"/>
      <path d="M12 12h4"/>
      <path d="M12 18V6"/>
      <path d="M8 6v12"/>
      <path d="M16 6v12"/>
    </svg>
  );
};