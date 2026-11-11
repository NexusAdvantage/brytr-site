import type { Metadata } from "next";
import { pageUrl } from "@/lib/seo";
import { Header, MobileCallBar } from "@/components/site/header";
import { navTree } from "@/content/nav";
import { Footer } from "@/components/site/footer";
import { SiteHero } from "@/components/sections/site-hero";
import { ValueBand } from "@/components/sections/value-band";
import { Services, HowWeWork, Reviews, Faqs, Closer } from "@/components/sections/home";
import { Jsonld, localBusiness } from "@/lib/schema";

/* /permanent-lighting-quote, THE GOOGLE ADS LANDING PAGE. Built 11 Nov 2026 for the branded search
 * campaign, in place of ads.brytrco.com, which was a separate builder page that looked nothing like
 * the site the client paid for.
 *
 * WHO LANDS HERE. Someone who typed "brytr" into Google, so they already know the name and are
 * checking they found the right company. The page has one job: confirm it, and put the form and the
 * phone in front of them. Every section below is an existing home page component, unchanged, so the
 * ad lands on the same design as everything else and nothing here can drift from it.
 *
 * NOINDEX. This is the home page's argument in a shorter order. Indexed, it would compete with the
 * home page for the brand query it was built to catch in paid. It stays out of the sitemap too.
 *
 * WHAT IS LEFT OUT, and why:
 *   SceneWipe    the drag demo. Proof of a claim a brand searcher is not doubting yet.
 *   WhoWeAre     the long mosaic. The value band already says local crew in one line.
 *   RecentWork   its first tile is the hero photograph on this page, and the rule is that the hero
 *                is not a property shown elsewhere on the same page. Reviews carry the proof here.
 *
 * GROUNDS: photograph, muted, card, muted, raise, card, muted. No two neighbours share one.
 */
export const metadata: Metadata = {
  title: "Permanent Lighting Quote | Omaha",
  description: "Permanent roofline and landscape lighting installed by a local Omaha crew. Book a free design consultation and get a written quote.",
  robots: { index: false, follow: true },
  ...pageUrl("/permanent-lighting-quote"),
};

/* THE VALUE BAND CONTENT lives here rather than in content/value-props.ts because this page is not
 * part of the site's navigation and nothing else will ever key into it. The three points are the
 * same confirmed claims as CORE in that file, copied word for word. */
const value = {
  title: "Permanent lighting, fitted once by a local crew.",
  points: [
    { h: "Installed once, and left there",
      p: "Routed into your fascia and sealed. No ladder in November, nothing to take down in January." },
    { h: "Any color, any night, one app",
      p: "Warm white most of the year, red and green in December, team colors on a Saturday. Same run." },
    { h: "The crew that fits it is local",
      p: "The shop is in west Omaha, and the people who measure your roofline are the people who come back to it." },
  ],
  photos: ["homeBrickGablesGold", "gamedayRedFull", "christmasRedGreenGables"],
  cta: { href: "/free-design-consultation", label: "Book a free design" },
};

export default function PermanentLightingQuote() {
  return (
    <>
      <Jsonld data={localBusiness()} />
      <Header nav={navTree} />
      <main>
        <SiteHero
          h1="Permanent lighting for Omaha homes, installed once."
          lede="Roofline and landscape lighting you control from one app, every color and every holiday. Tell us about the house and we will come out and measure it."
          photo="/img/home-prairie-twilight.jpg"
          photoAlt="An Omaha prairie style home at civil twilight with warm white along every roofline"
          objectPosition="50% 60%"
        />
        <ValueBand {...value} ground="muted" />
        <Services />
        <Reviews />
        <HowWeWork />
        <Faqs />
        <Closer />
      </main>
      <Footer />
      <MobileCallBar />
    </>
  );
}
