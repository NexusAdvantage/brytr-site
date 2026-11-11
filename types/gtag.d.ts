/* THE GOOGLE TAG, TYPED, so call sites use window.gtag?.(...) without casting window to any.
 * Optional because the tag loads at afterInteractive and is absent until then. */
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

export {};
