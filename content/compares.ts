/* THE ONE COMPARISON, 29 Oct 2026.
 *
 * Zac's answers: yes to a Jellyfish vs Haven comparison only, no comparisons with other brands,
 * show both equally, mention the two brands and the range of spacing options. Every row below is
 * from those answers. Nothing here ranks one brand over the other.
 *
 * The other-brand pages (Gemstone, Trimlight, Oelo, Govee and the rest) are gone for good, not
 * hidden. Their old URLs redirect to this page from next.config.ts. */
export type Row = { spec: string; a: string; b: string };
export type Compare = {
  slug: string;
  title: string;
  h1: string;
  keyword: string;
  a: string;
  b: string;
  verdict: string;
  aWinsHead: string;
  bWinsHead: string;
  aWins: string[];
  bWins: string[];
  rows: Row[];
  costA: string;
  costB: string;
  stance: string;
  labor?: boolean;
};

export const compares: Compare[] = [
  {
    slug: "jellyfish-vs-haven",
    title: "Jellyfish vs Haven Permanent Lighting | Omaha",
    h1: "Jellyfish and Haven, side by side.",
    keyword: "jellyfish vs haven lighting",
    a: "Jellyfish Lighting",
    b: "Haven Evolution",
    verdict:
      "We're an authorized Nebraska dealer for both Jellyfish and Haven. They're two different products with different looks, features and prices, so at every consultation we walk you through both side by side.",
    aWinsHead: "Jellyfish Lighting",
    bWinsHead: "Haven Evolution",
    aWins: [
      "9 inch LED spacing standard",
      "6 inch spacing on request",
      "Controlled from the Jellyfish app",
    ],
    bWins: [
      "Fully customizable spacing, from a continuous line of light to any spacing you want",
      "The Haven system we specialize in",
      "Controlled from the Haven app",
    ],
    rows: [
      { spec: "Manufacturer", a: "Jellyfish Lighting", b: "Haven Lighting" },
      { spec: "LED spacing", a: "9 inch standard, 6 inch on request", b: "Fully customizable, from continuous linear light to any spacing" },
      { spec: "Color", a: "Full color and white", b: "Full color and white" },
      { spec: "App", a: "Jellyfish app", b: "Haven app" },
      { spec: "Mounted", a: "To your soffit", b: "To your soffit" },
      { spec: "Warranty", a: "Lifetime product warranty", b: "Lifetime product warranty" },
      { spec: "Installed by", a: "Brytr", b: "Brytr" },
    ],
    costA: "Authorized dealer",
    costB: "Authorized dealer",
    stance: "We install both",
  },
];

export const compareBySlug = (slug: string) => compares.find((c) => c.slug === slug);

/* The only comparison URL on the site. Links use this so there is one place to change it. */
export const COMPARE_URL = "/compare/jellyfish-vs-haven";

/* Kept so older imports still compile. The comparison is live again as of 29 Oct 2026. */
export const COMPARE_HIDDEN = false;
