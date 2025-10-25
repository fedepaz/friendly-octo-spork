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
          <h2 class="text-4xl font-bold text-destructive-foreground">ERROR {statusCode || 500}</h2>
          <p class="text-muted-foreground">AN UNEXPECTED ERROR OCCURRED.</p>
        </div>
        <div class="bg-card text-card-foreground border-2 border-border shadow-[var(--shadow-lg)] p-6">
          <h3 class="text-2xl font-bold text-destructive-foreground mb-4">{message}</h3>
          {stack && (
            <pre class="text-muted-foreground mb-6">
              <code>{stack}</code>
            </pre>
          )}
          <div class="mt-6">
            <a href="/" class="bg-primary text-primary-foreground border-2 border-border shadow-[var(--shadow)] px-6 py-3 font-bold uppercase tracking-wider transition-all duration-150 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[var(--shadow-md)] active:translate-x-1 active:translate-y-1 active:shadow-none disabled:opacity-50 disabled:cursor-not-allowed w-full">
              GO TO HOME
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
