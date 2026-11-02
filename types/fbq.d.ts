/* THE META PIXEL QUEUE, TYPED, so nothing in this codebase has to cast window to any.
 *
 * fbq is overloaded by its first argument rather than by name, so it is declared as a call
 * signature per command. "track" is deliberately typed as a plain string rather than a union of
 * Meta's standard events: trackCustom exists for custom names, but Meta also keeps adding standard
 * ones, and a union here would start failing the build the day somebody adds a legitimate event.
 *
 * The extra properties are the ones the base snippet assigns while it is bootstrapping. They are
 * declared so that snippet, and anything that ever inspects whether the pixel has loaded, stays
 * type safe. Every one of them is optional because they do not exist until the snippet runs.
 */
interface FbqFn {
  (command: "init", pixelId: string, params?: Record<string, unknown>): void;
  (command: "track", event: string, params?: Record<string, unknown>): void;
  (command: "trackCustom", event: string, params?: Record<string, unknown>): void;
  (command: "consent", action: "grant" | "revoke"): void;
  callMethod?: ((...args: unknown[]) => void) | null;
  queue?: unknown[];
  loaded?: boolean;
  version?: string;
}

declare global {
  interface Window {
    /* Optional because the script is loaded with next/script at afterInteractive, so there is a
     * real window in which it is not there yet. Every call site uses window.fbq?.(...) for that
     * reason and the optional type is what forces them to. */
    fbq?: FbqFn;
    _fbq?: FbqFn;
  }
}

export {};
