import type { Metadata } from "next";
import { pageUrl } from "@/lib/seo";
import { Shell } from "@/app/layout-shell";
import { PageHero, PageCta, SectionHead } from "@/components/sections/page-parts";
import { PhotoBand, PhotoStrip } from "@/components/sections/photo-parts";
/* Aliased: this file already has its own local `pick`, which selects FAQ entries by question
  * text. Two different pickers, one name, and the import silently shadowed nothing - TypeScript
  * caught it as a redeclaration rather than letting it through. */
import { pick as photoPick } from "@/content/photo-sets";
import { Jsonld, breadcrumb, faqSchema } from "@/lib/schema";
import { homeFaqs, pricingFaqs, serviceFaqsFor } from "@/content/faqs";
import { Faq } from "@/components/sections/faq";
import { ValueBand } from "@/components/sections/value-band";
import { valueProps } from "@/content/value-props";

/* /faq — WAVE 2, PAGE 6 of the page-by-page pass.
 *
 * What it was: no photograph in the hero, a stat row that counted the page's own contents
 * ("34 questions · 5 groups" — the page reading itself out loud, which is the thing the
 * PageHero comment specifically warns against), then FIVE consecutive sections of the same
 * accordion, and two closers.
 *
 * What it is now. The problem with every FAQ page is that the answers are behind a click,
 * so somebody scanning for one fact has to open six accordions to find out we are not going
 * to give them a price. So the centerpiece is THE SHORT ANSWERS: the eight questions people
 * actually arrive with, answered in one line each, in the open, with a link down to the long
 * version. Then all of the groups in ONE section rather than five identical ones.
 *
 * The last section is the one an FAQ page normally pretends does not exist: the questions
 * that genuinely cannot be answered without standing at your house.
 *
 * Archetype: home hero → open short-answer rack → single grouped accordion column → the
 * questions we cannot answer here. Closer: one, the phone band.
 */

export const metadata: Metadata = {
  title: "Permanent Lighting FAQ",
  description:
    "Common questions about permanent outdoor lighting in Omaha: the install, the fascia, HOA rules and winter installs.",
  ...pageUrl("/faq"),
};
const trail = [{ name: "Home", href: "/" }, { name: "FAQ", href: "/faq" }];

const slug = (s: string) => s.toLowerCase().replace(/[^a-z]+/g, "-");

/* GROUPED BY QUESTION, NOT BY ARRAY INDEX.
 *
 * These used to be `.slice()` calls over the shared arrays, which put whatever happened to
 * sit at those indices under whatever heading came next. Two things went wrong. The service
 * array opens with `How long does ${name} take to install?`, so on this page the question
 * about install duration was filed under "Product and specs" — and homeFaqs carries "How long
 * does an install take?", so the same question appeared twice on one page under two different
 * headings. Grouping by the question itself means a heading is a claim about its contents
 * rather than an accident of ordering, and a duplicate is visible in this file. */
const service = serviceFaqsFor("permanent lighting");
const pick = (src: typeof homeFaqs, ...qs: string[]) =>
  qs.map((q) => src.find((f) => f.q === q)).filter((f): f is (typeof src)[number] => !!f);

/* `wide` spans the grid and splits its own items into two columns. It was carried by "Cost and
 * financing", the biggest group by some way at nine questions, which is also the group that was
 * removed on 27 Aug 2026 because every figure in it was invented. No group uses `wide` now. The
 * prop stays because the next genuinely large group will want it; the layout does not need it to
 * fill its last row, which was checked rather than assumed. */
const groups: { h: string; note: string; items: typeof homeFaqs; wide?: boolean }[] = [
  {
    h: "Before you buy",
    note: "Questions to ask before you decide.",
    items: pick(homeFaqs,
      "Can you actually see it during the day?",
      /* "What does it cost?" removed from content/faqs.ts - see the note there. */
      "Does it damage my soffit or fascia?",
      "Will my HOA allow it?"),
  },
  {
    h: "Product and specs",
    note: "What it is and what it does.",
    items: pick(service,
      "Is this permanent or seasonal?",
      "Can I add to it later?",
      "Will it work with my existing smart home?"),
  },
  {
    h: "Install",
    note: "What to expect.",
    items: [
      ...pick(homeFaqs,
        "How long does an install take?",
        "Do I need to be home for the install?",
        "Can it be installed in winter?"),
    ],
  },
  {
    h: "Service and support",
    note: "After the install.",
    items: [
      ...pick(homeFaqs, "What happens when a section stops working?"),
      ...pick(service,
        "What areas do you cover?",
        "How do I get a quote?"),
    ],
  },
  /* THE "Cost and financing" GROUP IS GONE. Nine answers, every specific in them invented: a
   * deposit policy, a lending partner, quote validity, what a second visit saves. Removed
   * 27 Aug 2026 along with /pricing. The one survivor - the consultation is free - is answered
   * in the group above rather than given a section of its own. */
];
const all = groups.flatMap((g) => g.items);

