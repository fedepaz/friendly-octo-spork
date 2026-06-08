// src/components/layout/auth-header.tsx
"use client";

import { ThemeToggle } from "../common/theme-toggle";

export function AuthHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/60 backdrop-blur-md supports-backdrop-filter:bg-background/40 shrink-0">
      <div className="container mx-auto px-2">
        <div className="flex h-12 items-center justify-end">
          <div className="flex items-center space-x-4">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
