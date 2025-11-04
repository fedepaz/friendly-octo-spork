import type { FC } from "hono/jsx";

interface IconProps {
  class?: string;
}

export const CheckIcon: FC<IconProps> = ({ class: additionalClasses }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class={`lucide lucide-check ${additionalClasses}`}>
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
};