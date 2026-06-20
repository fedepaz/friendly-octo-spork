export const SITE_CONFIG = {
  name: "cabecitaNegraDevOps",
  description: "Professional finance management",
  author: "cabecitaNegraDevOps",
  url: "finance.cabecitanegra.dnps.dev",
  image: "developing",
  twitter: "developing",
  github: "developing",
} as const;

export type SiteConfig = (typeof SITE_CONFIG)[keyof typeof SITE_CONFIG];
