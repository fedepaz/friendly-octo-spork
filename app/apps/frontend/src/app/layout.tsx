// src/app/layout.tsx

import type { Metadata, Viewport } from "next";
import "./globals.css";
import { AppProviders } from "@/providers/app-providers";
import { Oxanium } from "next/font/google";
import { cn } from "@/lib/utils";

const oxanium = Oxanium({
  subsets: ["latin"],
  variable: "--font-oxanium",
});

export const metadata: Metadata = {
  title: "Finance Manager",
  description: "Gestión de finanzas",
  generator: "v0.app",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      suppressHydrationWarning
      className={cn("font-sans", oxanium.variable)}
    >
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content={viewport.toString()} />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
