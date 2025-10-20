// src/components/shared/Modal.tsx
import { FC } from "hono/jsx";

interface ModalProps {
  id: string;
  title: string;
  children: any;
  size?: "sm" | "md" | "lg" | "xl";
}

export const Modal: FC<ModalProps> = ({ id, title, children, size = "md" }) => {
  return (
    <div class="modal modal-blur fade" id={id} tabindex="-1" role="dialog" aria-hidden="true">
      <div class={`modal-dialog modal-dialog-centered modal-${size}`} role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{title}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};
