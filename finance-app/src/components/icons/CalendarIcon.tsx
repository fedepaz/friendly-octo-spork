import type { FC } from "hono/jsx";

export const CalendarIcon: FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    class="lucide lucide-calendar"
  >
    <path d="M5 4h14M5 10h14M5 16h14"></path>
    <path d="M8 7v3"></path>
    <path d="M16 7v3"></path>
    <path d="M3 17h18"></path>
  </svg>
);
