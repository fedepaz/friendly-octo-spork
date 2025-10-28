import Layout from "@/components/shared/Layout";
import type { FC } from "hono/jsx";

export const ProfilePage: FC = () => {
  return (
    <Layout activeNavItem="/profile">
      <div class="container mx-auto p-4">
        <h1 class="text-4xl md:text-5xl font-bold text-foreground mb-4">Profile & Account Settings</h1>
        <div class="bg-card text-card-foreground border-2 border-border shadow-[var(--shadow)] p-6 rounded-md">
          <h2 class="text-3xl md:text-4xl font-bold text-foreground mb-3">Logout</h2>
          <p class="text-base text-foreground mb-4">Click the button below to log out of your account.</p>
          <form action="/logout" method="post">
            <button
              type="submit"
              class="bg-destructive text-destructive-foreground border-2 border-border shadow-[var(--shadow)] px-6 py-3 text-base transition-all duration-150 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[var(--shadow-md)] active:translate-x-1 active:translate-y-1 active:shadow-none"
            >
              Logout
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};
