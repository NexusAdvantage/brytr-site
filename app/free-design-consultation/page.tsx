import type { Metadata } from "next";
import { pageUrl } from "@/lib/seo";
import { site } from "@/content/site";
import { reviews } from "@/content/reviews";
import { getReviewProof } from "@/lib/review-proof";
import { Shell } from "@/app/layout-shell";
import { PageHero, PageCta, SectionHead, Check, TextLink } from "@/components/sections/page-parts";
import { PhotoPair } from "@/components/sections/photo-parts";
import { Jsonld, breadcrumb } from "@/lib/schema";
import { ValueBand } from "@/components/sections/value-band";
import { valueProps } from "@/content/value-props";

/* /free-design-consultation — REWRITTEN 29 Aug 2026 against the client's punch list, and this is
 * the page that had drifted furthest from the truth on the whole site.
 *
 * WHAT CAME OUT, and why. Every one of these was written to sound like a company that does not
 * sell you anything, and Brytr never asked for that page:
 *
 *   THE HOUR, beat by beat        Five timed steps from 0:00 to 0:55. "No folder, no tablet
 *                                 presentation" - there is a folder and there is a presentation.
 *                                 "You, us, and a flashlight" - no. "This is why evenings are
 *                                 better" - appointments are daytime. "Quiet. Bring a drink" -
 *                                 the client's reaction to that one was "what??", which is fair.
 *                                 "Nothing to sign that evening" - there is something to sign.
 *   THE DESIGN SUMMARY SHEET      A facsimile of a one-page leave-behind with ruled blanks for
 *                                 linear feet, mitered corners and zones. No such sheet exists.
 *                                 It was the centerpiece of the page and it was a prop.
 *   "you keep the drawing"        In the H1 and the lede. There is no drawing.
 *   WHAT WILL NOT HAPPEN          Three promises, all false: no price that expires tonight (there
 *                                 are same-day savings), no manager on the phone, no follow-up
 *                                 sequence (there is one).
 *   THE COVENANT BULLETS          HOA has never been a problem and the client does not want it
 *                                 raised on site, so the whole HOA thread comes off this page.
 *   "An evening slot"             No evening visits.
 *   "A sample run, powered"       A demo rig nobody has confirmed.
 *
 * WHAT THE PAGE IS NOW: the four things that genuinely happen - we walk it, we measure it, we
 * show you the scenes on the app, you get a written quote - and nothing around them. It is a
 * shorter page than it was and that is the correct outcome; the previous length was invention.
 *
 * The one thing this page must not do again is describe the appointment as softer than it is.
 * It is a sales visit. What is defensible is that the number is measured rather than guessed.
 */

export const metadata: Metadata = {
  title: "Free Lighting Design Consultation | Omaha",
  description: "Book a free permanent lighting design consultation at your home in the Omaha metro. About an hour, both Jellyfish and Haven, and exact pricing at the visit.",
  ...pageUrl("/free-design-consultation"),
};
const trail = [{ name: "Home", href: "/" }, { name: "Free design consultation", href: "/free-design-consultation" }];

/* WHAT ACTUALLY HAPPENS. Four things, no clock against them, and every one is something the
 * client has confirmed. If a step cannot be stated without a qualifier it does not belong here. */
const steps: { h: string; p: string }[] = [
  {
    h: "At your home",
    p: "Every consultation is at your home and takes about an hour. Mornings, afternoons or evenings all work.",
  },
  {
    h: "We measure",
    p: "We measure with a laser. We never quote off a photo or Google Earth.",
  },
  {
    h: "You see both",
    p: "We turn on our demo kit so you can see Jellyfish and Haven in person.",
  },
  {
    h: "Exact pricing",
    p: "We price out both options and answer any questions about the install before we leave.",
  },
];