/* THE SHORT ANSWERS. Each one is a compression of the full answer further down — never a
 * different claim, and never a claim the long version does not make. `to` points at the
 * group the long version lives in.
 *
 * TWO OF THEM CHANGED 29 Aug 2026 with the claims they compressed: the daytime answer no
 * longer says the aluminum is color matched, and the fascia answer no longer says the fixing
 * never goes through a shingle. A short answer that outruns its long answer is worse than no
 * short answer, because this rack is the part of the page people actually read. */
const shortAnswers: { q: string; a: string; to: string }[] = [
  {
    q: "Can you see it in the daytime?",
    a: "The track is low profile and runs along the roofline, so it blends in during the day.",
    to: "Before you buy",
  },
  /* The "What does it cost?" short answer is gone. It stated a pricing basis and pointed at the
   * "Cost and financing" group, and both the basis and the group were removed on 27 Aug 2026 as
   * unsourced. A short answer whose `to` names a group that no longer exists would also have been
   * a link into nothing. */
  {
    q: "Will it damage my fascia?",
    a: "It is fastened to the house and sealed. We go over how it mounts at the consultation.",
    to: "Install",
  },
  {
    q: "Can it be installed in winter?",
    a: "It depends on the weather. We will talk through timing with you.",
    to: "Install",
  },
  {
    q: "Will my HOA allow it?",
    a: "That depends on your HOA. Check its rules on exterior lighting first.",
    to: "Before you buy",
  },
  {
    q: "How long does it take?",
    a: "It depends on the house. We can talk about timing when we give you your quote.",
    to: "Install",
  },
  {
    q: "What if a section goes dark?",
    a: "Call us. We service anything we installed.",
    to: "Service and support",
  },
];

/* THE HONEST LIMIT. The things no FAQ page can answer, and why. */
const cannot: { h: string; p: string }[] = [
  {
    h: "What your house costs",
    p: "Every house is different, so the price comes in your written quote after the design consultation.",
  },
  {
    /* THE SECOND SENTENCE READ "We pull yours and read it rather than guessing from the
       neighborhood name." That is the HOA administration claim already taken off the twelve
       city pages and the consultation page, surviving here in a card nobody was rereading.
       Brytr does not administer covenant submissions and does not discuss HOA on site. */
    h: "Whether your covenant allows it",
    p: "That depends on your HOA's rules. Read them before you plan anything.",
  },
  {
    h: "What suits your house",
    p: "Which system and which lighting make sense for your house is something we work out with you at the consultation.",
  },
];

