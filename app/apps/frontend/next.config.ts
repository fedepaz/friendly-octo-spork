import path from "path";
import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  // This is required for Next.js 13 compatibility
  output: "standalone",
  outputFileTracingRoot: path.join(__dirname, "../../"),
  reactStrictMode: true,
  transpilePackages: ["@repo/shared"],
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },
  experimental: {
    outputFileTracingIncludes: {
      "/": ["./messages/**"],
    },
  },
  // For local development, we need to proxy the API requests to the backend
  //allowedDevOrigins: ["http://localhost:3000"],
  // For local development, we need to proxy the API requests to the backend
  //async rewrites() {
  //  return [
  //    {
  //      source: "/api/:path*",
  //      destination: "http://localhost:3001/:path*",
  //    },
  //  ];
  //
  //},
};

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
