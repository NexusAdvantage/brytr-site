import type { Metadata } from "next";
import { pageUrl } from "@/lib/seo";
import Link from "next/link";
import { Shell } from "@/app/layout-shell";
import { PageHero, PageCta, SectionHead, TextLink } from "@/components/sections/page-parts";
import { PhotoStrip } from "@/components/sections/photo-parts";

import { Jsonld, breadcrumb } from "@/lib/schema";
import { site } from "@/content/site";
import { cities } from "@/content/cities";
import { reviewProof } from "@/content/reviews";
import { ValueBand } from "@/components/sections/value-band";
import { valueProps } from "@/content/value-props";
import { COMPARE_HIDDEN, COMPARE_URL } from "@/content/compares";

/* /about — WAVE 2, PAGE 2 of the page-by-page pass.
 *
 * What it was: no photograph in the hero, a drawn elevation standing in for a picture of
 * the company, "5.0 from 177 reviews" in the hero (the profile says 196, and the figure
 * was hardcoded in two places on this page alone), the same numbers printed twice — once
 * as hero stats and once as a band forty lines later — two portrait slots with no
 * portraits in them, a four-card grid of one-line commitments, the eighteen-city rack that
 * ten other templates also carried, and two closers stacked at the bottom.
 *
 * What it is now. An about page's only real job is to answer "why should this company get
 * my money rather than the other three quotes". Brytr's honest answer is structural: the
 * business is deliberately set up to make less money in four specific ways, and each one
 * is checkable. So the centerpiece is WHAT WE MAKE LESS MONEY ON — the decision, what it
 * costs us, and why it stands anyway. Nothing on it is a feeling.
 *
 * The founder cards are landscape monogram panels rather than empty 4/5 portrait boxes,
 * because an about page with two gray rectangles where the faces go is worse than an about
 * page with no faces. Portraits are on the shot list; when they land, these become photos
 * and the layout does not move.
 *
 * Archetype: home hero → thesis split with the Haven lineup → six-card cost ledger →
 * founder two-up → sourced numbers band. Closer: one, the phone band.
 */

export const metadata: Metadata = {
  /* `absolute` bypasses the root layout's "%s | Brytr Co" template — see the note on
   * /contact. The brand is already in the title, so the template would repeat it. */
  title: { absolute: "About Brytr Co | Permanent Lighting, Omaha" },
  description:
    "Brytr Co is family owned by Zac and Sam, brothers-in-law born and raised in Omaha. Permanent roofline and landscape lighting, Jellyfish and Haven.",
  ...pageUrl("/about"),
};
const trail = [{ name: "Home", href: "/" }, { name: "About", href: "/about" }];

/* THE CENTERPIECE. Structural decisions, each one costing something specific. The
 * chip is the taxonomy — margin, time, or the sale itself — because "we put customers
 * first" is a sentence and "this one costs us the sale" is a fact you can check.
 *
 * ONE CARD WAS REPLACED, 29 Aug 2026. It read "No expiring price, no follow-up sequence" and
 * spent a paragraph explaining that Brytr uses none of the tools that increase close rate. The
 * client's punch list says there are same-day savings and there is a follow-up sequence, so the
 * card's entire subject was a practice the company does not follow.
 *
 * It is REPLACED rather than deleted because the grid spans below are index-based - three cards
 * at two columns, then two at three - and four cards would leave exactly the orphan row that
 * layout was built to avoid. The replacement is the same kind of claim and is checkable on this
 * site: the daylight frames are on the gallery, and publishing them costs sales. */
/* REWRITTEN, Oct 2026: this was "Decisions that make us less money", a ledger of claims about
 * other companies and practices Brytr never confirmed. It is now a plain description of how a
 * job works. Same five cards, so the grid spans below still hold. `cost` is the short line
 * under each card. */