export default function FaqPage() {
  return (
    <Shell>
      <Jsonld data={breadcrumb(trail)} />
      <Jsonld data={faqSchema(all)} />

      <PageHero
        photo="/img/g-pool-firebowl.jpg"
        photoAlt="An Omaha backyard at night: a lit seat wall, a fire bowl on a pier, and the house roofline behind set to red"
        objectPosition="50% 38%"
        h1="Questions and answers."
        lede="Common questions about permanent outdoor lighting, with short answers first."
        trail={trail}
      />

      {/* THE VALUE BAND, directly under the trust plinth, same as every other page. It states the
        * offer once before this page gets specific about its own subject. Shape is shared, content
        * is written against this page in content/value-props.ts. See the note on the component. */}
      <ValueBand {...valueProps["/faq"]} ground="muted" />


      {/* ── THE SHORT ANSWERS ──
        * The centerpiece. Answers in the open, because the whole failure of an
        * FAQ page is that the useful part is behind a click. */}
      <section className="section bg-card">
        <div className="shell">
          <SectionHead
            title="Short answers."
          />

          <dl className="mt-10 grid gap-x-10 gap-y-0 lg:grid-cols-2">
            {shortAnswers.map((s) => (
              <div key={s.q} className="border-t border-border py-5">
                <dt className="font-display text-[1.05rem] font-bold leading-snug text-foreground">
                  {s.q}
                </dt>
                <dd className="mt-2 text-[0.95rem] leading-relaxed text-muted-foreground">
                  {s.a}{" "}
                  <a
                    href={`#${slug(s.to)}`}
                    className="whitespace-nowrap font-semibold text-foreground underline decoration-accent decoration-2 underline-offset-4"
                  >
                    The long answer
                  </a>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ── EVERY QUESTION, IN ONE SECTION ──
        * One section with five subheads, not five sections with one subhead each.
        * The rack scrolls away with the page; nothing on this site is pinned
        * except the header. */}
      <section className="section bg-muted">
        <div className="shell">
          <SectionHead
            title="All questions, by topic."
          />

          <nav aria-label="Question groups" className="mt-9 rounded-lg bg-primary px-6 py-5 shadow-[var(--shadow-dark)]">
            <p className="label text-accent">Jump to</p>
            <ul className="mt-4 flex flex-wrap gap-2.5">
              {groups.map((g) => (
                <li key={g.h}>
                  <a
                    href={`#${slug(g.h)}`}
                    className="inline-flex items-baseline gap-2.5 rounded-full border border-on-dark/22 px-5 py-2.5 text-sm text-on-dark-muted transition-colors duration-[--dur-fast] hover:border-accent hover:text-on-dark"
                  >
                    {g.h}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* TWO COLUMNS, NOT ONE.
            * The accordion used to run down a single max-w-[82ch] column inside a 100rem
            * shell, which left roughly 540px of bare background beside it for the whole
            * height of the section — about 3,400px of nothing, the largest blank area on the
            * site, on its longest page. The questions are self-contained, so they simply go
            * two-up: same content, none invented, and the page is a third shorter. */}
          <div className="mt-10 grid gap-x-14 gap-y-12 lg:grid-cols-2">
            {groups.map((g) => (
              <div key={g.h} id={slug(g.h)} className={`scroll-mt-28 ${g.wide ? "lg:col-span-2" : ""}`}>
                {/* The note stacks UNDER the rule rather than sitting to the right of the
                  * heading. Standing rule: body copy never sits beside a heading. It was
                  * right-aligned there because it replaced a "N questions" counter, and it
                  * inherited the counter's slot along with its position. */}
                <div className="border-b-2 border-accent pb-3">
                  <h3 className="font-display text-[clamp(1.3rem,2.4vw,1.75rem)] font-bold text-foreground">
                    {g.h}
                  </h3>
                </div>
                <p className="mt-3 max-w-[54ch] text-sm leading-relaxed text-muted-foreground">{g.note}</p>
                {g.wide ? (
                  <div className="mt-5 grid gap-x-14 lg:grid-cols-2">
                    <Faq items={g.items.slice(0, Math.ceil(g.items.length / 2))} />
                    <Faq items={g.items.slice(Math.ceil(g.items.length / 2))} />
                  </div>
                ) : (
                  <div className="mt-5"><Faq items={g.items} /></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ONE PHOTOGRAPH, AFTER THE QUESTIONS ──
        * This page is the single longest unbroken stretch of text on the site: two columns of
        * accordions and nothing else between the hero and the closer. The section below says
        * what this page cannot answer, and the honest answer to most of the questions above is
        * "come and look at it after dark" — so this is the one thing a reader can look at. */}
      {/* A page of questions with two pictures on it. `background` between the muted section
        * above and the raise band below. */}
      <PhotoStrip
        shots={photoPick("faq-strip", 3)}
        title="Some of our work."
        ground="card"
      />

      <PhotoBand
        photo="poolPergolaDusk"
        label="The answer to most of the above"
        note="A finished install in the Omaha area"
        caption="A lot of these answers depend on your house. The design consultation is free, and you get a written quote."
        ground="raise"
      />

      {/* ── WHAT THIS PAGE CANNOT ANSWER ── */}
      <section className="section bg-primary">
        <div className="shell grid items-start gap-10 lg:grid-cols-[44fr_56fr] lg:gap-14">
          <div>
            <SectionHead
              onDark
              title="Questions that depend on your house."
            />
            {/* THIS SECTION USED TO BE A SECOND CLOSER.
              * It carried the phone number at 2.1rem, a line about booking, and links to the
              * consultation and to pricing — and the very next section is the page's actual closer,
              * with the same phone number, the same book-the-measure link, and the same left-text /
              * right-panel shape. Two closers in a row, one rule broken twice: the one-closer rule
              * and the no-adjacent-identical-archetype rule.
              *
              * What is left is the argument, which is the part only this section makes. The ask
              * happens once, immediately below. */}
            <p className="mt-5 text-lg leading-relaxed text-on-dark/85">
              Some answers depend on your house.
            </p>
            <p className="mt-5 text-[1.02rem] leading-relaxed text-on-dark-muted">
              We go over these with you at the free design consultation.
            </p>
          </div>

          <ul className="divide-y divide-on-dark/12 border-y border-on-dark/12">
            {cannot.map((c) => (
              <li key={c.h} className="py-6">
                <h3 className="font-display text-xl font-bold leading-snug text-on-dark">{c.h}</h3>
                <p className="mt-2.5 text-[0.95rem] leading-relaxed text-on-dark-muted">{c.p}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <PageCta
        variant="phone"
        photos={valueProps["/faq"].photos}
        title="Ask us what is not on this page."
        body="Call us with any question about permanent lighting for your house."
        panelLink={{ href: "/free-design-consultation", label: "Book a free design" }}
      />
    </Shell>
  );
}
