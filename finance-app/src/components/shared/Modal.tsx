// src/components/shared/Modal.tsx

import type { Child, FC } from "hono/jsx";
import { XIcon } from "@/components/icons/XIcon"; // Assuming XIcon is available

interface ModalProps {
  children: Child;
  isOpen: boolean;
  onClose: () => void;
  title?: string;
}

export const Modal: FC<ModalProps> = ({
  children,
  isOpen,
  onClose,
  title = "Modal Title",
}) => {
  if (!isOpen) return null;

  return (
    <div
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      hx-on:click="if(event.target === this) htmx.trigger('#htmx-modal', 'closeModal')" // Close on backdrop click
    >
      <div
        class="bg-card text-card-foreground border-2 border-border shadow-[var(--shadow-lg)] p-6 rounded-none relative w-full max-w-md"
        id="htmx-modal" // ID for HTMX targeting
        hx-swap-oob="true" // Allow OOB swaps
      >
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-xl font-bold">{title}</h3>
          <button
            type="button"
            class="text-muted-foreground hover:text-foreground transition-colors"
            hx-on:click="htmx.trigger('#htmx-modal', 'closeModal')" // Close button
            aria-label="Close modal"
          >
            <XIcon class="w-6 h-6" />
          </button>
        </div>
        <div class="modal-content">{children}</div>
      </div>
    </div>
  );
};