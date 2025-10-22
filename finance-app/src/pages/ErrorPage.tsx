// src/pages/ErrorPage.tsx

import type { FC } from "hono/jsx";

interface ErrorPageProps {
  message: string;
  stack?: string;
  statusCode?: number;
}

export const ErrorPage: FC<ErrorPageProps> = ({ message, stack, statusCode }) => {
  return (
    <div class="page page-center">
      <div class="container-tight py-4">
        <div class="text-center mb-4">
          <h2 class="h2 text-danger">Error {statusCode || 500}</h2>
          <p class="text-muted">An unexpected error occurred.</p>
        </div>
        <div class="card card-md">
          <div class="card-body">
            <h3 class="card-title text-danger">{message}</h3>
            {stack && (
              <pre class="card-text text-muted" style="white-space: pre-wrap; word-wrap: break-word;">
                <code>{stack}</code>
              </pre>
            )}
            <div class="form-footer">
              <a href="/" class="btn btn-primary w-100">
                Go to Home
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
