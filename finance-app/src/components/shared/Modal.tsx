import type { FC } from "hono/jsx";

export const Modal: FC = () => {
  return (
    <div id="htmx-modal" class="modal" tabindex={-1} role="dialog">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div id="modal-content" class="modal-content neo-card">
          {/* Content will be loaded here by HTMX */}
        </div>
      </div>
    </div>
  );
};
