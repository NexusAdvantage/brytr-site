import type { Metadata } from "next";
import { pageUrl } from "@/lib/seo";
import Link from "next/link";
import { systems } from "@/content/systems";
import { systemDetail } from "@/content/system-detail";
import { Shell } from "@/app/layout-shell";
import { PageHero, PageCta, SectionHead, TextLink } from "@/components/sections/page-parts";
import { PhotoPair } from "@/components/sections/photo-parts";
import { Jsonld, breadcrumb } from "@/lib/schema";
import { ValueBand } from "@/components/sections/value-band";
import { valueProps } from "@/content/value-props";
import { COMPARE_HIDDEN } from "@/content/compares";

/* /lighting-systems — WAVE 3, PAGE 1 of the page-by-page pass.
 *
 * What it was: no photograph in the hero, a stat row that counted the eight cards below it,
 * eight cards each illustrated with the SAME drawn elevation at three rotating massings —
 * and that drawing took a hex value as a prop from a component file, which is the one thing
 * the brand lock forbids. Then two spec tables in a row, a stats band repeating two figures
 * the hero had already printed, a third spec table, and two closers.
 *
 * THEN IT WAS A PACKAGE PAGE, WHICH WAS WORSE. The rebuild was organized around a choice
 * between two named tiers, a premium one and a value one, with a nine-row table comparing
 * them and three house profiles recommending one or the other. None of it was real: the
 * company does not sell packages, the tier names were mine, and the rows carried figures
 * nobody had given me. The client, plainly, on camera: they do not have packages, talk
 * about the light they actually install, which is Haven.
 *
 * So the page is the Haven lineup now. The roofline run is the system; the soffit,
 * landscape and overhead lines are additions to it; the app operates all of it. Every value
 * in the sheet below is a spec that already sits in content/systems.ts against the product
 * it describes, and the rated-life row is gone because that figure was invented.
 *
 * Archetype: spec hero (photograph + no form) → the roofline and the app → the sheet with
 * a consequence column → the lineup by role → three property shapes. Closer: the form,
 * because the hero has not carried one.
 */

export const metadata: Metadata = {
  title: "Permanent Lighting Systems We Install",
  description:
    "The permanent lighting we install in Omaha: Jellyfish and Haven roofline lighting, plus Haven soffit, landscape and bistro lighting, all controlled from an app.",
  ...pageUrl("/lighting-systems"),
};
const trail = [{ name: "Home", href: "/" }, { name: "Lighting systems", href: "/lighting-systems" }];

/* THE ROOFLINE SHEET. Third column is the whole point: a spec with no consequence attached
 * is a number, and a number does not help anybody decide anything. Every value in the
 * middle column is a Haven figure already carried on the product's own page. */
/* Rewritten Oct 2026: the sheet was Haven Evolution only, with specs nobody sourced. It now
 * lists qualitative points true of both roofline systems we install. */
const sheet: { spec: string; value: string; why: string }[] = [
  { spec: "Color", value: "Full color and white", why: "Warm white for everyday and colors when you want them." },
  { spec: "Control", value: "App", why: "Jellyfish and Haven each have their own app on your phone." },
  { spec: "Scenes", value: "Save your own", why: "Holidays, gameday, or any colors you like." },
  { spec: "Schedules", value: "Yes", why: "Set the lights to come on and go off on their own." },
  { spec: "Stays up", value: "Year round", why: "Nothing to hang or take down each season." },
  { spec: "Installed by", value: "Brytr", why: "We handle the install and we are here for service afterwards." },
];

const identical: string[] = [
  "A free design consultation at your house",
  "A written quote",
  "We handle the install",
  "Call us for service on anything we installed",
];

const core: { slug: string; role: string }[] = [
  { slug: "jellyfish-lighting", role: "Roofline" },
  { slug: "haven-evolution", role: "Roofline" },
];

