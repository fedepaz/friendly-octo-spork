// src/pages/ErrorPage.tsx

import { LinkButton } from "@/components/shared/LinkButton"; // New import
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
          <h2 class="text-3xl md:text-4xl font-bold text-foreground mb-3">ERROR {statusCode || 500}</h2>
          <p class="text-sm text-muted-foreground">AN UNEXPECTED ERROR OCCURRED.</p>
        </div>
        <div class="bg-card text-card-foreground border-2 border-border shadow-[var(--shadow-lg)] p-6 rounded-none">
          <h3 class="text-2xl md:text-3xl font-bold text-foreground mb-2">{message}</h3>
          {stack && (
            <pre class="text-xs text-muted-foreground mb-6">
              <code>{stack}</code>
            </pre>
          )}
          <div class="mt-6">
            <LinkButton href="/" class="w-full"> {/* Using LinkButton component */}
              GO TO HOME
            </LinkButton>
          </div>
        </div>
      </div>
    </div>
  );
};
