// src/components/common/not-found.tsx
"use client";

import { FlagIcon } from "lucide-react";
import Link from "next/link";

export function NotFoundPage() {
  return (
    <div className="grid min-h-full place-items-center px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <FlagIcon className="w-20 h-20 mx-auto mt-4 text-muted-foreground text-5xl font-semibold tracking-tight text-balance sm:text-7xl" />
        <h1 className="mt-4 text-5xl font-semibold tracking-tight text-muted-foreground text-balance sm:text-7xl">
          Error 404
        </h1>
        <p className="mt-3 text-xl font-bold text-pretty text-foreground sm:text-xl/8">
          Página no encontrada
        </p>

        <p className="mt-6 text-lg font-medium text-pretty text-muted-foreground sm:text-xl/8">
          Lo sentimos, no pudimos encontrar la página que estás buscando.
        </p>

        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link
            href={"/"}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 cursor-pointer focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2"
          >
            Volver a la página de inicio
          </Link>
        </div>
      </div>
    </div>
  );
}
