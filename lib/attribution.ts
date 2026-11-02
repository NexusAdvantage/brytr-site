/* FIRST TOUCH ATTRIBUTION. Which ad brought this person to the site, kept until they convert.
 *
 * THE PROBLEM THIS SOLVES. A homeowner clicks a Meta ad on Tuesday, reads the gallery, closes the
 * tab, searches the company by name on Friday and books then. The form post on Friday carries no
 * campaign on it, so the CRM records an organic lead and the ad that actually paid for it gets no
 * credit. Capturing on the first visit and replaying it at submission is what connects the two.
 *
 * FIRST TOUCH, NOT LAST. Nothing is overwritten once a value is stored. If somebody arrives from
 * one campaign and later returns through another, the first one keeps the credit, because it is the
 * one that did the work of finding them. Changing that is a one line change in captureFirstTouch,
 * and it is a reporting decision rather than a technical one, so do not flip it casually.
 *
 * WHY localStorage RATHER THAN A COOKIE. It is never sent to the server on its own, so it cannot
 * bloat every request header, and it survives a closed tab, which sessionStorage does not. It is
 * read on the client and travels only when a form is actually submitted.
 *
 * EVERY ACCESS IS WRAPPED. Safari in private browsing, a locked down corporate profile and anyone
 * with site data blocked all make localStorage throw on access rather than return null. An analytics
 * nicety must never be the reason a lead form cannot render, so every call here fails quiet.
 */

/* The five parameters worth keeping, and no more. Each one maps to a column somebody actually
 * reports on. fbclid is Meta's own click id and is what lets a lead be matched back to an ad. */
export const ATTRIBUTION_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "fbclid",
] as const;

export type AttributionKey = (typeof ATTRIBUTION_KEYS)[number];
export type FirstTouch = Partial<Record<AttributionKey, string>>;

const STORE_KEY = "brytr_first_touch";

function readRaw(): FirstTouch | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORE_KEY);
    if (!raw) return null;
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return null;
    const rec = parsed as Record<string, unknown>;
    const out: FirstTouch = {};
    for (const k of ATTRIBUTION_KEYS) {
      const v = rec[k];
      if (typeof v === "string" && v) out[k] = v;
    }
    return out;
  } catch {
    return null;
  }
}

/** What was stored on the first visit, or null if there is nothing and nothing readable. */
export function readFirstTouch(): FirstTouch | null {
  const stored = readRaw();
  if (!stored) return null;
  return Object.keys(stored).length ? stored : null;
}

/* Called once on load. Reads the current URL, and writes only when there is something worth
 * writing AND nothing has been written before. A visit with no campaign on the URL leaves whatever
 * is already stored alone, which is the whole point: an ad click followed by a direct return must
 * not erase the ad click. */
export function captureFirstTouch(): FirstTouch | null {
  if (typeof window === "undefined") return null;

  const existing = readFirstTouch();
  if (existing) return existing;

  let found: FirstTouch = {};
  try {
    const params = new URLSearchParams(window.location.search);
    for (const k of ATTRIBUTION_KEYS) {
      const v = params.get(k);
      if (v) found[k] = v.slice(0, 300);
    }
  } catch {
    found = {};
  }

  if (!Object.keys(found).length) return null;

  try {
    window.localStorage.setItem(STORE_KEY, JSON.stringify(found));
  } catch {
    /* Storage is unavailable. The values are still returned to the caller for this page view, so a
     * form submitted on this visit carries them even though a later visit will not. */
  }
  return found;
}
