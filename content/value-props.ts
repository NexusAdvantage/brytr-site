import { pick } from "./photo-sets";
import { COMPARE_HIDDEN } from "./compares";
import type { Service } from "./services";
import type { City } from "./cities";

/* WHAT EVERY PAGE SAYS BEFORE IT GETS SPECIFIC.
 *
 * One value band sits under the hero on every content page, same shape, different content. The
 * shape lives in components/sections/value-band.tsx; this file is what each page puts in it.
 *
 * WHY IT IS A FILE AND NOT A CONSTANT. The standing instruction is that every page should look
 * different while sharing the design and the flow. A single hard-coded band on twenty templates
 * would be the opposite: the same three sentences twenty times, which is the "string-for-string
 * identical line in a template" problem this codebase has already had to unpick twice. So every
 * page writes its own three points against its own subject, and the five dynamic templates derive
 * theirs from the entity they are rendering, which makes roughly fifty pages that are individually
 * true rather than fifty copies.
 *
 * RULES THE ENTRIES FOLLOW, all of them house rules from earlier reviews:
 *   three points, no more, and each one a claim rather than a feature name
 *   a lede under 34 words, which scripts/typography.mjs enforces
 *   no em dashes, which scripts/em-dash.mjs enforces
 *   no founders, no W-2s, no subcontracting
 *   the photographs are chosen against the page, and the lead one wants a wide frame
 *
 * AND, SINCE 29 AUG 2026: nothing in here says the channel is color matched to anything, nothing
 * says the fixing never goes through a shingle, nothing promises a daylight curb check, and
 * nothing is framed as being judged "from the curb at noon". This file reaches about fifty
 * routes, so it is the worst place on the site to carry a claim we cannot make.
 */
export type ValueProp = {
  title: string;
  lede: string;
  points: { h: string; p: string }[];
  photos: string[];
  cta: { href: string; label: string };
  alt?: { href: string; label: string };
};

const BOOK = { href: "/free-design-consultation", label: "Book a free design" };

/* The three claims the whole business rests on, used where a page has no more specific angle.
 * Kept as a named constant so the wording cannot drift between the pages that share it. */
const CORE = [
  { h: "Installed once, and left there",
    p: "It stays up year round. No ladder in November, nothing to take down in January." },
  { h: "Any color, from the app",
    p: "Warm white for everyday, red and green in December, team colors on gameday." },
  { h: "Based in Omaha",
    p: "We are in west Omaha, and you can call us for service on anything we installed." },
];

