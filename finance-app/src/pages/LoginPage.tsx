//src/pages/LoginPage.tsx

import type { FC } from "hono/jsx";

interface LoginPageProps {
  error?: string;
}

export const LoginPage: FC<LoginPageProps> = ({ error }) => {
  return (
    <div class="flex items-center justify-center min-h-screen bg-background">
      <div class="max-w-sm w-full p-4">
        <div class="text-center mb-4">
          <h2 class="text-3xl font-bold text-primary">FINANCE TRACKER</h2>
          <p class="text-muted-foreground">SIGN IN TO CONTINUE</p>
        </div>
        {error && (
          <div
            class="bg-destructive text-destructive-foreground border-2 border-border shadow-neo p-3 mb-3"
            role="alert"
          >
            {error}
          </div>
        )}
        <form method="post" action="/login" class="neo-card p-6">
          <div class="mb-4">
            <label class="block text-sm font-semibold uppercase mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              class="neo-input w-full bg-card text-card-foreground"
              placeholder="messi@miamifc.com"
              required
            />
          </div>
          <div class="mb-4">
            <label class="block text-sm font-semibold uppercase mb-2">
              Password
            </label>
            <input
              type="password"
              name="password"
              class="neo-input w-full bg-card text-card-foreground"
              placeholder="••••••••"
              required
            />
          </div>
          <div class="mt-6">
            <button
              type="submit"
              class="neo-btn w-full bg-primary text-primary-foreground"
            >
              SIGN IN
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