const costs: { chip: string; h: string; p: string; cost: string }[] = [
  {
    chip: "Systems",
    h: "Jellyfish and Haven.",
    p: "We install both. Which one goes on your house is decided with you at the design consultation.",
    cost: "Both run from an app with scenes and schedules.",
  },
  {
    chip: "Design",
    h: "We design it with you.",
    p: "About an hour at your home. We measure with a laser, turn on our demo kit and price out both options.",
    cost: "Free, with exact pricing at the visit.",
  },
  {
    chip: "Install",
    h: "Our install crews.",
    p: "We have multiple install crews that work for us year round. The lighting goes up once and stays up.",
    cost: "Mounted to your soffit.",
  },
  {
    chip: "Control",
    h: "App training.",
    p: "After the install we come back for about an hour, set up your everyday lighting and schedule your holidays.",
    cost: "White every night, scenes on a schedule.",
  },
  {
    chip: "Service",
    h: "We are here afterwards.",
    p: "Call us for service on anything we installed. Every system is backed by our lifetime product warranty.",
    cost: "402-810-3973",
  },
];

export default function About() {
  return (
    <Shell>
      <Jsonld data={breadcrumb(trail)} />

      <PageHero
        photo="/img/g-ranch-blue-white.jpg"
        photoAlt="A single-story Omaha home in October with the roofline, front beds, rock steps and walk all lit, the entry gable set to blue"
        objectPosition="50% 42%"
        h1="About Brytr Co."
        lede="Brytr is family owned by Zac and Sam, brothers-in-law born and raised in Omaha. We install permanent roofline and landscape lighting."
        trail={trail}
      />

      {/* THE VALUE BAND, directly under the trust plinth, same as every other page. It states the
        * offer once before this page gets specific about its own subject. Shape is shared, content
        * is written against this page in content/value-props.ts. See the note on the component. */}
      <ValueBand {...valueProps["/about"]} ground="muted" />


      {/* ── THE THESIS ──
        * The argument on the left, the thing it produces on the right. */}
      <section className="section bg-card">
        <div className="shell grid items-start gap-10 lg:grid-cols-[54fr_46fr] lg:gap-14">
          <div>
            <h2 className="mt-4 text-[clamp(1.75rem,3vw,2.5rem)] leading-[1.06] text-foreground">
              Two brands, picked for your house.
            </h2>
            <div className="prose-body mt-6 space-y-4">
            {/* ONE PARAGRAPH. rules.md bans a second body paragraph stacked under a heading, and the
              * measured count was twelve of these on one service page and fifteen on a city page.
              * Kept whichever of the two carried the claim rather than the run-up to it. */}
              <p className="text-lg text-foreground">
                We&rsquo;re an authorized Nebraska dealer for both Jellyfish and Haven. They&rsquo;re two
                different products with different looks, features and prices, and at every consultation
                we walk you through both side by side.
              </p>
            </div>
            <div className="mt-7 flex flex-wrap gap-x-7 gap-y-2">
              <TextLink href="/lighting-systems">The systems we carry</TextLink>
              {!COMPARE_HIDDEN && <TextLink href={COMPARE_URL}>Jellyfish vs Haven</TextLink>}
            </div>
          </div>

          <div className="overflow-hidden rounded-lg bg-background shadow-[var(--shadow-lg)] ring-1 ring-border">
            <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-border px-6 py-4">
              <p className="label flex items-center gap-3 text-foreground">
                <span className="block h-4 w-1 bg-accent" aria-hidden />
                What we install
              </p>
              <p className="text-xs text-muted-foreground">Jellyfish and Haven</p>
            </div>
            <ul className="divide-y divide-border">
              {[
                { t: "Roofline lighting", s: "Jellyfish or Haven", when: "Permanent lighting mounted to your soffit, in full color and white, run from an app." },
                { t: "Landscape lighting", s: "The yard", when: "Path lights, uplights and lighting for beds and trees." },
                { t: "Commercial", s: "Businesses", when: "We do commercial work too." },
              ].map((x) => (
                <li key={x.t} className="px-6 py-5">
                  <p className="label text-accent-ink">{x.s}</p>
                  <h3 className="mt-1.5 font-display text-[1.15rem] font-bold text-foreground">{x.t}</h3>
                  <p className="mt-2 text-[0.95rem] leading-relaxed text-muted-foreground">{x.when}</p>
                </li>
              ))}
            </ul>
            <p className="border-t border-border bg-muted px-6 py-5 text-sm leading-relaxed text-muted-foreground">
              Every system is backed by our lifetime product warranty.{" "}
              <Link href="/services" className="font-semibold text-foreground hover:text-accent-deep">
                Everything we install
              </Link>.
            </p>
          </div>
        </div>
      </section>

      {/* ── WHAT WE MAKE LESS MONEY ON ──
        * The centerpiece. Every claim on an about page is worthless unless it
        * costs the company something, so each one here says what. */}
      <section className="section bg-primary">
        <div className="shell">
          <SectionHead
            onDark
            title="How we work."
          />

          {/* SIX COLUMNS FOR FIVE CARDS, so both rows finish on a straight edge. At three columns
            * the second row held two cards and a third of it was empty, which rules.md calls an
            * orphan and which is what the eye actually catches. Three cards spanning two columns,
            * then two spanning three: same cards, no gap, and the second row reads as the heavier
            * pair rather than as a row that ran out. */}
          <div className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-6">
            {costs.map((c, i) => (
              <article
                key={c.h}
                className={`flex flex-col rounded-lg bg-raise p-6 ring-1 ring-on-dark/10 ${
 i < 3 ? "xl:col-span-2" : "xl:col-span-3"
                }`}
              >
                {/* NO CHIP. "COSTS US MARGIN" in a bordered uppercase box is a badge, and rules.md
                  * D5 bans pills and badges anywhere. The card already ends with what it costs, in
                  * a labeled row, which is the same information said once instead of twice. */}
                <h3 className="font-display text-xl font-bold leading-snug text-on-dark">{c.h}</h3>
                <p className="mt-2.5 flex-1 text-[0.95rem] leading-relaxed text-on-dark-muted">{c.p}</p>
                <div className="mt-5 border-t border-on-dark/12 pt-4">
                  <p className="label text-on-dark-muted">In short</p>
                  <p className="mt-1.5 text-sm leading-relaxed text-on-dark/80">{c.cost}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── ZAC AND SAM ──
        * Landscape monogram panels, not empty portrait slots. There is still no photograph of
        * either of them: the library has one frame of somebody in a Brytr shirt and we cannot
        * tell from the frame who it is, and captioning it with a founder's name because it is
        * on the about page would be inventing a fact. So the monograms stay, the slot stays
        * open on /recent-projects, and when portraits arrive they drop into this same box. */}
      <section className="section bg-muted">
        <div className="shell">
          <SectionHead
            title="Zac and Sam."
          />

          <div className="mt-10 grid gap-5 lg:grid-cols-2">
            {site.founders.map((f) => (
              <article
                key={f.name}
                className="overflow-hidden rounded-lg bg-card shadow-[var(--shadow-lg)] ring-1 ring-border"
              >
                <div className="grid grid-cols-[7.5rem_1fr] items-stretch">
                  {/* the monogram, on the channel tile's own treatment */}
                  <div className="relative flex items-end bg-primary p-5">
                    <span className="u block text-[2.6rem] font-medium leading-none text-accent" aria-hidden>
                      {f.name.split(" ").map((p) => p[0]).join("")}
                    </span>
                    <span className="absolute inset-x-0 top-0 h-0.5 bg-accent" aria-hidden />
                  </div>
                  <div className="p-6">
                    <h3 className="font-display text-xl font-bold text-foreground">{f.name}</h3>
                    <p className="label mt-1 text-accent-ink">{f.role}</p>
                    {f.handles.length > 0 && (
                      <ul className="mt-4 divide-y divide-border border-t border-border">
                        {f.handles.map((h) => (
                          <li key={h} className="py-2.5 text-[0.95rem] text-muted-foreground">{h}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>

          <p className="mt-5 max-w-[84ch] text-sm leading-relaxed text-muted-foreground">
            Zac and Sam are brothers-in-law, born and raised in Omaha. They started Brytr because they
            saw growing demand for permanent exterior lighting and wanted a business that works year
            round, not just one season, and they set out to offer the best products they could find.{" "}
            <Link href="/reviews" className="font-semibold text-foreground hover:text-accent-deep">
              What customers say about working with them
            </Link>.
          </p>
        </div>
      </section>

      {/* ── THE WORK ITSELF ──
        * An about page is a page of assertions about character. Three photographs of the work
        * do more for that than another paragraph would, and the middle one has a person in it,
        * which every one of the previous four sections was talking about in the abstract. */}
      <PhotoStrip
        title="The work."
        lede="Permanent lighting along the roofline, installed once and left up."
        shots={[
          { photo: "crewRoofFascia", caption: "On the roof during an install." },
          { photo: "installDayGarage", caption: "An install in progress." },
          { photo: "walkthroughDusk", caption: "The finished lighting at dusk." },
        ]}
        cols={3}
        ground="card"
      />

      {/* ── THE NUMBERS, WITH THEIR SOURCES ──
        * Printed once on this page, not twice, and each one says where it came from. */}
      <section className="bg-raise">
        <div className="shell py-14">
          <div className="grid gap-10 lg:grid-cols-[1fr_28rem] lg:gap-14">
            {/* THREE COLUMNS, NOT FOUR. It was sm:grid-cols-4 for four figures. Removing the
              * 1.2M left three in a four-wide grid, which is a quarter of the row empty at every
              * width above sm - the blank-space failure arriving as a side effect of a copy
              * deletion, which is the least obvious way for it to arrive. Measured rather than
              * assumed: the three cells now fill the row. */}
            <dl className="grid grid-cols-2 gap-x-8 gap-y-8 sm:grid-cols-3">
              {/* "1.2M lights installed locally / Brytr's own count" WAS THE FIRST OF FOUR and it
                * is gone, 28 Aug 2026, on the client's instruction: "remove that stat of 1.2 from
                * everywhere."
                *
                * It had already been pulled off the home page once - "I don't like the 1.2m number
                * stat. Lets not do that at all" - and survived here and in content/site.ts, which
                * is the failure mode this whole pass keeps finding: a claim removed from the page
                * somebody was looking at, left standing in the two places they were not.
                *
                * Its source line said "Brytr's own count", which is the most honest thing that
                * could be written about it and still not a source. Nobody can check it, and a
                * seven-figure round number is exactly the sort of claim a reader is entitled to
                * check. Three figures left, and every one of them is verifiable: the Google rating
                * from the profile, the two brands off the shelf, and the towns off our own
                * service-area list. */}
              {[
                [reviewProof.average, `from ${reviewProof.countLabel} reviews`, reviewProof.platform],
                ["2", "brands installed", "Jellyfish and Haven"],
                [String(cities.length), "towns we serve", "The Omaha metro and Council Bluffs"],
              ].map(([f, l, src]) => (
                <div key={l}>
                  <dt className="u text-[clamp(1.8rem,3vw,2.4rem)] font-medium leading-none text-on-dark">{f}</dt>
                  <dd className="mt-2.5 text-sm leading-snug text-on-dark-muted">{l}</dd>
                  <dd className="label mt-2 text-on-dark-muted/80">{src}</dd>
                </div>
              ))}
            </dl>

            <address className="rounded-lg bg-primary p-7 not-italic ring-1 ring-on-dark/10">
              <p className="label text-accent">The shop</p>
              <p className="mt-2.5 font-display text-xl font-bold text-on-dark">{site.name}</p>
              <p className="mt-1.5 text-[0.95rem] leading-relaxed text-on-dark-muted">
                {site.address.street}
                <br />
                {site.address.city}, {site.address.state} {site.address.zip}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-on-dark-muted">
                Our office is by appointment only. Everything else happens at your home.
              </p>
              <div className="mt-5 border-t border-on-dark/12 pt-4">
                <TextLink onDark href="/service-areas">Every town we serve</TextLink>
              </div>
            </address>
          </div>
        </div>
      </section>

      <PageCta variant="phone" photos={valueProps["/about"].photos} omit={["/about"]} />
    </Shell>
  );
}