export const valueProps: Record<string, ValueProp> = {
  "/about": {
    title: "Permanent lighting, installed in Omaha.",
    lede: "We install permanent outdoor lighting in the Omaha metro and Council Bluffs.",
    points: [
      { h: "Jellyfish and Haven", p: "We install both and help you pick the right one for your house." },
      { h: "Designed with you", p: "A free design consultation and a written quote." },
      { h: "Here afterwards", p: "Call us for service on anything we installed." },
    ],
    photos: ["homeWideRanch", "crewPortrait", "installDayGarage"],
    cta: BOOK,
    alt: { href: "/recent-projects", label: "See recent work" },
  },

  "/blog": {
    title: "Guides to permanent lighting.",
    lede: "Plain answers to common questions about permanent outdoor lighting.",
    points: [
      { h: "No ladder, ever again", p: "It goes up once and stays up through every season." },
      { h: "Warm white for everyday", p: "Color is there when you want it, and warm white when you do not." },
      /* WAS "It disappears in daylight / Channel color matched to your fascia, so from the curb at
         noon it reads as part of the house." Brytr does not color match the channel. The daylight
         argument now rests on the daylight photographs, which are real and on the gallery. */
      { h: "Low profile by day", p: "The track runs along the roofline and blends in during the day." },
    ],
    photos: ["seqEveryday", "dayShakeGable", "winterSnowDusk"],
    cta: BOOK,
    alt: { href: "/how-it-works", label: "How an install runs" },
  },

  "/compare": {
    title: "Jellyfish and Haven.",
    lede: "Brytr installs Haven and Jellyfish. These pages describe the other brands people ask us about, plainly and without scoring them.",
    points: [
      { h: "Two brands", p: "We install Jellyfish and Haven." },
      { h: "Described, not ranked", p: "What each brand is, how it is sold and who installs it locally." },
      { h: "Specs at the consultation", p: "Hardware changes between generations, so we go through the exact product on site." },
    ],
    photos: ["archByDay", "homeModernStone", "detailGableMiter"],
    cta: BOOK,
    alt: { href: "/lighting-systems", label: "The systems we fit" },
  },

  "/contact": {
    title: "Start with a call.",
    lede: "Call or send a message and we will set up a free design consultation at your house.",
    points: [
      { h: "We will get back to you", p: "Call 402-810-3973 or use the form." },
      /* WAS "On your elevation, against your own fascia color, with the scenes built while we are
         there." The middle clause was the color-matching claim, on the page people reach when
         they are ready to call. 29 Aug 2026. */
      { h: "We design it with you", p: "We visit and plan the lighting with you at your house." },
      /* "itemised" -> "itemized" in the same pass. A British spelling the color sweep missed
         outright, because the rule only covered the -ise verbs I had thought to list. */
      { h: "A written quote", p: "The consultation and the quote are free." },
    ],
    photos: ["homePrairieTwilight", "walkthroughDusk", "crewPortrait"],
    cta: BOOK,
    alt: COMPARE_HIDDEN ? { href: "/lighting-systems", label: "The systems we install" } : { href: "/compare", label: "Compare the brands" },
  },

  "/faq": {
    title: "The short answer, first.",
    lede: "Permanent lighting is a track along your roofline with LEDs in it, controlled from an app. It goes up once and stays up.",
    points: CORE,
    photos: ["seqSecurity", "dayBrickGable", "homeEaveDownlights"],
    cta: BOOK,
    alt: { href: "/how-it-works", label: "How an install runs" },
  },

  "/free-design-consultation": {
    title: "See it on your own house first.",
    lede: "We visit, design it with you, and give you a written quote.",
    points: [
      /* WAS: "No design fee, no deposit to get a drawing, and nobody follows up for a year."
       * Three claims, and the deposit and design-fee halves are pricing terms nobody at Brytr
       * gave us. The visit being free is the offer Brytr leads with everywhere, so that part
       * stays and the invented terms around it do not.
       *
       * THEN THE REST OF IT WENT TOO, 29 Aug 2026, on the client's punch list. "nobody follows
       * up for a year" is not true - there is a follow-up sequence. And "Your materials, not a
       * catalogue" was the color-matching claim wearing a different hat: it promised we hold
       * channel color against your fascia, and we do not match the channel to anything. */
      { h: "The visit and the quote are free", p: "The design consultation and the written quote cost nothing." },
      { h: "At your house", p: "We come to you and look at the property with you." },
      { h: "Jellyfish or Haven", p: "We help you pick the system that suits your house." },
    ],
    photos: ["sceneWarmBlueBand", "walkthroughDusk", "homeStuccoStone"],
    cta: BOOK,
    alt: { href: "/recent-projects", label: "See recent work" },
  },

  "/gallery": {
    title: "Every frame is a Brytr install.",
    lede: "Photos of homes in the Omaha area with Brytr lighting installed.",
    points: [
      { h: "Many scenes, same lights", p: "The same lighting can be set to different colors and scenes from the app." },
      { h: "Day and night", p: "There are a few daytime photos here as well." },
      { h: "Color by zone", p: "Different parts of the house can be set to different colors." },
    ],
    photos: ["aerialRedRoofline", "sceneAmberCyan", "gamedayRedBlueGables"],
    cta: BOOK,
    alt: { href: "/recent-projects", label: "See recent work" },
  },

  "/how-it-works": {
    /* WAS: "Installed in a day, and left on the building." The duration survived here in the
     * TITLE after the same claim was taken out of the points below it, three lines further down,
     * in the same commit. A heading is the one line on a band a reader cannot miss. */
    title: "How it works.",
    lede: "We visit, design it with you, give you a written quote, and handle the install.",
    points: [
      /* WAS "Into fascia, never through shingles". Sometimes the roof requires a penetration -
         client's punch list, 29 Aug 2026 - so the absolute is now a qualified claim that is
         always true. The sealing half, which is the part that actually matters, is unchanged. */
      { h: "Installed once", p: "It stays up year round." },
      /* WAS: "Most homes are a single day / One crew, one visit, and the drive cleared before we
       * leave." The duration claim is out on the client's instruction. What is left is the part
       * that was never in doubt and is the actual reassurance: the site gets cleared. */
      { h: "Controlled from an app", p: "Scenes and schedules from your phone." },
      /* WAS "Checked twice before we go / The sightline from the curb, then every scene walked
         through with you." The daylight curb check is on the client's punch list as not true, so
         what is left is the scene walk, which is. 29 Aug 2026. */
      { h: "Here afterwards", p: "Call us for service on anything we installed." },
    ],
    photos: ["installDayPavilion", "detailGableMiter", "crewRoofFascia"],
    cta: BOOK,
    alt: COMPARE_HIDDEN ? { href: "/lighting-systems", label: "The systems we install" } : { href: "/compare", label: "Compare the brands" },
  },

  "/lighting-systems": {
    title: "The systems we install.",
    lede: "We install Jellyfish and Haven. We help you pick the one that suits your house at the design consultation.",
    points: [
      { h: "Two brands", p: "Jellyfish and Haven, both permanent and app controlled." },
      { h: "One number to call", p: "Call us for service on anything we installed." },
      { h: "Add to it later", p: "Start with the roofline and add landscape or patio lighting later." },
    ],
    photos: ["archAtNight", "serviceRoofline", "serviceSoffit"],
    cta: BOOK,
    alt: COMPARE_HIDDEN ? { href: "/how-it-works", label: "How an install runs" } : { href: "/compare", label: "Compare the brands" },
  },

  /* THE "/pricing" BAND IS GONE with the page it belonged to. It carried three claims and all
   * three were unsourced: "No design fee, no travel charge", the per-element pricing breakdown,
   * and a "Financing options" link to /financing - a route that never existed, so that button was
   * a live 404 on the client's domain. */
  "/recent-projects": {
    title: "Finished work, photographed as it was.",
    lede: "Homes in the Omaha area with Brytr lighting installed.",
    points: [
      { h: "More than rooflines", p: "Pergolas, beds and hardscape as well as the house." },
      { h: "All kinds of roofs", p: "Ranches, gables and flat modern edges." },
      { h: "Here afterwards", p: "Call us for service on anything we installed." },
    ],
    photos: ["homeBrickGablesGold", "poolPergolaDusk", "hardscapeSeatwall"],
    cta: BOOK,
    alt: { href: "/gallery", label: "The scene library" },
  },

  "/reviews": {
    title: "What the neighbors said about the work.",
    lede: "Reviews from homeowners, quoted word for word.",
    points: [
      { h: "In their words", p: "What customers wrote about working with us." },
      { h: "Here afterwards", p: "Call us for service on anything we installed." },
      { h: "Read them all", p: "Every review is on our Google profile." },
    ],
    photos: ["seqWarmChristmas", "homeWhiteTwoStorey", "christmasEntryShrubs"],
    cta: BOOK,
    alt: { href: "/recent-projects", label: "See recent work" },
  },

  "/service-areas": {
    title: "The metro, and Council Bluffs.",
    lede: "We serve the Omaha metro and Council Bluffs.",
    points: [
      { h: "Here afterwards", p: "Call us for service on anything we installed." },
      /* WAS: "Same price in every town / No travel charge inside the metro, and no border premium
       * on the Iowa side." A uniform-pricing guarantee across nineteen towns and two states.
       * Nobody at Brytr has told us how travel is or is not priced. Replaced with the thing this
       * band was really for, which is why the service area stops where it does - and that is a
       * drive time, not a price. */
      { h: "Based in west Omaha", p: "Our office is at 13436 C St in Omaha." },
      /* WAS: "Your own crew, not a franchise". The client's correction in August was that the
       * crews are subcontractors, not employees, so "your own crew" is false. What is true and is
       * the actual point of this band is that everything is dispatched from one shop rather than
       * from a franchise head office. */
      { h: "Free design consultation", p: "We come to your house and design it with you." },
    ],
    photos: ["winterGradientSnow", "homeShakeBrick", "deckRanchWarm"],
    cta: BOOK,
    alt: { href: "/recent-projects", label: "See recent work" },
  },

  "/services": {
    title: "What we install.",
    lede: "Roofline, soffit, landscape, hardscape and patio lighting, controlled from an app. You can start with one and add more later.",
    points: CORE,
    photos: ["serviceWholeHome", "servicePatio", "serviceLandscape"],
    cta: BOOK,
    alt: COMPARE_HIDDEN ? { href: "/lighting-systems", label: "The systems we install" } : { href: "/compare", label: "Compare the brands" },
  },

  /* THE "/warranty" ENTRY IS GONE, 28 Aug 2026, with the page. Deleting the route and leaving its
   * copy in this map would have shipped three paragraphs of warranty terms in the bundle for a URL
   * that now 308s to the home page - which is the same mistake as the dead pricing-FAQ array that
   * nearly went out on 27 Aug: unrendered is not the same as removed, and a claim in a shipped
   * chunk is a claim. Nothing in this file should describe coverage until Brytr gives us terms. */
};

