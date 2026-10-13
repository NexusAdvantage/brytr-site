import type { Metadata } from "next";

/* The share-card defaults, pulled out of the root layout so a page can set og:url without
 * losing them. Next merges metadata SHALLOWLY: a page that declares `openGraph` at all
 * replaces the layout's whole object, image included. Spreading this back in is the
 * pattern the Next docs give for exactly that case. og:title and og:description are not
 * here on purpose - Next fills them from the page's own title and description. See the
 * note in app/layout.tsx for why the image dimensions are 2400x1350. */
export const baseOpenGraph = {
  type: "website",
  locale: "en_US",
  siteName: "Brytr Co",
  images: [{
    url: "/img/seq-everyday.jpg",
    width: 2400,
    height: 1350,
    alt: "A brick and cedar ranch west of Omaha at dusk, its roofline picked out in warm white",
  }],
} satisfies Metadata["openGraph"];

/* Canonical and og:url from one path, so the two cannot disagree. Ahrefs flagged all
 * sixty-two pages for "Open Graph tags incomplete" because og:url was never set; the
 * canonical was already right on every one of them. Relative paths resolve against the
 * layout's metadataBase. */
export function pageUrl(path: string): Pick<Metadata, "alternates" | "openGraph"> {
  return {
    alternates: { canonical: path },
    openGraph: { ...baseOpenGraph, url: path },
  };
}
