import type { Metadata } from "next";
import { pageUrl } from "@/lib/seo";
import Link from "next/link";
import { notFound } from "next/navigation";
import { compares, compareBySlug } from "@/content/compares";
import { detailForCompare } from "@/content/compare-detail";
import { Shell } from "@/app/layout-shell";
import { PageHero, PageCta, SpecTable, SectionHead, Check, TextLink } from "@/components/sections/page-parts";
import { PhotoPair } from "@/components/sections/photo-parts";
import { pick } from "@/content/photo-sets";
import { Jsonld, breadcrumb } from "@/lib/schema";
import { ValueBand } from "@/components/sections/value-band";
import { compareValueProp } from "@/content/value-props";

/* ONE TEMPLATE, NINE COMPARISON PAGES — WAVE 4 of the page-by-page pass.
 *
 * What all nine used to carry:
 *   · no photograph in the hero, and two drawn elevations in the body taking a literal hex
 *     value as a prop — the brand lock forbids hex outside globals.css and sections.css
 *   · a section headed "Equal billing, on purpose" whose body copy was about its own
 *     styling: "same card, same divider, same type color". A page explaining its own CSS to
 *     the reader is a page with nothing to say in that slot.
 *   · the first five spec rows as two cards, then all fourteen rows again as a table
 *   · "150 to 400 typical linear feet" — a figure about Brytr's own jobs nobody confirmed
 *   · a "we carry more than one of these" section identical on all nine
 *   · the other eight comparisons as eight identical cards, on all nine pages
 *   · two closers
 *
 * What differs now. content/compares.ts already held the per-page argument: the verdict,
 * where each side wins, the cost tiers. content/compare-detail.ts adds the photograph, two
 * chosen next comparisons, and the field that matters most on a page like this — WHAT WE
 * HAVE NOT VERIFIED about the right-hand column, named per competitor.
 *
 * 28 Oct 2026: rewritten to describe brands rather than rank them, at the client's request.
 * Two frames now: compete (a system we install next to another brand) and labor (pro install
 * next to a DIY kit). The referee frame and the "what we do not know" section are gone.
 */

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

export function generateStaticParams() {
  return compares.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const c = compareBySlug(slug);
  if (!c) return {};
  return { title: c.title, description: c.verdict.slice(0, 155), ...pageUrl(`/compare/${c.slug}`) };
}

