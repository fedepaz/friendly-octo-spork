import type { FC } from "hono/jsx";

export const Modal: FC = () => {
  return (
    <div
      id="htmx-modal"
      class="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      tabindex={-1}
      // Close modal on Escape key
      // eslint-disable-next-line no-undef
      x-data="{ open: true }"
      x-show="open"
      x-on:keydown.escape.window="open = false"
      x-on:click.self="open = false"
    >
      <div
        id="modal-content"
        class="bg-card text-card-foreground border-2 border-border shadow-[var(--shadow-lg)] p-6 w-full max-w-lg"
      >
        {/* Content will be loaded here by HTMX */}
      </div>
    </div>
  );
};
