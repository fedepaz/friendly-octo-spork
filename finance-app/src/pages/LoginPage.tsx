//src/pages/LoginPage.tsx

import type { FC } from "hono/jsx";

interface LoginPageProps {
  error?: string;
}

export const LoginPage: FC<LoginPageProps> = ({ error }) => {
  return (
    <div class="page page-center">
      <div class="container-tight py-4">
        <div class="text-center mb-4">
          <h2 class="h2 text-primary">Finance Tracker</h2>
          <p class="text-muted">Sign in to continue</p>
        </div>
        {error && (
          <div class="alert alert-danger mb-3" role="alert">
            {error}
          </div>
        )}
        <form method="post" action="/login" class="card card-md">
          <div class="card-body">
            <div class="mb-3">
              <label class="form-label">Email</label>
              <input
                type="email"
                name="email"
                class="form-control"
                placeholder="messi@miamifc.com"
                required
              />
            </div>
            <div class="mb-3">
              <label class="form-label">Password</label>
              <input
                type="password"
                name="password"
                class="form-control"
                placeholder="••••••••"
                required
              />
            </div>
            <div class="form-footer">
              <button type="submit" class="btn btn-primary w-100">
                Sign in
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
