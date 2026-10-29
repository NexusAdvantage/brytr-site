import type { Metadata } from "next";
import { pageUrl } from "@/lib/seo";
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

/* JELLYFISH VS HAVEN, the only comparison on the site (Zac, 29 Oct 2026).
 *
 * Rebuilt from scratch rather than trimmed. The old template was written for nine pages against
 * other brands and carried a DIY section, a "read next" rack of other comparisons and a hero line
 * about "the brands people ask us about". None of that applies to one page about two products
 * Brytr sells, so it went. Both brands get equal weight in every section. */

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
  const trail = [
    { name: "Home", href: "/" },
    { name: "Lighting systems", href: "/lighting-systems" },
    { name: `${c.a} vs ${c.b}`, href: `/compare/${c.slug}` },
  ];

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
        photo={d?.photo ?? "/img/channel-detail.jpg"}
        photoAlt={d?.photoAlt ?? "A finished Brytr install in the Omaha metro at night"}
        objectPosition={d?.objectPosition ?? "50% 50%"}
        h1={c.h1}
        lede="We offer two brands and a range of spacing options. Here is how they line up."
        trail={trail}
      />

      <ValueBand {...compareValueProp("Jellyfish", "Haven", slug)} ground="muted" />

      <section className="bg-primary">
        <div className="shell grid items-center gap-9 py-12 lg:grid-cols-[1fr_24rem] lg:gap-14 lg:py-16">
          <p className="max-w-[54ch] font-display text-[clamp(1.4rem,2.8vw,2rem)] font-bold leading-snug text-on-dark">
            {c.verdict}
          </p>
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
            <div className="border-t border-on-dark/12 bg-primary px-5 py-4">
              <dt className="label text-on-dark-muted">At the consultation</dt>
              <dd className="mt-2 text-[0.95rem] leading-relaxed text-on-dark-muted">
                We turn on our demo kit so you can see both in person, and price out both options.
              </dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="section bg-card">
        <div className="shell">
          <SectionHead title={`${c.a} and ${c.b}, side by side.`} />
          <div className="mt-10">
            <SpecTable
              onDark={false}
              caption={`${c.a} compared with ${c.b}`}
              rows={c.rows}
              headA={c.a}
              headB={c.b}
            />
          </div>
        </div>
      </section>

      <section className="section bg-muted">
        <div className="shell">
          <SectionHead title="What each one offers." />
          <div className="mt-10 grid gap-5 lg:grid-cols-2">
            {[
              { h: c.aWinsHead, list: c.aWins },
              { h: c.bWinsHead, list: c.bWins },
            ].map((col) => (
              <article key={col.h} className="flex flex-col rounded-lg bg-card p-7 shadow-[var(--shadow-lg)] ring-1 ring-border">
                <h3 className="font-display text-2xl font-bold leading-snug text-foreground">{col.h}</h3>
                <ul className="mt-6 flex-1 space-y-3 border-t border-border pt-6">
                  {col.list.map((w) => <Check key={w}>{w}</Check>)}
                </ul>
              </article>
            ))}
          </div>
          <div className="mt-8">
            <TextLink href="/free-design-consultation">See both at your house</TextLink>
          </div>
        </div>
      </section>

      <PhotoPair
        title="Finished installs around Omaha."
        lede="Permanent roofline lighting installed by Brytr."
        a={pick(`${c.slug}-a`, 1)[0]?.photo ?? "homeShakeBrick"}
        b={pick(`${c.slug}-b`, 1)[0]?.photo ?? "homeWideRanch"}
        aLabel={pick(`${c.slug}-a`, 1)[0]?.caption ?? ""}
        bLabel={pick(`${c.slug}-b`, 1)[0]?.caption ?? ""}
        ground="card"
      />

      <PageCta omit={["/compare"]} ground="muted" />
    </Shell>
  );
}
