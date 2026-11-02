"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { captureFirstTouch } from "@/lib/attribution";

/* RUNS captureFirstTouch ON LOAD. Renders nothing.
 *
 * It sits in the root layout beside the pixel so the capture happens on whichever page the visitor
 * lands on, which for an ad click is usually not the home page.
 *
 * WHY IT WATCHES pathname. An ad can land on any route, and a client navigation does not remount
 * the layout, so a mount only effect would miss a campaign tagged link followed from inside the
 * site. captureFirstTouch is cheap and refuses to overwrite anything already stored, so running it
 * again on every route change costs a URL parse and changes nothing once a value exists.
 *
 * WHY NOT useSearchParams. It is the obvious hook for reading query parameters and it would opt
 * every page on this site out of static rendering, because a component in the root layout that
 * reads it forces the whole tree to render per request. window.location.search is read inside an
 * effect, which only ever runs in the browser, so the seventy odd prerendered pages stay
 * prerendered.
 */
export function FirstTouchAttribution() {
  const pathname = usePathname();

  useEffect(() => {
    captureFirstTouch();
  }, [pathname]);

  return null;
}
