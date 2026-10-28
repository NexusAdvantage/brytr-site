export type Row = { spec: string; a: string; b: string };
export type Compare = {
  slug: string;
  title: string;
  h1: string;
  keyword: string;
  volume?: string;
  a: string;            // left product
  b: string;            // right product
  verdict: string;      // the answer, above the fold
  aWins: string[];
  bWins: string[];
  aWinsHead: string;
  bWinsHead: string;
  rows: Row[];
  costA: string;        // short status line under each name
  costB: string;
  stance: string;       // "Where we stand" line
  labor?: boolean;      // DIY vs pro framing
};

/* BRAND COMPARISONS, REWRITTEN 28 OCT 2026.
 *
 * Client feedback: the old pages ranked brands against each other, called Jellyfish (which Brytr
 * sells) a "value tier" system, and scored Gemstone (which Brytr does not sell) above it. Brytr
 * does not want to run down other brands.
 *
 * The rule now: describe each brand by what it is, how it is sold and who installs it. No specs
 * for brands we do not carry, no scores, no "better" or "worse", no tiers. Anything about exact
 * hardware is handled at the design consultation, not on a page. */

type Other = { maker: string; sold: string; installer?: string };

const rowsFor = (aName: string, aMaker: string, bName: string, b: Other): Row[] => [
  { spec: "Manufacturer", a: aMaker, b: b.maker },
  { spec: "What it is", a: "Permanent roofline lighting", b: "Permanent roofline lighting" },
  { spec: "Color", a: "Full color and white", b: "Full color and white" },
  { spec: "Control", a: `${aName} app, scenes and schedules`, b: "Manufacturer's app, scenes and schedules" },
  { spec: "How it is sold", a: "Through authorized installers", b: b.sold },
  { spec: "Installed in Omaha by", a: "Brytr", b: b.installer ?? "Their local dealer" },
  { spec: "Brytr installs it", a: "Yes", b: "No" },
];

const haven = (bName: string, b: Other) => rowsFor("Haven", "Haven Lighting", bName, b);
const jelly = (bName: string, b: Other) => rowsFor("Jellyfish", "Jellyfish Lighting", bName, b);

const OURS = "Installed by Brytr";

