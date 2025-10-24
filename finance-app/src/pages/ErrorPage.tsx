// src/pages/ErrorPage.tsx

import type { FC } from "hono/jsx";

interface ErrorPageProps {
  message: string;
  stack?: string;
  statusCode?: number;
}

export const ErrorPage: FC<ErrorPageProps> = ({ message, stack, statusCode }) => {
  return (
    <div class="flex items-center justify-center min-h-screen">
      <div class="max-w-lg w-full p-4">
        <div class="text-center mb-4">
          <h2 class="text-4xl font-bold text-destructive">ERROR {statusCode || 500}</h2>
          <p class="text-muted-foreground">AN UNEXPECTED ERROR OCCURRED.</p>
        </div>
        <div class="neo-card p-6">
          <h3 class="text-2xl font-bold text-destructive mb-4">{message}</h3>
          {stack && (
            <pre class="text-muted-foreground mb-6" style="white-space: pre-wrap; word-wrap: break-word;">
              <code>{stack}</code>
            </pre>
          )}
          <div class="mt-6">
            <a href="/" class="neo-btn bg-primary text-primary-foreground w-full">
              GO TO HOME
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
