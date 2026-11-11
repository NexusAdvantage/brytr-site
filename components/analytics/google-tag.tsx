"use client";

import { useEffect } from "react";
import Script from "next/script";

/* THE GOOGLE TAG, for Google Ads conversion tracking. Rendered once, in the root layout, next to
 * the Meta pixel and built the same way.
 *
 * THE ID COMES FROM THE ENVIRONMENT for the same reason the pixel's does: with
 * NEXT_PUBLIC_GOOGLE_ADS_ID unset this renders nothing, so local work and preview builds cannot
 * post conversions into the client's account. Set it in Vercel on production only.
 *
 * TWO CONVERSIONS, both created in the Brytr Google Ads account on 11 Nov 2026:
 *
 *   LEAD    "Brytr Site Lead Form". Fired from quote-form.tsx on the same path as the Meta Lead
 *           event, which is the one path where the CRM answered 2xx. Never on page load and never
 *           for the honeypot.
 *   CALL    "Click to call". Fired here, from one delegated listener, for any tap on a tel: link
 *           anywhere on the site: the hero pill, the header, the mobile call bar, the footer. One
 *           listener means a new phone link added next month is tracked without anyone remembering.
 *
 * The labels are not secrets and do nothing without the ID, so they live here as constants rather
 * than as two more environment variables to keep in sync.
 *
 * gtag's config call also turns on the conversion linker, which stores the gclid from the ad click
 * in a first party cookie. That is what lets a lead on Friday be credited to Tuesday's click.
 */
export const GOOGLE_ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;
const LEAD_LABEL = "RVzRCICnx7YdEK3Vgq1B";
const CALL_LABEL = "K3yjCJyVyLYdEK3Vgq1B";

/* Called by the quote form after a real submission. Safe to call when the tag is off. */
export function trackGoogleLead() {
  if (!GOOGLE_ADS_ID) return;
  window.gtag?.("event", "conversion", { send_to: `${GOOGLE_ADS_ID}/${LEAD_LABEL}` });
}

export function GoogleTag() {
  useEffect(() => {
    if (!GOOGLE_ADS_ID) return;
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.('a[href^="tel:"]');
      if (!a) return;
      window.gtag?.("event", "conversion", { send_to: `${GOOGLE_ADS_ID}/${CALL_LABEL}` });
    };
    /* Capture phase, so a link whose own handler stops propagation is still counted. */
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  if (!GOOGLE_ADS_ID) return null;

  return (
    <>
      <Script
        id="google-tag-src"
        src={`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GOOGLE_ADS_ID)}`}
        strategy="afterInteractive"
      />
      <Script id="google-tag" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
window.gtag = gtag;
gtag('js', new Date());
gtag('config', ${JSON.stringify(GOOGLE_ADS_ID)});`}
      </Script>
    </>
  );
}