export default async function Consult() {
  const reviewProof = await getReviewProof();
  const quote = reviews.find((r) => r.name === "Meghan Gibbons") ?? reviews[0];

  return (
    <Shell>
      <Jsonld data={breadcrumb(trail)} />

      <PageHero
        photo="/img/hero-warm-white.jpg"
        photoAlt="An Omaha two-story with every roofline run on the same soft pink, and the front walk and beds lit as well as the roofline"
        objectPosition="22% 62%"
        /* WAS "An hour on your property, and you keep the drawing." There is no drawing. What you
          * actually leave with is a written number, so that is what the headline says. */
        h1="A free design consultation at your house."
        lede="About an hour at your home. We show you both products and give you exact pricing before we leave."
        trail={trail}
      />

      {/* THE VALUE BAND, directly under the trust plinth, same as every other page. It states the
        * offer once before this page gets specific about its own subject. Shape is shared, content
        * is written against this page in content/value-props.ts. See the note on the component. */}
      <ValueBand {...valueProps["/free-design-consultation"]} ground="muted" />


      {/* ── WHAT THE VISIT INVOLVES ──
        * Was a five-beat clock down the left with a facsimile leave-behind sheet beside it. Both
        * are gone; the sheet does not exist and the clock was written rather than observed. Four
        * cards across, so the section fills without a column of invented detail holding it up. */}
      <section className="section bg-card">
        <div className="shell">
          <SectionHead
            title="What the visit involves."
          />

          <ol className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s) => (
              <li
                key={s.h}
                className="flex flex-col rounded-lg bg-background p-7 shadow-[var(--shadow-lg)] ring-1 ring-border"
              >
                <h3 className="font-display text-[1.15rem] font-bold leading-snug text-foreground">{s.h}</h3>
                <p className="mt-3 flex-1 text-[0.95rem] leading-relaxed text-muted-foreground">{s.p}</p>
              </li>
            ))}
          </ol>

          <p className="mt-8 max-w-[80ch] text-sm leading-relaxed text-muted-foreground">
            Questions before you book? Call {site.phone}.
          </p>
        </div>
      </section>

      {/* ── WHAT WE BRING, AND WHAT HELPS ──
        * The kit list is three items now rather than four: "A sample run, powered" described a
        * demo rig nobody has confirmed we carry. The right-hand list lost the covenant bullets and
        * the evening slot - see the note at the top of this file. */}
      <section className="section bg-muted">
        <div className="shell">
          <SectionHead
            title="What to expect, and what helps."
          />

          <div className="mt-10 grid gap-5 lg:grid-cols-2">
            <div className="flex flex-col rounded-lg bg-card p-7 shadow-[var(--shadow-lg)] ring-1 ring-border">
              <h3 className="font-display text-2xl font-bold text-foreground">What you get</h3>
              <p className="mt-3 text-[1.05rem] leading-relaxed text-muted-foreground">
                What the consultation covers.
              </p>
              <ul className="mt-6 flex-1 divide-y divide-border border-y border-border">
                {[
                  ["A visit", "About an hour at your home."],
                  ["Both products", "Jellyfish and Haven, lit up with our demo kit."],
                  ["Exact pricing", "For both options, at the visit."],
                  ["Financing", "Available. Ask us about it."],
                ].map(([h, p]) => (
                  <li key={h} className="py-4">
                    <p className="font-display text-[0.95rem] font-bold text-foreground">{h}</p>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{p}</p>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col rounded-lg bg-primary p-7 shadow-[var(--shadow-dark)] ring-1 ring-on-dark/10">
              <h3 className="font-display text-2xl font-bold text-on-dark">Handy, not required</h3>
              <p className="mt-3 text-[1.05rem] leading-relaxed text-on-dark/85">
                None of these are required, but they can help.
              </p>
              <ul className="mt-6 flex-1 space-y-3.5">
                <Check onDark>Anyone else who should have a say</Check>
                <Check onDark>A rough idea of which elevations matter to you and which do not</Check>
                <Check onDark>Any photograph of a house you liked, even a screenshot</Check>
                <Check onDark>Whether there is a rear elevation you actually use in the evening</Check>
                <Check onDark>Any window you would rather we did not throw light into</Check>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── THE HOUR, PHOTOGRAPHED ──
        * The lede here used to be "Warm white on red brick is a different colour from warm white on
        * white siding", which the client read and wrote "What??" beside. It was also the colour-
        * matching argument in disguise. What these two frames actually show is the measure and the
        * handover, so that is what the copy says now. */}
      <PhotoPair
        title="From the install to the finished lighting."
        lede="Lighting going on a pavilion, and a finished install at dusk."
        a="installDayPavilion"
        b="walkthroughDusk"
        aLabel="Lighting going on a poolside pavilion."
        bLabel="Finished lighting at dusk."
        ground="card"
      />

      {/* ── WHY PEOPLE BOOK IT ──
        * WAS "What will not happen in your driveway": three promises, none of them true. It is
        * deleted rather than softened, because the honest version of that section is short enough
        * to be one paragraph, and because a page that oversells how gentle the appointment is has
        * the same problem as a page that oversells the product. The review and the phone panel are
        * kept - they were the only load-bearing things in that section. */}
      <section className="section bg-primary">
        <div className="shell">
          <SectionHead
            onDark
            title="What you get."
          />

          <div className="mt-10 grid gap-10 lg:grid-cols-[56fr_44fr] lg:gap-14">
            <div>
              <p className="text-lg leading-relaxed text-on-dark/85">
                A lighting design for your home and exact pricing on both brands, at no charge.
              </p>
              <p className="mt-5 text-[1.02rem] leading-relaxed text-on-dark-muted">
                If you have questions afterwards, call us.
              </p>
              <div className="mt-7">
                <TextLink onDark href="/gallery">See finished installs first</TextLink>
              </div>
            </div>

            <div className="space-y-5">
              <figure className="rounded-lg bg-raise p-7 ring-1 ring-on-dark/10">
                <p className="u text-sm font-medium text-accent">
                  {reviewProof.average} on {reviewProof.platform}
                  <span className="text-on-dark-muted"> · {reviewProof.countLabel} reviews</span>
                </p>
                <blockquote className="mt-4 text-[1.15rem] leading-relaxed text-on-dark">
                  “{quote.text}”
                </blockquote>
                <figcaption className="mt-5 border-t border-on-dark/12 pt-4 text-sm text-on-dark-muted">
                  {quote.name}
                  {quote.when ? ` · ${quote.when}` : ""} · Google
                </figcaption>
                <div className="mt-5">
                  <TextLink onDark href="/reviews">Read the rest</TextLink>
                </div>
              </figure>

              <div className="rounded-lg bg-raise p-7 ring-1 ring-on-dark/10">
                <p className="label text-accent">Rather just talk</p>
                <a href={site.phoneHref} className="u mt-2.5 block text-[clamp(1.6rem,3vw,2.1rem)] font-medium leading-none text-on-dark hover:text-accent">
                  {site.phone}
                </a>
                {/* WAS: "Same-day reply most days. We can give you the per-foot basis and a
                  * range over the phone before anybody schedules anything." Two unsourced claims
                  * in one sentence - a reply-time promise and a pricing basis we would quote over
                  * the phone. Both removed 27 Aug 2026. What is left is what a phone number is
                  * actually for. */}
                <p className="mt-4 text-sm leading-relaxed text-on-dark-muted">
                  Mon to Sat, 8am to 8pm.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The closer cannot repeat this page's own H1 back at somebody who has just read
        * the page, and it cannot offer to book the thing they are already on the page for.
        * So it makes the other argument: pick up the phone instead. */}
      <PageCta
        variant="phone"
        photos={valueProps["/free-design-consultation"].photos}
        title="Or skip the form and just call."
        body="Call us with any questions about the consultation."
        panelLink={{ href: "/gallery", label: "See finished installs first" }}
      />
    </Shell>
  );
}
