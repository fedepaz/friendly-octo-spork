import type { FC } from "hono/jsx";

interface IconProps {
  class?: string;
}

export const SparklesIcon: FC<IconProps> = ({ class: additionalClasses }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class={`lucide lucide-sparkles ${additionalClasses}`}>
      <path d="M9.91 1.69L8.2 8.18 1.69 9.91 8.2 11.62 9.91 18.13 11.62 11.62 18.13 9.91 11.62 8.2 9.91 1.69z"/>
      <path d="M19.21 12.78L18.5 15.5 15.78 16.21 18.5 16.92 19.21 19.63 19.92 16.92 22.63 16.21 19.92 15.5 19.21 12.78z"/>
    </svg>
  );
};