/* ── THE DYNAMIC TEMPLATES ──
 * Five templates render roughly fifty pages between them. Each derives its band from the thing it
 * is rendering, so a reader on two service pages gets two different bands rather than the same one
 * with a different heading. `pick` is seeded on the slug, so the photographs are stable per page
 * and different between pages. */

const shots = (seed: string, n: number) => pick(seed, n).map((s) => s.photo);

export function serviceValueProp(s: Service): ValueProp {
  return {
    title: "Installed once, run from an app.",
    lede: "It is installed once and controlled from an app, and you can add more lighting later.",
    points: [
      { h: "Installed once", p: "Nothing to put up in November and nothing to take down." },
      { h: "Scenes and schedules", p: "Set it from your phone, or put it on a schedule." },
      { h: "Here afterwards", p: "Call us for service on anything we installed." },
    ],
    photos: [s.photo ?? "homeWideRanch", ...shots(`vb-${s.slug}`, 2)],
    cta: BOOK,
    alt: COMPARE_HIDDEN ? { href: "/lighting-systems", label: "The systems we install" } : { href: "/compare", label: "Compare the brands" },
  };
}

export function cityValueProp(c: City): ValueProp {
  return {
    title: `Permanent lighting in ${c.name}.`,
    /* Drive times are no longer printed. They were never confirmed by Brytr. */
    lede: `We install permanent outdoor lighting in ${c.name} and the rest of the Omaha metro and Council Bluffs.`,
    points: [
      { h: "Jellyfish and Haven", p: "We install both and help you pick the right one." },
      /* WAS: "No travel charge / Priced by the foot exactly as it is in Omaha, with nothing added
       * for the drive." This rendered on all twelve city pages: a pricing basis plus a
       * no-surcharge guarantee, neither of them from Brytr. */
      { h: "Here afterwards", p: "Call us for service on anything we installed." },
      /* WAS "Against your own fascia color, before anything is ordered" - the color-matching
         claim, on all eighteen city pages. 29 Aug 2026. */
      { h: "Designed with you", p: "A free design consultation at your house and a written quote." },
    ],
    photos: shots(`vb-city-${c.slug}`, 3),
    cta: BOOK,
    alt: { href: "/service-areas", label: "Every town we serve" },
  };
}