export default async function ComparePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = compareBySlug(slug);
  if (!c) notFound();
  const d = detailForCompare(c.slug);
  const frame: "compete" | "labor" = c.labor ? "labor" : "compete";
  const alsoSee = (d?.alsoSee ?? [])
    .map((sl) => compares.find((o) => o.slug === sl))
    .filter((o): o is (typeof compares)[number] => !!o && o.slug !== c.slug);
  const trail = [
    { name: "Home", href: "/" },
    { name: "Compare", href: "/compare" },
    { name: `${c.a} vs ${c.b}`, href: `/compare/${c.slug}` },
  ];

  const frameLabel = c.stance;

  return (
    <Shell>
      <Jsonld data={breadcrumb(trail)} />
      <Jsonld
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: c.h1,
          description: c.verdict,
          author: { "@type": "Organization", name: "Brytr Co" },
        }}
      />

      <PageHero
        /* spec variant: the verdict goes in the right column, at size, because the verdict
         * IS the answer to the H1 and burying it under a table is the standard mistake on
         * pages like this. */
        photo={d?.photo ?? "/img/channel-detail.jpg"}
        photoAlt={d?.photoAlt ?? "A finished Brytr install in the Omaha metro at night"}
        objectPosition={d?.objectPosition ?? "50% 50%"}
        h1={c.h1}
        lede={
          frame === "labor"
            ? "A kit and a professional install both put permanent lights on a roofline. The difference is who does the work, so this page compares the work: who fits it, how long it takes, and who you call if a section needs attention."
            : "People ask us about the brands they come across, so here is a plain description of each: what it is, how it is sold and who installs it in Omaha. No scores and no rankings."
        }
        trail={trail}
      />

      {/* THE VALUE BAND, directly under the trust plinth, same as every other page. It states the
        * offer once before this page gets specific about its own subject. Shape is shared, content
        * is written against this page in content/value-props.ts. See the note on the component. */}
      <ValueBand {...compareValueProp(c.a, c.b, slug)} ground="muted" />


      {/* ── THE VERDICT ──
        * It was a card in the hero's right column. A verdict is the single thing a reader came
        * to this page for, so it now gets the full width and sits on the dark ground where
        * nothing competes with it. The two figures underneath are the whole reason the verdict
        * lands: an opinion with two numbers under it is an argument. */}
      <section className="bg-primary">
        <div className="shell grid items-center gap-9 py-12 lg:grid-cols-[1fr_24rem] lg:gap-14 lg:py-16">
          <div>
            <p className="label flex items-center gap-3 text-accent">
              <span className="block h-4 w-1 bg-accent" aria-hidden />
              The verdict
            </p>
            <p className="mt-5 max-w-[54ch] font-display text-[clamp(1.4rem,2.8vw,2rem)] font-bold leading-snug text-on-dark">
              {c.verdict}
            </p>
          </div>
          {/* THREE ROWS, NOT TWO, and frameLabel now lives in here.
            *
            * The two cost cells were a 384 x 88px object in a 384 x 350px column — one small thing
            * in a wide field, which is the void this site is least allowed to have. And frameLabel
            * used to sit as a gray line under the verdict, where it read as an orphan caption
            * attached to nothing AND repeated the hero's eyebrow word for word a screen above.
            *
            * As a labeled row it does the job it was written for — telling the reader what kind of
            * comparison this is and where we stand in it — and it closes the column. */}
          <dl className="overflow-hidden rounded-lg bg-raise ring-1 ring-on-dark/12">
            <div className="grid grid-cols-2 gap-px bg-on-dark/12">
              {[
                [c.a, c.costA],
                [c.b, c.costB],
              ].map(([k, v]) => (
                <div key={k} className="bg-raise px-5 py-5">
                  <dt className="label text-on-dark-muted">{k}</dt>
                  <dd className="u mt-2 text-[1rem] font-semibold leading-snug text-on-dark">{v}</dd>
                </div>
              ))}
            </div>
            <div className="border-t border-on-dark/12 px-5 py-4">
              <dt className="label text-on-dark-muted">Where we stand</dt>
              <dd className="mt-2 text-[0.95rem] leading-relaxed text-on-dark">{frameLabel}</dd>
            </div>
            <div className="border-t border-on-dark/12 bg-primary px-5 py-4">
              <dt className="label text-on-dark-muted">What settles it</dt>
              <dd className="mt-2 text-[0.95rem] leading-relaxed text-on-dark-muted">
                Your roofline, measured on site. We go through the exact hardware and the price at
                the free design consultation.
              </dd>
            </div>
          </dl>
        </div>
      </section>

      {/* ── THE SPECS ──
        * One table, once. The old page printed the first five rows as two cards
        * and then all fourteen again underneath. */}
      <section className="section bg-card">
        <div className="shell">
          <SectionHead
            title={frame === "labor" ? "The job, side by side." : `${c.a} and ${c.b}, side by side.`}
          />
          <div className="mt-10">
            <SpecTable
              onDark={false}
              caption={`${c.a} compared with ${c.b}`}
              rows={c.rows}
              headA={c.a}
              headB={c.b}
              source={
                frame === "labor"
                  ? "Everything in the left column is what a professional install involves. The right column is what a competent DIY install involves, not a worst case."
                  : "General information about how each brand is sold and installed. Hardware changes between product generations, so we go through exact specs at the design consultation."
              }
            />
          </div>
        </div>
      </section>


      {/* ── OUR OWN WORK, ON A PAGE ABOUT SOMEBODY ELSE'S ──
        * A comparison page is the one place on this site where most of the nouns belong to
        * other companies. Two photographs of installs we actually did is the only first-hand
        * evidence on the page, and it sits before the "where each wins" section deliberately:
        * a reader should know what we can do before they read us being fair about a rival. */}
      <PhotoPair
        title="What we hand over, on two houses."
        lede="Two finished Brytr installs in the Omaha metro."
        a={pick(`${c.slug}-a`, 1)[0]?.photo ?? "homeShakeBrick"}
        b={pick(`${c.slug}-b`, 1)[0]?.photo ?? "homeWideRanch"}
        aLabel={pick(`${c.slug}-a`, 1)[0]?.caption ?? ""}
        bLabel={pick(`${c.slug}-b`, 1)[0]?.caption ?? ""}
        ground="card"
      />

      {/* ── WHERE EACH ACTUALLY WINS ──
        * Equal cards. No commentary about the cards. */}
      <section className="section bg-muted">
        <div className="shell">
          <SectionHead
            title="Who each one tends to suit."
          />
          <div className="mt-10 grid gap-5 lg:grid-cols-2">
            {[
              { h: c.aWinsHead, list: c.aWins, cost: c.costA, name: c.a },
              { h: c.bWinsHead, list: c.bWins, cost: c.costB, name: c.b },
            ].map((col) => (
              <article key={col.h} className="flex flex-col rounded-lg bg-card p-7 shadow-[var(--shadow-lg)] ring-1 ring-border">
                <h3 className="font-display text-2xl font-bold leading-snug text-foreground">{col.h}</h3>
                <p className="u mt-2 text-xs uppercase tracking-[0.08em] text-muted-foreground">
                  {col.name} · {col.cost}
                </p>
                <ul className="mt-6 flex-1 space-y-3 border-t border-border pt-6">
                  {col.list.map((w) => <Check key={w}>{w}</Check>)}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── THE FRAME-SPECIFIC SECTION ──
        * compete → we install more than one of these, so we can lose honestly.
        * referee → the deciding factor is the installer, and here is how to judge one.
        * labor  → what a DIY install actually costs you that is not money. */}
      {frame === "compete" && (
        <section className="section bg-card">
          <div className="shell grid items-start gap-10 lg:grid-cols-[48fr_52fr] lg:gap-14">
            <div>
              <h2 className="mt-4 text-[clamp(1.75rem,3vw,2.5rem)] leading-[1.06] text-foreground">
                Two systems, one crew.
              </h2>
              <div className="prose-body mt-6 space-y-4">
                <p className="text-lg text-foreground">
                  Brytr installs Haven and Jellyfish.
                </p>
                <p className="text-base text-muted-foreground">
                  Whichever one goes on your house, the same local crew measures it, fits it, seals every
                  fixing and walks you through the app before we leave.
                </p>
              </div>
              <div className="mt-7 flex flex-wrap gap-x-7 gap-y-2">
                <TextLink href="/lighting-systems">Everything we install</TextLink>
                  </div>
            </div>

            <div className="overflow-hidden rounded-lg bg-background shadow-[var(--shadow-lg)] ring-1 ring-border">
              <div className="border-b border-border bg-primary px-6 py-4">
                <p className="label flex items-center gap-3 text-on-dark">
                  <span className="block h-4 w-1 bg-accent" aria-hidden />
                  Where to start
                </p>
              </div>
              <ul className="divide-y divide-border">
                {[
                  ["Jellyfish Lighting", "Permanent roofline lighting, controlled from the Jellyfish app.", "/lighting-systems/jellyfish-lighting"],
                  ["Haven Evolution", "Permanent roofline lighting, with landscape and bistro fixtures on the same app.", "/lighting-systems/haven-evolution"],
                  ["Landscape or a pergola on the same visit", "Priced with the roofline, on the same controller.", "/services/landscape-lighting"],
                ].map(([h, p, href]) => (
                  <li key={h}>
                    <Link
                      href={href}
                      className="group block px-6 py-4 transition-colors duration-[--dur-fast] hover:bg-muted"
                    >
                      <span className="block font-display text-[1.05rem] font-bold text-foreground group-hover:underline">
                        {h}
                      </span>
                      <span className="mt-1 block text-sm leading-relaxed text-muted-foreground">{p}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      )}


      {frame === "labor" && (
        <section className="section bg-card">
          <div className="shell grid items-start gap-10 lg:grid-cols-[46fr_54fr] lg:gap-14">
            <div>
              <h2 className="mt-4 text-[clamp(1.75rem,3vw,2.5rem)] leading-[1.06] text-foreground">
                What a DIY install involves.
              </h2>
              <div className="prose-body mt-6 space-y-4">
                <p className="text-lg text-foreground">
                  A consumer kit costs less upfront, and plenty of people install one well and enjoy it
                  for years.
                </p>
                <p className="text-base text-muted-foreground">
                  Here is what the work involves, so you can decide whether it is a project you want to take on.
                </p>
              </div>
              <div className="mt-7">
                <TextLink href="/how-it-works">What a professional install day involves</TextLink>
              </div>
            </div>

            <ul className="divide-y divide-border border-y border-border">
              {[
                ["Time at roof height", "Most rooflines take a full weekend on a ladder, including the corners and the end caps."],
                ["Drilling your own fascia", "Every fixing is a hole in the board, and each one needs sealing to keep water out."],
                ["How it sits in daylight", "How the channel lines up along the fascia is what you see during the day, so the mounting takes care."],
                ["Service later", "If a section needs attention down the road, the fix is yours to make."],
              ].map(([h, p]) => (
                <li key={h} className="py-5">
                  <h3 className="font-display text-[1.05rem] font-bold text-foreground">{h}</h3>
                  <p className="mt-1.5 text-[0.95rem] leading-relaxed text-muted-foreground">{p}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* ── TWO MORE, CHOSEN ── */}
      <section className="section bg-raise">
        <div className="shell grid items-start gap-10 lg:grid-cols-[38fr_62fr] lg:gap-14">
          <div>
            <SectionHead onDark  title="What most people read after this one." />
            <p className="mt-5 text-[1.05rem] leading-relaxed text-on-dark-muted">
              Other brands people ask us about.
            </p>
            <div className="mt-7">
              <TextLink onDark href="/compare">Every brand in one table</TextLink>
            </div>
          </div>

          <ul className="grid gap-4 sm:grid-cols-2">
            {alsoSee.map((o) => (
              <li key={o.slug}>
                <Link
                  href={`/compare/${o.slug}`}
                  className="flex h-full flex-col rounded-lg bg-primary p-6 ring-1 ring-on-dark/10 transition-all duration-[--dur-base] ease-[--ease-out-expo] hover:-translate-y-0.5 hover:ring-accent/40"
                >
                  <span className="font-display text-[1.05rem] font-bold leading-snug text-on-dark">
                    {o.a} and {o.b}
                  </span>
                  <span className="mt-2.5 flex-1 text-sm leading-relaxed text-on-dark-muted">
                    {gist(o.verdict)}
                  </span>
                  <span
                    className="label mt-4 border-t border-on-dark/12 pt-3 text-accent"
                  >
                    {o.labor ? "Labor, not brand" : "Read it"}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <PageCta omit={["/compare"]} />
    </Shell>
  );
}
