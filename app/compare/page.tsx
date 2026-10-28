import type { Metadata } from "next";
import { pageUrl } from "@/lib/seo";
import Link from "next/link";
import { compares } from "@/content/compares";
import { Shell } from "@/app/layout-shell";
import { PageHero, PageCta, SectionHead, TextLink } from "@/components/sections/page-parts";
import { PhotoBand, PhotoStrip } from "@/components/sections/photo-parts";
import { pick } from "@/content/photo-sets";
import { Jsonld, breadcrumb } from "@/lib/schema";
import { ValueBand } from "@/components/sections/value-band";
import { valueProps } from "@/content/value-props";

/* /compare — WAVE 4, PAGE 1 of the page-by-page pass.
 *
 * What it was: no photograph in the hero, a stat row counting the list underneath it, and a
 * hero aside that rendered FOUR drawn elevations from an array of four literal hex values
 * sitting in the page file — the single clearest brand-lock violation on the site. Then a
 * flat matrix with no stance in it, three tag-cloud cards, nine identical link cards, and
 * two closers.
 *
 * What it is now. A comparison hub written by somebody who sells two of the brands has
 * exactly one thing nobody else on this market can publish: WHERE WE STAND ON EACH ONE.
 * So the matrix has a fourth column: we install it, we do not carry it, or we would not put
 * it on your house. The "would not" rows are what make the rest of the table worth reading.
 *
 * Then the nine head-to-heads, grouped by what kind of argument each one is: ours against a
 * brand you are probably also being quoted, us refereeing two we have no stake in, and
 * professional work against a DIY kit. The middle group gets a different frame on purpose,
 * because on that page we are not competing.
 *
 * Archetype: spec hero (photograph + our stance as a panel) → the market with a stance
 * column → the nine grouped by argument type → methodology. Closer: the form.
 */

export const metadata: Metadata = {
  title: "Permanent Lighting Brands in Omaha (2026)",
  description:
    "The permanent outdoor lighting brands on the Omaha market, described plainly by an installer who carries Jellyfish and Haven: Gemstone, Trimlight, Oelo and more.",
  ...pageUrl("/compare"),
};
const trail = [{ name: "Home", href: "/" }, { name: "Compare", href: "/compare" }];

/* THE MARKET, WITH OUR STANCE. The fourth column is the only thing on this page a
 * single-brand dealer cannot write, and the "Would not" rows are what make the other two
 * columns believable. */
type Stance = "We install it" | "Not something we carry";
const market: { brand: string; maker: string; what: string; stance: Stance; note: string }[] = [
  {
    brand: "Jellyfish Lighting",
    maker: "Jellyfish Lighting",
    what: "Permanent roofline lighting in full color and white, controlled from the Jellyfish app with scenes and schedules.",
    stance: "We install it",
    note: "Measured, fitted and serviced by our crew.",
  },
  {
    brand: "Haven Evolution",
    maker: "Haven Lighting",
    what: "Permanent roofline lighting, with soffit, landscape and bistro fixtures on the same Haven app.",
    stance: "We install it",
    note: "Measured, fitted and serviced by our crew.",
  },
  {
    brand: "Gemstone Lights",
    maker: "Gemstone",
    what: "A well known permanent lighting brand sold through its own dealer network.",
    stance: "Not something we carry",
    note: "Installed by Gemstone dealers.",
  },
  {
    brand: "Trimlight",
    maker: "Trimlight",
    what: "Permanent roofline lighting sold through franchise and dealer territories.",
    stance: "Not something we carry",
    note: "Installed by the territory holder.",
  },
  {
    brand: "Oelo",
    maker: "Oelo",
    what: "Permanent lighting with its own channel design and app, sold through local dealers.",
    stance: "Not something we carry",
    note: "Installed by Oelo dealers.",
  },
  {
    brand: "EverLights",
    maker: "EverLights",
    what: "One of the longer standing names in permanent lighting, and still a common search term for the category.",
    stance: "Not something we carry",
    note: "Installed by EverLights dealers.",
  },
  {
    brand: "Minleon / Rainmin",
    maker: "Minleon",
    what: "Installer channel products, often used for animated and holiday displays.",
    stance: "Not something we carry",
    note: "Installed by specialist installers.",
  },
  {
    brand: "Govee and consumer kits",
    maker: "Govee and others",
    what: "Do it yourself kits at a lower upfront cost, installed by the homeowner.",
    stance: "Not something we carry",
    note: "Installed by you.",
  },
];

const stanceStyle: Record<Stance, string> = {
  "We install it": "border-accent/50 text-accent-ink",
  "Not something we carry": "border-border text-foreground",
};

/* THE NINE, BY WHAT KIND OF ARGUMENT THEY ARE. Three frames, because a page where we are
 * competing and a page where we are refereeing should not look the same. */