export function systemValueProp(_name: string, slug: string): ValueProp {
  return {
    title: "Installed by Brytr.",
    lede: "Installed by Brytr in the Omaha metro and Council Bluffs.",
    points: [
      { h: "On your quote", p: "The system is named on your written quote." },
      { h: "One number to call", p: "Call us for service on anything we installed." },
      { h: "Two brands", p: "We install Jellyfish and Haven and help you pick the right one." },
    ],
    photos: shots(`vb-sys-${slug}`, 3),
    cta: BOOK,
    alt: COMPARE_HIDDEN ? { href: "/lighting-systems", label: "The systems we install" } : { href: "/compare", label: "Compare the brands" },
  };
}

export function compareValueProp(a: string, b: string, slug: string): ValueProp {
  return {
    title: "Chosen for your house.",
    lede: `People ask us about ${a} and ${b}. The useful question is which system suits your house.`,
    points: [
      { h: "Plain descriptions", p: "No scores and no rankings. Just what each brand is and how it is sold." },
      { h: "Here afterwards", p: "Call us for service on anything we installed." },
      { h: "Measured on site", p: "We go through exact hardware and pricing at the free design consultation." },
    ],
    photos: shots(`vb-cmp-${slug}`, 3),
    cta: BOOK,
    alt: { href: "/lighting-systems", label: "The systems we fit" },
  };
}

export function postValueProp(slug: string): ValueProp {
  return {
    title: "What this is, briefly.",
    lede: "Permanent outdoor lighting is a track along your roofline with LEDs in it, controlled from an app. It goes up once and stays up.",
    points: CORE,
    photos: shots(`vb-post-${slug}`, 3),
    cta: BOOK,
    alt: { href: "/how-it-works", label: "How an install runs" },
  };
}