export const compares: Compare[] = [
  {
    slug: "haven-vs-jellyfish-lighting",
    title: "Haven Evolution vs Jellyfish Lighting",
    h1: "Haven Evolution and Jellyfish, from an installer who fits both.",
    keyword: "haven lighting vs jellyfish",
    a: "Haven Evolution", b: "Jellyfish Lighting",
    verdict:
      "We install both, and both are good permanent systems. Each gives you full color and white along the roofline, controlled from an app. Which one we put on your house comes down to your roofline and what else you want lit, and we walk through both at the design consultation.",
    aWinsHead: "Haven may suit you if",
    bWinsHead: "Jellyfish may suit you if",
    aWins: [
      "You want roofline, soffit, landscape and bistro lighting from one manufacturer",
      "You plan to add landscape or patio lighting later on the same app",
      "You like the look of the Haven channel on your fascia",
    ],
    bWins: [
      "You want a widely installed name in permanent lighting",
      "You want the Jellyfish app for scenes, schedules and holidays",
      "You have seen a Jellyfish install you liked",
    ],
    rows: [
      { spec: "Manufacturer", a: "Haven Lighting", b: "Jellyfish Lighting" },
      { spec: "What it is", a: "Permanent roofline lighting", b: "Permanent roofline lighting" },
      { spec: "Color", a: "Full color and white", b: "Full color and white" },
      { spec: "Control", a: "Haven app, scenes and schedules", b: "Jellyfish app, scenes and schedules" },
      { spec: "Also in the lineup", a: "Soffit, landscape and bistro fixtures", b: "Roofline focused" },
      { spec: "Installed in Omaha by", a: "Brytr", b: "Brytr" },
    ],
    costA: OURS, costB: OURS,
    stance: "We install both",
  },
  {
    slug: "jellyfish-vs-gemstone-lights",
    title: "Jellyfish Lighting vs Gemstone Lights",
    h1: "Jellyfish Lighting and Gemstone Lights.",
    keyword: "gemstone vs jellyfish lighting",
    volume: "150/mo",
    a: "Jellyfish Lighting", b: "Gemstone Lights",
    verdict:
      "Both are permanent roofline systems with full color, app control and scheduling, and both are well known names. Gemstone is sold through its own dealer network. Brytr installs Jellyfish, so that is the one we can measure, fit and service ourselves here in Omaha.",
    aWinsHead: "Jellyfish may suit you if",
    bWinsHead: "Gemstone may suit you if",
    aWins: [
      "You want a local Omaha crew to measure, install and service it",
      "You want the Jellyfish app for scenes, schedules and holidays",
      "You want a widely installed name in permanent lighting",
    ],
    bWins: [
      "You already have a Gemstone dealer you trust",
      "You have seen a Gemstone install you liked",
    ],
    rows: jelly("Gemstone Lights", { maker: "Gemstone Lights", sold: "Through its own dealer network" }),
    costA: OURS, costB: "Sold through Gemstone dealers",
    stance: "We install Jellyfish",
  },
  {
    slug: "haven-vs-gemstone-lights",
    title: "Haven Evolution vs Gemstone Lights",
    h1: "Haven Evolution and Gemstone Lights.",
    keyword: "gemstone lights",
    volume: "1,900/mo",
    a: "Haven Evolution", b: "Gemstone Lights",
    verdict:
      "Gemstone is a well known permanent lighting brand sold through its own dealer network. Brytr installs Haven and Jellyfish. Whichever brand you choose, the install is what decides how it looks in year five.",
    aWinsHead: "Haven may suit you if",
    bWinsHead: "Gemstone may suit you if",
    aWins: [
      "You want a local Omaha crew to measure, install and service it",
      "You want roofline, landscape and bistro lighting on one app",
    ],
    bWins: ["You already have a Gemstone dealer you trust", "You have seen a Gemstone install you liked"],
    rows: haven("Gemstone Lights", { maker: "Gemstone Lights", sold: "Through its own dealer network" }),
    costA: OURS, costB: "Sold through Gemstone dealers",
    stance: "We install Haven",
  },
  {
    slug: "haven-vs-trimlight",
    title: "Haven Evolution vs Trimlight",
    h1: "Haven Evolution and Trimlight.",
    keyword: "trimlight",
    volume: "1,700/mo",
    a: "Haven Evolution", b: "Trimlight",
    verdict:
      "Trimlight is a national permanent lighting brand sold through franchise and dealer territories, so the installer is whoever covers your area. Brytr is a local Omaha company and installs Haven and Jellyfish with our own crew.",
    aWinsHead: "Haven may suit you if",
    bWinsHead: "Trimlight may suit you if",
    aWins: [
      "You want a locally owned company accountable for the install",
      "You want roofline, landscape and bistro lighting on one app",
    ],
    bWins: ["The Trimlight installer in your area has a strong reputation", "You want a brand with coverage in other states"],
    rows: haven("Trimlight", { maker: "Trimlight", sold: "Through franchise and dealer territories", installer: "The territory holder" }),
    costA: OURS, costB: "Sold through local territories",
    stance: "We install Haven",
  },
  {
    slug: "haven-vs-oelo",
    title: "Haven Evolution vs Oelo Lighting",
    h1: "Haven Evolution and Oelo.",
    keyword: "oelo lighting",
    a: "Haven Evolution", b: "Oelo",
    verdict:
      "Oelo is a permanent lighting brand with its own channel design and app, sold through local dealers. Brytr installs Haven and Jellyfish. If you have seen an Oelo install you liked, it is worth a look alongside ours.",
    aWinsHead: "Haven may suit you if",
    bWinsHead: "Oelo may suit you if",
    aWins: [
      "You want a local Omaha crew to measure, install and service it",
      "You want roofline, landscape and bistro lighting on one app",
    ],
    bWins: ["You like the Oelo channel design", "You have an Oelo dealer you trust"],
    rows: haven("Oelo", { maker: "Oelo", sold: "Through local dealers" }),
    costA: OURS, costB: "Sold through Oelo dealers",
    stance: "We install Haven",
  },
  {
    slug: "haven-vs-everlights",
    title: "Haven Evolution vs EverLights",
    h1: "Haven Evolution and EverLights.",
    keyword: "everlights permanent lighting",
    a: "Haven Evolution", b: "EverLights",
    verdict:
      "EverLights is one of the longer standing names in permanent lighting, sold through its own dealers. Brytr installs Haven and Jellyfish, measured and fitted by our own local crew.",
    aWinsHead: "Haven may suit you if",
    bWinsHead: "EverLights may suit you if",
    aWins: [
      "You want a local Omaha crew to measure, install and service it",
      "You want roofline, landscape and bistro lighting on one app",
    ],
    bWins: ["You want an established name in the category", "You have an EverLights dealer you trust"],
    rows: haven("EverLights", { maker: "EverLights", sold: "Through its own dealers" }),
    costA: OURS, costB: "Sold through EverLights dealers",
    stance: "We install Haven",
  },
  {
    slug: "haven-vs-minleon-rainmin",
    title: "Haven Evolution vs Minleon and Rainmin",
    h1: "Haven Evolution and Minleon or Rainmin.",
    keyword: "minleon",
    volume: "350/mo",
    a: "Haven Evolution", b: "Minleon / Rainmin",
    verdict:
      "Minleon and Rainmin are installer channel products, often used for animated and holiday displays. Brytr installs Haven and Jellyfish for year round everyday lighting as well as holiday scenes.",
    aWinsHead: "Haven may suit you if",
    bWinsHead: "Minleon or Rainmin may suit you if",
    aWins: ["Everyday white and seasonal color are both part of the plan", "You want roofline, landscape and bistro lighting on one app"],
    bWins: ["Animated holiday shows are the main goal", "You already run a display and want to extend it"],
    rows: haven("Minleon / Rainmin", { maker: "Minleon / Rainmin", sold: "Through specialist installers", installer: "A specialist installer" }),
    costA: OURS, costB: "Sold through installers",
    stance: "We install Haven",
  },
  {
    slug: "haven-vs-govee",
    title: "Haven vs Govee: DIY Kit or Pro Install?",
    h1: "A professional install or a Govee kit.",
    keyword: "govee permanent outdoor lights",
    volume: "36,000/mo",
    labor: true,
    a: "Brytr professional install", b: "Govee DIY kit",
    verdict:
      "This is less about brand and more about who does the work. A Govee kit costs less upfront and you install it yourself. A professional install means we measure, fit, seal every fixing and walk you through the app before we leave. Both are reasonable choices for different people.",
    aWinsHead: "A professional install may suit you if",
    bWinsHead: "A DIY kit may suit you if",
    aWins: [
      "You would rather not work at roof height",
      "You want the channel screwed into the fascia and every fixing sealed",
      "You want one local number to call for service",
    ],
    bWins: [
      "You enjoy this kind of project",
      "You have a single story roofline with easy access",
      "You want to try permanent lighting at a lower upfront cost",
    ],
    rows: [
      { spec: "Who installs it", a: "Brytr", b: "You" },
      { spec: "Time on a ladder", a: "None for you", b: "Usually a weekend" },
      { spec: "Mounting", a: "Aluminum channel, screw fixed and sealed", b: "Per the kit instructions" },
      { spec: "Service later", a: "We come out", b: "You handle it" },
      { spec: "Control", a: "Manufacturer's app", b: "Govee app" },
      { spec: "Upfront cost", a: "Higher", b: "Lower" },
    ],
    costA: OURS, costB: "Installed by you",
    stance: "Labor, not brand",
  },
];

export const compareBySlug = (slug: string) => compares.find((c) => c.slug === slug);

/* HIDDEN, 28 OCT 2026. Zac (Loom, 28 Oct) asked for every brand comparison page to be hidden
 * until Brytr and Nexus go through the copy together on a call. While this is true:
 *   /compare and every /compare/* page 307s to /lighting-systems (next.config.ts)
 *   nothing on the site links to them (nav, footer, closers, value bands, blog, system pages)
 *   the sitemap does not list them
 * The pages and their copy are untouched. To bring them back, set this to false. */
export const COMPARE_HIDDEN = true;
