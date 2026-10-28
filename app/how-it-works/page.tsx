import type { Metadata } from "next";
import { pageUrl } from "@/lib/seo";
import Link from "next/link";
import { Shell } from "@/app/layout-shell";
import { PageHero, PageCta, SectionHead, TextLink } from "@/components/sections/page-parts";
import { InstallDaySequence } from "@/components/sections/install-day";
import { PhotoStrip } from "@/components/sections/photo-parts";
import { ChannelDetail } from "@/components/sections/channel-detail";

import { Jsonld, breadcrumb } from "@/lib/schema";
import { ValueBand } from "@/components/sections/value-band";
import { valueProps } from "@/content/value-props";

/* /how-it-works — WAVE 2, PAGE 1 of the page-by-page pass.
 *
 * What it was: five numbered steps in 3rem ghost numerals — the exact pattern the client
 * called lazy — of which the first three were the consultation described for a second
 * time, and /free-design-consultation is now a thousand words on that hour by itself. Each
 * step was illustrated with the same drawn house at a different massing, one quote panel
 * carried invented specifics ("244 ft", "11 corners mitered"), the hero had no photograph,
 * and the page closed on a six-card grid plus two stacked closers.
 *
 * So the scope changed rather than the layout. The consultation page owns the hour before
 * you buy. This page owns INSTALL DAY, and nothing else — which is what somebody reading
 * "how it works" after they have already had the quote actually wants.
 *
 * The centerpiece is the same eight inches of fascia board four times, bare to lit, with
 * amber in the last frame only, because three quarters of install day happens with the
 * system dark. Then the work that is not visible in that drawing, then where we differ
 * from the trade as a comparison rather than as six cards, then the two bookends.
 *
 * Archetype: home hero → four-frame technical sequence → invisible-work list → us-against-
 * the-trade comparison → bookend two-up. Closer: one, the phone band.
 */

export const metadata: Metadata = {
  title: "How It Works: Consultation to Install",
  description:
    "How a Brytr install works: a free design consultation at your house, a written quote, the install, and service afterwards.",
  ...pageUrl("/how-it-works"),
};
const trail = [{ name: "Home", href: "/" }, { name: "How it works", href: "/how-it-works" }];

/* THE WORK THAT IS NOT IN THE DRAWING. Everything above the fascia line is easy to
 * picture; this is the half of the day nobody thinks about until it goes wrong.
 *
 * TWO OF THESE CHANGED HANDS, 29 Aug 2026. "Where the driver lives... Picked with you" and
 * "Zones wired the way you asked" both described a decision as the customer's, and Brytr makes
 * both of them. And "Miters at every transition" is gone with the rest of the mitre claim. */
const invisible: [string, string][] = [
  ["Zones", "Different parts of the house can be set up as separate zones in the app."],
  ["Wiring", "We handle the wiring as part of the install."],
  ["Adding more later", "You can add lighting later, such as landscape or patio lighting."],
  ["Service", "Call us for service on anything we installed."],
];

/* REWRITTEN Oct 2026 as a neutral list of steps. It used to contrast Brytr with "the usual way"
 * in the trade. The component still has three columns, so `trade` now holds plain detail
 * about the step and is not a comparison. */
const differences: { h: string; us: string; trade: string }[] = [
  { h: "Design consultation", us: "We visit and design it with you at your house.", trade: "Free, with a written quote." },
  { h: "Choosing a system", us: "Jellyfish or Haven, picked with you.", trade: "Both are permanent and app controlled." },
  { h: "The install", us: "We handle the install.", trade: "The lighting stays up year round." },
  { h: "Your scenes", us: "Set up in the app.", trade: "Warm white, holidays, gameday or your own colors." },
  { h: "Afterwards", us: "Call us for service on anything we installed.", trade: "402-810-3973" },
  /* THE COVENANT ROW IS GONE, both halves of it, 27 Aug 2026.
   *
   * "We pull the rules for your neighborhood, read them, and file the submission ourselves" is an
   * HOA administration service nobody at Brytr has said they provide. Paired against it, "Discovered
   * after the board says no, with a deposit already paid" asserted both how competitors bill and
   * that they get it wrong.
   *
   * The row is removed rather than half-rewritten because this component pairs a claim about us
   * against a claim about the trade, and a pair where one side is invented is not repaired by
   * softening the other. The same HOA claim survives in content/faqs.ts and on the areas pages -
   * it is on the list, it is not pricing, and it is not fixed here.
   */
];