const argumentGroups: { heading: string; note: string; frame: string; slugs: string[]; neutral?: boolean }[] = [
  {
    heading: "The systems we install, next to other brands",
    note: "Described, not scored",
    frame:
      "Each page describes both brands: what they are, how they are sold and who installs them in Omaha.",
    slugs: [
      "haven-vs-jellyfish-lighting",
      "jellyfish-vs-gemstone-lights",
      "haven-vs-gemstone-lights",
      "haven-vs-trimlight",
      "haven-vs-oelo",
      "haven-vs-everlights",
      "haven-vs-minleon-rainmin",
    ],
  },
  {
    heading: "A kit or a professional install",
    note: "Who does the work",
    frame:
      "Less about brand and more about who does the work, so this page compares the job itself.",
    slugs: ["haven-vs-govee"],
  },
];

const bySlug = (slug: string) => compares.find((c) => c.slug === slug)!;

/* The verdict's opening sentence, except where that sentence is three words long. "We
 * install both." is true and useless as a card summary, so keep taking sentences until
 * there is something to read. */
const gist = (v: string) => {
  const parts = v.split(/(?<=\.)\s+/);
  let out = "";
  for (const p of parts) {
    out = out ? `${out} ${p}` : p;
    if (out.length >= 70) break;
  }
  return out;
};

