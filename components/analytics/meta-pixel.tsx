"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Script from "next/script";

/* THE META PIXEL. Rendered once, in the root layout, inside body.
 *
 * WHY THE ID COMES FROM THE ENVIRONMENT AND NOT A CONSTANT. A pixel id is not a secret, so this is
 * not about hiding it. It is about preview deployments and local work: with the variable unset this
 * component renders nothing at all, so a developer running the site locally, and any preview build
 * where the variable has not been added, cannot post events into the live pixel and inflate the
 * client's reporting. Set NEXT_PUBLIC_META_PIXEL_ID in Vercel to switch it on.
 *
 * WHY afterInteractive. beforeInteractive would block on a third party domain ahead of the page's
 * own code for a tag that measures the page rather than renders it. afterInteractive loads it early
 * but out of the critical path, which is what Meta's own Next.js guidance asks for.
 *
 * THE PAGEVIEW RULE, AND THE DOUBLE FIRE THIS AVOIDS. Meta's base snippet ends with its own
 * fbq('track', 'PageView'), which covers the first load. This site is an App Router app, so moving
 * between pages is a client navigation: the root layout does not remount, the inline script does
 * not run again, and without the effect below a visitor who read four pages would be recorded as
 * having read one.
 *
 * The naive fix is an effect on pathname that tracks a PageView whenever it changes. That fires on
 * mount as well, which lands a SECOND PageView on top of the one the snippet already sent, on every
 * single hard load. The ref below is the whole of the fix: the first run is the load the snippet
 * already counted, so it is skipped, and only real route changes after it are tracked. One PageView
 * per page viewed, never two for one view.
 */
const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;

export function MetaPixel() {
  const pathname = usePathname();
  const firstRender = useRef(true);

  useEffect(() => {
    if (!PIXEL_ID) return;
    /* The load itself is already counted by the snippet. Skip it, track everything after it. */
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    window.fbq?.("track", "PageView");
  }, [pathname]);

  if (!PIXEL_ID) return null;

  return (
    <>
      {/* Meta's base code, pasted rather than tidied. It installs the queue, loads fbevents.js,
        * inits the pixel and sends the first PageView, in that order, and the order is what makes
        * the queue work for calls made before the script arrives. */}
      <Script id="meta-pixel" strategy="afterInteractive">
        {`!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', ${JSON.stringify(PIXEL_ID)});
fbq('track', 'PageView');`}
      </Script>
      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          alt=""
          src={`https://www.facebook.com/tr?id=${encodeURIComponent(PIXEL_ID)}&ev=PageView&noscript=1`}
        />
      </noscript>
    </>
  );
}
