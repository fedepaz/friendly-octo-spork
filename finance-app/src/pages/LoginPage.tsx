// src/pages/LoginPage.tsx
import { FC } from "hono/jsx";

export const LoginPage: FC = () => {
  return (
    <div class="page page-center">
      <div class="container container-tight py-4">
        <div class="text-center mb-4">
          <h1 class="display-4">Finance Tracker</h1>
          <p class="text-muted">Login to manage your finances</p>
        </div>
        <div class="card card-md">
          <div class="card-body">
            <h2 class="h2 text-center mb-4">Login to your account</h2>
            <form
              hx-post="/api/auth/login"
              hx-target="body"
              hx-swap="outerHTML"
              hx-redirect="/dashboard"
            >
              <div class="mb-3">
                <label class="form-label">Password</label>
                <input
                  type="password"
                  name="password"
                  class="form-control"
                  placeholder="Your password"
                  required
                />
              </div>
              <div class="form-footer">
                <button type="submit" class="btn btn-primary w-100">
                  Sign in
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