export default function CompareHub() {
  return (
    <Shell>
      <Jsonld data={breadcrumb(trail)} />
      <Jsonld
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: "The permanent lighting brands on the Omaha market",
          author: { "@type": "Organization", name: "Brytr Co" },
        }}
      />

      <PageHero
        photo="/img/g-pool-blue.jpg"
        photoAlt="An Omaha home, pergola and pool deck lit blue at dusk"
        objectPosition="50% 48%"
        h1="Permanent lighting brands in the Omaha market."
        lede="Brytr installs Jellyfish and Haven. Homeowners ask us about the other names they come across, so here is a plain description of each one. No scores and no rankings, just what each brand is and how it is sold."
        trail={trail}
      />

      {/* THE VALUE BAND, directly under the trust plinth, same as every other page. It states the
        * offer once before this page gets specific about its own subject. Shape is shared, content
        * is written against this page in content/value-props.ts. See the note on the component. */}
      <ValueBand {...valueProps["/compare"]} ground="muted" />


      {/* ── WHERE WE STAND, AND ON WHAT ──
        * Three cards in a 28rem column meant three stacked rows of small print. Across the
        * full width they read as three positions a reader can place any brand into, which is
        * the actual navigation instruction for the page below. */}
      <section className="bg-raise">
        <div className="shell py-12 lg:py-14">
          <p className="label text-accent">How to read the table below</p>
          <dl className="mt-7 grid gap-px overflow-hidden rounded-lg bg-on-dark/12 ring-1 ring-on-dark/12 md:grid-cols-2">
            {[
              ["We install it", "Measured, quoted, fitted and serviced by our own local crew."],
              ["Not something we carry", "A brand we do not install. Described plainly so you know what it is and how it is sold."],
            ].map(([k, v]) => (
              <div key={k} className="bg-primary px-6 py-6">
                <dt className="font-display text-[1.1rem] font-bold text-on-dark">{k}</dt>
                <dd className="mt-2.5 text-[0.95rem] leading-relaxed text-on-dark-muted">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ── THE MARKET, WITH A STANCE COLUMN ──
        * The centerpiece. The fourth column is the page. */}
      <section className="section bg-card">
        <div className="shell">
          <SectionHead
            title="The brands people ask us about."
          />

          <div className="mt-10 overflow-hidden rounded-lg bg-background shadow-[var(--shadow-lg)] ring-1 ring-border">
            <div className="hidden bg-primary px-6 py-4 lg:grid lg:grid-cols-[22fr_38fr_24fr] lg:gap-8">
              <p className="label text-on-dark-muted">Brand</p>
              <p className="label text-on-dark-muted">What it is</p>
              <p className="label flex items-center gap-3 text-on-dark">
                <span className="block h-4 w-1 bg-accent" aria-hidden />
                Where we stand
              </p>
            </div>
            <ul className="divide-y divide-border">
              {market.map((m) => (
                <li key={m.brand} className="grid gap-3 px-6 py-5 lg:grid-cols-[22fr_38fr_24fr] lg:gap-8">
                  <div>
                    <p className="font-display text-[1.05rem] font-bold leading-snug text-foreground">
                      {m.brand}
                    </p>
                    <p className="u mt-1 text-xs uppercase tracking-[0.08em] text-muted-foreground">
                      {m.maker}
                    </p>
                  </div>
                  <p className="text-[0.95rem] leading-relaxed text-muted-foreground">{m.what}</p>
                  <div>
                    <span
                      className={`u text-[0.7rem] uppercase tracking-[0.08em] ${stanceStyle[m.stance]}`}
                    >
                      {m.stance}
                    </span>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{m.note}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
            No brand here is scored or ranked. Hardware changes between product generations, so we go
            through exact specs at the free design consultation.
          </p>
        </div>
      </section>

      {/* ── THE NINE, BY ARGUMENT TYPE ── */}
      <section className="section bg-muted">
        <div className="shell">
          <SectionHead
            title="Side by side, one brand at a time."
          />

          <div className="mt-10 space-y-10">
            {argumentGroups.map((g) => (
              <div key={g.heading}>
                <div className={`flex flex-wrap items-baseline justify-between gap-3 border-b-2 pb-3 ${
 g.neutral ? "border-border" : "border-accent"
                }`}>
                  <h3 className="font-display text-[clamp(1.2rem,2.2vw,1.6rem)] font-bold text-foreground">
                    {g.heading}
                  </h3>
                  <p className="u text-sm text-muted-foreground">{g.note}</p>
                </div>
                <p className="mt-4 max-w-[80ch] text-[0.95rem] leading-relaxed text-muted-foreground">
                  {g.frame}
                </p>
                <ul className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                  {g.slugs.map((sl) => {
                    const c = bySlug(sl);
                    return (
                      <li key={sl}>
                        <Link
                          href={`/compare/${sl}`}
                          className="flex h-full flex-col rounded-lg bg-card p-6 shadow-[var(--shadow-lg)] ring-1 ring-border transition-transform duration-[--dur-base] ease-[--ease-out-expo] hover:-translate-y-0.5"
                        >
                          <span className="font-display text-[1.05rem] font-bold leading-snug text-foreground">
                            {c.a} and {c.b}
                          </span>
                          <span className="mt-2.5 flex-1 text-[0.95rem] leading-relaxed text-muted-foreground">
                            {gist(c.verdict)}
                          </span>
                          <span className="label mt-4 border-t border-border pt-3 text-accent-ink">
                            Read the comparison
                          </span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHAT WE ACTUALLY HAND OVER ──
        * Nine comparison pages, a market table and a methodology note: this whole page is about
        * other companies. One band of our own work before the methodology section, because the
        * methodology is a claim about our judgment and this is the evidence for it. */}
      {/* Three frames, because scripts/images.mjs had this page rendering two photographs in
        * total. `background` keeps the run alternating: muted above, raise on the band below. */}
      <PhotoStrip
        shots={pick("compare-strip", 3)}
        title="Whichever brand ends up on the house."
        ground="card"
      />

      <PhotoBand
        photo="aerialRedRoofline"
        label="Ours, from above"
        note="Drone frame, one of our own installs"
        caption="A run we fitted, photographed from overhead, following every ridge and valley on the roof."
        ground="raise"
      />

      {/* ── WHAT TO ASK ANY INSTALLER ──
        * Replaced the "how these were judged" methodology on 28 Oct 2026 when the brand scoring
        * came out. These questions apply whichever brand ends up on the house. */}
      <section className="section bg-primary">
        <div className="shell grid items-start gap-10 lg:grid-cols-[44fr_56fr] lg:gap-14">
          <div>
            <SectionHead onDark title="What to ask any installer." />
            <div className="prose-body mt-6 space-y-4">
              <p className="text-base leading-relaxed text-on-dark-muted">
                Whatever brand you choose, the install decides how it looks in year five. These are the
                questions worth asking anyone who quotes you, us included.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-x-7 gap-y-2">
              <TextLink onDark href="/lighting-systems">The systems we install</TextLink>
            </div>
          </div>

          <ul className="divide-y divide-on-dark/10 border-y border-on-dark/10">
            {[
              ["Who is on the ladder?", "Whether the people who quote it are the people who fit it."],
              ["How is the channel fixed?", "Screwed into the fascia, or held on with adhesive."],
              ["When does the sealant go on?", "As each screw is driven, or in one pass at the end of the day."],
              ["Can I see a finished job in daylight?", "How the channel sits on the fascia is what you see during the day."],
              ["What happens at handover?", "Whether somebody walks through the app and your scenes with you before they leave."],
            ].map(([h, p]) => (
              <li key={h} className="py-4">
                <p className="font-display text-[1.05rem] font-bold text-on-dark">{h}</p>
                <p className="mt-1.5 text-[0.95rem] leading-relaxed text-on-dark-muted">{p}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <PageCta omit={["/compare"]} 
        /* The methodology section above is bg-primary, so the closer would have landed on the same ground and the page would
          * have ended in one undifferentiated block. */
        ground="muted"
      />
    </Shell>
  );
}