export default function HowItWorks() {
  return (
    <Shell>
      <Jsonld data={breadcrumb(trail)} />

      <PageHero
        photo="/img/g-gable-detail.jpg"
        photoAlt="Close view of two Omaha gables with the channel following the rake line to the peak, one gable red and one blue"
        objectPosition="50% 30%"
        /* WAS "All of it happens to your fascia board.", with a lede about "the eight inches
          * between your shingles and your gutter". The client's punch list: "Not sure what this
          * means." A headline that has to be decoded is not a headline. */
        h1="How it works, from consultation to install."
        lede="We visit, design it with you, give you a written quote, and handle the install. We are here for service afterwards."
        trail={trail}
      />

      {/* THE VALUE BAND, directly under the trust plinth, same as every other page. It states the
        * offer once before this page gets specific about its own subject. Shape is shared, content
        * is written against this page in content/value-props.ts. See the note on the component. */}
      <ValueBand {...valueProps["/how-it-works"]} ground="card" />


      {/* ── THE FASCIA, FOUR TIMES ──
        * The centerpiece. Same board, four states, amber in the last one only. */}
      <section className="section bg-raise">
        <div className="shell">
          <SectionHead
            onDark
            title="The install, start to finish."
          />
          <div className="mt-10"><InstallDaySequence /></div>
          <p className="mt-7 max-w-[76ch] text-sm leading-relaxed text-on-dark-muted">
            A simple drawing of the roof edge.{" "}
            <Link
              href="/services/permanent-roofline-lighting"
              className="text-on-dark underline decoration-accent decoration-2 underline-offset-4"
            >
              Roofline lighting in more detail
            </Link>.
          </p>
        </div>
      </section>

      {/* ── THE HALF OF THE DAY THAT IS NOT IN THE DRAWING ── */}
      <section className="section bg-card">
        <div className="shell grid items-start gap-10 lg:grid-cols-[40fr_60fr] lg:gap-14">
          <div>
            <h2 className="mt-4 text-[clamp(1.75rem,3vw,2.5rem)] leading-[1.06] text-foreground">
              A few more things.
            </h2>
            <div className="prose-body mt-6 space-y-4">
            {/* ONE PARAGRAPH. rules.md bans a second body paragraph stacked under a heading, and the
              * measured count was twelve of these on one service page and fifteen on a city page.
              * Kept whichever of the two carried the claim rather than the run-up to it. */}
              <p className="text-lg text-foreground">
                What else to know about an install.
              </p>
            </div>
            <div className="mt-7"><TextLink href="/about">About Brytr</TextLink></div>
          </div>

          <ul className="divide-y divide-border border-y border-border">
            {invisible.map(([h, p]) => (
              <li key={h} className="py-5">
                <h3 className="font-display text-[1.05rem] font-bold text-foreground">{h}</h3>
                <p className="mt-1.5 text-[0.95rem] leading-relaxed text-muted-foreground">{p}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── THE DAY, PHOTOGRAPHED ──
        * Everything above this on this page is a measured drawing. Drawings are the right tool
        * for explaining a fixing detail and the wrong one for answering "what will my Tuesday
        * be like" — so the drawings stay and these three sit under them. Nothing is staged: two
        * of them are mid-install and the third is the walkthrough at the end of it. */}
      <PhotoStrip
        title="Install day."
        lede="A few photos from installs."
        shots={[
          { photo: "installDayGarage", caption: "An install getting started." },
          { photo: "installDayPavilion", caption: "Lighting going on a poolside pavilion." },
          { photo: "walkthroughDusk", caption: "The finished lighting at dusk." },
        ]}
        cols={3}
        ground="raise"
      />

      {/* ── US AGAINST THE TRADE ──
        * Four claims, each with the alternative named. "We care about quality"
        * means nothing until you say what the other option looks like. The covenant row, the mitre
        * row and the curb-check row all came out - see the note on `differences`. */}
      <section className="section bg-muted">
        <div className="shell">
          <SectionHead
            title="How it works, step by step."
          />

          <div className="mt-10 overflow-hidden rounded-lg bg-card shadow-[var(--shadow-lg)] ring-1 ring-border">
            <div className="hidden border-b border-border bg-primary px-6 py-4 lg:grid lg:grid-cols-[30fr_35fr_35fr] lg:gap-8">
              <p className="label text-on-dark-muted">The step</p>
              <p className="label flex items-center gap-3 text-on-dark">
                <span className="block h-4 w-1 bg-accent" aria-hidden />
                What happens
              </p>
              <p className="label text-on-dark-muted">Details</p>
            </div>
            <ul className="divide-y divide-border">
              {differences.map((d) => (
                <li key={d.h} className="grid gap-3 px-6 py-5 lg:grid-cols-[30fr_35fr_35fr] lg:gap-8">
                  <h3 className="font-display text-[1.05rem] font-bold leading-snug text-foreground">{d.h}</h3>
                  <div>
                    <p className="label mb-1.5 text-accent-ink lg:hidden">What happens</p>
                    <p className="text-[0.95rem] leading-relaxed text-foreground">{d.us}</p>
                  </div>
                  <div>
                    <p className="label mb-1.5 text-muted-foreground lg:hidden">Details</p>
                    <p className="text-[0.95rem] leading-relaxed text-muted-foreground">{d.trade}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
            Questions about any step? Ask us at the consultation.
          </p>
        </div>
      </section>

      {/* ── THE TWO BOOKENDS ──
        * Everything before the van and everything after it, so the page stays
        * about install day without pretending the day is the whole relationship. */}
      <section className="section bg-primary">
        <div className="shell">
          <SectionHead
            onDark
            title="Before and after the install."
          />

          {/* THE EAVE SECTION, moved here from the home page. It was in a tall column there and sat
            * letterboxed; this page is the one that exists to explain what it draws, and here it
            * gets the full shell width. Inside the existing section rather than as a new one, so
            * scripts/section-rhythm.mjs sees no new ground. */}
          <div className="mt-10 overflow-hidden rounded-lg ring-1 ring-on-dark/10">
            <ChannelDetail className="block w-full" />
          </div>

          <div className="mt-10 grid gap-5 lg:grid-cols-2">
            <article className="flex flex-col rounded-lg bg-raise p-7 ring-1 ring-on-dark/10">
              <h3 className="font-display text-2xl font-bold text-on-dark">Before</h3>
              <p className="mt-3 text-[1.05rem] leading-relaxed text-on-dark/85">
                A visit and a written quote.
              </p>
              <ul className="mt-6 flex-1 divide-y divide-on-dark/10 border-y border-on-dark/10">
                {[
                  ["The consultation", "Free. We visit and design it with you."],
                  ["The written quote", "Yours to look over."],
                  ["Your HOA", "If you have one, check its rules on exterior lighting."],
                ].map(([h, p]) => (
                  <li key={h} className="py-4">
                    <p className="font-display text-[0.95rem] font-bold text-on-dark">{h}</p>
                    <p className="mt-1 text-sm leading-relaxed text-on-dark-muted">{p}</p>
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex flex-wrap gap-x-7 gap-y-2">
                <TextLink onDark href="/free-design-consultation">About the consultation</TextLink>
              </div>
            </article>

            <article className="flex flex-col rounded-lg bg-raise p-7 ring-1 ring-on-dark/10">
              <h3 className="font-display text-2xl font-bold text-on-dark">After</h3>
              <p className="mt-3 text-[1.05rem] leading-relaxed text-on-dark/85">
                We are here for service afterwards.
              </p>
              <ul className="mt-6 flex-1 divide-y divide-on-dark/10 border-y border-on-dark/10">
                {[
                  ["Something stops working", "Call us. We service anything we installed."],
                  ["You want to add more", "You can add lighting later, such as landscape or patio lighting."],
                  ["Questions about the app", "Call us and we can help."],
                ].map(([h, p]) => (
                  <li key={h} className="py-4">
                    <p className="font-display text-[0.95rem] font-bold text-on-dark">{h}</p>
                    <p className="mt-1 text-sm leading-relaxed text-on-dark-muted">{p}</p>
                  </li>
                ))}
              </ul>
            </article>
          </div>
        </div>
      </section>

      <PageCta variant="phone" photos={valueProps["/how-it-works"].photos} omit={["/how-it-works"]} />
    </Shell>
  );
}