const roles: { heading: string; note: string; slugs: string[] }[] = [
  {
    heading: "The roofline",
    note: "Two roofline systems we install",
    slugs: ["jellyfish-lighting", "haven-evolution"],
  },
  {
    heading: "More lighting",
    note: "Soffit, landscape and bistro",
    slugs: ["haven-q-series", "haven-9-series-landscape-lights", "haven-x-bistro-lights"],
  },
  {
    heading: "Control",
    note: "From your phone",
    slugs: ["app-and-controls"],
  },
];

const houses: { h: string; profile: string[]; verdict: string; label: string; href: string }[] = [
  {
    h: "A single story home",
    profile: [
      "Roofline lighting along the front",
      "Warm white for everyday",
      "Colors for holidays",
    ],
    verdict: "Roofline lighting is a good place to start. We plan it with you at the consultation.",
    label: "Jellyfish or Haven",
    href: "/lighting-systems",
  },
  {
    h: "A two story home",
    profile: [
      "Roofline lighting on more than one side",
      "Lighting under the overhang",
      "Colors for gameday and holidays",
    ],
    verdict: "Soffit lighting can go with the roofline. We look at your house with you and plan it.",
    label: "Roofline plus Haven Q Series",
    href: "/lighting-systems/haven-q-series",
  },
  {
    h: "A whole property",
    profile: [
      "Roofline, plus beds, walls or a pergola",
      "Lighting for the yard as well as the house",
    ],
    verdict: "Landscape and patio lighting can go in with the roofline or be added later.",
    label: "Roofline plus Haven landscape or bistro",
    href: "/lighting-systems/haven-9-series-landscape-lights",
  },
];

const bySlug = (slug: string) => systems.find((s) => s.slug === slug)!;

