//src/pages/LoginPage.tsx

import { Button } from "@/components/shared/Button"; // New import
import type { FC } from "hono/jsx";

interface LoginPageProps {
  error?: string;
}

export const LoginPage: FC<LoginPageProps> = ({ error }) => {
  return (
    <div class="flex items-center justify-center min-h-screen bg-background">
      <div class="max-w-sm w-full p-4">
        <div class="text-center mb-4">
          <h2 class="text-3xl md:text-4xl font-bold text-foreground mb-3">FINANCE TRACKER</h2>
          <p class="text-sm text-muted-foreground">SIGN IN TO CONTINUE</p>
        </div>
        <form
          method="post"
          action="/login"
          class="bg-card text-card-foreground border-2 border-border shadow-[var(--shadow-lg)] p-6 rounded-none"
        >
          {error && (
            <div
              class="bg-destructive text-destructive-foreground border-2 border-border p-3 mb-4 rounded-none"
              role="alert"
              aria-live="assertive"
            >
              {error}
            </div>
          )}
          <div class="mb-4">
            <label
              class="block text-sm font-semibold uppercase text-foreground mb-2"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              class="w-full bg-card text-card-foreground border-2 border-border shadow-[var(--shadow)] px-4 py-3 text-base transition-all duration-150 focus:outline-none focus:-translate-x-0.5 focus:-translate-y-0.5 focus:shadow-[var(--shadow-md)] focus:border-ring rounded-none"
              placeholder="messi@miamifc.com"
              required
              aria-describedby="email-error"
            />
          </div>
          <div class="mb-4">
            <label
              for="password"
              class="block text-sm font-semibold uppercase text-foreground mb-2"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              class="w-full bg-card text-card-foreground border-2 border-border shadow-[var(--shadow)] px-4 py-3 text-base transition-all duration-150 focus:outline-none focus:-translate-x-0.5 focus:-translate-y-0.5 focus:shadow-[var(--shadow-md)] focus:border-ring rounded-none"
              placeholder="••••••••"
              required
              aria-describedby="password-error"
            />
          </div>
          <div class="mt-6">
            <Button type="submit" class="w-full"> {/* Using Button component */}
              SIGN IN
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
