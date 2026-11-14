// src/lib/navigation.ts

/**
 * Hard (document-level) navigation. Used where the App Router's soft
 * redirect can silently no-op — e.g. after back/forward document loads,
 * `router.replace` issues no request and the page hangs.
 */
export function hardRedirect(path: string): void {
  window.location.replace(path);
}