export default function SystemsHub() {
  return (
    <Shell>
      <Jsonld data={breadcrumb(trail)} />

      <PageHero
        photo="/img/channel-detail.jpg"
        photoAlt="Close view of roofline lighting on an Omaha home, warm white LEDs along the gables and eaves"
        objectPosition="50% 55%"
        h1="The lighting systems we install."
        lede="We install two roofline systems, Jellyfish and Haven. We also install Haven soffit, landscape and bistro lighting."
        trail={trail}
      />

      {/* THE VALUE BAND, directly under the trust plinth, same as every other page. It states the
        * offer once before this page gets specific about its own subject. Shape is shared, content
        * is written against this page in content/value-props.ts. See the note on the component. */}
      <ValueBand {...valueProps["/lighting-systems"]} ground="card" />


      {/* ── THE ROOFLINE, AND THE LAYER THAT RUNS IT ──
        * This slot used to hold two invented tiers side by side, as though the page were
        * asking you to pick one. Nobody picks. Every job is the roofline run plus the app,
        * so those are the two panels. */}
      {/* bg-muted: the sheet immediately below is on bg-background, and this section landed
        * on the same ground when I moved it out of the hero. */}
      <section className="section bg-muted">
        <div className="shell">
          <SectionHead
            /* Not "the two things": the panels are directly underneath and counting them in
              * the heading is the habit I keep having to be told about. */
            title="Two roofline systems."
          />
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            {core.map((c) => {
              const sy = bySlug(c.slug);
              const d = systemDetail[c.slug];
              return (
                <article key={c.slug} className="flex flex-col overflow-hidden rounded-lg bg-card shadow-[var(--shadow-lg)] ring-1 ring-border">
                  <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-border px-6 py-4">
                    <p className="label flex items-center gap-3 text-foreground">
                      <span className="block h-4 w-1 bg-accent" aria-hidden />
                      {c.role}
                    </p>
                    <p className="text-xs text-muted-foreground">{sy.maker}</p>
                  </div>
                  <div className="flex flex-1 flex-col px-6 py-6">
                    <h3 className="font-display text-[1.3rem] font-bold leading-snug text-foreground">
                      <Link href={`/lighting-systems/${c.slug}`} className="hover:text-accent-deep">{sy.name}</Link>
                    </h3>
                    <p className="mt-3 text-[1.02rem] leading-relaxed text-muted-foreground">
                      {d?.position ?? sy.short}
                    </p>
                    <dl className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-lg bg-border ring-1 ring-border">
                      {sy.specs.slice(0, 4).map((sp) => (
                        <div key={sp.label} className="bg-card px-4 py-3.5">
                          <dt className="label text-muted-foreground">{sp.label}</dt>
                          <dd className="mt-1.5 text-[0.9rem] font-semibold leading-snug text-foreground">{sp.value}</dd>
                        </div>
                      ))}
                    </dl>
                    <div className="mt-auto border-t border-border pt-5">
                      <TextLink href={`/lighting-systems/${c.slug}`}>The full sheet for {sy.name}</TextLink>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── THE SHEET ──
        * The roofline hardware, with a consequence written against every row. */}
      <section className="section bg-card">
        <div className="shell">
          <SectionHead
            title="What both systems do."
          />

          <div className="mt-10 overflow-hidden rounded-lg bg-background shadow-[var(--shadow-lg)] ring-1 ring-border">
            <div className="hidden bg-primary px-6 py-4 lg:grid lg:grid-cols-[22fr_26fr_52fr] lg:gap-8">
              <p className="label text-on-dark-muted">Spec</p>
              <p className="label flex items-center gap-3 text-on-dark">
                <span className="block h-4 w-1 bg-accent" aria-hidden />
                Jellyfish and Haven
              </p>
              <p className="label text-on-dark-muted">What it means</p>
            </div>
            <ul className="divide-y divide-border">
              {sheet.map((r) => (
                <li key={r.spec} className="grid gap-3 px-6 py-5 lg:grid-cols-[22fr_26fr_52fr] lg:gap-8">
                  <p className="font-display text-[0.95rem] font-bold text-foreground">{r.spec}</p>
                  {/* the value column is marked by a SURFACE shift and the amber tick in the
                    * header, not by a colored strip down the side of the cell. slopcheck flags
                    * the strip, and it is right to: a colored left border on a block is as
                    * reliable a tell as an em-dash in a sentence. */}
                  <div className="rounded-sm bg-muted px-4 py-3 lg:-my-1">
                    <p className="label mb-1 text-accent-ink lg:hidden">Jellyfish and Haven</p>
                    <p className="text-[0.95rem] font-medium text-foreground">{r.value}</p>
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground">{r.why}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* what the sheet cannot tell you. The rows above are only honest with this
            * under them. */}
          <div className="mt-8 rounded-lg bg-primary p-7 shadow-[var(--shadow-dark)]">
            {/* NO EYEBROW. The small amber label that sat here was the device the client had
              * removed from every section on the home page: "remove all of these little headings
              * before sections." These three survived because they are inside dark panels rather
              * than above section heads, which is a distinction the reader does not make. */}
            <h3 className="max-w-[46ch] font-display text-xl font-bold text-on-dark">
              Whichever system you pick.
            </h3>
            <ul className="mt-6 grid gap-x-10 gap-y-0 lg:grid-cols-2">
              {identical.map((x) => (
                <li
                  key={x}
                  className="border-t border-on-dark/12 py-3 text-[0.95rem] leading-relaxed text-on-dark-muted"
                >
                  {x}
                </li>
              ))}
            </ul>
            <p className="mt-6 max-w-[76ch] text-sm leading-relaxed text-on-dark-muted">
              We install both brands and help you choose at the design consultation.
            </p>
          </div>
        </div>
      </section>

      {/* ── WHAT THE SPEC ROWS TURN INTO ──
        * Twenty thousand characters of hardware argument on this page and, until now, not one
        * photograph below the hero. Every row in the sheet above is a claim about what a part
        * does to a building, and a spec table cannot settle any of them.
        *
        * The pair is chosen deliberately: the daylight frame answers the question of how the
        * channel reads by day, and the close frame answers the row about LED spacing. Those are the two
        * specifications on this page a homeowner can actually verify with their own eyes, so
        * those are the two that get photographs. */}
      <PhotoPair
        title="By day and after dark."
        lede="Roofline lighting on Omaha homes."
        a="dayBrickGable"
        b="homeEaveDownlights"
        aLabel="Roofline lighting in daylight."
        bLabel="Lighting under the eave at night."
        ground="raise"
      />

      {/* ── THE LINEUP, BY ROLE ──
        * Seven pages, four roles. People arrive thinking they have seven
        * choices; they have a roofline run, plus some additions. */}
      <section className="section bg-muted">
        <div className="shell">
          <SectionHead
            title="Everything we install."
          />

          <div className="mt-10 grid items-start gap-5 lg:grid-cols-2">
            {roles.map((g) => (
              <div key={g.heading} className="overflow-hidden rounded-lg bg-card shadow-[var(--shadow-lg)] ring-1 ring-border">
                <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-border px-6 py-4">
                  <p className="label flex items-center gap-3 text-foreground">
                    <span className="block h-4 w-1 bg-accent" aria-hidden />
                    {g.heading}
                  </p>
                  <p className="text-sm text-muted-foreground">{g.note}</p>
                </div>
                <ul className="divide-y divide-border">
                  {g.slugs.map((sl) => {
                    const s = bySlug(sl);
                    const d = systemDetail[sl];
                    return (
                      <li key={sl}>
                        <Link
                          href={`/lighting-systems/${sl}`}
                          className="group block px-6 py-4 transition-colors duration-[--dur-fast] hover:bg-muted"
                        >
                          <span className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                            <span className="font-display text-[1.05rem] font-bold text-foreground group-hover:underline">
                              {s.name}
                            </span>
                            <span className="u shrink-0 text-xs uppercase tracking-[0.08em] text-muted-foreground">
                              {s.maker}
                            </span>
                          </span>
                          <span className="mt-1 block text-sm leading-relaxed text-muted-foreground">
                            {d?.position ?? s.short}
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

      {/* ── THREE PROPERTIES ──
        * The recommendation logic, published. What goes on a house is decided
        * by the shape of the house, and one of these three is us saying buy less. */}
      <section className="section bg-primary">
        <div className="shell">
          <SectionHead
            onDark
            title="Ideas by type of home."
          />

          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {houses.map((x) => {
              return (
                <article
                  key={x.h}
                  className="flex flex-col rounded-lg bg-raise p-7 ring-1 ring-on-dark/10"
                >
                  <h3 className="font-display text-xl font-bold leading-snug text-on-dark">{x.h}</h3>
                  <ul className="mt-5 divide-y divide-on-dark/10 border-y border-on-dark/10">
                    {x.profile.map((p) => (
                      <li key={p} className="py-2.5 text-sm leading-relaxed text-on-dark-muted">{p}</li>
                    ))}
                  </ul>
                  <div className="mt-6 flex-1">
                    <p className="label text-accent">Where it starts</p>
                    <p className="mt-1.5 font-display text-lg font-bold text-on-dark">{x.label}</p>
                    <p className="mt-2 text-[0.95rem] leading-relaxed text-on-dark-muted">{x.verdict}</p>
                  </div>
                  <div className="mt-6 border-t border-on-dark/12 pt-4">
                    <TextLink onDark href={x.href}>Read more</TextLink>
                  </div>
                </article>
              );
            })}
          </div>

          <p className="mt-7 max-w-[80ch] text-sm leading-relaxed text-on-dark-muted">
            Every house is different. We plan yours with you at the free design consultation.
            {!COMPARE_HIDDEN && (
              <>
                {" "}
                <Link
                  href="/compare"
                  className="text-on-dark underline decoration-accent decoration-2 underline-offset-4"
                >
                  How these compare with the brands we do not carry
                </Link>.
              </>
            )}
          </p>
        </div>
      </section>

      <PageCta omit={["/compare"]}
        /* The what-we-would-quote section above is bg-primary, so the closer would have landed on the same ground and the page would
          * have ended in one undifferentiated block. */
        ground="muted"
      />
    </Shell>
  );
}
